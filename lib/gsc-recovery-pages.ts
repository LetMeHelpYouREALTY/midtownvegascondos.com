/**
 * Content for GSC recovery URLs that previously 404'd.
 * Lifestyle amenities tied to Midtown Las Vegas / Arts District development.
 */

import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";

export const midtownLifestylePages = {
  "run-club": {
    slug: "run-club",
    path: "/neighborhood/run-club",
    name: "Midtown Run Club",
    title: "Midtown Run Club | Condos Near Arts District Wellness | Dr. Jan Duffy",
    description:
      "Learn how Midtown Run Club fits condo living in the Las Vegas Arts District. Weekly runs, community training, and walkable midtown residences with Dr. Jan Duffy. Call (702) 500-1980.",
    keywords: [
      "Midtown Run Club Las Vegas",
      "Arts District running club",
      "midtown Las Vegas wellness",
      "condo lifestyle Midtown Vegas",
    ],
    heroKey: "featuredArtsLoft" as const,
    badge: "Midtown lifestyle",
    headline: "Midtown Run Club",
    summary:
      "Wellness moves fast in Midtown. The Midtown Run Club brings weekly group runs, neighbor connections, and marathon training energy to the Arts District condo corridor.",
    addressLabel: "921 S Main St area · Arts District, Las Vegas, NV",
    highlights: [
      "Weekly group runs open to residents and neighbors",
      "Training path toward Las Vegas Marathon goals",
      "Walkable start near Midtown Plaza and Arts District dining",
      "Pairs with condo living that puts miles outside your lobby",
    ],
    body: [
      "Buyers comparing midtown Las Vegas condos often ask about more than square footage — they ask how the neighborhood feels at 6 a.m. Midtown Run Club answers that with structured weekly runs around the Arts District and Main Street corridor.",
      "If you want a home base near First Friday galleries, chef-driven dining, and a community that trains together, Dr. Jan Duffy maps buildings within an easy warm-up of Midtown amenities — including The English Residences and Plaza Tower inventory when available.",
      `Call ${agentInfo.phone} to tour midtown condos that match your pace: ground-floor walkability, gym access, and parking for race mornings.`,
    ],
    faqs: [
      {
        question: "What is Midtown Run Club in Las Vegas?",
        answer:
          "Midtown Run Club is a community running group tied to the Midtown Las Vegas Arts District neighborhood — weekly runs, social connections, and training that can lead toward the Las Vegas Marathon.",
      },
      {
        question: "Which condos are closest to Midtown Run Club meetups?",
        answer:
          "Arts District lofts, Midtown Plaza residences, and The English Residences sit in the same walkable Main Street / Charleston corridor. Dr. Jan Duffy matches floor plans to your commute and training schedule.",
      },
    ],
    relatedLinks: [
      { href: "/neighborhoods/arts-district", label: "Arts District condos" },
      { href: "/neighborhoods/the-english-residences", label: "The English Residences" },
      { href: "/neighborhood/ev-program", label: "Midtown EV Program" },
    ],
  },
  "ev-program": {
    slug: "ev-program",
    path: "/neighborhood/ev-program",
    name: "Midtown EV Vehicle Program",
    title: "Midtown EV Program | Condo Living with Shared EVs | Dr. Jan Duffy",
    description:
      "Midtown Las Vegas EV Vehicle Program for condo residents — reserve, drive, and charge shared electric vehicles near 921 S Main St. Tour midtown condos with Dr. Jan Duffy at (702) 500-1980.",
    keywords: [
      "Midtown Las Vegas EV program",
      "Arts District electric vehicles",
      "condo EV share Las Vegas",
      "sustainable midtown living",
    ],
    heroKey: "featuredSymphony" as const,
    badge: "Sustainable midtown living",
    headline: "Midtown EV Vehicle Program",
    summary:
      "Midtown’s EV share program is designed for residents who want electric mobility at the doorstep — reserve, drive, and charge without owning a second car downtown.",
    addressLabel: "921 South Main Street, Las Vegas, NV 89101",
    highlights: [
      "Resident-oriented EV access near Midtown Plaza Tower",
      "Reserve / drive / charge workflow for last-mile trips",
      "Pairs with walkable Arts District condo ownership",
      "Ask about parking, charging stalls, and HOA rules before you buy",
    ],
    body: [
      "The Midtown EV Vehicle Program (featured by Midtown Las Vegas at 921 S Main Street) targets residents who want flexible electric mobility without keeping a second vehicle in a downtown garage.",
      "When you tour midtown condos with Dr. Jan Duffy, she flags which buildings advertise EV share access, dedicated charging, or assigned stalls — and which HOA docs still need buyer review for fees and usage caps.",
      "California relocators and strip-adjacent professionals often shortlist midtown partly for this amenity stack: walkability plus on-demand EVs for airport runs and errands.",
    ],
    faqs: [
      {
        question: "Does every midtown condo include the EV program?",
        answer:
          "No. The EV Vehicle Program is tied to the Midtown Las Vegas development amenities. Availability depends on the residence and developer offerings — verify in writing before closing.",
      },
      {
        question: "Where is the Midtown EV program based?",
        answer:
          "Midtown lists the EV Vehicle Program at 921 South Main Street in the Las Vegas Arts District, alongside The English Residences and Plaza Tower projects.",
      },
    ],
    relatedLinks: [
      { href: "/neighborhoods/midtown-plaza", label: "Midtown Plaza condos" },
      { href: "/neighborhoods/the-english-residences", label: "The English Residences" },
      { href: "/neighborhood/run-club", label: "Midtown Run Club" },
    ],
  },
  "pepper-club": {
    slug: "pepper-club",
    path: "/neighborhood/pepper-club",
    name: "The Pepper Club",
    title: "The Pepper Club Midtown Las Vegas | Dining Near Condos | Dr. Jan Duffy",
    description:
      "The Pepper Club at Midtown Las Vegas / The English Hotel — chef-driven dining in the Arts District condo corridor. Tour nearby residences with Dr. Jan Duffy. Call (702) 500-1980.",
    keywords: [
      "Pepper Club Las Vegas",
      "Midtown Las Vegas dining",
      "English Hotel restaurant",
      "Arts District condo lifestyle",
    ],
    heroKey: "featuredStripView" as const,
    badge: "Arts District dining",
    headline: "The Pepper Club at Midtown",
    summary:
      "The Pepper Club put chef-driven plates and cocktails on the Midtown map — a culinary anchor for condo buyers who want dinner downstairs from Arts District living.",
    addressLabel: "Midtown / The English Hotel · Arts District, Las Vegas, NV",
    highlights: [
      "Chef Bruce Kalman culinary showcase venue for Midtown events",
      "Steps from The English Residences condo-hotel concept",
      "Nightlife and dining density that supports walkable ownership",
      "Confirm current Midtown F&B concepts when you tour — menus evolve",
    ],
    body: [
      "The Pepper Club launched as Midtown’s social dining room — the kind of place buyers mention when they say they want walkable nights near galleries and residences.",
      "Dining concepts at Midtown change as the neighborhood builds out. Use this page as your lifestyle brief, then ask Dr. Jan Duffy which restaurants, speakeasies, and hotel F&B outlets are operating when you schedule showings at The English Residences or nearby lofts.",
      `Office: ${officeInfo.address.full}. Call ${agentInfo.phone} for a Midtown condo tour that includes dinner-walk distance from your shortlist.`,
    ],
    faqs: [
      {
        question: "Is The Pepper Club still open in Midtown Las Vegas?",
        answer:
          "Midtown dining concepts have evolved since The Pepper Club’s launch at The English Hotel. Confirm the current restaurant lineup when you tour — Dr. Jan Duffy tracks what is open near active condo inventory.",
      },
      {
        question: "Which condos are near The Pepper Club / English Hotel dining?",
        answer:
          "The English Residences, Midtown Plaza, and Arts District lofts sit in the same Main Street corridor. Dr. Jan matches buildings to your budget and walk-score priorities.",
      },
    ],
    relatedLinks: [
      { href: "/neighborhoods/the-english-residences", label: "The English Residences" },
      { href: "/neighborhoods/arts-district", label: "Arts District condos" },
      { href: "/neighborhood/run-club", label: "Midtown Run Club" },
    ],
  },
} as const;

