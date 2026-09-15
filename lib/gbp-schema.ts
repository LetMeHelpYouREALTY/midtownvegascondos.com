// Google Business Profile Schema Data
// NAP / hours / categories must match GBP exactly for midtownvegascondos.com

import { midtownNeighborhoods } from "./hyperlocal-content";
import {
  agentInfo,
  getAgentImageSrc,
  officeInfo,
  siteConfig,
} from "./site-config";

export const businessInfo = {
  // NAP - Must match GBP exactly
  name: "Las Vegas Arts District Condos | Homes by Dr. Jan Duffy",
  address: {
    streetAddress: "921 South Main Street",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89101",
    addressCountry: "US",
  },
  phone: {
    display: "(702) 500-1980",
    tel: "+17025001980",
    sms: "sms:+17025001980",
  },
  email: "DrDuffySells@MidtownVegasCondos.com",
  url: "https://www.midtownvegascondos.com",

  // Business Details
  license: "S.0197614.LLC",
  priceRange: "$$",
  description:
    "Discover luxury condos and charming homes in Downtown Las Vegas with Dr. Jan Duffy, a real estate expert with 30+ years of experience. Personalized service guaranteed!",

  // Hours - Match GBP exactly (Sun–Thu 9–5; Fri–Sat closed)
  hours: {
    sunday: "09:00-17:00",
    monday: "09:00-17:00",
    tuesday: "09:00-17:00",
    wednesday: "09:00-17:00",
    thursday: "09:00-17:00",
    friday: "Closed",
    saturday: "Closed",
  },

  // Geo coordinates for 921 South Main Street
  geo: {
    latitude: officeInfo.coordinates.lat,
    longitude: officeInfo.coordinates.lng,
  },

  // Service areas - Match GBP
  serviceAreas: [
    "Arts District, Las Vegas, NV",
    "Downtown Las Vegas, Las Vegas, NV",
  ],

  // Categories - Primary + Secondary for GBP
  categories: {
    primary: "Real estate agent",
    secondary: [
      "Real estate agency",
      "Real estate developer",
      "Real estate consultant",
    ],
  },

  // Services - Each creates searchable fields in GBP
  services: [
    {
      name: "Buyer Representation",
      description: "Full-service home buying assistance",
    },
    {
      name: "Seller Representation",
      description: "List and sell your home for top dollar",
    },
    {
      name: "Luxury Condo Sales",
      description: "High-rise and Arts District condominiums",
    },
    {
      name: "Downtown Las Vegas Condos",
      description: "Downtown and Arts District condo expertise",
    },
    {
      name: "California Relocation Services",
      description: "Helping CA buyers transition to Las Vegas",
    },
    {
      name: "First-Time Home Buyer Guidance",
      description: "FHA, VA, down payment assistance",
    },
    {
      name: "Investment Property Consulting",
      description: "Rental properties and investment analysis",
    },
    {
      name: "Online Appointments",
      description: "Schedule consultations and showings online",
    },
  ],

  // Attributes for GBP - Match profile
  attributes: {
    accessibility: [
      "Wheelchair accessible entrance",
      "Wheelchair accessible parking lot",
      "Wheelchair accessible restroom",
    ],
    serviceOptions: ["Online appointments", "Onsite services"],
    highlights: [
      "Identifies as women-owned",
      "Identifies as veteran-owned",
      "LGBTQ+ friendly",
      "Transgender safespace",
    ],
    amenities: ["Gender-neutral restroom", "Free parking lot"],
    planning: ["Appointment required"],
  },

  // Social profiles + Maps / GBP page for local-pack entity matching
  socialProfiles: [
    "https://www.linkedin.com/company/downtown-las-vegas-condos-and-homes-for-sale",
    "https://www.midtownvegascondos.com/google-business",
  ],

  // Languages spoken
  languages: ["English", "Spanish", "Korean", "Filipino"],

  // Year established (GBP opening date)
  foundingDate: "2009-09-20",
};

