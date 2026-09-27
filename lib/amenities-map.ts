/**
 * Hyperlocal amenity map — Midtown Las Vegas / Arts District corridor
 * Center: 921 South Main Street (GBP office / Midtown Las Vegas development)
 * Coordinates from site-config (Nominatim pin for the office address).
 */

import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";

export const AMENITIES_PAGE_PATH = "/amenities";

/** Community anchor for map search and schema */
export const communityAmenitiesConfig = {
  name: "Midtown Las Vegas",
  fullName: "Midtown Las Vegas & Arts District",
  city: "Las Vegas",
  state: "NV",
  center: {
    lat: officeInfo.coordinates.lat,
    lng: officeInfo.coordinates.lng,
  },
  /** Condo / high-rise profile — category chip order per spec */
  profile: "condo" as const,
  communityMarkerLabel: "Midtown Las Vegas / Arts District",
  communityAddress: officeInfo.address.full,
};

export const AMENITY_MAP_EMBED_URL = `https://www.google.com/maps?q=${communityAmenitiesConfig.center.lat},${communityAmenitiesConfig.center.lng}&z=14&output=embed`;

export const AMENITY_MAP_RADIUS_METERS = 2500;

export type AmenityCategoryId =
  | "restaurants"
  | "entertainment"
  | "parking"
  | "grocery"
  | "fitness"
  | "cafes"
  | "parks"
  | "healthcare"
  | "pharmacies"
  | "shopping"
  | "golf"
  | "schools";

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Places API (New) includedPrimaryTypes */
  primaryTypes: string[];
  ariaLabel: string;
};

/** Condo/high-rise order: dining & entertainment first; schools last */
export const amenityCategories: AmenityCategory[] = [
  {
    id: "restaurants",
    label: "Restaurants",
    primaryTypes: ["restaurant"],
    ariaLabel: "Show restaurants near Midtown Las Vegas",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    primaryTypes: ["tourist_attraction", "museum", "performing_arts_theater"],
    ariaLabel: "Show entertainment and attractions near Midtown Las Vegas",
  },
  {
    id: "parking",
    label: "Parking",
    primaryTypes: ["parking"],
    ariaLabel: "Show parking near Midtown Las Vegas",
  },
  {
    id: "grocery",
    label: "Grocery",
    primaryTypes: ["grocery_store", "supermarket"],
    ariaLabel: "Show grocery stores near Midtown Las Vegas",
  },
  {
    id: "fitness",
    label: "Fitness",
    primaryTypes: ["gym", "fitness_center"],
    ariaLabel: "Show gyms and fitness centers near Midtown Las Vegas",
  },
  {
    id: "cafes",
    label: "Cafes",
    primaryTypes: ["cafe", "coffee_shop"],
    ariaLabel: "Show cafes near Midtown Las Vegas",
  },
  {
    id: "parks",
    label: "Parks",
    primaryTypes: ["park"],
    ariaLabel: "Show parks near Midtown Las Vegas",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    primaryTypes: ["hospital", "doctor"],
    ariaLabel: "Show hospitals and clinics near Midtown Las Vegas",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    primaryTypes: ["pharmacy", "drugstore"],
    ariaLabel: "Show pharmacies near Midtown Las Vegas",
  },
  {
    id: "shopping",
    label: "Shopping",
    primaryTypes: ["shopping_mall", "department_store"],
    ariaLabel: "Show shopping near Midtown Las Vegas",
  },
  {
    id: "golf",
    label: "Golf",
    primaryTypes: ["golf_course"],
    ariaLabel: "Show golf courses near Midtown Las Vegas",
  },
  {
    id: "schools",
    label: "Schools",
    primaryTypes: ["school", "university"],
    ariaLabel: "Show schools near Midtown Las Vegas",
  },
];

export type CuratedPlace = {
  name: string;
  address: string;
  categories: AmenityCategoryId[];
  schemaType:
    | "Restaurant"
    | "CafeOrCoffeeShop"
    | "GroceryStore"
    | "Park"
    | "GolfCourse"
    | "Hospital"
    | "Pharmacy"
    | "ShoppingCenter"
    | "ParkingFacility"
    | "ExerciseGym"
    | "TouristAttraction"
    | "School"
    | "Place";
};