export type MidtownLifestyleSlug = keyof typeof midtownLifestylePages;

export const blogPosts = [
  {
    slug: "midtown-condo-market-update",
    title: "Midtown Las Vegas Condo Market Update",
    description:
      "Median prices, days on market, and buyer demand for Arts District and downtown high-rise condos.",
    href: "/market-update",
    date: "2026-07-02",
    category: "Market",
  },
  {
    slug: "las-vegas-market-insights-2026",
    title: "Las Vegas Real Estate Insights 2026",
    description:
      "Migration, tech, and inventory forces shaping midtown and valley-wide pricing.",
    href: "/market-insights",
    date: "2026-06-15",
    category: "Analysis",
  },
  {
    slug: "midtown-real-estate-guide",
    title: "Complete Midtown Real Estate Guide",
    description:
      "Neighborhoods, buildings, HOA checks, and how to buy a midtown condo with BHHS representation.",
    href: "/midtown-real-estate",
    date: "2026-07-09",
    category: "Guides",
  },
  {
    slug: "english-residences-buyer-notes",
    title: "Buying at The English Residences",
    description:
      "Condo-hotel ownership, amenities, and what to verify before you write an offer.",
    href: "/neighborhoods/the-english-residences",
    date: "2026-05-20",
    category: "Buildings",
  },
  {
    slug: "midtown-run-club-lifestyle",
    title: "Condo Living Near Midtown Run Club",
    description:
      "How weekly runs and walkable miles factor into Arts District condo shortlists.",
    href: "/neighborhood/run-club",
    date: "2026-05-08",
    category: "Lifestyle",
  },
  {
    slug: "midtown-ev-program",
    title: "Midtown EV Program for Condo Residents",
    description:
      "Shared electric vehicles, charging, and sustainable living near 921 S Main St.",
    href: "/neighborhood/ev-program",
    date: "2026-04-27",
    category: "Lifestyle",
  },
  {
    slug: "pepper-club-dining-corridor",
    title: "Dining Near Midtown Condos: Pepper Club Corridor",
    description:
      "Chef-driven dining and nightlife that support walkable ownership in Midtown.",
    href: "/neighborhood/pepper-club",
    date: "2026-04-16",
    category: "Lifestyle",
  },
  {
    slug: "faq-midtown-condos",
    title: "Midtown Condo FAQ",
    description:
      "HOA fees, rental rules, parking, and building comparisons answered.",
    href: "/faq",
    date: "2026-03-30",
    category: "FAQ",
  },
] as const;

export function generateLifestylePageSchema(slug: MidtownLifestyleSlug) {
  const page = midtownLifestylePages[slug];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}${page.path}#webpage`,
        url: `${siteConfig.url}${page.path}`,
        name: page.headline,
        description: page.description,
        isPartOf: { "@id": `${siteConfig.url}#website` },
        about: {
          "@type": "Place",
          name: "Midtown Las Vegas",
          address: {
            "@type": "PostalAddress",
            streetAddress: "921 South Main Street",
            addressLocality: "Las Vegas",
            addressRegion: "NV",
            postalCode: "89101",
            addressCountry: "US",
          },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Midtown Neighborhood Lifestyle",
            item: `${siteConfig.url}/neighborhood`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.name,
            item: `${siteConfig.url}${page.path}`,
          },
        ],
      },
    ],
  };
}
