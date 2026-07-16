/**
 * Google Maps Platform — Commute times widget
 * Embed: Maps Solutions (storage.googleapis.com)
 * Used site-wide for GEO / local SEO / AEO commute answers.
 */

import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";

export const COMMUTES_MAP_EMBED_URL =
  "https://storage.googleapis.com/maps-solutions-gurx0m5wr9/commutes/nulb/commutes.html";

export const COMMUTES_MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  officeInfo.address.full
)}`;

export const COMMUTES_MAP_PLACE_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${officeInfo.name} ${officeInfo.address.full}`
)}`;

/** Destinations shoppers commonly check from midtown / office (AEO answer fodder). */
export const commuteDestinations = [
  {
    name: "Las Vegas Strip",
    description:
      "Midtown condo towers typically reach the Strip in about 10–20 minutes by car, depending on traffic.",
  },
  {
    name: "Harry Reid International Airport (LAS)",
    description:
      "Airport drives from midtown Las Vegas commonly take about 15–25 minutes without peak congestion.",
  },
  {
    name: "Downtown Las Vegas / Fremont Street",
    description:
      "Downtown and Fremont East are often 5–15 minutes from midtown condo corridors.",
  },
  {
    name: "Summerlin",
    description:
      "Summerlin is commonly 20–35 minutes west of midtown via US-95 / Summerlin Parkway.",
  },
  {
    name: "Henderson",
    description:
      "Henderson corridors are often 20–35 minutes southeast via I-215 / I-15.",
  },
] as const;

export const commuteFaqs = [
  {
    question: "How long is the commute from midtown Las Vegas condos to the Strip?",
    answer:
      "Most midtown Las Vegas condo locations reach the Las Vegas Strip in about 10–20 minutes by car. Use the live commute map on midtownvegascondos.com to check drive times for your exact tower and departure time.",
  },
  {
    question: "How far is Harry Reid International Airport from midtown Las Vegas?",
    answer:
      "Harry Reid International Airport (LAS) is typically a 15–25 minute drive from midtown Las Vegas condo areas, subject to traffic. Enter LAS on the commute map for live estimates.",
  },
  {
    question: "Where is Las Vegas Arts District Condos | Homes by Dr. Jan Duffy located?",
    answer: `The business location is ${officeInfo.address.full} in the Arts District / Downtown Las Vegas corridor. Call ${agentInfo.phone} for directions or to schedule an appointment.`,
  },
  {
    question: "Can I check commute times before buying a midtown Las Vegas condo?",
    answer:
      "Yes. The on-site Google Commute Times map lets you compare drive times from midtown Las Vegas to work, school campuses, the airport, and other destinations before you write an offer. Ask Dr. Jan Duffy to walk through routes on a showing.",
  },
] as const;

export function generateCommutesMapSchemaGraph(): Record<string, unknown> {
  const pageId = `${siteConfig.url}/#commutes-map`;
  const placeId = `${siteConfig.url}/#office-place`;
  const mapId = `${siteConfig.url}/#google-commutes-map`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Map",
        "@id": mapId,
        name: "Las Vegas midtown condo commute times map",
        description:
          "Interactive Google commute-times map for midtown Las Vegas condominiums, the BHHS Nevada Properties office, and valley destinations.",
        url: COMMUTES_MAP_EMBED_URL,
        mapType: "TransitMap",
        isAccessibleForFree: true,
        inLanguage: "en-US",
        about: { "@id": placeId },
        provider: {
          "@type": "Organization",
          name: "Google Maps Platform",
          url: "https://mapsplatform.google.com/",
        },
        creator: {
          "@type": "RealEstateAgent",
          "@id": `${siteConfig.url}#organization`,
          name: agentInfo.name,
        },
      },
      {
        "@type": "Place",
        "@id": placeId,
        name: officeInfo.name,
        description:
          "Berkshire Hathaway HomeServices Nevada Properties office serving midtown Las Vegas condo buyers and sellers.",
        hasMap: COMMUTES_MAP_PLACE_URL,
        geo: {
          "@type": "GeoCoordinates",
          latitude: officeInfo.coordinates.lat,
          longitude: officeInfo.coordinates.lng,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: officeInfo.address.street,
          addressLocality: officeInfo.address.city,
          addressRegion: officeInfo.address.state,
          postalCode: officeInfo.address.zip,
          addressCountry: "US",
        },
        telephone: agentInfo.phoneTel.replace("tel:", ""),
      },
      {
        "@type": "WebPageElement",
        "@id": pageId,
        name: "Check Las Vegas commute times from midtown condos",
        description:
          "Use the live Google Commute Times widget to compare drive times from midtown Las Vegas condominiums to work, airport, Strip, Summerlin, and Henderson.",
        isPartOf: { "@id": `${siteConfig.url}#website` },
        about: { "@id": placeId },
        spatialCoverage: {
          "@type": "Place",
          name: "Las Vegas Valley, Nevada",
          geo: {
            "@type": "GeoCoordinates",
            latitude: 36.1699,
            longitude: -115.1398,
          },
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [
            "[data-commute-heading]",
            "[data-commute-summary]",
            "[data-commute-faq]",
          ],
        },
        mainEntity: { "@id": mapId },
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#commute-destinations`,
        name: "Common commute destinations from midtown Las Vegas",
        itemListElement: commuteDestinations.map((dest, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: dest.name,
          description: dest.description,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#commute-faq`,
        mainEntity: commuteFaqs.map((faq) => ({
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
