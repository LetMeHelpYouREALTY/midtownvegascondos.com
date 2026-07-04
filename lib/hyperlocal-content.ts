/**
 * Hyperlocal content for midtownvegascondos.com
 * Midtown Las Vegas condo focus — Dr. Jan Duffy, REALTOR®
 */

import { agentInfo, marketStats, siteConfig } from "./site-config";

export const MIDTOWN_AREA_SERVED = "Midtown Las Vegas, Arts District, Downtown Las Vegas, Fremont East, Symphony Park";

export const midtownNeighborhoods = [
  {
    name: "Arts District",
    slug: "arts-district",
    medianPrice: "$325,000",
    priceChange: "+4.1%",
    description:
      "Walkable gallery row, loft conversions, and creative urban living steps from midtown dining and nightlife.",
    highlights: ["Gallery Row", "Walk Score 85+", "Loft conversions", "First Friday events"],
    bestFor: "Creatives, urban professionals, walkable lifestyle seekers",
    latitude: 36.1589,
    longitude: -115.1534,
    faqs: [
      {
        question: "Is the Arts District noisy at night?",
        answer:
          "The Arts District has active nightlife — music and foot traffic are part of the experience. Higher floors and newer construction with better insulation help. Dr. Jan reviews specific buildings with buyers before you make an offer.",
      },
      {
        question: "What condo types are available in the Arts District?",
        answer:
          "Loft-style units, boutique mid-rise condos, and newer infill projects. Prices typically start around $250K for studios and reach $800K+ for premium lofts with parking.",
      },
    ],
  },
  {
    name: "Fremont East",
    slug: "fremont-east",
    medianPrice: "$295,000",
    priceChange: "+3.5%",
    description:
      "Revitalized downtown corridor with entertainment, dining, and boutique condo options near the Fremont Street experience.",
    highlights: ["Entertainment district", "Downtown proximity", "Investment potential", "Urban nightlife"],
    bestFor: "Investors, young professionals, entertainment-industry workers",
    latitude: 36.1699,
    longitude: -115.1398,
    faqs: [
      {
        question: "Is Fremont East good for condo investors?",
        answer:
          "Rental demand is strong, but STR rules vary by building. Dr. Jan reviews CC&Rs and HOA rental caps before you buy for investment purposes.",
      },
    ],
  },
  {
    name: "Symphony Park",
    slug: "symphony-park",
    medianPrice: "$410,000",
    priceChange: "+5.2%",
    description:
      "Master-planned urban district anchored by the Smith Center for the Performing Arts and new mid-rise residences.",
    highlights: ["Smith Center", "Cultural district", "New construction", "Walkable"],
    bestFor: "Culture lovers, professionals, downsizers from suburban homes",
    latitude: 36.1712,
    longitude: -115.1495,
    faqs: [
      {
        question: "What makes Symphony Park different from the Strip?",
        answer:
          "Symphony Park is a residential-cultural district — not casino corridor. You get performing arts, parks, and condo living without resort fees or tourist traffic.",
      },
    ],
  },
  {
    name: "One Las Vegas",
    slug: "one-las-vegas",
    medianPrice: "$650,000",
    priceChange: "+4.8%",
    description:
      "Luxury high-rise tower with Strip views, resort-style amenities, and full-service concierge living.",
    highlights: ["Strip views", "Resort pool", "Concierge", "High-rise luxury"],
    bestFor: "Luxury buyers, second-home owners, view seekers",
    latitude: 36.1075,
    longitude: -115.1767,
    faqs: [
      {
        question: "What are typical HOA fees at One Las Vegas?",
        answer:
          "High-rise luxury HOAs in Las Vegas typically range $400–$1,200+/month depending on square footage and amenities. Dr. Jan provides current HOA docs and reserve study summaries for every building.",
      },
    ],
  },
  {
    name: "The English Residences",
    slug: "the-english-residences",
    medianPrice: "$475,000",
    priceChange: "+6.0%",
    description:
      "Condo-hotel residences in the heart of Midtown Arts District — own, stay, or earn when you're away.",
    highlights: ["Condo-hotel", "Managed rental program", "Arts District", "Boutique hotel"],
    bestFor: "Part-time residents, investors, lifestyle buyers",
    latitude: 36.1595,
    longitude: -115.1528,
    faqs: [
      {
        question: "How do English Residences condo-hotel programs work?",
        answer:
          "Owners can use the unit personally and participate in a hotel rental pool when away. Dr. Jan explains management agreements, revenue splits, and HOA obligations before you buy.",
      },
    ],
  },
  {
    name: "Juhl",
    slug: "juhl",
    medianPrice: "$520,000",
    priceChange: "+3.9%",
    description:
      "Modern downtown loft-style condos with rooftop pool, quiet units, and walkable access to Fremont Street.",
    highlights: ["Rooftop pool", "Loft layouts", "Downtown walkability", "Modern design"],
    bestFor: "Urban professionals, loft lovers, downtown workers",
    latitude: 36.1678,
    longitude: -115.1456,
    faqs: [
      {
        question: "Are Juhl condos good for full-time living?",
        answer:
          "Reddit residents and Dr. Jan's clients report spacious units, a great pool amenity, and quiet interiors despite downtown location. HOA and parking details should be verified per unit.",
      },
    ],
  },
  {
    name: "Palms Place",
    slug: "palms-place",
    medianPrice: "$380,000",
    priceChange: "+2.8%",
    description:
      "High-rise condotel tower with resort amenities, valet parking, and full-service living behind the Palms.",
    highlights: ["Condotel", "Resort amenities", "Valet parking", "Pool complex"],
    bestFor: "Primary residence seekers, investors, amenity-focused buyers",
    latitude: 36.1147,
    longitude: -115.1947,
    faqs: [
      {
        question: "What's included in Palms Place HOA dues?",
        answer:
          "HOA typically covers utilities, cable, internet, and access to pool, spa, and fitness center — but restaurant, room service, and valet may have separate fees. Dr. Jan breaks down what's included vs. optional before you buy.",
      },
      {
        question: "Can I rent out my Palms Place unit on Airbnb?",
        answer:
          "Palms Place has specific rental program rules. Self-rental vs. hotel program participation affects fees and income. Dr. Jan reviews CC&Rs for your exact scenario.",
      },
    ],
  },
  {
    name: "Midtown Plaza",
    slug: "midtown-plaza",
    medianPrice: "$350,000",
    priceChange: "+4.5%",
    description:
      "Central midtown address with access to dining, culture, and the energy of Las Vegas's urban renaissance.",
    highlights: ["Central midtown", "Dining access", "Urban energy", "New development"],
    bestFor: "First-time condo buyers, urban lifestyle seekers",
    latitude: 36.1601,
    longitude: -115.1512,
    faqs: [],
  },
] as const;

