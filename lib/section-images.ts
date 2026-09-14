/**
 * H2 / H3 section photography — unique assets matched to heading copy.
 * Stored in git under /public/images/sections (backup) and Cloudflare R2 (primary when enabled).
 */

import { getCdnImageSrc } from "./cloudflare-assets";

export type SectionImageMeta = {
  src: string;
  alt: string;
  caption: string;
  heading: string;
  width: number;
  height: number;
};

function section(
  file: string,
  heading: string,
  alt: string,
  caption: string,
): SectionImageMeta {
  return {
    src: getCdnImageSrc(`/images/sections/${file}`),
    heading,
    alt,
    caption,
    width: 1920,
    height: 1080,
  };
}

export const sectionImages = {
  searchMidtown: section(
    "search-midtown-condos.webp",
    "Search Midtown Vegas Condos",
    "Laptop on a midtown Las Vegas condo island used to search live Arts District and downtown listings",
    "Search live MLS condo inventory with Dr. Jan Duffy.",
  ),
  whyJan: section(
    "why-choose-jan.webp",
    "Why Work With Dr. Jan Duffy?",
    "Las Vegas valley map and condo notes on a desk for Arts District and downtown buyer matching",
    "Building-level condo matching for Downtown and Arts District buyers.",
  ),
  hoaReview: section(
    "hoa-review.webp",
    "HOA Expertise",
    "HOA documents and floor plans on a desk with a downtown Las Vegas high-rise outside the window",
    "CC&R review and reserve-study checks before you write an offer.",
  ),
  marketStats: section(
    "market-stats-skyline.webp",
    "Midtown Las Vegas Condo Market",
    "Daytime downtown Las Vegas condo skyline used for midtown market snapshot photography",
    "Current midtown condo pricing and days-on-market context.",
  ),
  neighborhoods: section(
    "arts-district-galleries.webp",
    "Midtown Las Vegas Condo Neighborhoods",
    "Las Vegas Arts District gallery street with brick buildings and murals near downtown condos",
    "Arts District, Fremont East, Symphony Park, and midtown high-rises.",
  ),
  reviews: section(
    "client-reviews.webp",
    "What Our Clients Say",
    "Bright Las Vegas real estate conference room with city-view windows representing client reviews",
    "Read Google reviews for Las Vegas Arts District Condos | Homes by Dr. Jan Duffy.",
  ),
} as const;

export type SectionImageKey = keyof typeof sectionImages;

export function getSectionImage(key: SectionImageKey): SectionImageMeta {
  return sectionImages[key];
}
