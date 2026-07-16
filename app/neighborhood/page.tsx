import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PageHero from "@/components/sections/PageHero";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { Phone, ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { withPageHeroMetadata } from "@/lib/image-seo";
import { midtownLifestylePages } from "@/lib/gsc-recovery-pages";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = withPageHeroMetadata("/neighborhood", {
  title: "Midtown Las Vegas Neighborhood Lifestyle | Run Club, EV, Dining | Dr. Jan Duffy",
  description:
    "Explore Midtown Las Vegas lifestyle — Run Club, EV Vehicle Program, and Pepper Club dining near Arts District condos. Call Dr. Jan Duffy at (702) 500-1980.",
  keywords: [
    "Midtown Las Vegas neighborhood",
    "Arts District lifestyle",
    "Midtown Run Club",
    "Midtown EV program",
    "Pepper Club Las Vegas",
  ],
});

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Midtown Las Vegas Neighborhood Lifestyle",
  url: `${siteConfig.url}/neighborhood`,
  description:
    "Lifestyle amenities for Midtown Las Vegas condo buyers: Run Club, EV Program, and dining near The English Residences.",
  isPartOf: { "@id": `${siteConfig.url}#website` },
};

export default function NeighborhoodLifestyleHubPage() {
  const pages = Object.values(midtownLifestylePages);

  return (
    <>
      <SchemaScript schema={schema} id="neighborhood-hub-schema" />
      <Navbar />
      <PageHero
        imageKey="juhl"
        pagePath="/neighborhood"
        badge="Midtown Las Vegas"
        title="Midtown neighborhood lifestyle"
        subtitle="Run Club, shared EVs, and chef-driven dining — the daily rhythm that sells Arts District condo living."
        priority
      />
      <main className="pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-slate-600 mb-8 max-w-3xl">
            Google indexed these Midtown lifestyle URLs — they now resolve here with full guides
            for condo buyers. Looking for building-by-building inventory? See{" "}
            <Link href="/neighborhoods" className="text-blue-600 font-medium hover:underline">
              midtown condo neighborhoods
            </Link>
            .
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={page.path}
                className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-2">
                  {page.badge}
                </p>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 mb-2">
                  {page.name}
                </h2>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">{page.summary}</p>
                <span className="inline-flex items-center text-sm font-medium text-blue-600">
                  Read guide
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-900 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                {officeInfo.address.full}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {agentInfo.name} · Berkshire Hathaway HomeServices Nevada Properties
              </p>
            </div>
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-500"
            >
              <Phone className="mr-2 h-4 w-4" />
              {agentInfo.phone}
            </a>
          </div>
        </div>
        <div className="mt-12">
          <RealScoutListings />
        </div>
      </main>
      <Footer />
    </>
  );
}