export type MidtownNeighborhoodSlug = (typeof midtownNeighborhoods)[number]["slug"];

export function getMidtownNeighborhood(slug: string) {
  return midtownNeighborhoods.find((n) => n.slug === slug);
}

/** Reddit-informed FAQs for midtown condo buyers/sellers */
export const midtownCondoFaqs = [
  {
    question: "What do midtown Las Vegas HOA fees typically cover?",
    answer:
      "Coverage varies by building — some include utilities, cable, and internet; others cover only common areas and amenities. Dr. Jan reviews HOA budgets, reserve studies, and special assessment history for every condo purchase.",
  },
  {
    question: "Can I use my midtown condo as a short-term rental?",
    answer:
      "Rental rules are building-specific. Some midtown towers allow short-term rentals; others require 6-month minimum leases. Dr. Jan checks CC&Rs before you make an offer.",
  },
  {
    question: "Is midtown Las Vegas walkable without a car?",
    answer:
      "Yes — the Arts District and downtown core are among Las Vegas's most walkable areas for dining, galleries, and entertainment. Many residents use rideshare for Strip trips.",
  },
  {
    question: "How do high-rise condos compare to suburban homes for the same budget?",
    answer:
      "Midtown condos trade yard space for walkability, amenities, and lock-and-leave lifestyle. For the same budget as a suburban home, you often get premium location and building amenities — but HOA fees and parking deeded rights matter.",
  },
  {
    question: "Do I need a realtor who specializes in condos?",
    answer:
      "Yes. Condo transactions require HOA document review, rental restriction analysis, and building-specific comparable sales. Dr. Jan specializes in midtown Las Vegas condos — call (702) 500-1942.",
  },
  {
    question: "How long do midtown condos take to sell?",
    answer:
      "Well-priced midtown units typically sell in 30–45 days. Strip-view and updated interiors move faster. Overpriced units can sit 90+ days in a competitive market.",
  },
  {
    question: "What midtown buildings does Dr. Jan Duffy know best?",
    answer:
      "One Las Vegas, Juhl, Ogden, Palms Place, The English Residences, and Arts District loft conversions. She reviews every building's HOA, comps, and rental rules.",
  },
  {
    question: "Are condotel units good as a primary residence?",
    answer:
      "They can work if you understand HOA structure, what's included in dues, and rental program rules. Dr. Jan helps buyers compare condotel vs. traditional condo ownership for your lifestyle.",
  },
];

