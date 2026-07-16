// Google Business Profile Schema Data
// NAP / hours / categories must match GBP exactly for midtownvegascondos.com

import { getAgentImageSrc, officeInfo, siteConfig } from "./site-config";

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
    { name: "Buyer Representation", description: "Full-service home buying assistance" },
    { name: "Seller Representation", description: "List and sell your home for top dollar" },
    { name: "Luxury Condo Sales", description: "High-rise and Arts District condominiums" },
    { name: "Downtown Las Vegas Condos", description: "Downtown and Arts District condo expertise" },
    { name: "California Relocation Services", description: "Helping CA buyers transition to Las Vegas" },
    { name: "First-Time Home Buyer Guidance", description: "FHA, VA, down payment assistance" },
    { name: "Investment Property Consulting", description: "Rental properties and investment analysis" },
    { name: "Online Appointments", description: "Schedule consultations and showings online" },
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

  // Social profiles for sameAs schema
  socialProfiles: [
    "https://www.linkedin.com/company/downtown-las-vegas-condos-and-homes-for-sale",
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
    question: "Where is Las Vegas Arts District Condos | Homes by Dr. Jan Duffy located?",
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
    image: getAgentImageSrc(),
    url: businessInfo.url,
    telephone: businessInfo.phone.tel,
    email: businessInfo.email,
    priceRange: businessInfo.priceRange,
    foundingDate: businessInfo.foundingDate,
    address: {
      "@type": "PostalAddress",
      ...businessInfo.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    hasMap: [officeInfo.maps.place, officeInfo.maps.directions],
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
    areaServed: businessInfo.serviceAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
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
    sameAs: businessInfo.socialProfiles,
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
