import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import DeferredRealScoutWidget from "@/components/realscout/DeferredRealScoutWidget";
import SchemaScript from "@/components/SchemaScript";
import PageHero from "@/components/sections/PageHero";
import Link from "next/link";
import {
  Phone,
  CheckCircle,
  ArrowRight,
  Building2,
  MapPin,
  Search,
} from "lucide-react";
import type { Metadata } from "next";
import { withPageHeroMetadata } from "@/lib/image-seo";
import { midtownNeighborhoods } from "@/lib/hyperlocal-content";
import { agentInfo, officeInfo, marketStats, siteConfig } from "@/lib/site-config";

const PATH = "/listings";

const faqs = [
  {
    question: "How do I search midtown Las Vegas condos for sale?",
    answer:
      "Use the live MLS search on this page, filter by condo/townhome, then shortlist Arts District, Symphony Park, One Las Vegas, Juhl, Palms Place, or The English Residences. Call Dr. Jan Duffy at (702) 500-1980 for a curated list matched to HOA dues and rental rules.",
  },
  {
    question: "Are these listings updated from the MLS?",
    answer:
      "Yes. The RealScout office listings widget pulls active for-sale inventory. Status and price can change between page loads — confirm details with Dr. Jan before you write an offer.",
  },
  {
    question: "What is the median midtown condo price?",
    answer: `As of ${marketStats.lastUpdated}, the midtown condo median is about ${marketStats.midtown.medianPriceFormatted} with roughly ${marketStats.midtown.daysOnMarket} days on market. Live comps beat any static number — call ${agentInfo.phone}.`,
  },
  {
    question: "Can I search Strip-view and downtown high-rises here?",
    answer:
      "Yes. Sort newest for-sale inventory, then ask Dr. Jan to filter for high-rise vs loft conversions, parking, and view premiums near Main Street and the Arts District.",
  },
];

export const metadata: Metadata = {
  ...withPageHeroMetadata(PATH, {
    title: "Midtown Las Vegas Condos for Sale | Live MLS Listings | Dr. Jan Duffy",
    description:
      "Search live MLS midtown Las Vegas condos for sale — Arts District lofts, high-rises, The English Residences, and downtown inventory. Dr. Jan Duffy, BHHS Nevada. Call (702) 500-1980.",
    keywords: [
      "midtown Las Vegas condos for sale",
      "Las Vegas MLS listings",
      "Arts District condos",
      "downtown Las Vegas condos for sale",
      "Dr Jan Duffy listings",
    ],
  }),
  robots: { index: true, follow: true },
  alternates: { canonical: PATH },
};

const listingsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteConfig.url}/listings#webpage`,
      url: `${siteConfig.url}/listings`,
      name: "Midtown Las Vegas Condos for Sale — Live MLS Search",
      description:
        "Live MLS search and midtown condo buying guide for Las Vegas Arts District, downtown high-rises, and condo-hotel residences.",
      isPartOf: { "@id": `${siteConfig.url}#website` },
      about: {
        "@type": "Place",
        name: "Midtown Las Vegas",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Las Vegas",
          addressRegion: "NV",
          addressCountry: "US",
        },
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "[data-listings-summary]", "[data-listings-faq]"],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/listings#faq`,
      mainEntity: faqs.map((faq) => ({
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
          name: "Listings",
          item: `${siteConfig.url}/listings`,
        },
      ],
    },
    {
      "@type": "RealEstateAgent",
      name: agentInfo.name,
      telephone: agentInfo.phoneTel.replace("tel:", ""),
      url: siteConfig.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: officeInfo.address.street,
        addressLocality: officeInfo.address.city,
        addressRegion: officeInfo.address.state,
        postalCode: officeInfo.address.zip,
        addressCountry: "US",
      },
    },
  ],
};

const searchPaths = [
  { name: "Arts District lofts", href: "/neighborhoods/arts-district" },
  { name: "The English Residences", href: "/neighborhoods/the-english-residences" },
  { name: "Symphony Park", href: "/neighborhoods/symphony-park" },
  { name: "One Las Vegas", href: "/neighborhoods/one-las-vegas" },
  { name: "Juhl", href: "/neighborhoods/juhl" },
  { name: "Palms Place", href: "/neighborhoods/palms-place" },
  { name: "Midtown Plaza", href: "/neighborhoods/midtown-plaza" },
  { name: "Fremont East", href: "/neighborhoods/fremont-east" },
];

const buyingTips = [
  "Confirm HOA reserves, special assessments, and rental caps in the CC&Rs before you write.",
  "Compare parking deeded vs assigned — downtown towers price parking separately.",
  "Ask for recent sold comps in the same building, not just neighborhood averages.",
  "Verify short-term rental rules if investment yield is part of your plan.",
  "Walk the block at night — Arts District foot traffic is part of the product.",
];