// GBP description aligned to Downtown / Arts District profile
export const gbpDescription = {
  whoWeAre: `Las Vegas Arts District Condos | Homes by Dr. Jan Duffy helps buyers and sellers find luxury condos and charming homes in Downtown Las Vegas and the Arts District. Dr. Jan Duffy is a REALTOR® with Berkshire Hathaway HomeServices Nevada Properties (License S.0197614.LLC) with 30+ years of experience and personalized service.`,

  whatWeDo: `We specialize in Downtown Las Vegas and Arts District condominiums — loft conversions, midtown high-rises, and walkable urban residences. Services include buyer and seller representation, investment consulting, online appointments, and onsite consultations by appointment.`,

  whereWeServe: `Service areas: Arts District, Las Vegas, NV and Downtown Las Vegas, Las Vegas, NV. Business location: 921 South Main Street, Las Vegas, NV 89101. Hours: Sunday–Thursday 9:00 AM–5:00 PM; Friday–Saturday closed. Call or text (702) 500-1980 or visit midtownvegascondos.com.`,
};

// FAQ Schema for GBP Q&A section
export const gbpFAQs = [
  {
    question:
      "Where is Las Vegas Arts District Condos | Homes by Dr. Jan Duffy located?",
    answer:
      "Our business location is 921 South Main Street, Las Vegas, NV 89101 in the Arts District / Downtown Las Vegas corridor. Call (702) 500-1980 for directions or to schedule an appointment.",
  },
  {
    question: "What are your business hours?",
    answer:
      "We are open Sunday through Thursday from 9:00 AM to 5:00 PM. We are closed Friday and Saturday. Appointments are required — call or text (702) 500-1980 to schedule.",
  },
  {
    question: "What areas does Dr. Jan Duffy serve?",
    answer:
      "Primary service areas are the Arts District and Downtown Las Vegas. Dr. Jan also helps clients compare midtown condo buildings across the Las Vegas urban core.",
  },
  {
    question: "How do I schedule a consultation with Dr. Jan Duffy?",
    answer:
      "Call or text (702) 500-1980, use SMS at +17025001980, or book an online appointment at midtownvegascondos.com/contact. Visits are by appointment at 921 South Main Street, Las Vegas, NV 89101.",
  },
  {
    question: "Does Dr. Jan help buyers relocating from California?",
    answer:
      "Yes. California relocation is a specialty — comparing Nevada tax advantages, Downtown condo inventory, and walkable Arts District living. Call (702) 500-1980 to start.",
  },
  {
    question: "What languages do you speak?",
    answer:
      "We can assist in English, Spanish, Korean, and Filipino. Call (702) 500-1980 to request language support for your appointment.",
  },
];