/**
 * Verified public venues — used for fallback list, page copy, and ItemList schema.
 * Omit anything that cannot be confirmed at a stable street address.
 */
export const curatedNearbyPlaces: CuratedPlace[] = [
  {
    name: "Esther's Kitchen",
    address: "1130 S Main St, Las Vegas, NV 89101",
    categories: ["restaurants"],
    schemaType: "Restaurant",
  },
  {
    name: "Main Street Provisions",
    address: "1120 S Main St, Las Vegas, NV 89101",
    categories: ["restaurants", "cafes"],
    schemaType: "Restaurant",
  },
  {
    name: "The Pepper Club",
    address: "921 S Main St, Las Vegas, NV 89101",
    categories: ["restaurants", "entertainment"],
    schemaType: "Restaurant",
  },
  {
    name: "The Mob Museum",
    address: "300 Stewart Ave, Las Vegas, NV 89101",
    categories: ["entertainment"],
    schemaType: "TouristAttraction",
  },
  {
    name: "Downtown Container Park",
    address: "707 Fremont St, Las Vegas, NV 89101",
    categories: ["entertainment", "shopping"],
    schemaType: "TouristAttraction",
  },
  {
    name: "Fremont Street Experience",
    address: "425 Fremont St, Las Vegas, NV 89101",
    categories: ["entertainment"],
    schemaType: "TouristAttraction",
  },
  {
    name: "The Smith Center for the Performing Arts",
    address: "361 Symphony Park Ave, Las Vegas, NV 89106",
    categories: ["entertainment"],
    schemaType: "TouristAttraction",
  },
  {
    name: "Symphony Park",
    address: "Symphony Park Ave, Las Vegas, NV 89106",
    categories: ["parks", "entertainment"],
    schemaType: "Park",
  },
  {
    name: "Smith's Food and Drug",
    address: "4751 W Charleston Blvd, Las Vegas, NV 89102",
    categories: ["grocery"],
    schemaType: "GroceryStore",
  },
  {
    name: "La Bonita Supermarket",
    address: "2400 E Charleston Blvd, Las Vegas, NV 89104",
    categories: ["grocery"],
    schemaType: "GroceryStore",
  },
  {
    name: "University Medical Center",
    address: "1800 W Charleston Blvd, Las Vegas, NV 89102",
    categories: ["healthcare"],
    schemaType: "Hospital",
  },
  {
    name: "CVS Pharmacy",
    address: "425 S Main St, Las Vegas, NV 89101",
    categories: ["pharmacies"],
    schemaType: "Pharmacy",
  },
  {
    name: "The Shops at Crystals",
    address: "3720 S Las Vegas Blvd, Las Vegas, NV 89158",
    categories: ["shopping"],
    schemaType: "ShoppingCenter",
  },
  {
    name: "Bali Hai Golf Club",
    address: "5160 Las Vegas Blvd S, Las Vegas, NV 89119",
    categories: ["golf"],
    schemaType: "GolfCourse",
  },
  {
    name: "EōS Fitness",
    address: "1500 E Charleston Blvd, Las Vegas, NV 89104",
    categories: ["fitness"],
    schemaType: "ExerciseGym",
  },
  {
    name: "Rancho High School",
    address: "1895 S Rancho Dr, Las Vegas, NV 89102",
    categories: ["schools"],
    schemaType: "School",
  },
];

export function getCuratedPlacesForCategory(
  categoryId: AmenityCategoryId
): CuratedPlace[] {
  return curatedNearbyPlaces.filter((p) => p.categories.includes(categoryId));
}

