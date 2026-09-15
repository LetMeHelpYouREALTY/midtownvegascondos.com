// Live GBP localPosts mirrored on-site for Maps/web consistency.
// Read 2026-09-15 from location 9450623171278607714. Do not invent prices.

import type { HeroImageKey } from "./hero-images";

export interface GBPPost {
  id: string;
  type: "update" | "offer" | "event" | "product";
  title: string;
  content: string;
  cta?: {
    text: string;
    url: string;
  };
  publishDate: string;
  expiresDate?: string;
  keywords: string[];
  image?: string;
  heroKey?: HeroImageKey;
  sourcedFrom?: "gbp-local-posts";
  gbpPostName?: string;
}

const GBP_MEDIA = {
  marketMay:
    "https://lh3.googleusercontent.com/p/AF1QipMTq8yAI-dx4tO_vqQ6M8Q8ewpXLSerV0wIod38=s800",
  heritageJuly:
    "https://lh3.googleusercontent.com/p/AF1QipNig1vUZSHX_AttTBSciwgCSg0wf_WQOzpzQ6o_=s800",
} as const;

/** Newest live GBP posts first. Stale January 2026 $450K median copy removed. */
export const gbpPostTemplates: GBPPost[] = [
  {
    id: "gbp-arts-district-2026-05-14",
    type: "update",
    title: "Arts District condos, lofts, and live-work inventory",
    content: `The Las Vegas Arts District is drawing buyers who already know urban value. Condos, lofts, and townhomes trade in a wide band — $350,000 entry points to $750,000+ on fully renovated live-work properties.

First Friday draws 18,000+ visitors monthly to Main Street. That foot traffic supports short-term rental demand around the 18-square-block district, about 5 minutes from Downtown. Loft and live-work units were moving in 30–45 days in the mid-6% rate environment when this note posted.

Thinking about the Arts District as an investment or primary residence? I know which buildings have the strongest rental histories. Call Dr. Jan Duffy at (702) 500-1980.`,
    cta: {
      text: "Search Arts District condos",
      url: "https://www.midtownvegascondos.com/neighborhoods/arts-district",
    },
    publishDate: "2026-05-14",
    keywords: [
      "Arts District condos",
      "Las Vegas lofts",
      "Main Street",
      "downtown Las Vegas",
    ],
    heroKey: "artsDistrict",
    sourcedFrom: "gbp-local-posts",
    gbpPostName:
      "accounts/113882202080108204544/locations/9450623171278607714/localPosts/7004721523151635138",
  },
  {
    id: "gbp-heritage-sight-unseen-2026-07-15",
    type: "update",
    title: "Sight-unseen close at Heritage at Stonebridge",
    content: `An out-of-state buyer purchased a Heritage at Stonebridge home entirely sight-unseen and closed on a tight timeline. That is 35+ years of Las Vegas market knowledge plus firm negotiating: "Jan is an outstanding negotiator... I never felt like just another client."

Relocating without a plane ticket? I coordinate the tour, the offer, and the close so you do not have to be here for every appointment. Comparing this 55+ community with downtown condos? Call or text (702) 500-1980.`,
    cta: {
      text: "Heritage at Stonebridge listings",
      url: "https://www.midtownvegascondos.com/55-plus-communities/heritage-stonebridge",
    },
    publishDate: "2026-07-15",
    keywords: [
      "Heritage at Stonebridge",
      "55+ communities",
      "Las Vegas relocation",
      "sight-unseen purchase",
    ],
    image: GBP_MEDIA.heritageJuly,
    heroKey: "fiftyFiveHeritage",
    sourcedFrom: "gbp-local-posts",
    gbpPostName:
      "accounts/113882202080108204544/locations/9450623171278607714/localPosts/7241334291521501346",
  },
  {
    id: "gbp-market-window-2026-05-14",
    type: "update",
    title: "Las Vegas market window posted May 14, 2026",
    content: `Posted on this Google Business Profile May 14, 2026 — not a September restatement. Las Vegas had crossed $485,000 as the metro median mid-May. Active inventory was about 8,100 homes valley-wide, the most selection noted since early 2022. Mortgage rates had settled near 6.4%, about $1,100–$1,200/month per $200K financed.

Buyers who waited out 2024's rate spike were locking terms they could not touch 18 months earlier. The useful skill is knowing which buildings still have negotiating room. Call (702) 500-1980 for live MLS comps on Arts District and midtown condos.`,
    cta: {
      text: "See live listings",
      url: "https://www.midtownvegascondos.com/listings",
    },
    publishDate: "2026-05-14",
    keywords: [
      "Las Vegas market update",
      "Arts District condos",
      "inventory",
      "mortgage rates",
    ],
    image: GBP_MEDIA.marketMay,
    heroKey: "marketUpdate",
    sourcedFrom: "gbp-local-posts",
    gbpPostName:
      "accounts/113882202080108204544/locations/9450623171278607714/localPosts/6098764130708275477",
  },
  {
    id: "california-relocation",
    type: "update",
    title: "California Buyers: Your Home Equity Goes Further in Las Vegas",
    content: `Thinking about relocating from California to Las Vegas? Here's why 37% of Las Vegas home buyers come from CA:

0% state income tax. 40-60% lower home prices vs. comparable CA properties. Mapped Strip and airport commutes. A 4-hour drive to LA, plus easy flights.

A $1.2M California home can cover more square footage in Arts District lofts, Symphony Park residences, or One Las Vegas high-rises. Dr. Jan Duffy maps HOA dues, parking, and Harry Reid Airport commute times before you write.

Call (702) 500-1980 for a free California equity comparison.`,
    cta: {
      text: "California Relocation Guide",
      url: "https://www.midtownvegascondos.com/buyers/california-relocator",
    },
    publishDate: "2026-01-13",
    keywords: [
      "California relocation",
      "Las Vegas",
      "no state income tax",
      "Arts District",
      "One Las Vegas",
    ],
    heroKey: "buyersCaRelocator",
  },
  {
    id: "55-plus-spotlight",
    type: "update",
    title: "55+ Active Adult Communities in Las Vegas - Your Options",
    content: `Looking for 55+ living in the Las Vegas Valley? Compare:

Sun City Summerlin — Nevada's largest 55+ community (7,700+ homes, 3 golf courses)
Sun City Anthem — Henderson location with mountain views
Del Webb Lake Las Vegas — Resort-style lakefront living
Solera at Anthem — Smaller Henderson 55+ villas

Each offers different amenities and price points. Dr. Jan Duffy maps HOA dues and commute times from 921 South Main Street.

Schedule a community tour: (702) 500-1980`,
    cta: {
      text: "Explore 55+ Communities",
      url: "https://www.midtownvegascondos.com/55-plus-communities",
    },
    publishDate: "2026-01-06",
    keywords: [
      "55+ communities",
      "Sun City Summerlin",
      "Sun City Anthem",
      "Del Webb",
      "active adult",
    ],
    heroKey: "fiftyFivePlus",
  },
  {
    id: "luxury-homes",
    type: "update",
    title: "Luxury living in Las Vegas: One Las Vegas, Palms Place & more",
    content: `Midtown and Strip-corridor condos on this site:

One Las Vegas — high-rise, median $650K, typical HOA $400–$1,200+/mo
Symphony Park — Smith Center mid-rises, median $410K
Palms Place — Strip-adjacent condotel, median $380K
Southern Highlands — golf-course homes from about $750K+

No state income tax. Lock-and-leave high-rise floor plans. Dining, entertainment, and golf within a mapped commute. 40-60% lower prices than many comparable CA properties.

Confidential luxury condo search: (702) 500-1980`,
    cta: {
      text: "Luxury Home Search",
      url: "https://www.midtownvegascondos.com/buyers/luxury-homes-las-vegas",
    },
    publishDate: "2025-12-16",
    keywords: [
      "luxury condos Las Vegas",
      "One Las Vegas",
      "Palms Place",
      "Symphony Park",
    ],
    heroKey: "luxuryHomes",
  },
];

