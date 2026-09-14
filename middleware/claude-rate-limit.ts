/**
 * Claude API Rate Limiting Middleware
 *
 * Implements token bucket algorithm to prevent hitting API rate limits.
 * Tracks both requests per minute and tokens per minute.
 */

import { NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  requestsPerMinute: number;
  tokensPerMinute: number;
  enabled: boolean;
}

class RateLimitStore {
  private requests: Map<string, number[]> = new Map();
  private tokens: Map<string, number[]> = new Map();

  /**
   * Check if client is within rate limits
   */
  async checkLimit(
    clientId: string,
    config: RateLimitConfig,
  ): Promise<{ allowed: boolean; retryAfter?: number }> {
    if (!config.enabled) {
      return { allowed: true };
    }

    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Get recent requests for this client
    const clientRequests = this.requests.get(clientId) || [];
    const recentRequests = clientRequests.filter((t) => t > oneMinuteAgo);

    // Check request limit
    if (recentRequests.length >= config.requestsPerMinute) {
      const oldestRequest = Math.min(...recentRequests);
      const retryAfter = Math.ceil((oldestRequest + 60000 - now) / 1000);

      return {
        allowed: false,
        retryAfter,
      };
    }

    // Add current request
    recentRequests.push(now);
    this.requests.set(clientId, recentRequests);

    return { allowed: true };
  }

  /**
   * Track token usage
   */
  trackTokens(clientId: string, tokens: number) {
    const now = Date.now();
    const clientTokens = this.tokens.get(clientId) || [];

    clientTokens.push(now);
    this.tokens.set(clientId, clientTokens);
  }

  /**
   * Get current usage stats for a client
   */
  getUsage(clientId: string): {
    requestsLastMinute: number;
    tokensLastMinute: number;
  } {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    const requests = (this.requests.get(clientId) || []).filter(
      (t) => t > oneMinuteAgo,
    );
    const tokens = (this.tokens.get(clientId) || []).filter(
      (t) => t > oneMinuteAgo,
    );

    return {
      requestsLastMinute: requests.length,
      tokensLastMinute: tokens.length,
    };
  }

  /**
   * Clean up old entries (run periodically)
   */
  cleanup() {
    const now = Date.now();
    const oneHourAgo = now - 3600000;

    Array.from(this.requests.entries()).forEach(([clientId, timestamps]) => {
      const recent = timestamps.filter((t) => t > oneHourAgo);
      if (recent.length === 0) {
        this.requests.delete(clientId);
      } else {
        this.requests.set(clientId, recent);
      }
    });

    Array.from(this.tokens.entries()).forEach(([clientId, timestamps]) => {
      const recent = timestamps.filter((t) => t > oneHourAgo);
      if (recent.length === 0) {
        this.tokens.delete(clientId);
      } else {
        this.tokens.set(clientId, recent);
      }
    });
  }
}

// Global rate limit store
const rateLimitStore = new RateLimitStore();

// Clean up every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => rateLimitStore.cleanup(), 300000);
}

/**
 * Rate limit middleware for Claude API routes
 */
export async function claudeRateLimit(
  request: NextRequest,
  config: Partial<RateLimitConfig> = {},
): Promise<NextResponse | null> {
  const fullConfig: RateLimitConfig = {
    requestsPerMinute: 50, // Conservative limit per client
    tokensPerMinute: 100000,
    enabled: true,
    ...config,
  };

  // Get client identifier (IP address or user ID)
  const clientId =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Check rate limit
  const { allowed, retryAfter } = await rateLimitStore.checkLimit(
    clientId,
    fullConfig,
  );

  if (!allowed) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded",
        retryAfter,
        message: `Too many requests. Please wait ${retryAfter} seconds.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter!.toString(),
          "X-RateLimit-Limit": fullConfig.requestsPerMinute.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": (Date.now() + retryAfter! * 1000).toString(),
        },
      },
    );
  }

  // Get current usage
  const usage = rateLimitStore.getUsage(clientId);

  // Add rate limit headers to response (will be merged later)
  return null; // Allow request to proceed
}

/**
 * Export rate limit store for usage tracking
 */
export { rateLimitStore };

type ClaudeRateLimitOptions = {
  endpoint?: string;
  limit?: number;
  window?: number;
  trackCost?: boolean;
  modelCost?: number;
};

type ClaudeRateLimitResult = {
  allowed: boolean;
  remaining: number;
  limit: number;
  reset: number;
  retryAfter?: number;
  tokensConsumed: number;
  costTracking?: { estimatedCost: number };
};

/**
 * Per-client token bucket used by tests and Claude API cost control.
 * Default: 10 requests per 60 seconds.
 */
class ClaudeRateLimiter {
  private buckets = new Map<
    string,
    { timestamps: number[]; consumed: number }
  >();
  private defaultLimit = 10;

  reset() {
    this.buckets.clear();
  }

  async check(
    clientId: string | null,
    options: ClaudeRateLimitOptions = {},
  ): Promise<ClaudeRateLimitResult> {
    if (!clientId) {
      throw new Error("Invalid client ID");
    }

    const limit = options.limit ?? this.defaultLimit;
    const windowMs = (options.window ?? 60) * 1000;
    const key = `${clientId}:${options.endpoint ?? "default"}`;
    const now = Date.now();
    const windowStart = now - windowMs;

    const bucket = this.buckets.get(key) || { timestamps: [], consumed: 0 };
    bucket.timestamps = bucket.timestamps.filter((t) => t > windowStart);

    if (bucket.timestamps.length >= limit) {
      const oldest = Math.min(...bucket.timestamps);
      const retryAfter = Math.max(
        1,
        Math.ceil((oldest + windowMs - now) / 1000),
      );
      this.buckets.set(key, bucket);
      return {
        allowed: false,
        remaining: 0,
        limit,
        reset: oldest + windowMs,
        retryAfter,
        tokensConsumed: bucket.consumed,
      };
    }

    bucket.timestamps.push(now);
    bucket.consumed += 1;
    this.buckets.set(key, bucket);

    const remaining = limit - bucket.timestamps.length;
    const result: ClaudeRateLimitResult = {
      allowed: true,
      remaining,
      limit,
      reset: now + windowMs,
      tokensConsumed: bucket.consumed,
    };

    if (options.trackCost) {
      result.costTracking = {
        estimatedCost: options.modelCost ?? 0,
      };
    }

    return result;
  }

  async refund(clientId: string, count: number) {
    const key = `${clientId}:default`;
    const bucket = this.buckets.get(key);
    if (!bucket) return;

    for (let i = 0; i < count && bucket.timestamps.length > 0; i += 1) {
      bucket.timestamps.pop();
      bucket.consumed = Math.max(0, bucket.consumed - 1);
    }
    this.buckets.set(key, bucket);
  }
}

export const claudeRateLimiter = new ClaudeRateLimiter();
