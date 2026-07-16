/**
 * Unique midtown Las Vegas condo hero assets + SEO / GEO / AEO metadata.
 * Each key maps to one WebP under /public/images/hero/.
 * Homepage uses `homeStripDusk` (best hero).
 */

import { siteConfig, agentInfo, officeInfo } from "./site-config";

export type HeroImageMeta = {
  src: string;
  /** SEO alt — location + property type + context */
  alt: string;
  /** Short AEO/answer-engine caption */
  caption: string;
  /** GEO: what place this represents */
  geoName: string;
  geoLatitude: number;
  geoLongitude: number;
  width: number;
  height: number;
  /** Content keywords for schema / discoverability */
  keywords: string[];
};

function hero(
  file: string,
  alt: string,
  caption: string,
  geoName: string,
  lat: number,
  lng: number,
  keywords: string[],
  width = 1920,
  height = 1080
): HeroImageMeta {
  return {
    src: `/images/hero/${file}`,
    alt,
    caption,
    geoName,
    geoLatitude: lat,
    geoLongitude: lng,
    width,
    height,
    keywords,
  };
}

const LV = { lat: 36.1699, lng: -115.1398 };
const MIDTOWN = { lat: 36.1589, lng: -115.1534 };
const STRIP = { lat: 36.1126, lng: -115.1767 };

