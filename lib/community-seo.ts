/**
 * SEO / GEO / AEO schema helpers for valley community pages
 * (Southern Highlands + 55+ communities restored for GSC indexing).
 */

import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";

export type CommunityFaq = { question: string; answer: string };

export type CommunitySeoInput = {
  path: string;
  name: string;
  description: string;
  locality: string;
  region?: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  faqs: CommunityFaq[];
  /** e.g. HousingDevelopment, Place, ResidenceCommunity */
  placeType?: string;
};

export function generateCommunityPageSchema(input: CommunitySeoInput) {
  const url = `${siteConfig.url}${input.path}`;
  const region = input.region ?? "NV";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: input.name,
        description: input.description,
        isPartOf: { "@id": `${siteConfig.url}#website` },
        about: { "@id": `${url}#place` },
        primaryImageOfPage: { "@id": `${url}#hero-image` },
        inLanguage: "en-US",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "[data-community-summary]", "[data-community-faq]"],
        },
      },
      {
        "@type": input.placeType ?? "Place",
        "@id": `${url}#place`,
        name: input.name,
        description: input.description,
        url,
        geo: {
          "@type": "GeoCoordinates",
          latitude: input.latitude,
          longitude: input.longitude,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: input.locality,
          addressRegion: region,
          ...(input.postalCode ? { postalCode: input.postalCode } : {}),
          addressCountry: "US",
        },
      },
      {
        "@type": "BreadcrumbList",
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
            name: input.path.includes("55-plus")
              ? "55+ Communities"
              : "Neighborhoods",
            item: input.path.includes("55-plus")
              ? `${siteConfig.url}/55-plus-communities`
              : `${siteConfig.url}/neighborhoods`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: input.name,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: input.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "RealEstateAgent",
        name: agentInfo.name,
        url: siteConfig.url,
        telephone: agentInfo.phoneTel.replace("tel:", ""),
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
          name: input.name,
        },
      },
    ],
  };
}
