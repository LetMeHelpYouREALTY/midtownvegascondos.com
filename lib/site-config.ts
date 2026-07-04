// Site Configuration — midtownvegascondos.com
// Berkshire Hathaway HomeServices Nevada Properties
// NAP must match Google Business Profile exactly

export const siteConfig = {
  name: "Midtown Vegas Condos",
  fullName: "Berkshire Hathaway HomeServices Nevada Properties",
  tagline: "Midtown Las Vegas Condo Specialist",
  brandLine:
    "Midtown Vegas Condos | Dr. Jan Duffy, REALTOR® | Berkshire Hathaway HomeServices Nevada Properties",
  brandName: "Berkshire Hathaway HomeServices",
  shortName: "BHHS",
  url: "https://www.midtownvegascondos.com",
  description:
    "Search midtown Las Vegas condos, high-rise towers, and urban lofts. Expert condo buying and selling guidance from Dr. Jan Duffy, REALTOR® at Berkshire Hathaway HomeServices Nevada Properties.",
};

export const agentInfo = {
  name: "Dr. Jan Duffy",
  title: "REALTOR®",
  license: "S.0197614.LLC",
  phone: "(702) 500-1942",
  phoneFormatted: "(702) 500-1942",
  phoneTel: "tel:+17025001942",
  email: "homes@heyberkshire.com",
  brokerage: "Berkshire Hathaway HomeServices Nevada Properties",
};

/** Dr. Jan Duffy profile photo — hosted on Cloudflare R2 (realestatedomains-assets) */
export const agentImage = {
  alt: "Dr. Jan Duffy, REALTOR® — midtown Las Vegas condo specialist at Berkshire Hathaway HomeServices Nevada Properties",
  width: 800,
  height: 800,
  localPath: "/images/agent/dr-jan-duffy-headshot.jpg",
  cloudflareUrl:
    "https://pub-720ca9b7443b47be981def05abd3d7f0.r2.dev/shared/agent/dr-jan-duffy-headshot.jpg",
};

export function getAgentImageSrc(): string {
  return process.env.NEXT_PUBLIC_AGENT_IMAGE_URL ?? agentImage.cloudflareUrl;
}

export const officeInfo = {
  name: "Berkshire Hathaway HomeServices Nevada Properties",
  address: {
    street: "9406 W Lake Mead Blvd, Suite 100",
    city: "Las Vegas",
    state: "NV",
    zip: "89134",
    full: "9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134",
  },
  coordinates: {
    lat: 36.1941,
    lng: -115.2678,
  },
  phone: "(702) 500-1942",
  phoneTel: "tel:+17025001942",
};

// Market Statistics (Updated January 2026)
export const marketStats = {
  lastUpdated: "January 2026",
  midtown: {
    medianPrice: 385000,
    medianPriceFormatted: "$385,000",
    yearOverYearChange: "+3.8%",
    daysOnMarket: 32,
    activeListings: 420,
    pricePerSqFt: 295,
  },
  lasVegas: {
    medianPrice: 450000,
    medianPriceFormatted: "$450,000",
    yearOverYearChange: "+4.2%",
    daysOnMarket: 28,
    activeListings: 4850,
    closedSales: 2340,
    inventoryMonths: 2.1,
  },
};

// Agent Stats
export const agentStats = {
  servingSince: 2008,
  transactionsClosed: 500,
  volumeClosed: "$127M+",
  averageRating: 4.9,
  reviewCount: 500,
};

// Value Propositions
export const valuePropositions = {
  main: "When you work with a Berkshire Hathaway HomeServices agent, you're backed by a name synonymous with trust, ethical standards, and financial strength—the same principles that built Warren Buffett's empire.",
  trust:
    "Berkshire Hathaway HomeServices is the only real estate brand backed by Warren Buffett's Berkshire Hathaway Inc. This means unmatched financial stability, ethical standards, and a global referral network of 50,000+ agents.",
  expertise:
    "Serving Las Vegas since 2008 with $127M+ in closed transactions, Dr. Jan Duffy combines deep midtown condo market knowledge with the resources of a global brand.",
};

// Midtown Las Vegas condo buildings and areas
export const midtownAreas = [
  {
    name: "One Las Vegas",
    slug: "one-las-vegas",
    description: "Luxury high-rise tower with Strip views and resort-style amenities",
    highlights: ["Strip views", "Resort pool", "Concierge", "High-rise living"],
  },
  {
    name: "Arts District",
    slug: "arts-district",
    description: "Walkable urban core with galleries, dining, and loft-style condos",
    highlights: ["Walkability", "Gallery Row", "Urban lofts", "Downtown proximity"],
  },
  {
    name: "Fremont East",
    slug: "fremont-east",
    description: "Revitalized downtown corridor with boutique condo options",
    highlights: ["Entertainment", "Restaurants", "Urban lifestyle", "Investment potential"],
  },
  {
    name: "Symphony Park",
    slug: "symphony-park",
    description: "Master-planned urban district near the Smith Center",
    highlights: ["Smith Center", "New construction", "Walkable", "Cultural district"],
  },
];