export const amenityWrittenSections = [
  {
    id: "dining",
    title: "Dining near Midtown Las Vegas condos",
    body: `The Arts District and Main Street corridor put chef-driven dining within walking distance of midtown towers. Esther's Kitchen and Main Street Provisions anchor South Main Street, and Midtown Las Vegas at ${officeInfo.address.street} hosts evolving restaurant concepts such as The Pepper Club. Buyers who want a walkable dinner after a showing should tour buildings on both sides of Charleston Boulevard.`,
  },
  {
    id: "entertainment",
    title: "Entertainment & attractions",
    body:
      "The Mob Museum, Fremont Street Experience, and Downtown Container Park are established downtown destinations a short drive—or in some cases a brisk walk—from Arts District condos. The Smith Center and Symphony Park add performing-arts and park space north of the core midtown high-rises.",
  },
  {
    id: "grocery",
    title: "Grocery & everyday errands",
    body:
      "Smith's Food and Drug on West Charleston Boulevard and La Bonita Supermarket on East Charleston Boulevard are full-service grocers commonly used by downtown and midtown residents. Confirm your preferred store when you compare HOA parking and elevator access in each building.",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    body:
      "University Medical Center on West Charleston Boulevard is a major hospital campus serving the Las Vegas urban core. Pharmacies such as the CVS on South Main Street sit closer to the Arts District for prescriptions and quick errands.",
  },
  {
    id: "fitness",
    title: "Fitness",
    body:
      "Many midtown condo buildings include gyms or pool decks; for a larger club footprint, EōS Fitness on East Charleston Boulevard is one option east of the Arts District. Ask Dr. Jan Duffy which towers bundle fitness amenities in HOA dues.",
  },
  {
    id: "shopping-golf",
    title: "Shopping & golf",
    body:
      "The Shops at Crystals on the Las Vegas Strip is a luxury retail destination a short drive from midtown. Bali Hai Golf Club sits south on Las Vegas Boulevard for buyers who want Strip-adjacent golf without leaving the urban core.",
  },
  {
    id: "commute",
    title: "Commute & drive times (approximate)",
    body:
      "From the Midtown / Arts District corridor, the Las Vegas Strip is often about 10–20 minutes by car depending on traffic. Harry Reid International Airport (LAS) is commonly about 15–25 minutes. Downtown Fremont Street is frequently 5–15 minutes. Summerlin is often 20–35 minutes west via US-95; Henderson corridors are often 20–35 minutes southeast. These are approximate—use the commute map on this site for live estimates.",
  },
] as const;

export const amenitiesFaqs = [
  {
    question: "What grocery stores are near Midtown Las Vegas condos?",
    answer:
      "Smith's Food and Drug on West Charleston Boulevard and La Bonita Supermarket on East Charleston Boulevard are two full-service grocers midtown and Arts District buyers commonly use. Use the amenity map on midtownvegascondos.com to see what is closest to your shortlist.",
  },
  {
    question: "How far is Midtown Las Vegas from the Strip?",
    answer:
      "Most midtown Las Vegas and Arts District condo locations reach the Las Vegas Strip in about 10–20 minutes by car, depending on traffic and your tower. That proximity is a core reason buyers choose high-rise living here.",
  },
  {
    question: "Are there hospitals near Midtown Las Vegas?",
    answer:
      "University Medical Center on West Charleston Boulevard is a major hospital serving the downtown and midtown corridor. Confirm emergency routes from your building with Dr. Jan Duffy during a showing.",
  },
  {
    question: "What restaurants are walkable from Arts District condos?",
    answer:
      "South Main Street venues such as Esther's Kitchen and Main Street Provisions are among the walkable dining options in the Arts District. Midtown Las Vegas at 921 South Main Street adds hotel and event dining concepts—verify what is open when you tour.",
  },
  {
    question: "Is there parking near midtown Las Vegas condos?",
    answer:
      "Most condo towers include deeded or assigned garage parking; street and public lots also serve the Arts District. Use the Parking filter on the amenity map to explore nearby parking facilities before you buy.",
  },
  {
    question: "Can I walk to entertainment from midtown condos?",
    answer:
      "Fremont Street Experience, Container Park, and The Mob Museum are established downtown attractions within a short drive or, for some buildings, a walkable distance. The Smith Center and Symphony Park add culture north of the core corridor.",
  },
  {
    question: "Who is the local REALTOR for Midtown Las Vegas condos?",
    answer: `${agentInfo.name} (${agentInfo.license}) with ${agentInfo.brokerage} specializes in Midtown and Arts District condos. Call ${agentInfo.phone} or visit ${officeInfo.address.full} by appointment Sunday–Thursday 9:00 AM–5:00 PM.`,
  },
] as const;