export const heroImages = {
  /** Homepage — best hero */
  homeStripDusk: hero(
    "home-strip-dusk.webp",
    "Las Vegas Strip skyline at twilight with Bellagio fountains and high-rise resorts — midtown condo living near the Strip",
    "Twilight view of the Las Vegas Strip skyline near midtown condo towers.",
    "Las Vegas Strip, Las Vegas, NV",
    STRIP.lat,
    STRIP.lng,
    ["Las Vegas Strip", "midtown condos", "high-rise", "twilight skyline"],
    1920,
    1143
  ),
  homeSkylineDay: hero(
    "home-skyline-day.webp",
    "Downtown Las Vegas skyline and City of Las Vegas gateway arch with midtown high-rise towers by day",
    "Daytime downtown Las Vegas skyline near midtown condo neighborhoods.",
    "Downtown Las Vegas, NV",
    LV.lat,
    LV.lng,
    ["downtown Las Vegas", "midtown skyline", "condo towers"]
  ),
  homeStripNight: hero(
    "home-strip-night.webp",
    "Las Vegas Strip illuminated at night with high-rise towers and urban condo skyline",
    "Night view of Las Vegas high-rises popular with midtown condo buyers.",
    "Las Vegas Strip, Las Vegas, NV",
    STRIP.lat,
    STRIP.lng,
    ["Las Vegas night skyline", "high-rise living"]
  ),
  buyersCondoTower: hero(
    "condo-balconies.webp",
    "Modern midtown Las Vegas condo tower with glass balconies for sale — Dr. Jan Duffy buyer representation",
    "A modern condo tower with balconies in midtown Las Vegas.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["buy midtown condo", "condo tower", "balconies"]
  ),
  buyersCaRelocator: hero(
    "desert-skyline.webp",
    "Las Vegas valley skyline for California relocators buying midtown condos with lower taxes and urban amenities",
    "Las Vegas valley view for California buyers relocating to midtown condos.",
    "Las Vegas Valley, NV",
    36.1699,
    -115.1398,
    ["California relocation", "Las Vegas condo move"]
  ),
  buyersFirstTime: hero(
    "bright-living.webp",
    "Bright midtown Las Vegas condo living room for first-time buyers — walkable urban lifestyle",
    "A bright condo living space suited to first-time midtown buyers.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["first-time condo buyers", "midtown living room"]
  ),
  buyersLuxury: hero(
    "penthouse.webp",
    "Luxury midtown Las Vegas condo living with designer interiors near Strip-view high-rises",
    "Luxury condo interior for high-end midtown Las Vegas buyers.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["luxury condos Las Vegas", "penthouse style"]
  ),
  sellersHighrise: hero(
    "tower-look-up.webp",
    "Looking up at midtown Las Vegas high-rise condo towers for sale — building-specific comps and HOA marketing",
    "High-rise condo towers marketed by midtown listing specialists.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["sell midtown condo", "high-rise listing"]
  ),
  sellersDownsizing: hero(
    "open-plan.webp",
    "Open-plan midtown Las Vegas condo ideal for downsizers seeking low-maintenance urban living",
    "Open-plan condo living for Las Vegas downsizers.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["downsizing condo", "low maintenance living"]
  ),
  sellersMoveUp: hero(
    "luxury-interior.webp",
    "Upgraded midtown Las Vegas condo interior for move-up sellers and trade-up buyers",
    "An upgraded condo interior for move-up Las Vegas sellers.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["move-up home", "condo upgrade"]
  ),
  sellersRelocation: hero(
    "map-planning.webp",
    "Relocation planning map for sellers leaving Las Vegas midtown condo markets",
    "Relocation planning for midtown Las Vegas condo sellers.",
    "Las Vegas, NV",
    LV.lat,
    LV.lng,
    ["condo relocation", "sell and move"]
  ),
  sellersDivorceProbate: hero(
    "handshake-deal.webp",
    "Professional real estate closing for divorce and probate midtown Las Vegas condo sales",
    "Professional guidance for divorce and probate condo sales.",
    "Las Vegas, NV",
    LV.lat,
    LV.lng,
    ["probate real estate", "divorce property sale"]
  ),
  neighborhoodsHub: hero(
    "home-skyline-day.webp",
    "Midtown Las Vegas condo neighborhoods skyline — Arts District, Fremont East, Symphony Park, One Las Vegas",
    "Skyline overview of midtown Las Vegas condo neighborhoods.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["midtown neighborhoods", "condo districts"],
    1920,
    1280
  ),
  artsDistrict: hero(
    "highrise-windows.webp",
    "Arts District Las Vegas loft and condo living near Gallery Row midtown",
    "Arts District midtown loft-style condo atmosphere.",
    "Arts District, Las Vegas, NV",
    36.1589,
    -115.1534,
    ["Arts District condos", "Gallery Row lofts"]
  ),
  fremontEast: hero(
    "wiki-fremont.webp",
    "Fremont East Entertainment District Las Vegas — boutique downtown condo corridor",
    "Fremont East downtown corridor for boutique condo living.",
    "Fremont East, Las Vegas, NV",
    36.1699,
    -115.1398,
    ["Fremont East condos", "downtown entertainment"],
    1920,
    1440
  ),
  symphonyPark: hero(
    "sky-terrace.webp",
    "Symphony Park midtown Las Vegas cultural district condo residences near the Smith Center",
    "Symphony Park urban district living near cultural venues.",
    "Symphony Park, Las Vegas, NV",
    36.1712,
    -115.1495,
    ["Symphony Park condos", "Smith Center"]
  ),
  oneLasVegas: hero(
    "unsplash-jlT.webp",
    "One Las Vegas luxury high-rise condo tower with Strip views and resort amenities",
    "Luxury high-rise condo living associated with One Las Vegas.",
    "One Las Vegas, Las Vegas, NV",
    36.1105,
    -115.172,
    ["One Las Vegas condos", "Strip view high-rise"],
    1920,
    1143
  ),
  englishResidences: hero(
    "apartment-row.webp",
    "The English Residences midtown Las Vegas boutique condo building exterior",
    "Boutique midtown condo building exterior.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["English Residences", "boutique condos"]
  ),
  juhl: hero(
    "extra01.webp",
    "Juhl downtown midtown Las Vegas condo tower urban lifestyle",
    "Urban condo lifestyle near Juhl downtown Las Vegas.",
    "Juhl, Las Vegas, NV",
    36.1676,
    -115.141,
    ["Juhl condos", "downtown high-rise"]
  ),
  palmsPlace: hero(
    "home-strip-night.webp",
    "Palms Place Strip-adjacent high-rise condo tower Las Vegas nightlife skyline",
    "Strip-adjacent condo skyline near Palms Place.",
    "Palms Place, Las Vegas, NV",
    36.1156,
    -115.186,
    ["Palms Place condos", "Strip adjacent"]
  ),
  midtownPlaza: hero(
    "extra06.webp",
    "Midtown Plaza Las Vegas condo residences in the walkable urban core",
    "Walkable midtown plaza condo environment.",
    "Midtown Plaza, Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["Midtown Plaza", "urban core condos"]
  ),
  listingsSearch: hero(
    "glass-facade.webp",
    "Glass high-rise condo facades for Midtown Las Vegas MLS condo search listings",
    "Contemporary glass condo facades in midtown Las Vegas.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["condo listings", "MLS search"]
  ),
  listingDetail: hero(
    "balcony-city.webp",
    "Midtown Las Vegas condo balcony city view for active MLS property detail pages",
    "City-view condo balcony representing midtown listings.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["property detail", "condo balcony view"]
  ),
  aboutAgent: hero(
    "agent-office.webp",
    "Professional real estate office of Dr. Jan Duffy — midtown Las Vegas condo specialist BHHS Nevada",
    "Professional real estate workspace for Dr. Jan Duffy.",
    officeInfo.address.city + ", NV",
    officeInfo.coordinates.lat,
    officeInfo.coordinates.lng,
    ["Dr Jan Duffy", "BHHS Nevada Properties"]
  ),
  contactOffice: hero(
    "extra07.webp",
    "Contact Dr. Jan Duffy midtown Las Vegas condo specialist at Berkshire Hathaway HomeServices Nevada Properties",
    "Reach Dr. Jan Duffy for midtown Las Vegas condo help.",
    officeInfo.address.full,
    officeInfo.coordinates.lat,
    officeInfo.coordinates.lng,
    ["contact realtor", "Las Vegas condo agent"]
  ),
  faqLoft: hero(
    "extra08.webp",
    "Midtown Las Vegas condo FAQ — HOA fees, rental rules, and high-rise living questions answered",
    "FAQ visual for midtown Las Vegas condo buyers and sellers.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["condo FAQ", "HOA questions"]
  ),
  servicesHub: hero(
    "extra09.webp",
    "Full-service midtown Las Vegas condo real estate services from BHHS Nevada Properties",
    "Comprehensive condo real estate services in midtown Las Vegas.",
    "Las Vegas, NV",
    LV.lat,
    LV.lng,
    ["real estate services", "condo specialist"]
  ),
  relocationHub: hero(
    "extra10.webp",
    "Relocation to midtown Las Vegas condos — experts guiding out-of-state and California movers",
    "Relocation support for buyers moving to midtown Las Vegas.",
    "Las Vegas, NV",
    LV.lat,
    LV.lng,
    ["Las Vegas relocation", "out of state buyers"]
  ),
  luxuryHomes: hero(
    "pool-amenity.webp",
    "Luxury midtown and Strip-adjacent Las Vegas condo resort-style amenities and high-rise living",
    "Resort-style amenities for luxury Las Vegas condo living.",
    "Las Vegas, NV",
    STRIP.lat,
    STRIP.lng,
    ["luxury condo amenities", "resort living"]
  ),
  investmentProperties: hero(
    "extra11.webp",
    "Midtown Las Vegas condo investment properties — rental yields, STR rules, and HOA reserves",
    "Investment-focused midtown Las Vegas condo opportunities.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["condo investing", "rental property Las Vegas"]
  ),
  homeValuation: hero(
    "extra12.webp",
    "Free midtown Las Vegas condo valuation — comparable sales and price-per-square-foot analysis",
    "Condo valuation based on midtown Las Vegas comps.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["condo valuation", "home value estimate"]
  ),
  newConstruction: hero(
    "new-construction.webp",
    "New construction midtown Las Vegas condominiums and contemporary residential architecture",
    "New-construction condo architecture in Las Vegas.",
    "Las Vegas, NV",
    LV.lat,
    LV.lng,
    ["new construction condos", "modern builds"]
  ),
  marketReport: hero(
    "night-city.webp",
    "Midtown Las Vegas condo market report — median prices, days on market, and inventory trends",
    "Market report skyline for midtown Las Vegas condos.",
    "Las Vegas, NV",
    LV.lat,
    LV.lng,
    ["condo market report", "Las Vegas housing data"]
  ),
  marketInsights: hero(
    "night-neon.webp",
    "Las Vegas condo market insights and urban high-rise pricing trends for midtown buyers",
    "Market insights for urban Las Vegas condo buyers.",
    "Las Vegas, NV",
    LV.lat,
    LV.lng,
    ["market insights", "condo pricing trends"]
  ),
  marketUpdate: hero(
    "extra14.webp",
    "Latest midtown Las Vegas condo market update with neighborhood-level pricing data",
    "Current market update for midtown Las Vegas condos.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["market update", "condo inventory"]
  ),
  whyBhhs: hero(
    "extra17.webp",
    "Why Berkshire Hathaway HomeServices — trusted brokerage behind Dr. Jan Duffy midtown condo practice",
    "Berkshire Hathaway HomeServices brand trust for condo clients.",
    "Las Vegas, NV",
    officeInfo.coordinates.lat,
    officeInfo.coordinates.lng,
    ["Berkshire Hathaway HomeServices", "trusted brokerage"]
  ),
  googleBusiness: hero(
    "extra18.webp",
    "Google Business Profile for Dr. Jan Duffy midtown Las Vegas condo specialist — NAP matching GBP",
    "Local Google Business Profile visibility for midtown condo clients.",
    officeInfo.address.full,
    officeInfo.coordinates.lat,
    officeInfo.coordinates.lng,
    ["Google Business Profile", "local SEO realtor"]
  ),
  fiftyFivePlus: hero(
    "active-adult.webp",
    "55+ active adult communities near Las Vegas — Sun City, Del Webb, and maintenance-free condo options",
    "Active adult living options near Las Vegas condo markets.",
    "Las Vegas, NV",
    36.0411,
    -115.165,
    ["55+ communities", "active adult living"]
  ),
  fiftyFiveSunCitySummerlin: hero(
    "golf-community.webp",
    "Sun City Summerlin 55+ community Las Vegas — golf lifestyle and maintenance-free living",
    "Sun City Summerlin active adult community lifestyle.",
    "Sun City Summerlin, Las Vegas, NV",
    36.204,
    -115.295,
    ["Sun City Summerlin", "55+ golf community"]
  ),
  fiftyFiveTrilogy: hero(
    "extra21.webp",
    "Trilogy Summerlin 55+ homes and villas in Las Vegas western valley",
    "Trilogy at Summerlin active adult residences.",
    "Trilogy Summerlin, Las Vegas, NV",
    36.21,
    -115.32,
    ["Trilogy Summerlin", "55+ villas"]
  ),
  fiftyFiveSolera: hero(
    "extra23.webp",
    "Solera at Anthem 55+ community Henderson Nevada near Las Vegas midtown buyers downsizing",
    "Solera Anthem active adult community in Henderson.",
    "Solera at Anthem, Henderson, NV",
    35.966,
    -115.09,
    ["Solera Anthem", "Henderson 55+"]
  ),
  fiftyFiveSunCityAnthem: hero(
    "extra24.webp",
    "Sun City Anthem Henderson 55+ community with resort amenities near Las Vegas",
    "Sun City Anthem Henderson active adult living.",
    "Sun City Anthem, Henderson, NV",
    35.96,
    -115.08,
    ["Sun City Anthem", "Henderson 55+"]
  ),
  fiftyFiveSunCityAliante: hero(
    "extra26.webp",
    "Sun City Aliante North Las Vegas 55+ community for active adult homebuyers",
    "Sun City Aliante active adult community.",
    "Sun City Aliante, North Las Vegas, NV",
    36.319,
    -115.192,
    ["Sun City Aliante", "North Las Vegas 55+"]
  ),
  fiftyFiveDelWebb: hero(
    "extra27.webp",
    "Del Webb Lake Las Vegas 55+ community Henderson waterfront lifestyle",
    "Del Webb at Lake Las Vegas active adult residences.",
    "Lake Las Vegas, Henderson, NV",
    36.12,
    -114.92,
    ["Del Webb Lake Las Vegas", "55+ waterfront"]
  ),
  fiftyFiveHeritage: hero(
    "extra28.webp",
    "Heritage at Stonebridge Las Vegas 55+ community new construction active adult homes",
    "Heritage Stonebridge 55+ community homes.",
    "Heritage at Stonebridge, Las Vegas, NV",
    36.25,
    -115.28,
    ["Heritage Stonebridge", "55+ new construction"]
  ),
  nbSummerlin: hero(
    "modern-home-front.webp",
    "Summerlin Las Vegas master-planned community homes near midtown condo alternatives",
    "Summerlin residential lifestyle west of midtown Las Vegas.",
    "Summerlin, Las Vegas, NV",
    36.1467,
    -115.332,
    ["Summerlin homes", "master planned"]
  ),
  nbHenderson: hero(
    "extra29.webp",
    "Henderson Nevada homes and condo alternatives for midtown Las Vegas buyers comparing markets",
    "Henderson residential market near Las Vegas.",
    "Henderson, NV",
    36.0395,
    -114.9817,
    ["Henderson real estate", "Las Vegas suburb"]
  ),
  nbGreenValley: hero(
    "condo-lobby.webp",
    "Green Valley Henderson condo and townhome living near midtown Las Vegas",
    "Green Valley residential living in Henderson.",
    "Green Valley, Henderson, NV",
    36.027,
    -115.08,
    ["Green Valley homes", "Henderson condos"]
  ),
  nbRidges: hero(
    "unsplash-yFD.webp",
    "The Ridges Summerlin luxury homes — premium alternative to midtown high-rise condos",
    "The Ridges luxury residential enclave in Summerlin.",
    "The Ridges, Summerlin, Las Vegas, NV",
    36.126,
    -115.35,
    ["The Ridges Summerlin", "luxury homes"]
  ),
  nbSouthernHighlands: hero(
    "modern-bath.webp",
    "Southern Highlands Las Vegas golf community homes southwest of midtown",
    "Southern Highlands golf community residences.",
    "Southern Highlands, Las Vegas, NV",
    35.995,
    -115.21,
    ["Southern Highlands", "golf community"]
  ),
  nbNorthLasVegas: hero(
    "extra30.webp",
    "North Las Vegas homes and emerging condo inventory north of midtown Las Vegas",
    "North Las Vegas residential growth market.",
    "North Las Vegas, NV",
    36.1989,
    -115.1175,
    ["North Las Vegas real estate"]
  ),
  nbSkyeCanyon: hero(
    "unsplash-FNZ.webp",
    "Skye Canyon northwest Las Vegas master-planned community homes",
    "Skye Canyon master-planned community.",
    "Skye Canyon, Las Vegas, NV",
    36.32,
    -115.3,
    ["Skye Canyon homes"]
  ),
  nbCentennialHills: hero(
    "unsplash-NY8.webp",
    "Centennial Hills northwest Las Vegas family homes near Red Rock views",
    "Centennial Hills residential neighborhood.",
    "Centennial Hills, Las Vegas, NV",
    36.29,
    -115.28,
    ["Centennial Hills homes"]
  ),
  nbInspirada: hero(
    "unsplash-QAg.webp",
    "Inspirada Henderson walkable village homes south of Las Vegas midtown",
    "Inspirada walkable village in Henderson.",
    "Inspirada, Henderson, NV",
    35.93,
    -115.15,
    ["Inspirada Henderson"]
  ),
  nbMountainsEdge: hero(
    "unsplash-Rz5.webp",
    "Mountain's Edge southwest Las Vegas community homes",
    "Mountain's Edge southwest Las Vegas residences.",
    "Mountain's Edge, Las Vegas, NV",
    36.0,
    -115.26,
    ["Mountains Edge homes"]
  ),
  featuredStripView: hero(
    "unsplash-eOp.webp",
    "Strip-view midtown Las Vegas high-rise condo listing featured property",
    "Featured Strip-view condo listing imagery.",
    "Midtown Las Vegas, NV",
    MIDTOWN.lat,
    MIDTOWN.lng,
    ["featured condo", "Strip view"]
  ),
  featuredArtsLoft: hero(
    "city-avenue.webp",
    "Arts District urban loft condo featured listing midtown Las Vegas",
    "Featured Arts District loft-style condo imagery.",
    "Arts District, Las Vegas, NV",
    36.1589,
    -115.1534,
    ["featured loft", "Arts District listing"]
  ),
  featuredSymphony: hero(
    "extra02.webp",
    "Symphony Park mid-rise condo featured listing downtown Las Vegas",
    "Featured Symphony Park mid-rise condo imagery.",
    "Symphony Park, Las Vegas, NV",
    36.1712,
    -115.1495,
    ["featured midrise", "Symphony Park"]
  ),
} as const;