// Services offered
export const services = [
  {
    name: "Condo Buying",
    slug: "buyers",
    description: "Expert guidance through HOA reviews, financing, and midtown condo purchases",
    icon: "Home",
  },
  {
    name: "Condo Selling",
    slug: "sellers",
    description: "Maximize your condo's value with professional marketing and negotiation",
    icon: "TrendingUp",
  },
  {
    name: "High-Rise Living",
    slug: "luxury-homes",
    description: "Specialized expertise in Las Vegas high-rise and luxury condo properties",
    icon: "Star",
  },
  {
    name: "Investment Condos",
    slug: "investment-properties",
    description: "Rental yield analysis and STR regulations for midtown condo investors",
    icon: "DollarSign",
  },
  {
    name: "California Relocation",
    slug: "relocation",
    description: "Help California buyers find urban Las Vegas condo living with Nevada tax advantages",
    icon: "Truck",
  },
  {
    name: "Condo Valuation",
    slug: "home-valuation",
    description: "Free condo valuations using current midtown market data and comparable sales",
    icon: "Calculator",
  },
];

// Expert quotes from Dr. Jan Duffy
export const expertQuotes = {
  condos: `"Midtown Las Vegas condos offer something you can't find in the suburbs — walkability, Strip proximity, and a true urban lifestyle. But every building has different HOA rules, rental restrictions, and fee structures. That's where specialized condo expertise matters."`,
  buyers: `"My job isn't just to show you units — it's to review HOA financials, understand rental caps, and make sure you're protected through every step of a condo transaction."`,
  sellers: `"Pricing a condo correctly means knowing your building's recent sales, active competition, and what buyers are paying per square foot in midtown right now."`,
  investment: `"Midtown condos can be strong investments, but you need to know which buildings allow short-term rentals and which have the best HOA reserves."`,
};

// Midtown condo FAQs
export const commonFAQs = {
  general: [
    {
      question: "What midtown Las Vegas condo buildings does Dr. Jan Duffy specialize in?",
      answer:
        "Dr. Jan Duffy specializes in midtown and downtown Las Vegas condos including One Las Vegas, The Martin, Ogden, Juhl, and Arts District loft conversions. She reviews HOA documents, rental restrictions, and comparable sales for every building.",
    },
    {
      question: "Why choose a Berkshire Hathaway HomeServices agent for midtown condos?",
      answer:
        "Berkshire Hathaway HomeServices is backed by Warren Buffett's Berkshire Hathaway Inc. You get a global network of 50,000+ agents, world-class marketing, and a brand synonymous with trust — plus Dr. Jan's specialized midtown condo expertise since 2008.",
    },
    {
      question: "What is Dr. Jan Duffy's license number?",
      answer:
        "Dr. Jan Duffy holds Nevada Real Estate License S.0197614.LLC and is affiliated with Berkshire Hathaway HomeServices Nevada Properties at 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134.",
    },
  ],
  buying: [
    {
      question: "What should I know before buying a midtown Las Vegas condo?",
      answer:
        "Review HOA financials, rental restrictions, special assessments, and parking deeded rights. Dr. Jan walks buyers through every disclosure and connects you with lenders experienced in high-rise and condo financing.",
    },
    {
      question: "How much do midtown Las Vegas condos cost in 2026?",
      answer:
        "As of January 2026, midtown Las Vegas condos range from approximately $250,000 for studio units to $1M+ for luxury high-rise penthouses with Strip views. Contact Dr. Jan at (702) 500-1942 for current building-specific pricing.",
    },
    {
      question: "Can I rent out a midtown Las Vegas condo?",
      answer:
        "Rental rules vary by building. Some midtown towers allow short-term rentals; others restrict to 6-month minimum leases. Dr. Jan reviews each building's CC&Rs before you make an offer.",
    },
  ],
  selling: [
    {
      question: "How do I sell my midtown Las Vegas condo?",
      answer:
        "Dr. Jan provides a free condo valuation using recent midtown comparable sales, professional photography, and targeted marketing to urban buyers and investors. Call (702) 500-1942 for a no-obligation consultation.",
    },
    {
      question: "How long do midtown condos take to sell?",
      answer:
        "Well-priced midtown condos typically sell in 30–45 days. Units with Strip views, updated interiors, and reasonable HOA fees tend to move faster. Overpriced units can sit 90+ days.",
    },
  ],
};