export default function ListingsPage() {
  return (
    <>
      <SchemaScript schema={listingsSchema} id="listings-schema" />
      <Navbar />
      <PageHero
        imageKey="listingsSearch"
        pagePath={PATH}
        badge="Live MLS · Berkshire Hathaway HomeServices Nevada Properties"
        title="Midtown Las Vegas condos for sale"
        subtitle="Search active MLS inventory, then shortlist Arts District lofts and downtown high-rises with Dr. Jan Duffy."
        priority
      >
        <p data-listings-summary className="text-lg text-white/85 max-w-3xl mx-auto mb-6">
          Midtown median about {marketStats.midtown.medianPriceFormatted} (
          {marketStats.lastUpdated}). Use the live search below, then call {agentInfo.phone} for
          building-level comps.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
          <span className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-400 mr-1" /> Live MLS feed
          </span>
          <span className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-400 mr-1" /> Condo specialist
          </span>
          <span className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-400 mr-1" /> HOA & CC&R review
          </span>
        </div>
      </PageHero>

      <main className="pb-16">
        <div className="container mx-auto px-4">
          <nav className="max-w-6xl mx-auto mb-8 pt-6 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            {" / "}
            <span className="text-slate-900">Listings</span>
          </nav>

          <section className="mb-14 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Search className="h-6 w-6 text-blue-600" />
              How to use this MLS search
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              This page is your midtown condo search hub — not a generic valley dump. Start with
              for-sale inventory, then filter toward condominiums and townhomes. When a building
              looks right, open the neighborhood guide for HOA context and walkability notes, then
              book a showing with Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Office: {officeInfo.address.full}. License {agentInfo.license}. Also explore{" "}
              <Link href="/midtown-real-estate" className="text-blue-600 font-medium">
                midtown real estate
              </Link>{" "}
              and the{" "}
              <Link href="/blog" className="text-blue-600 font-medium">
                condo blog
              </Link>{" "}
              for market notes.
            </p>
          </section>

          {/* Live MLS — keep widget, surround with crawlable copy */}
          <section className="mb-16" aria-labelledby="live-mls">
            <h2 id="live-mls" className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Live MLS listings
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Active for-sale properties via RealScout. Prices and status update with the MLS —
              treat this as your discovery layer, then verify details before offers.
            </p>
            <div className="max-w-7xl mx-auto">
              <DeferredRealScoutWidget
                html={`<realscout-office-listings 
                    agent-encoded-id="QWdlbnQtMjI1MDUw" 
                    sort-order="NEWEST" 
                    listing-status="For Sale" 
                    property-types=",SFR,MF,TC,CND"
                  ></realscout-office-listings>`}
                minHeight="480px"
              />
            </div>
          </section>

          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">
              Midtown search shortcuts
            </h2>
            <p className="text-slate-600 text-center max-w-2xl mx-auto mb-8">
              Jump to hyperlocal condo pages Google and buyers already care about — each has unique
              inventory notes and FAQs.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {searchPaths.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-slate-200 bg-white p-4 hover:border-blue-300 transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-900">{item.name}</span>
                  <ArrowRight className="h-4 w-4 text-blue-600" />
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Midtown market snapshot</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  {marketStats.midtown.medianPriceFormatted}
                </div>
                <div className="text-slate-300 text-sm">Midtown median</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-1">
                  {marketStats.midtown.yearOverYearChange}
                </div>
                <div className="text-slate-300 text-sm">YoY change</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">{marketStats.midtown.daysOnMarket}</div>
                <div className="text-slate-300 text-sm">Days on market</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400 mb-1">
                  ${marketStats.midtown.pricePerSqFt}
                </div>
                <div className="text-slate-300 text-sm">Approx. $/sq ft</div>
              </div>
            </div>
            <p className="text-center text-slate-400 text-xs mt-6">
              Updated {marketStats.lastUpdated}. Call {agentInfo.phone} for MLS-verified building comps.
            </p>
          </section>

          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center flex items-center justify-center gap-2">
              <Building2 className="h-7 w-7 text-blue-600" />
              Midtown condo neighborhoods
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {midtownNeighborhoods.map((area) => (
                <Link
                  key={area.slug}
                  href={`/neighborhoods/${area.slug}`}
                  className="rounded-xl border border-slate-200 p-5 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between gap-3 mb-2">
                    <h3 className="font-bold text-slate-900">{area.name}</h3>
                    <span className="text-sm font-semibold text-blue-600">{area.medianPrice}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{area.description}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {area.priceChange} YoY · View condos
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Condo buyer checklist before you offer
            </h2>
            <ul className="space-y-3">
              {buyingTips.map((tip) => (
                <li key={tip} className="flex gap-3 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16 max-w-4xl mx-auto" aria-labelledby="listings-faq">
            <h2 id="listings-faq" className="text-2xl font-bold text-slate-900 mb-4">
              Listings FAQ
            </h2>
            <dl className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  data-listings-faq
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <dt className="font-semibold text-slate-900">{faq.question}</dt>
                  <dd className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl bg-slate-900 text-white p-8 md:p-12 max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Get a curated midtown shortlist</h2>
            <p className="text-slate-300 mb-2">
              {agentInfo.name}, {agentInfo.title} · License {agentInfo.license}
            </p>
            <p className="text-slate-400 text-sm mb-6">{officeInfo.address.full}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call {agentInfo.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 font-semibold hover:bg-white/10"
              >
                Schedule a consultation
              </Link>
            </div>
          </section>
        </div>
        <RealScoutListings />
      </main>
      <Footer />
    </>
  );
}