function absoluteSiteImage(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

const gbpPhotoObjects = [
  {
    "@type": "ImageObject" as const,
    name: "921 South Main Street Arts District office",
    caption:
      "Las Vegas Arts District Condos | Homes by Dr. Jan Duffy at 921 South Main Street",
    url: absoluteSiteImage(
      "/images/hero/contact-arts-district-main-street.webp",
    ),
    contentUrl: absoluteSiteImage(
      "/images/hero/contact-arts-district-main-street.webp",
    ),
  },
  {
    "@type": "ImageObject" as const,
    name: "Arts District Las Vegas office street",
    caption:
      "Google Business Profile office photography for Downtown Las Vegas condo tours",
    url: absoluteSiteImage("/images/hero/gbp-arts-district-office.webp"),
    contentUrl: absoluteSiteImage("/images/hero/gbp-arts-district-office.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "Dr. Jan Duffy, REALTOR®",
    caption:
      "Dr. Jan Duffy, midtown Las Vegas condo specialist at Berkshire Hathaway HomeServices Nevada Properties",
    url: absoluteSiteImage(getAgentImageSrc()),
    contentUrl: absoluteSiteImage(getAgentImageSrc()),
  },
  {
    "@type": "ImageObject" as const,
    name: "Las Vegas Strip skyline near midtown condos",
    caption:
      "Twilight Strip skyline used by homebuyers comparing midtown and downtown Las Vegas condos",
    url: absoluteSiteImage("/images/hero/home-strip-dusk.webp"),
    contentUrl: absoluteSiteImage("/images/hero/home-strip-dusk.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "Midtown Las Vegas loft interior",
    caption:
      "Arts District and midtown condo interior photography for Downtown Las Vegas buyers",
    url: absoluteSiteImage("/images/hero/faq-midtown-loft-interior.webp"),
    contentUrl: absoluteSiteImage(
      "/images/hero/faq-midtown-loft-interior.webp",
    ),
  },
  {
    "@type": "ImageObject" as const,
    name: "Dr. Jan Duffy real estate office",
    caption:
      "Berkshire Hathaway HomeServices Nevada Properties workspace for Arts District condo consultations",
    url: absoluteSiteImage("/images/hero/agent-office.webp"),
    contentUrl: absoluteSiteImage("/images/hero/agent-office.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "Arts District Las Vegas condo living",
    caption:
      "Arts District loft and condo photography for Downtown Las Vegas homebuyers",
    url: absoluteSiteImage("/images/hero/highrise-windows.webp"),
    contentUrl: absoluteSiteImage("/images/hero/highrise-windows.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "One Las Vegas high-rise condos",
    caption:
      "One Las Vegas luxury high-rise condo tower for midtown Las Vegas buyers",
    url: absoluteSiteImage("/images/hero/one-las-vegas-highrise.webp"),
    contentUrl: absoluteSiteImage("/images/hero/one-las-vegas-highrise.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "Juhl downtown Las Vegas condos",
    caption:
      "Juhl downtown condo tower photography for midtown Las Vegas buyers",
    url: absoluteSiteImage("/images/hero/juhl-downtown-condo-tower.webp"),
    contentUrl: absoluteSiteImage(
      "/images/hero/juhl-downtown-condo-tower.webp",
    ),
  },
  {
    "@type": "ImageObject" as const,
    name: "Fremont East downtown condos",
    caption:
      "Fremont East entertainment-district condo corridor for downtown Las Vegas buyers",
    url: absoluteSiteImage("/images/hero/fremont-east-daytime.webp"),
    contentUrl: absoluteSiteImage("/images/hero/fremont-east-daytime.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "Symphony Park Las Vegas condos",
    caption:
      "Symphony Park midtown residences near the Smith Center for downtown Las Vegas buyers",
    url: absoluteSiteImage("/images/hero/symphony-park-midrise.webp"),
    contentUrl: absoluteSiteImage("/images/hero/symphony-park-midrise.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "The English Residences midtown condos",
    caption:
      "The English Residences boutique condo building in midtown Las Vegas",
    url: absoluteSiteImage("/images/hero/apartment-row.webp"),
    contentUrl: absoluteSiteImage("/images/hero/apartment-row.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "Palms Place Strip-adjacent condos",
    caption:
      "Palms Place Strip-adjacent high-rise condo photography for midtown Las Vegas buyers",
    url: absoluteSiteImage("/images/hero/home-strip-night.webp"),
    contentUrl: absoluteSiteImage("/images/hero/home-strip-night.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "Midtown Plaza Las Vegas condos",
    caption:
      "Walkable Midtown Plaza condo residences near the Arts District office",
    url: absoluteSiteImage("/images/hero/midtown-plaza-walkable.webp"),
    contentUrl: absoluteSiteImage("/images/hero/midtown-plaza-walkable.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "Search Midtown Vegas condos",
    caption:
      "Laptop on a midtown Las Vegas condo island used to search live Arts District listings",
    url: absoluteSiteImage("/images/sections/search-midtown-condos.webp"),
    contentUrl: absoluteSiteImage("/images/sections/search-midtown-condos.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "Why work with Dr. Jan Duffy",
    caption:
      "Las Vegas valley map and condo notes for Arts District and downtown buyer matching",
    url: absoluteSiteImage("/images/sections/why-choose-jan.webp"),
    contentUrl: absoluteSiteImage("/images/sections/why-choose-jan.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "HOA document review",
    caption:
      "HOA documents and floor plans with a downtown Las Vegas high-rise outside the window",
    url: absoluteSiteImage("/images/sections/hoa-review.webp"),
    contentUrl: absoluteSiteImage("/images/sections/hoa-review.webp"),
  },
  {
    "@type": "ImageObject" as const,
    name: "Arts District gallery street",
    caption:
      "Las Vegas Arts District galleries and murals near downtown condo buildings",
    url: absoluteSiteImage("/images/sections/arts-district-galleries.webp"),
    contentUrl: absoluteSiteImage(
      "/images/sections/arts-district-galleries.webp",
    ),
  },
  {
    "@type": "ImageObject" as const,
    name: "Client reviews conference room",
    caption:
      "Las Vegas real estate conference room representing Google reviews for this GBP",
    url: absoluteSiteImage("/images/sections/client-reviews.webp"),
    contentUrl: absoluteSiteImage("/images/sections/client-reviews.webp"),
  },
];

// Generate LocalBusiness Schema
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": `${siteConfig.url}/#organization`,
    name: businessInfo.name,
    alternateName: [
      "Las Vegas Arts District Condos",
      "Homes by Dr. Jan Duffy",
      "Berkshire Hathaway HomeServices Nevada Properties",
    ],
    description: businessInfo.description,
    image: gbpPhotoObjects.map((photo) => photo.contentUrl),
    photo: gbpPhotoObjects,
    logo: absoluteSiteImage(getAgentImageSrc()),
    url: businessInfo.url,
    telephone: businessInfo.phone.tel,
    email: businessInfo.email,
    priceRange: businessInfo.priceRange,
    foundingDate: businessInfo.foundingDate,
    openingHours: ["Su-Th 09:00-17:00"],
    address: {
      "@type": "PostalAddress",
      ...businessInfo.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    hasMap: [
      officeInfo.maps.place,
      officeInfo.maps.directions,
      officeInfo.maps.reviews,
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Monday",
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Tuesday",
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Wednesday",
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Thursday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
    amenityFeature: [
      ...businessInfo.attributes.amenities,
      ...businessInfo.attributes.accessibility,
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    areaServed: [
      {
        "@type": "GeoCircle",
        name: "Arts District and Downtown Las Vegas",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: businessInfo.geo.latitude,
          longitude: businessInfo.geo.longitude,
        },
        geoRadius: 8000,
      },
      ...businessInfo.serviceAreas.map((area) => ({
        "@type": "Place",
        name: area,
      })),
      ...midtownNeighborhoods.map((area) => ({
        "@type": "Place",
        name: `${area.name}, Las Vegas, NV`,
        url: `${siteConfig.url}/neighborhoods/${area.slug}`,
        geo: {
          "@type": "GeoCoordinates",
          latitude: area.latitude,
          longitude: area.longitude,
        },
      })),
    ],
    knowsAbout: midtownNeighborhoods.map((area) => `${area.name} condos`),
    employee: {
      "@type": "Person",
      name: agentInfo.name,
      jobTitle: agentInfo.title,
      identifier: agentInfo.license,
      telephone: businessInfo.phone.tel,
      url: `${siteConfig.url}/about`,
      image: absoluteSiteImage(getAgentImageSrc()),
      worksFor: {
        "@type": "RealEstateAgent",
        name: agentInfo.brokerage,
      },
    },
    knowsLanguage: businessInfo.languages,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Real Estate Services",
      itemListElement: businessInfo.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
    identifier: {
      "@type": "PropertyValue",
      name: "Google Place ID",
      value: officeInfo.googlePlace.placeId,
    },
    parentOrganization: {
      "@type": "RealEstateAgent",
      name: "Berkshire Hathaway HomeServices Nevada Properties",
    },
    sameAs: [
      ...businessInfo.socialProfiles,
      officeInfo.maps.place,
      `https://www.google.com/maps/place/?q=place_id:${officeInfo.googlePlace.placeId}`,
    ],
    potentialAction: [
      {
        "@type": "ReserveAction",
        name: "Schedule a condo consultation",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/contact`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
      },
      {
        "@type": "CallAction",
        name: "Call Dr. Jan Duffy",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `tel:${businessInfo.phone.tel}`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
      },
      {
        "@type": "FindAction",
        name: "Search midtown Las Vegas condos",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/listings`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
      },
    ],
  };
}

// Generate FAQPage Schema
export function generateFAQSchema(faqs = gbpFAQs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
