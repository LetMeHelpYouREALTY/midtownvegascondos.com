/**
 * H2 / H3 section photography — unique assets matched to heading copy.
 * Stored in git under /public/images (backup) and Cloudflare R2 (primary when enabled).
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

/** Reuse a unique hero WebP as a heading-matched section photo (git backup path). */
function fromHero(
  file: string,
  heading: string,
  alt: string,
  caption: string,
): SectionImageMeta {
  return {
    src: getCdnImageSrc(`/images/hero/${file}`),
    heading,
    alt,
    caption,
    width: 1920,
    height: 1080,
  };
}

export const sectionImages = {
  searchMidtown: fromHero(
    "juhl-downtown-condo-tower.webp",
    "Search Midtown Vegas Condos",
    "Juhl downtown Las Vegas condo tower representing live midtown condo search photography",
    "Search live MLS condo inventory with Dr. Jan Duffy.",
  ),
  whyJan: fromHero(
    "gbp-arts-district-office.webp",
    "Why Work With Dr. Jan Duffy?",
    "Arts District Las Vegas office street representing Dr. Jan Duffy buyer matching from 921 South Main Street",
    "Building-level condo matching for Downtown and Arts District buyers.",
  ),
  hoaReview: fromHero(
    "services-condo-consultation.webp",
    "HOA Expertise",
    "Condo floor plans and keys on a desk with the Las Vegas Stratosphere outside the window",
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
  aboutBio: fromHero(
    "gbp-arts-district-office.webp",
    "Dr. Jan Duffy",
    "Arts District Las Vegas office where Dr. Jan Duffy meets Arts District and downtown buyers",
    "Meet Dr. Jan Duffy, midtown condo specialist at BHHS Nevada Properties.",
  ),
  aboutSpecializations: fromHero(
    "gbp-arts-district-office.webp",
    "Areas of Specialization",
    "Arts District Las Vegas office representing Dr. Jan Duffy specializations",
    "Midtown condos, luxury, 55+ communities, and California relocation.",
  ),
  buyersAgent: fromHero(
    "juhl-downtown-condo-tower.webp",
    "Why You Need a Buyer's Agent",
    "Downtown Las Vegas condo tower representing buyer-agent representation for midtown purchases",
    "Seller-paid representation for midtown Las Vegas condo buyers.",
  ),
  buyersProcess: fromHero(
    "juhl-downtown-condo-tower.webp",
    "The Midtown Condo Buying Process",
    "Downtown Las Vegas condo tower used to illustrate the high-rise buying process",
    "Pre-approval, building comparison, HOA review, and closing.",
  ),
  caNumbers: fromHero(
    "relocation-vegas-skyline.webp",
    "California vs. Nevada: The Numbers",
    "Las Vegas valley skyline for California relocators comparing Nevada tax and housing costs",
    "California equity often buys more square footage in Las Vegas.",
  ),
  firstTimeFinancing: fromHero(
    "faq-midtown-loft-interior.webp",
    "First-Time Buyer Financing Options",
    "Open-plan midtown Las Vegas loft living room for first-time buyers reviewing FHA and VA financing",
    "FHA, VA, conventional, and Nevada down-payment programs.",
  ),
  luxuryMarket: fromHero(
    "one-las-vegas-highrise.webp",
    "Las Vegas Luxury Market Performance",
    "One Las Vegas high-rise used for high-end market performance photography",
    "Strip-view high-rises and gated-community alternatives.",
  ),
  sellersAdvantage: fromHero(
    "tower-look-up.webp",
    "The Berkshire Hathaway HomeServices Selling Advantage",
    "Looking up at midtown Las Vegas high-rise condo towers marketed by BHHS listing specialists",
    "Building-specific comps and global BHHS buyer reach.",
  ),
  sellersDownsizing: fromHero(
    "faq-midtown-loft-interior.webp",
    "Extract Your Equity, Enjoy Your Life",
    "Low-maintenance midtown Las Vegas loft interior for condo sellers extracting equity and downsizing",
    "Low-maintenance 55+ and midtown condo options after a sale.",
  ),
  sellersMoveUp: fromHero(
    "juhl-downtown-condo-tower.webp",
    "Your Equity Position is Stronger Than You Think",
    "Downtown Las Vegas condo tower for move-up sellers using condo equity",
    "Trade up with a midtown sale and a targeted next purchase.",
  ),
  sellersRelocation: fromHero(
    "relocation-vegas-skyline.webp",
    "Berkshire Hathaway HomeServices Network",
    "Las Vegas valley skyline for sellers relocating through the BHHS global referral network",
    "List locally and land with a BHHS agent in the next city.",
  ),
  sellersSensitive: fromHero(
    "services-condo-consultation.webp",
    "Situations We Help Navigate",
    "Condo consultation desk with Las Vegas Stratosphere view for divorce and probate midtown sales",
    "Discreet guidance for divorce, probate, and court-supervised sales.",
  ),
  contactTouch: fromHero(
    "gbp-arts-district-office.webp",
    "Get In Touch",
    "Arts District Las Vegas office street for contacting Dr. Jan Duffy at 921 South Main Street",
    "Call, get directions, or book a condo showing from the Arts District office.",
  ),
  gbpNap: fromHero(
    "contact-arts-district-main-street.webp",
    "Las Vegas Arts District Condos | Homes by Dr. Jan Duffy",
    "921 South Main Street Arts District Las Vegas storefront matching the Google Business Profile NAP",
    "Same name, address, and phone as Google Maps and reviews.",
  ),
  gbpHours: fromHero(
    "gbp-arts-district-office.webp",
    "Business Hours",
    "Arts District Las Vegas office matching published Google Business Profile hours",
    "Sunday–Thursday 9:00 AM–5:00 PM. Friday–Saturday closed. Appointment required.",
  ),
  faqCategories: fromHero(
    "faq-midtown-loft-interior.webp",
    "Midtown Condo FAQs",
    "Midtown Las Vegas loft interior illustrating HOA, financing, and high-rise living FAQ topics",
    "HOA fees, rental rules, parking, and building questions answered.",
  ),
  servicesCore: fromHero(
    "services-condo-consultation.webp",
    "Core Real Estate Services",
    "Condo consultation desk for buy, sell, and HOA-review services in midtown Las Vegas",
    "Buyer representation, listings, valuations, and relocation.",
  ),
  relocationWhy: fromHero(
    "relocation-vegas-skyline.webp",
    "Why People Are Moving to Las Vegas",
    "Las Vegas valley skyline for buyers moving to midtown condos from out of state",
    "No state income tax, urban amenities, and midtown condo inventory.",
  ),
  luxuryStats: fromHero(
    "one-las-vegas-highrise.webp",
    "Las Vegas Luxury Market Statistics | January 2026",
    "One Las Vegas high-rise used for $1M+ market statistics photography",
    "Amenity-driven pricing for $1M+ Las Vegas homes and condos.",
  ),
  investWhy: fromHero(
    "investment-downtown-condos.webp",
    "Why Invest in Las Vegas?",
    "Downtown Las Vegas condo towers representing rental and 1031 investment inventory",
    "Review HOA rental caps, reserves, and STR rules before you buy.",
  ),
  valuationSchedule: fromHero(
    "home-valuation-keys.webp",
    "Schedule Your Free Valuation",
    "House keys on a listing folder for a free midtown Las Vegas condo valuation appointment",
    "Building-level comps beat automated estimates on high-rises.",
  ),
  newConstructionAgent: fromHero(
    "heritage-stonebridge-new.webp",
    "Why Use a BHHS Agent for New Construction?",
    "Heritage at Stonebridge new-construction homes representing buyer-agent representation with Las Vegas builders",
    "Free buyer representation on most new-construction contracts.",
  ),
  marketForces: fromHero(
    "home-strip-dusk.webp",
    "5 Forces Driving Las Vegas Real Estate in 2026",
    "Las Vegas Strip dusk skyline used for 2026 real estate market-insight photography",
    "Inventory, rates, relocation, and downtown condo demand.",
  ),
  marketSnapshot: fromHero(
    "home-skyline-day.webp",
    "Midtown Condo Market Snapshot",
    "City of Las Vegas gateway arch and downtown towers for the midtown condo market snapshot",
    "Median price, days on market, and active condo inventory.",
  ),
  marketWeek: fromHero(
    "home-skyline-day.webp",
    "5 Key Statistics This Week",
    "Downtown Las Vegas gateway arch for this week's midtown condo market statistics",
    "Weekly pricing and inventory context for Arts District buyers.",
  ),
  whyBuffett: fromHero(
    "gbp-arts-district-office.webp",
    "Backed by Warren Buffett's Legacy",
    "Arts District Las Vegas office representing Berkshire Hathaway HomeServices Nevada Properties",
    "Local condo expertise with Berkshire Hathaway brand resources.",
  ),
  blogHub: fromHero(
    "home-skyline-day.webp",
    "Midtown Las Vegas condo insights",
    "Daytime downtown Las Vegas skyline introducing midtown condo blog and market notes",
    "Guides, GBP posts, and market notes for Arts District buyers.",
  ),
  midtownHowTo: fromHero(
    "midtown-plaza-walkable.webp",
    "How to buy midtown real estate",
    "Walkable Midtown Plaza Las Vegas streetscape for buying midtown real estate",
    "Search live MLS, review HOAs, and tour Arts District buildings.",
  ),
  lifestyleHub: fromHero(
    "fremont-east-daytime.webp",
    "Midtown neighborhood lifestyle",
    "Fremont East Las Vegas daytime street representing Run Club, EV, and dining lifestyle pages",
    "Daily lifestyle that supports Arts District condo living.",
  ),
  lifestyleFaq: fromHero(
    "fremont-east-daytime.webp",
    "FAQ",
    "Fremont East Las Vegas daytime street for midtown lifestyle FAQ photography",
    "Run Club, EV program, and dining questions for condo buyers.",
  ),
  fiftyFiveWhy: fromHero(
    "summerlin-community.webp",
    "Why Active Adults Choose Las Vegas",
    "Summerlin desert homes with Red Rock backdrop for 55+ buyers comparing valley options",
    "Golf, rec centers, and maintenance-free living near midtown.",
  ),
  sunCitySummerlinAbout: fromHero(
    "summerlin-community.webp",
    "About Sun City Summerlin",
    "Sun City Summerlin homes with Red Rock backdrop for 55+ golf and rec living",
    "7,700+ homes, three golf courses, and four recreation centers.",
  ),
  trilogyAbout: fromHero(
    "trilogy-summerlin-villas.webp",
    "About Trilogy at Summerlin",
    "Trilogy at Summerlin 55+ villas west of the Summerlin core",
    "Newer 55+ villas west of the Summerlin core.",
  ),
  soleraAbout: fromHero(
    "solera-anthem-villas.webp",
    "About Solera at Anthem",
    "Solera at Anthem Henderson 55+ villas beside championship golf",
    "Guard-gated Henderson 55+ villas beside championship golf.",
  ),
  sunCityAnthemAbout: fromHero(
    "sun-city-anthem-golf.webp",
    "About Sun City Anthem",
    "Sun City Anthem Henderson 55+ golf and clubhouse photography",
    "Championship golf and a 64,000-square-foot clubhouse in Henderson.",
  ),
  sunCityAlianteAbout: fromHero(
    "sun-city-aliante-homes.webp",
    "About Sun City Aliante",
    "Sun City Aliante North Las Vegas 55+ homes near golf and trails",
    "North Las Vegas 55+ homes near Aliante golf and trails.",
  ),
  delWebbAbout: fromHero(
    "del-webb-lake-las-vegas.webp",
    "About Del Webb at Lake Las Vegas",
    "Del Webb Lake Las Vegas 55+ waterfront residences in Henderson",
    "Lake Las Vegas waterfront 55+ living in Henderson.",
  ),
  heritageWhy: fromHero(
    "heritage-stonebridge-new.webp",
    "Why buyers look at Heritage at Stonebridge",
    "Heritage at Stonebridge Las Vegas 55+ new-construction homes",
    "Newer 55+ floor plans in the northwest valley.",
  ),
  summerlinWhy: fromHero(
    "summerlin-community.webp",
    "Why Summerlin Is Las Vegas's Most Sought-After Community",
    "Summerlin Las Vegas master-planned streets and parks west of midtown condo towers",
    "Red Rock access, parks, trails, and distinct Summerlin villages.",
  ),
  hendersonWhy: fromHero(
    "henderson-valley-homes.webp",
    "Why Henderson Is Nevada's Best-Kept Secret",
    "Henderson valley homes representing Henderson residential alternatives to midtown condos",
    "Parks, trail systems, and master-planned villages in Henderson.",
  ),
  greenValleyWhy: fromHero(
    "green-valley-henderson.webp",
    "Green Valley: 35+ Years of Henderson Homes",
    "Green Valley Henderson homes representing Green Valley residential inventory",
    "Henderson streets, parks, and townhome inventory in Green Valley.",
  ),
  ridgesWhy: fromHero(
    "the-ridges-luxury-estate.webp",
    "The Ridges: Las Vegas's Ultimate Address for Discerning Buyers",
    "The Ridges Summerlin luxury estate representing custom homes above the ridgeline",
    "Custom estates above the Summerlin ridgeline.",
  ),
  southernHighlandsWhy: fromHero(
    "southern-highlands-golf.webp",
    "Why buyers choose Southern Highlands",
    "Southern Highlands golf-course village homes in southwest Las Vegas",
    "Golf-course lots and guard-gated villages southwest of the valley.",
  ),
  northLasVegasWhy: fromHero(
    "north-las-vegas-homes.webp",
    "North Las Vegas: The Valley's Best Value for First-Time Buyers",
    "North Las Vegas homes representing northern-valley entry price points",
    "Entry price points and new-construction inventory north of midtown.",
  ),
  skyeCanyonWhy: fromHero(
    "skye-canyon-community.webp",
    "Skye Canyon: Northwest Las Vegas's Most Exciting New Community",
    "Skye Canyon northwest Las Vegas master-planned streets, parks, and amenity campus",
    "Newer master-planned streets, parks, and amenity campus.",
  ),
  centennialWhy: fromHero(
    "centennial-hills-homes.webp",
    "Centennial Hills: Northwest Las Vegas Near US-95",
    "Centennial Hills northwest Las Vegas homes with mountain views and park access",
    "Northwest valley homes with mountain views and park access.",
  ),
  inspiradaWhy: fromHero(
    "inspirada-henderson-village.webp",
    "Inspirada: Henderson's Award-Winning Resort-Style Community",
    "Inspirada Henderson village streetscape representing walkable-village living",
    "Walkable village squares and trail-connected Henderson living.",
  ),
  mountainsEdgeWhy: fromHero(
    "mountains-edge-homes.webp",
    "Mountains Edge: Southwest Las Vegas Master-Planned Living",
    "Mountain's Edge southwest Las Vegas homes with mountain backdrop and rec amenities",
    "Southwest valley lots with mountain backdrop and rec amenities.",
  ),
  securityCommitment: fromHero(
    "services-condo-consultation.webp",
    "Our Commitment to Security",
    "Condo consultation desk representing responsible security disclosure for midtownvegascondos.com",
    "Report vulnerabilities to Dr. Jan Duffy at (702) 500-1980.",
  ),
  listingDetails: fromHero(
    "strip-view-condo-balcony.webp",
    "Property Details",
    "Strip-view midtown Las Vegas condo balcony representing MLS property detail photography",
    "Beds, baths, square footage, and building amenities from the listing.",
  ),
  listingsHowTo: fromHero(
    "juhl-downtown-condo-tower.webp",
    "How to use this MLS search",
    "Downtown Las Vegas condo tower used to filter live MLS midtown condo search results",
    "Filter for condos, then match buildings to HOA dues and walkability.",
  ),
  listingsChecklist: fromHero(
    "faq-midtown-loft-interior.webp",
    "Condo buyer checklist before you offer",
    "Midtown Las Vegas loft interior representing HOA, reserve, and parking checks before an offer",
    "Review CC&Rs, reserves, rental caps, and parking before you write.",
  ),
  contactAreas: fromHero(
    "contact-arts-district-main-street.webp",
    "Areas We Serve",
    "921 South Main Street Arts District storefront representing valley neighborhoods served from the office",
    "Midtown, Henderson, Summerlin, and valley-wide buyer and seller help.",
  ),
  gbpLocation: fromHero(
    "midtown-plaza-walkable.webp",
    "Business Location",
    "Walkable Midtown Plaza Las Vegas streetscape near the Arts District office map pin",
    "921 South Main Street, Las Vegas, NV 89101 — same pin as Google Maps.",
  ),
  gbpAbout: fromHero(
    "gbp-arts-district-office.webp",
    "About Dr. Jan Duffy",
    "Arts District Las Vegas office where Dr. Jan Duffy meets Arts District and downtown buyers",
    "BHHS Nevada Properties condo specialist for downtown and the Arts District.",
  ),
  gbpServices: fromHero(
    "services-condo-consultation.webp",
    "Real Estate Services",
    "Condo consultation desk for buy, sell, and HOA-review services in midtown Las Vegas",
    "Buyer representation, listings, valuations, and relocation from the Arts District.",
  ),
  aboutBhhs: fromHero(
    "gbp-arts-district-office.webp",
    "Why Berkshire Hathaway HomeServices?",
    "Arts District Las Vegas office representing Berkshire Hathaway HomeServices Nevada Properties",
    "Local condo expertise with Berkshire Hathaway brand resources.",
  ),
  aboutAreasServed: fromHero(
    "relocation-vegas-skyline.webp",
    "Areas Served by BHHS Nevada Properties",
    "Las Vegas valley skyline representing areas served from the Arts District office",
    "Las Vegas, Henderson, Summerlin, and midtown condo neighborhoods.",
  ),
  buyersSpecialized: fromHero(
    "midtown-plaza-walkable.webp",
    "Specialized Guidance for Every Buyer",
    "Walkable Midtown Plaza Las Vegas courtyard representing first-time, luxury, and relocator buyer paths",
    "First-time, luxury, and California relocator condo guidance.",
  ),
  sellersProcess: fromHero(
    "home-valuation-keys.webp",
    "The Home Selling Process",
    "House keys on a listing folder for the midtown Las Vegas condo selling process",
    "Pricing, staging, MLS exposure, and closing with BHHS Nevada.",
  ),
  fiftyFiveCommunities: fromHero(
    "trilogy-summerlin-villas.webp",
    "Las Vegas 55+ Communities",
    "Trilogy at Summerlin villas representing Las Vegas 55+ community options",
    "Sun City, Del Webb, Trilogy, Solera, and Heritage at Stonebridge.",
  ),
  fiftyFiveAmenities: fromHero(
    "sun-city-anthem-golf.webp",
    "What 55+ Community Amenities Include",
    "Desert golf-course homes representing Las Vegas 55+ community rec and golf amenities",
    "Pools, golf, clubhouses, and maintenance-free living near midtown.",
  ),
  neighborhoodMarket: fromHero(
    "home-skyline-day.webp",
    "Neighborhood Real Estate Market",
    "City of Las Vegas gateway arch used for neighborhood market snapshot photography",
    "Median price, days on market, and inventory context by area.",
  ),
  communityFaq: fromHero(
    "faq-midtown-loft-interior.webp",
    "Community FAQ",
    "Midtown Las Vegas loft interior illustrating 55+ and neighborhood buyer FAQ photography",
    "HOA, age restriction, amenities, and commute questions answered.",
  ),
  featuredAreas: fromHero(
    "one-las-vegas-highrise.webp",
    "Featured Midtown Condo Areas",
    "One Las Vegas high-rise representing featured Arts District, Symphony Park, and Strip-adjacent condo areas",
    "Area medians for Arts District, Symphony Park, and One Las Vegas.",
  ),
  gbpPosts: fromHero(
    "gbp-arts-district-office.webp",
    "Latest from the Arts District office",
    "Arts District Las Vegas office street matching Google Business Profile posts from 921 South Main Street",
    "The same market notes posted on Google Business Profile.",
  ),
  homeCta: fromHero(
    "strip-view-condo-balcony.webp",
    "Find Your Downtown Las Vegas Condo",
    "Strip-view midtown Las Vegas condo balcony for downtown and Arts District tour CTAs",
    "Call (702) 500-1980 to tour Arts District and downtown towers.",
  ),
  gbpVisit: fromHero(
    "contact-arts-district-main-street.webp",
    "Visit Las Vegas Arts District Condos | Homes by Dr. Jan Duffy",
    "921 South Main Street Arts District Las Vegas storefront matching the Google Maps pin",
    "Same name, address, and phone as Google Business Profile.",
  ),
  commuteTimes: fromHero(
    "home-skyline-day.webp",
    "Check drive times from midtown Las Vegas condos",
    "City of Las Vegas gateway arch used to compare drive times from midtown condos",
    "Strip, airport, Downtown, Summerlin, and Henderson commute context.",
  ),
} as const;

export type SectionImageKey = keyof typeof sectionImages;

export function getSectionImage(key: SectionImageKey): SectionImageMeta {
  return sectionImages[key];
}
