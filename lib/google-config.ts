/**
 * Google Cloud / Maps helpers for midtownvegascondos.com
 * OAuth client ID is public (browser-safe). Do not store client secrets here.
 * Maps & review links always use the GBP office address from officeInfo.
 */

import { officeInfo, siteConfig } from "@/lib/site-config";

/** Google OAuth 2.0 Web Client ID (Google Cloud Console → Credentials) */
export const GOOGLE_OAUTH_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID?.trim() ||
  "584887863848-6iaq27hfjgoi7b32huhhmtjs46u36f4o.apps.googleusercontent.com";

/** Project number prefix from the OAuth client ID */
export const GOOGLE_CLOUD_PROJECT_NUMBER = "584887863848";

/** Authorized JavaScript origins for this OAuth client (configure in GCP) */
export const GOOGLE_OAUTH_AUTHORIZED_ORIGINS = [
  siteConfig.url,
  "https://midtownvegascondos.com",
  "http://localhost:3000",
] as const;

function officeQuery(includeName = true): string {
  return includeName
    ? `${officeInfo.name}, ${officeInfo.address.full}`
    : officeInfo.address.full;
}

/**
 * Build map / place / directions / reviews URLs pinned to the GBP office.
 */
export function getOfficeGoogleMapsLinks() {
  const query = officeQuery(true);
  const addressOnly = officeInfo.address.full;
  const { lat, lng } = officeInfo.coordinates;

  return {
    /** iframe embed — business name + office street address */
    embed: `https://www.google.com/maps?q=${encodeURIComponent(query)}&ll=${lat},${lng}&z=16&output=embed`,
    /** Open in Google Maps */
    place: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    /** Driving directions to the office */
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressOnly)}`,
    /** Reviews / GBP listing search at the office address */
    reviews: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    /** Coordinates pin (fallback) */
    coordinatesEmbed: `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`,
    query,
    address: addressOnly,
    coordinates: { lat, lng },
  };
}

export const officeGoogleMaps = getOfficeGoogleMapsLinks();