// Review Response Templates
// Respond promptly and in depth using who/what/when/where/why
export const reviewResponseTemplates = {
  fiveStarBuyer: (
    clientName: string,
    neighborhood: string,
    details: string,
  ) => `
Thank you so much, ${clientName}! It was truly a pleasure helping you find your perfect home in ${neighborhood}. ${details}

Working with buyers who know what they want makes my job a joy. I'm always here if you have questions about your new home or need recommendations for local services.

Welcome to the neighborhood! 🏠

- Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties
`,

  fiveStarSeller: (
    clientName: string,
    neighborhood: string,
    details: string,
  ) => `
Thank you for the kind words, ${clientName}! Selling your ${neighborhood} home was a great experience, and I'm thrilled we were able to ${details}.

The Las Vegas market is competitive, but with the right pricing strategy and marketing, we got you excellent results. Wishing you all the best in your next chapter!

- Dr. Jan Duffy, BHHS Nevada Properties
`,

  fourStar: (clientName: string, details: string) => `
Thank you for your review, ${clientName}! I appreciate your feedback about ${details}. Your satisfaction is my priority, and I'm always looking for ways to improve.

If there's anything I can help with going forward, please don't hesitate to reach out. I value your trust in choosing Berkshire Hathaway HomeServices.

- Dr. Jan Duffy
`,

  constructive: (clientName: string, issue: string, resolution: string) => `
${clientName}, thank you for sharing your experience. I take all feedback seriously, and I apologize that ${issue}.

${resolution}

Real estate transactions can be complex, and I'm committed to learning from every experience. If you'd like to discuss this further, please call me directly at (702) 500-1980.

- Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties
`,
};