export const hyperlocalMeta = {
  buyers: {
    title: "Buy a Midtown Las Vegas Condo | Dr. Jan Duffy, REALTOR®",
    description: `Buy a midtown Las Vegas condo with expert HOA review and building comparisons. Dr. Jan Duffy, BHHS Nevada Properties. Call ${agentInfo.phone}.`,
    keywords: [
      "buy midtown Las Vegas condo",
      "downtown Las Vegas condos for sale",
      "Arts District condos",
      "high rise condos Las Vegas",
      "condo buyer agent Las Vegas",
    ],
  },
  sellers: {
    title: "Sell Your Midtown Vegas Condo | Dr. Jan Duffy, REALTOR®",
    description: `Sell your midtown Las Vegas condo for top dollar. Building-specific comps and urban marketing. Dr. Jan Duffy. Call ${agentInfo.phone}.`,
    keywords: [
      "sell midtown Las Vegas condo",
      "sell downtown Las Vegas condo",
      "condo listing agent Las Vegas",
      "midtown condo valuation",
    ],
  },
  neighborhoods: {
    title: "Midtown Las Vegas Condo Neighborhoods | Dr. Jan Duffy",
    description:
      "Explore midtown Las Vegas condo neighborhoods — Arts District, Fremont East, One Las Vegas, Juhl, and more with Dr. Jan Duffy.",
    keywords: [
      "midtown Las Vegas neighborhoods",
      "Arts District condos",
      "downtown Las Vegas living",
      "midtown vegas condos",
    ],
  },
  faq: {
    title: "Midtown Las Vegas Condo FAQs | Dr. Jan Duffy",
    description: `Answers about buying and selling midtown Vegas condos — HOA fees, rentals, buildings, and market data. Call ${agentInfo.phone}.`,
  },
  marketReport: {
    title: "Midtown Las Vegas Condo Market Report | Dr. Jan Duffy",
    description: `Current midtown Las Vegas condo market data — median price ${marketStats.midtown.medianPriceFormatted}, days on market, and inventory. Updated ${marketStats.lastUpdated}.`,
  },
};

export function midtownServiceSchema(serviceName: string, serviceType: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    provider: {
      "@type": "RealEstateAgent",
      name: `${agentInfo.name} - ${agentInfo.brokerage}`,
      telephone: agentInfo.phoneTel.replace("tel:", ""),
      url: siteConfig.url,
    },
    areaServed: MIDTOWN_AREA_SERVED,
    serviceType,
  };
}

/** Legacy suburban slugs → redirect to midtown neighborhoods index */
export const legacyNeighborhoodRedirects: Record<string, string> = {
  summerlin: "/neighborhoods/arts-district",
  henderson: "/neighborhoods/symphony-park",
  "green-valley": "/neighborhoods/fremont-east",
  "the-ridges": "/neighborhoods/one-las-vegas",
  "southern-highlands": "/neighborhoods/one-las-vegas",
  "north-las-vegas": "/neighborhoods/midtown-plaza",
  "skye-canyon": "/neighborhoods/midtown-plaza",
  "centennial-hills": "/neighborhoods/midtown-plaza",
  inspirada: "/neighborhoods/the-english-residences",
  "mountains-edge": "/neighborhoods/juhl",
};
