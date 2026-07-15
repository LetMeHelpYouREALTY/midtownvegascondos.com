/**
 * Curated midtown Las Vegas / urban condo hero assets.
 * All files live under /public/images/hero/ (optimized WebP).
 */

export const heroImages = {
  midtownSkyline: {
    src: "/images/hero/midtown-skyline.webp",
    alt: "Midtown Las Vegas skyline with downtown towers and the City of Las Vegas gateway arch",
  },
  stripTwilight: {
    src: "/images/hero/strip-twilight.webp",
    alt: "Las Vegas Strip skyline at twilight with high-rise resorts and the Bellagio fountains",
  },
  stripNight: {
    src: "/images/hero/strip-night.webp",
    alt: "Las Vegas Strip skyline illuminated at night with high-rise towers",
  },
  condoTower: {
    src: "/images/hero/condo-tower.webp",
    alt: "Modern midtown condo tower with balconies against a clear sky",
  },
  highriseTowers: {
    src: "/images/hero/highrise-towers.webp",
    alt: "Looking up at modern high-rise condo and office towers",
  },
  urbanCondo: {
    src: "/images/hero/urban-condo.webp",
    alt: "Contemporary urban condominium building with glass balconies",
  },
  urbanLoft: {
    src: "/images/hero/urban-loft.webp",
    alt: "Bright urban loft living space with open floor plan",
  },
  condoInterior: {
    src: "/images/hero/condo-interior.webp",
    alt: "Modern condo living room with natural light",
  },
} as const;

export type HeroImageKey = keyof typeof heroImages;

/** Route → hero image mapping for consistent page visuals */
export const pageHeroByPath: Record<string, HeroImageKey> = {
  "/": "midtownSkyline",
  "/buyers": "condoTower",
  "/buyers/california-relocator": "stripTwilight",
  "/buyers/first-time-buyers": "urbanLoft",
  "/buyers/luxury-homes-las-vegas": "stripTwilight",
  "/sellers": "highriseTowers",
  "/sellers/downsizing": "condoInterior",
  "/sellers/move-up": "condoTower",
  "/sellers/relocation": "midtownSkyline",
  "/sellers/divorce-probate": "urbanCondo",
  "/neighborhoods": "midtownSkyline",
  "/listings": "condoTower",
  "/about": "midtownSkyline",
  "/contact": "midtownSkyline",
  "/faq": "urbanLoft",
  "/services": "highriseTowers",
  "/relocation": "stripTwilight",
  "/luxury-homes": "stripTwilight",
  "/investment-properties": "highriseTowers",
  "/home-valuation": "condoInterior",
  "/new-construction": "urbanCondo",
  "/market-report": "stripNight",
  "/market-insights": "stripNight",
  "/market-update": "stripNight",
  "/why-berkshire-hathaway": "midtownSkyline",
  "/google-business": "midtownSkyline",
  "/55-plus-communities": "condoInterior",
};

/** Midtown neighborhood slug → hero */
export const neighborhoodHeroBySlug: Record<string, HeroImageKey> = {
  "arts-district": "urbanLoft",
  "fremont-east": "midtownSkyline",
  "symphony-park": "urbanCondo",
  "one-las-vegas": "stripTwilight",
  "the-english-residences": "condoTower",
  juhl: "urbanCondo",
  "palms-place": "stripNight",
  "midtown-plaza": "condoTower",
};

export function getHeroImage(key: HeroImageKey = "midtownSkyline") {
  return heroImages[key];
}