// Citation Sources for NAP consistency
export const citationSources = {
  // Tier 1: Major aggregators
  tier1: [
    {
      name: "Google Business Profile",
      url: "https://business.google.com",
      priority: "critical",
    },
    {
      name: "Bing Places",
      url: "https://www.bingplaces.com",
      priority: "high",
    },
    {
      name: "Apple Maps",
      url: "https://mapsconnect.apple.com",
      priority: "high",
    },
    { name: "Yelp", url: "https://biz.yelp.com", priority: "high" },
  ],
  // Tier 2: Real estate specific
  tier2: [
    {
      name: "Realtor.com",
      url: "https://www.realtor.com/realestateagents",
      priority: "critical",
    },
    {
      name: "Zillow",
      url: "https://www.zillow.com/agent-finder",
      priority: "critical",
    },
    { name: "Homes.com", url: "https://www.homes.com", priority: "high" },
    { name: "Trulia", url: "https://www.trulia.com", priority: "high" },
    { name: "Redfin", url: "https://www.redfin.com", priority: "medium" },
  ],
  // Tier 3: Local Nevada/Las Vegas directories
  tier3: [
    {
      name: "Nevada Real Estate Division",
      url: "https://red.nv.gov",
      priority: "high",
    },
    {
      name: "Las Vegas Chamber of Commerce",
      url: "https://www.lvchamber.com",
      priority: "medium",
    },
    {
      name: "Henderson Chamber of Commerce",
      url: "https://www.hendersonchamber.com",
      priority: "medium",
    },
    {
      name: "Vegas.com Business Directory",
      url: "https://www.vegas.com",
      priority: "low",
    },
  ],
  // Tier 4: General business directories
  tier4: [
    {
      name: "Facebook Business",
      url: "https://www.facebook.com/business",
      priority: "high",
    },
    { name: "LinkedIn", url: "https://www.linkedin.com", priority: "high" },
    { name: "BBB", url: "https://www.bbb.org", priority: "medium" },
    {
      name: "Yellow Pages",
      url: "https://www.yellowpages.com",
      priority: "low",
    },
  ],
};

// Photo categories for GBP
export const photoCategories = [
  {
    category: "Office & Team",
    description: "Exterior office, interior, team photos",
    examples: [
      "Office exterior",
      "Reception area",
      "Dr. Jan headshot",
      "Team photo",
    ],
    count: "5-10 photos",
  },
  {
    category: "Neighborhoods",
    description: "Local area photos showing geography expertise",
    examples: [
      "Summerlin views",
      "Henderson parks",
      "Las Vegas Strip",
      "Red Rock Canyon",
    ],
    count: "10-15 photos",
  },
  {
    category: "Listings & Closings",
    description: "Active listings, sold properties, closing day photos",
    examples: [
      "Featured listings",
      "Sold signs",
      "Key handoff photos",
      "Happy clients",
    ],
    count: "15-20 photos",
  },
  {
    category: "55+ Communities",
    description: "Community amenities, clubhouses, golf courses",
    examples: [
      "Sun City clubhouse",
      "Golf courses",
      "Recreation centers",
      "Community pools",
    ],
    count: "10-15 photos",
  },
  {
    category: "Luxury Properties",
    description: "High-end listings and neighborhoods",
    examples: [
      "The Ridges homes",
      "Custom estates",
      "Strip views",
      "Pool/backyard features",
    ],
    count: "10-15 photos",
  },
];