export type HeroImageKey = keyof typeof heroImages;

/** One unique hero key per route path */
export const pageHeroByPath: Record<string, HeroImageKey> = {
  "/": "homeStripDusk",
  "/buyers": "buyersCondoTower",
  "/buyers/california-relocator": "buyersCaRelocator",
  "/buyers/first-time-buyers": "buyersFirstTime",
  "/buyers/luxury-homes-las-vegas": "buyersLuxury",
  "/sellers": "sellersHighrise",
  "/sellers/downsizing": "sellersDownsizing",
  "/sellers/move-up": "sellersMoveUp",
  "/sellers/relocation": "sellersRelocation",
  "/sellers/divorce-probate": "sellersDivorceProbate",
  "/neighborhoods": "neighborhoodsHub",
  "/listings": "listingsSearch",
  "/about": "aboutAgent",
  "/contact": "contactOffice",
  "/faq": "faqLoft",
  "/services": "servicesHub",
  "/relocation": "relocationHub",
  "/luxury-homes": "luxuryHomes",
  "/investment-properties": "investmentProperties",
  "/home-valuation": "homeValuation",
  "/new-construction": "newConstruction",
  "/market-report": "marketReport",
  "/market-insights": "marketInsights",
  "/market-update": "marketUpdate",
  "/why-berkshire-hathaway": "whyBhhs",
  "/google-business": "googleBusiness",
  "/blog": "homeSkylineDay",
  "/midtown-real-estate": "homeStripNight",
  "/neighborhood": "juhl",
  "/neighborhood/run-club": "featuredArtsLoft",
  "/neighborhood/ev-program": "featuredSymphony",
  "/neighborhood/pepper-club": "featuredStripView",
  "/55-plus-communities": "fiftyFivePlus",
  "/55-plus-communities/sun-city-summerlin": "fiftyFiveSunCitySummerlin",
  "/55-plus-communities/trilogy-summerlin": "fiftyFiveTrilogy",
  "/55-plus-communities/solera-anthem": "fiftyFiveSolera",
  "/55-plus-communities/sun-city-anthem": "fiftyFiveSunCityAnthem",
  "/55-plus-communities/sun-city-aliante": "fiftyFiveSunCityAliante",
  "/55-plus-communities/del-webb-lake-las-vegas": "fiftyFiveDelWebb",
  "/55-plus-communities/heritage-stonebridge": "fiftyFiveHeritage",
  "/neighborhoods/summerlin": "nbSummerlin",
  "/neighborhoods/henderson": "nbHenderson",
  "/neighborhoods/green-valley": "nbGreenValley",
  "/neighborhoods/the-ridges": "nbRidges",
  "/neighborhoods/southern-highlands": "nbSouthernHighlands",
  "/neighborhoods/north-las-vegas": "nbNorthLasVegas",
  "/neighborhoods/skye-canyon": "nbSkyeCanyon",
  "/neighborhoods/centennial-hills": "nbCentennialHills",
  "/neighborhoods/inspirada": "nbInspirada",
  "/neighborhoods/mountains-edge": "nbMountainsEdge",
};

