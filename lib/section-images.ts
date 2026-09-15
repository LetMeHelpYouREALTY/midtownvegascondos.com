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
  aboutBio: fromHero(
    "condo-lobby.webp",
    "Dr. Jan Duffy",
    "Midtown Las Vegas condo lobby where Dr. Jan Duffy meets Arts District and downtown buyers",
    "Meet Dr. Jan Duffy, midtown condo specialist at BHHS Nevada Properties.",
  ),
  aboutSpecializations: fromHero(
    "why-bhhs-brokerage.webp",
    "Areas of Specialization",
    "Berkshire Hathaway HomeServices Nevada Properties office representing Dr. Jan Duffy specializations",
    "Midtown condos, luxury, 55+ communities, and California relocation.",
  ),
  buyersAgent: fromHero(
    "glass-facade.webp",
    "Why You Need a Buyer's Agent",
    "Glass midtown Las Vegas condo facades representing buyer-agent representation for tower purchases",
    "Seller-paid representation for midtown Las Vegas condo buyers.",
  ),
  buyersProcess: fromHero(
    "condo-balconies.webp",
    "The Midtown Condo Buying Process",
    "Midtown Las Vegas condo tower balconies used to illustrate the high-rise buying process",
    "Pre-approval, building comparison, HOA review, and closing.",
  ),
  caNumbers: fromHero(
    "relocation-vegas-skyline.webp",
    "California vs. Nevada: The Numbers",
    "Las Vegas valley skyline for California relocators comparing Nevada tax and housing costs",
    "California equity often buys more square footage in Las Vegas.",
  ),
  firstTimeFinancing: fromHero(
    "open-plan.webp",
    "First-Time Buyer Financing Options",
    "Open-plan midtown Las Vegas condo living room for first-time buyers reviewing FHA and VA financing",
    "FHA, VA, conventional, and Nevada down-payment programs.",
  ),
  luxuryMarket: fromHero(
    "luxury-interior.webp",
    "Las Vegas Luxury Market Performance",
    "Luxury Las Vegas condo interior used for high-end market performance photography",
    "Strip-view high-rises and gated-community alternatives.",
  ),
  sellersAdvantage: fromHero(
    "tower-look-up.webp",
    "The Berkshire Hathaway HomeServices Selling Advantage",
    "Looking up at midtown Las Vegas high-rise condo towers marketed by BHHS listing specialists",
    "Building-specific comps and global BHHS buyer reach.",
  ),
  sellersDownsizing: fromHero(
    "active-adult.webp",
    "Extract Your Equity, Enjoy Your Life",
    "Active adult Las Vegas community living for condo sellers extracting equity and downsizing",
    "Low-maintenance 55+ and midtown condo options after a sale.",
  ),
  sellersMoveUp: fromHero(
    "modern-home-front.webp",
    "Your Equity Position is Stronger Than You Think",
    "Modern Las Vegas home exterior for move-up sellers using condo or home equity",
    "Trade up with a midtown sale and a targeted next purchase.",
  ),
  sellersRelocation: fromHero(
    "desert-skyline.webp",
    "Berkshire Hathaway HomeServices Network",
    "Las Vegas valley skyline for sellers relocating through the BHHS global referral network",
    "List locally and land with a BHHS agent in the next city.",
  ),
  sellersSensitive: fromHero(
    "handshake-deal.webp",
    "Situations We Help Navigate",
    "Professional real estate closing handshake for divorce and probate midtown Las Vegas condo sales",
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
    "agent-office.webp",
    "Business Hours",
    "Dr. Jan Duffy real estate office workspace matching published Google Business Profile hours",
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
    "map-planning.webp",
    "Why People Are Moving to Las Vegas",
    "Relocation planning map for buyers moving to midtown Las Vegas condos from out of state",
    "No state income tax, urban amenities, and midtown condo inventory.",
  ),
  luxuryStats: fromHero(
    "penthouse.webp",
    "Las Vegas Luxury Market Statistics | January 2026",
    "Luxury midtown Las Vegas condo interior used for $1M+ market statistics photography",
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
    "night-neon.webp",
    "5 Forces Driving Las Vegas Real Estate in 2026",
    "Las Vegas neon skyline at night used for 2026 real estate market-insight photography",
    "Inventory, rates, relocation, and downtown condo demand.",
  ),
  marketSnapshot: fromHero(
    "night-city.webp",
    "Midtown Condo Market Snapshot",
    "Downtown Las Vegas night skyline used for the midtown condo market snapshot",
    "Median price, days on market, and active condo inventory.",
  ),
  marketWeek: fromHero(
    "market-update-downtown-night.webp",
    "5 Key Statistics This Week",
    "Downtown Las Vegas night skyline for this week's midtown condo market statistics",
    "Weekly pricing and inventory context for Arts District buyers.",
  ),
  whyBuffett: fromHero(
    "why-bhhs-brokerage.webp",
    "Backed by Warren Buffett's Legacy",
    "Berkshire Hathaway HomeServices Nevada Properties branding for BHHS brokerage trust photography",
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
    "city-avenue.webp",
    "Midtown neighborhood lifestyle",
    "Arts District Las Vegas urban avenue representing Run Club, EV, and dining lifestyle pages",
    "Daily lifestyle that supports Arts District condo living.",
  ),
  lifestyleFaq: fromHero(
    "fremont-east-daytime.webp",
    "FAQ",
    "Fremont East Las Vegas daytime street for midtown lifestyle FAQ photography",
    "Run Club, EV program, and dining questions for condo buyers.",
  ),
  fiftyFiveWhy: fromHero(
    "golf-community.webp",
    "Why Active Adults Choose Las Vegas",
    "Las Vegas 55+ golf community photography for active adult buyers comparing valley options",
    "Golf, rec centers, and maintenance-free living near midtown.",
  ),
  sunCitySummerlinAbout: fromHero(
    "summerlin-community.webp",
    "About Sun City Summerlin",
    "Summerlin Las Vegas community setting adjacent to Sun City Summerlin 55+ golf and rec living",
    "7,700+ homes, three golf courses, and four recreation centers.",
  ),
  trilogyAbout: fromHero(
    "summerlin-community.webp",
    "About Trilogy at Summerlin",
    "Summerlin Las Vegas community setting near Trilogy at Summerlin 55+ villas",
    "Newer 55+ villas west of the Summerlin core.",
  ),
  soleraAbout: fromHero(
    "sun-city-anthem-golf.webp",
    "About Solera at Anthem",
    "Anthem Henderson golf community setting near Solera at Anthem 55+ villas",
    "Guard-gated Henderson 55+ villas beside championship golf.",
  ),
  sunCityAnthemAbout: fromHero(
    "henderson-valley-homes.webp",
    "About Sun City Anthem",
    "Henderson valley homes representing Sun City Anthem 55+ living near parks and golf",
    "Championship golf and a 64,000-square-foot clubhouse in Henderson.",
  ),
  sunCityAlianteAbout: fromHero(
    "north-las-vegas-homes.webp",
    "About Sun City Aliante",
    "North Las Vegas residential setting near Sun City Aliante 55+ golf and rec amenities",
    "North Las Vegas 55+ homes near Aliante golf and trails.",
  ),
  delWebbAbout: fromHero(
    "pool-amenity.webp",
    "About Del Webb at Lake Las Vegas",
    "Resort-style pool amenity photography for Del Webb Lake Las Vegas 55+ waterfront living",
    "Lake Las Vegas waterfront 55+ living in Henderson.",
  ),
  heritageWhy: fromHero(
    "new-construction.webp",
    "Why buyers look at Heritage at Stonebridge",
    "New-construction Las Vegas architecture representing Heritage at Stonebridge 55+ homes",
    "Newer 55+ floor plans in the northwest valley.",
  ),
  summerlinWhy: fromHero(
    "the-ridges-luxury-estate.webp",
    "Why Summerlin Is Las Vegas's Most Sought-After Community",
    "The Ridges Summerlin luxury estate representing Summerlin's western-valley communities",
    "Red Rock access, parks, trails, and distinct Summerlin villages.",
  ),
  hendersonWhy: fromHero(
    "green-valley-henderson.webp",
    "Why Henderson Is Nevada's Best-Kept Secret",
    "Green Valley Henderson homes representing Henderson residential alternatives to midtown condos",
    "Parks, trail systems, and master-planned villages in Henderson.",
  ),
  greenValleyWhy: fromHero(
    "inspirada-henderson-village.webp",
    "Green Valley: 35+ Years of Henderson Homes",
    "Inspirada Henderson village streetscape near Green Valley residential inventory",
    "Established Henderson streets, parks, and townhome inventory.",
  ),
  ridgesWhy: fromHero(
    "luxury-interior.webp",
    "The Ridges: Las Vegas's Ultimate Address for Discerning Buyers",
    "Luxury interior photography for The Ridges Summerlin custom-home market",
    "Custom estates above the Summerlin ridgeline.",
  ),
  southernHighlandsWhy: fromHero(
    "mountains-edge-homes.webp",
    "Why buyers choose Southern Highlands",
    "Southwest Las Vegas community homes near Southern Highlands golf-course villages",
    "Golf-course lots and guard-gated villages southwest of the valley.",
  ),
  northLasVegasWhy: fromHero(
    "sun-city-aliante-homes.webp",
    "North Las Vegas: The Valley's Best Value for First-Time Buyers",
    "Sun City Aliante North Las Vegas homes representing northern-valley entry price points",
    "Entry price points and new-construction inventory north of midtown.",
  ),
  skyeCanyonWhy: fromHero(
    "centennial-hills-homes.webp",
    "Skye Canyon: Northwest Las Vegas's Most Exciting New Community",
    "Centennial Hills northwest Las Vegas homes near Skye Canyon's master-planned streets",
    "Newer master-planned streets, parks, and amenity campus.",
  ),
  centennialWhy: fromHero(
    "skye-canyon-community.webp",
    "Centennial Hills: Northwest Las Vegas's Established Community",
    "Skye Canyon northwest Las Vegas community setting near Centennial Hills homes",
    "Northwest valley homes with mountain views and park access.",
  ),
  inspiradaWhy: fromHero(
    "henderson-valley-homes.webp",
    "Inspirada: Henderson's Award-Winning Resort-Style Community",
    "Henderson valley homes representing Inspirada walkable-village living",
    "Walkable village squares and trail-connected Henderson living.",
  ),
  mountainsEdgeWhy: fromHero(
    "southern-highlands-golf.webp",
    "Mountains Edge: Southwest Las Vegas Master-Planned Living",
    "Southern Highlands golf community near Mountain's Edge southwest Las Vegas homes",
    "Southwest valley lots with mountain backdrop and rec amenities.",
  ),
  securityCommitment: fromHero(
    "handshake-deal.webp",
    "Our Commitment to Security",
    "Professional closing handshake representing responsible security disclosure for midtownvegascondos.com",
    "Report vulnerabilities to Dr. Jan Duffy at (702) 500-1980.",
  ),
  listingDetails: fromHero(
    "strip-view-condo-balcony.webp",
    "Property Details",
    "Strip-view midtown Las Vegas condo balcony representing MLS property detail photography",
    "Beds, baths, square footage, and building amenities from the listing.",
  ),
} as const;

export type SectionImageKey = keyof typeof sectionImages;

export function getSectionImage(key: SectionImageKey): SectionImageMeta {
  return sectionImages[key];
}
