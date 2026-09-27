/**
 * Lead Capture API — sends leads to Follow Up Boss via /v1/events
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  leadFormLimiter,
  getClientId,
  checkRateLimit,
  getRateLimitHeaders,
} from '@/lib/rate-limit';

const SITE_SOURCE = 'midtownvegascondos.com';
const FUB_EVENTS_URL = 'https://api.followupboss.com/v1/events';

export interface LeadCaptureRequest {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  formType?: string;
  formName?: string;
  sourceUrl?: string;
  stage?: string;
  tags?: string[];
  message?: string;
  propertyType?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  neighborhoods?: string[];
  timeline?: string;
  financing?: string;
  preApproved?: boolean;
  turnstileToken?: string;
  company?: string;
  website?: string;
  customFields?: Record<string, unknown>;
}

async function verifyTurnstileToken(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn('TURNSTILE_SECRET_KEY not configured - skipping verification');
    return true;
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

function sanitizeText(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim();
}

function parseName(data: LeadCaptureRequest): { firstName: string; lastName: string } {
  if (data.firstName || data.lastName) {
    return {
      firstName: sanitizeText(data.firstName || ''),
      lastName: sanitizeText(data.lastName || ''),
    };
  }

  const fullName = sanitizeText(data.name || '');
  if (!fullName) {
    return { firstName: '', lastName: '' };
  }

  const parts = fullName.split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getFubEventType(data: LeadCaptureRequest): string {
  const formType = (data.formType || '').toLowerCase();

  if (formType === 'home-valuation' || formType === 'seller') {
    return 'Seller Inquiry';
  }
  if (formType === 'property-inquiry' || formType === 'listing') {
    return 'Property Inquiry';
  }
  if (formType === 'newsletter' || formType === 'registration') {
    return 'Registration';
  }

  return 'General Inquiry';
}

function getFormLabel(data: LeadCaptureRequest): string {
  return data.formName || data.source || 'lead-capture';
}

function getAttributionTags(request: NextRequest, data: LeadCaptureRequest): string[] {
  const tags: string[] = [];
  const url = new URL(request.url);

  const utmSource = url.searchParams.get('utm_source');
  const utmMedium = url.searchParams.get('utm_medium');
  const utmCampaign = url.searchParams.get('utm_campaign');

  if (utmSource) {
    tags.push(`utm:${utmSource}`);
    if (utmMedium) tags.push(`utm-medium:${utmMedium}`);
    if (utmCampaign) tags.push(`utm-campaign:${utmCampaign}`);
  }

  const referrer = request.headers.get('referer');
  if (referrer) {
    try {
      const refUrl = new URL(referrer);
      if (!refUrl.hostname.includes(SITE_SOURCE)) {
        tags.push(`referrer:${refUrl.hostname}`);
      }
    } catch {
      // ignore invalid referrer
    }
  }

  if (data.source && data.source !== SITE_SOURCE) {
    tags.push(`form-source:${data.source}`);
  }

  return tags;
}

function buildSearchCriteria(data: LeadCaptureRequest): string | null {
  const criteria: string[] = [];

  if (data.propertyType) criteria.push(`Type: ${data.propertyType}`);
  if (data.priceMin || data.priceMax) {
    const min = data.priceMin ? `$${data.priceMin.toLocaleString()}` : 'Any';
    const max = data.priceMax ? `$${data.priceMax.toLocaleString()}` : 'Any';
    criteria.push(`Price: ${min} - ${max}`);
  }
  if (data.bedrooms) criteria.push(`Bedrooms: ${data.bedrooms}+`);
  if (data.bathrooms) criteria.push(`Bathrooms: ${data.bathrooms}+`);
  if (data.neighborhoods?.length) {
    criteria.push(`Areas: ${data.neighborhoods.join(', ')}`);
  }
  if (data.timeline) criteria.push(`Timeline: ${data.timeline}`);
  if (data.financing) criteria.push(`Financing: ${data.financing}`);
  if (data.preApproved) criteria.push('Pre-approved: yes');

  return criteria.length > 0 ? criteria.join('\n') : null;
}

function buildMessage(data: LeadCaptureRequest): string {
  const parts: string[] = [];

  if (data.message) {
    parts.push(sanitizeText(data.message));
  }

  const criteria = buildSearchCriteria(data);
  if (criteria) {
    parts.push(`Search criteria:\n${criteria}`);
  }

  if (data.stage) {
    parts.push(`Stage: ${data.stage}`);
  }

  return parts.join('\n\n').trim() || 'Website lead submission';
}

function buildDescription(data: LeadCaptureRequest, request: NextRequest): string {
  const formLabel = getFormLabel(data);
  const page =
    data.sourceUrl ||
    request.headers.get('referer') ||
    SITE_SOURCE;

  const attribution = getAttributionTags(request, data);
  const attributionNote =
    attribution.length > 0 ? ` | Attribution: ${attribution.join(', ')}` : '';

  return `${formLabel} | Page: ${page}${attributionNote}`;
}

function getSourceUrl(data: LeadCaptureRequest, request: NextRequest): string {
  return data.sourceUrl || request.headers.get('referer') || `https://${SITE_SOURCE}`;
}

async function sendFollowUpBossEvent(
  request: NextRequest,
  data: LeadCaptureRequest
): Promise<Response> {
  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY;

  if (!apiKey) {
    console.error(
      'FOLLOW_UP_BOSS_API_KEY is not configured — cannot send lead to Follow Up Boss'
    );
    return NextResponse.json(
      { error: 'Lead capture is temporarily unavailable' },
      { status: 503 }
    );
  }

  const { firstName, lastName } = parseName(data);
  const formLabel = getFormLabel(data);
  const attributionTags = getAttributionTags(request, data);

  const personTags = [
    SITE_SOURCE,
    formLabel,
    ...(data.tags || []),
    ...attributionTags,
    ...getPropertyTags(data),
  ].filter((tag, index, all) => Boolean(tag) && all.indexOf(tag) === index);

  const payload = {
    source: SITE_SOURCE,
    system: SITE_SOURCE,
    type: getFubEventType(data),
    message: buildMessage(data),
    description: buildDescription(data, request),
    sourceUrl: getSourceUrl(data, request),
    person: {
      firstName,
      lastName,
      emails: data.email ? [{ value: sanitizeText(data.email) }] : [],
      phones: data.phone ? [{ value: sanitizeText(data.phone) }] : [],
      tags: personTags,
    },
  };

  const headers: Record<string, string> = {
    Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
    'Content-Type': 'application/json',
    'X-System': SITE_SOURCE,
  };

  if (process.env.FUB_SYSTEM_KEY) {
    headers['X-System-Key'] = process.env.FUB_SYSTEM_KEY;
  }

  try {
    const fubResponse = await fetch(FUB_EVENTS_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!fubResponse.ok) {
      console.error(
        `[Lead Capture] Follow Up Boss events API error: HTTP ${fubResponse.status}`
      );
      return NextResponse.json(
        { error: 'Failed to send lead to CRM' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Lead Capture] Follow Up Boss request failed:', error);
    return NextResponse.json(
      { error: 'Failed to send lead to CRM' },
      { status: 502 }
    );
  }
}

function getPropertyTags(data: LeadCaptureRequest): string[] {
  const tags: string[] = [];

  if (data.neighborhoods) {
    tags.push(...data.neighborhoods);
  }

  if (data.priceMax) {
    if (data.priceMax > 1_000_000) tags.push('luxury');
    else if (data.priceMax < 300_000) tags.push('first-time-buyer');
  }

  if (data.propertyType) {
    tags.push(data.propertyType.toLowerCase());
  }

  if (data.preApproved) {
    tags.push('pre-approved');
  }

  if (data.timeline) {
    const lowerTimeline = data.timeline.toLowerCase();
    if (lowerTimeline.includes('immediately') || lowerTimeline.includes('asap')) {
      tags.push('urgent');
    }
  }

  return tags;
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadCaptureRequest = await request.json();

    const clientId = getClientId(request);
    const rateLimit = await checkRateLimit(leadFormLimiter, clientId);

    if (!rateLimit.success) {
      const resetDate = new Date(rateLimit.reset);
      const minutesUntilReset = Math.ceil((rateLimit.reset - Date.now()) / 60000);

      return NextResponse.json(
        {
          error: `Too many submissions. Please try again in ${minutesUntilReset} minute${minutesUntilReset > 1 ? 's' : ''}.`,
          retryAfter: resetDate.toISOString(),
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimit),
        }
      );
    }

    if (data.company?.trim() || data.website?.trim()) {
      return NextResponse.json(
        { success: true },
        { headers: getRateLimitHeaders(rateLimit) }
      );
    }

    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY) {
      if (!data.turnstileToken) {
        return NextResponse.json(
          { error: 'CAPTCHA verification required' },
          { status: 400 }
        );
      }

      const isValid = await verifyTurnstileToken(data.turnstileToken);
      if (!isValid) {
        return NextResponse.json(
          { error: 'CAPTCHA verification failed. Please try again.' },
          { status: 403 }
        );
      }
    }

    if (!data.email && !data.phone) {
      return NextResponse.json(
        { error: 'Email or phone is required' },
        { status: 400 }
      );
    }

    if (!data.firstName && !data.lastName && !data.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (data.email && !isValidEmail(data.email)) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    const fubResult = await sendFollowUpBossEvent(request, data);

    if (fubResult.status === 200) {
      return NextResponse.json(await fubResult.json(), {
        headers: getRateLimitHeaders(rateLimit),
      });
    }

    return fubResult;
  } catch (error) {
    console.error('[Lead Capture] Error:', error);

    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}
