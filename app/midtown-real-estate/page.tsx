import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PageHero from "@/components/sections/PageHero";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { Phone, ArrowRight, Building2, CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import { withPageHeroMetadata } from "@/lib/image-seo";
import { midtownNeighborhoods } from "@/lib/hyperlocal-content";
import { agentInfo, officeInfo, marketStats, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = withPageHeroMetadata("/midtown-real-estate", {
  title: "Midtown Real Estate Las Vegas | Condos for Sale | Dr. Jan Duffy",
  description:
    "Midtown real estate in Las Vegas — Arts District lofts, high-rises, The English Residences, and downtown condos. Expert buying and selling with Dr. Jan Duffy, BHHS Nevada. Call (702) 500-1980.",
  keywords: [
    "midtown real estate Las Vegas",
    "midtown Las Vegas condos for sale",
    "Arts District real estate",
    "downtown Las Vegas condos",
    "Dr Jan Duffy realtor",
  ],
});

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/midtown-real-estate#webpage`,
      url: `${siteConfig.url}/midtown-real-estate`,
      name: "Midtown Real Estate Las Vegas",
      description:
        "Guide to buying and selling midtown Las Vegas condominiums with Dr. Jan Duffy.",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "[data-midtown-summary]"],
      },
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
      areaServed: "Midtown Las Vegas, NV",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is midtown real estate in Las Vegas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Midtown Las Vegas real estate centers on Arts District lofts, downtown high-rises, Symphony Park residences, and new projects like The English Residences and Midtown Plaza — walkable ownership north of the Strip.",
          },
        },
        {
          "@type": "Question",
          name: "What is the median midtown condo price?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `As of ${marketStats.lastUpdated}, the midtown condo median is about ${marketStats.midtown.medianPriceFormatted} with roughly ${marketStats.midtown.daysOnMarket} days on market. Call ${agentInfo.phone} for live comps.`,
          },
        },
      ],
    },
  ],
};

const buyingSteps = [
  "Define budget, HOA comfort range, and must-have amenities (parking, EV, gym, views).",
  "Shortlist midtown micro-neighborhoods: Arts District, Fremont East, Symphony Park, English Residences.",
  "Tour with CC&R / rental-cap / special-assessment review before you write.",
  "Negotiate with BHHS market data and close with clear title and condo docs.",
];

export default function MidtownRealEstatePage() {
  return (
    <>
      <SchemaScript schema={schema} id="midtown-re-schema" />
      <Navbar />
      <PageHero
        imageKey="homeStripNight"
        pagePath="/midtown-real-estate"
        badge="Berkshire Hathaway HomeServices Nevada Properties"
        title="Midtown real estate in Las Vegas"
        subtitle="Condos, lofts, and condo-hotel residences in the Arts District corridor — bought and sold with Dr. Jan Duffy."
        priority
      />
      <main className="pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <p data-midtown-summary className="text-lg text-slate-700 mb-10 max-w-3xl">
            Midtown real estate means walkable ownership: gallery nights, Main Street dining,
            Strip-adjacent high-rises, and new residences at 921 S Main St. Median midtown condo
            price sits near {marketStats.midtown.medianPriceFormatted} (
            {marketStats.lastUpdated}).
          </p>

          <section className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-blue-600" />
              Midtown condo neighborhoods
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {midtownNeighborhoods.map((area) => (
                <Link
                  key={area.slug}
                  href={`/neighborhoods/${area.slug}`}
                  className="rounded-lg border border-slate-200 p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900">{area.name}</h3>
                    <span className="text-sm text-blue-600">{area.medianPrice}</span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{area.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to buy midtown real estate</h2>
            <ol className="space-y-3">
              {buyingSteps.map((step, i) => (
                <li key={step} className="flex gap-3 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Step {i + 1}.</strong> {step}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Lifestyle that sells midtown</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/neighborhood/run-club", label: "Midtown Run Club" },
                { href: "/neighborhood/ev-program", label: "EV Vehicle Program" },
                { href: "/neighborhood/pepper-club", label: "Pepper Club dining" },
                { href: "/blog", label: "Condo blog" },
                { href: "/listings", label: "Search listings" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center rounded-md bg-blue-50 border border-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                >
                  {link.label}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-slate-900 text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Work with a midtown condo specialist</h2>
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
                Contact
              </Link>
            </div>
          </section>
        </div>
        <div className="mt-12">
          <RealScoutListings />
        </div>
      </main>
      <Footer />
    </>
  );
}