export function getGoogleMapsApiKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  return key && key.length > 0 ? key : undefined;
}

export function getGoogleMapsMapId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim();
  return id && id.length > 0 ? id : undefined;
}

export function directionsUrlForAddress(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export function placeSearchUrl(name: string, address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;
}

export function generateAmenitiesPageSchemaGraph(): Record<string, unknown> {
  const pageUrl = `${siteConfig.url}${AMENITIES_PAGE_PATH}`;
  const communityId = `${pageUrl}#community-place`;
  const agentId = `${siteConfig.url}#organization`;

  const itemListElements = curatedNearbyPlaces.map((place, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": place.schemaType,
      name: place.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: place.address.split(",")[0]?.trim(),
        addressLocality: communityAmenitiesConfig.city,
        addressRegion: communityAmenitiesConfig.state,
        addressCountry: "US",
      },
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Nearby Amenities in ${communityAmenitiesConfig.fullName}, ${communityAmenitiesConfig.city}`,
        description:
          "Interactive map and guide to restaurants, entertainment, grocery, healthcare, and more near Midtown Las Vegas and Arts District condos.",
        isPartOf: { "@id": `${siteConfig.url}#website` },
        about: { "@id": communityId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Nearby Amenities",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Place",
        "@id": communityId,
        name: communityAmenitiesConfig.communityMarkerLabel,
        description:
          "Midtown Las Vegas and Arts District condominium corridor anchored at 921 South Main Street.",
        geo: {
          "@type": "GeoCoordinates",
          latitude: communityAmenitiesConfig.center.lat,
          longitude: communityAmenitiesConfig.center.lng,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: officeInfo.address.street,
          addressLocality: officeInfo.address.city,
          addressRegion: officeInfo.address.state,
          postalCode: officeInfo.address.zip,
          addressCountry: "US",
        },
        hasMap: AMENITY_MAP_EMBED_URL,
      },
      {
        "@type": "RealEstateAgent",
        "@id": agentId,
        name: agentInfo.name,
        telephone: agentInfo.phoneTel.replace("tel:", ""),
        email: agentInfo.email,
        url: siteConfig.url,
        image: `${siteConfig.url}/images/agent/dr-jan-duffy-headshot.jpg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: officeInfo.address.street,
          addressLocality: officeInfo.address.city,
          addressRegion: officeInfo.address.state,
          postalCode: officeInfo.address.zip,
          addressCountry: "US",
        },
        areaServed: {
          "@type": "Place",
          name: `${communityAmenitiesConfig.fullName}, Nevada`,
          geo: {
            "@type": "GeoCoordinates",
            latitude: communityAmenitiesConfig.center.lat,
            longitude: communityAmenitiesConfig.center.lng,
          },
        },
        memberOf: {
          "@type": "Organization",
          name: agentInfo.brokerage,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#featured-amenities`,
        name: `Featured places near ${communityAmenitiesConfig.name}`,
        itemListElement: itemListElements,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: amenitiesFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function generateAmenitySectionSchemaGraph(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "@id": `${siteConfig.url}/#nearby-amenities-section`,
    name: `What's nearby ${communityAmenitiesConfig.name}`,
    description:
      "Interactive amenity map for restaurants, entertainment, grocery, and services near Midtown Las Vegas condos.",
    url: `${siteConfig.url}${AMENITIES_PAGE_PATH}`,
    about: {
      "@type": "Place",
      name: communityAmenitiesConfig.communityMarkerLabel,
      geo: {
        "@type": "GeoCoordinates",
        latitude: communityAmenitiesConfig.center.lat,
        longitude: communityAmenitiesConfig.center.lng,
      },
    },
  };
}