export const neighborhoodHeroBySlug: Record<string, HeroImageKey> = {
  "arts-district": "artsDistrict",
  "fremont-east": "fremontEast",
  "symphony-park": "symphonyPark",
  "one-las-vegas": "oneLasVegas",
  "the-english-residences": "englishResidences",
  juhl: "juhl",
  "palms-place": "palmsPlace",
  "midtown-plaza": "midtownPlaza",
};

export function getHeroImage(key: HeroImageKey = "homeStripDusk"): HeroImageMeta {
  return heroImages[key];
}

export function getHeroKeyForPath(pathname: string): HeroImageKey {
  return pageHeroByPath[pathname] ?? "homeSkylineDay";
}

/**
 * ImageObject + Place schema for SEO, GEO, and answer-engine (AEO) citations.
 */
export function generateHeroImageSchema(
  key: HeroImageKey,
  pageUrl: string,
  pageName: string
): Record<string, unknown> {
  const img = getHeroImage(key);
  const absoluteUrl = img.src.startsWith("http")
    ? img.src
    : `${siteConfig.url}${img.src}`;

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${pageUrl}#hero-image`,
    contentUrl: absoluteUrl,
    url: absoluteUrl,
    name: pageName,
    description: img.alt,
    caption: img.caption,
    keywords: img.keywords.join(", "),
    width: img.width,
    height: img.height,
    encodingFormat: "image/webp",
    representativeOfPage: true,
    creditText: `${agentInfo.name}, ${agentInfo.brokerage}`,
    copyrightNotice: `© ${new Date().getFullYear()} ${siteConfig.fullName}`,
    creator: {
      "@type": "RealEstateAgent",
      name: agentInfo.name,
      url: siteConfig.url,
      telephone: agentInfo.phoneTel.replace("tel:", ""),
    },
    contentLocation: {
      "@type": "Place",
      name: img.geoName,
      geo: {
        "@type": "GeoCoordinates",
        latitude: img.geoLatitude,
        longitude: img.geoLongitude,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        addressCountry: "US",
      },
    },
    about: {
      "@type": "RealEstateAgent",
      "@id": `${siteConfig.url}#organization`,
      name: `${agentInfo.name} - ${siteConfig.name}`,
    },
  };
}
