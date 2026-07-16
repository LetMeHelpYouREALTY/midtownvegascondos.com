/**
 * Google Search Console / Bing Webmaster readiness helpers.
 * Set GOOGLE_SITE_VERIFICATION (and optional BING_SITE_VERIFICATION) in Vercel.
 */

import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/** Meta-tag token from GSC → Settings → Ownership verification → HTML tag */
export function getGoogleSiteVerification(): string | undefined {
  const token =
    process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  return token || undefined;
}

/** Bing Webmaster Tools meta tag content */
export function getBingSiteVerification(): string | undefined {
  const token =
    process.env.BING_SITE_VERIFICATION?.trim() ||
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();
  return token || undefined;
}

/** Next.js Metadata.verification for Search Console ownership */
export function getSearchConsoleVerification(): Metadata["verification"] {
  const google = getGoogleSiteVerification();
  const bing = getBingSiteVerification();
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

export const searchConsoleConfig = {
  canonicalHost: siteConfig.url,
  sitemapUrl: `${siteConfig.url}/sitemap.xml`,
  robotsUrl: `${siteConfig.url}/robots.txt`,
  /** Submit this URL in GSC → Sitemaps after ownership is verified */
  submitSitemapPath: "sitemap.xml",
} as const;
