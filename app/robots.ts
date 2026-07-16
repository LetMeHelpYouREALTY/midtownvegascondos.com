import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Single source of truth for /robots.txt (do not also keep public/robots.txt).
 * GSC 2026: allow Googlebot to fetch /_next/static for rendering; never Disallow: /
 */
export default function robots(): MetadataRoute.Robots {
  const disallowInternal = ["/api/", "/admin/", "/monitoring/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowInternal,
      },
      // Image SEO
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/images/", "/_next/image"],
      },
      // AEO / AI Overviews — allow citation crawlers
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // Slow aggressive SEO scrapers (not Google)
      {
        userAgent: "AhrefsBot",
        allow: "/",
        disallow: disallowInternal,
        crawlDelay: 10,
      },
      {
        userAgent: "SemrushBot",
        allow: "/",
        disallow: disallowInternal,
        crawlDelay: 10,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
