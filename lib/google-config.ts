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
 * Place ID / CID come from a verified GBP read for this listing only.
 */
export function getOfficeGoogleMapsLinks() {
  const query = officeQuery(true);
  const addressOnly = officeInfo.address.full;
  const { lat, lng } = officeInfo.coordinates;
  const { placeId, cid } = officeInfo.googlePlace;

  return {
    /** iframe embed — Maps CID for this GBP listing */
    embed: `https://www.google.com/maps?cid=${cid}&output=embed`,
    /** Open the Google Maps listing */
    place: `https://maps.google.com/maps?cid=${cid}`,
    /** Driving directions to the office */
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressOnly)}`,
    /** Google reviews for this Place ID */
    reviews: `https://search.google.com/local/reviews?placeid=${placeId}`,
    /** Coordinates pin (fallback) */
    coordinatesEmbed: `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`,
    query,
    address: addressOnly,
    coordinates: { lat, lng },
    placeId,
    cid,
  };
}

export const officeGoogleMaps = getOfficeGoogleMapsLinks();
