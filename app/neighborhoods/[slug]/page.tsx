import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import AgentPhoto from "@/components/shared/AgentPhoto";
import PageHero from "@/components/sections/PageHero";
import Link from "next/link";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchemaScript from "@/components/SchemaScript";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateNeighborhoodSchema,
  combineSchemas,
} from "@/lib/schema";
import {
  getMidtownNeighborhood,
  midtownNeighborhoods,
  type MidtownNeighborhoodSlug,
} from "@/lib/hyperlocal-content";
import { agentInfo, siteConfig } from "@/lib/site-config";
import { neighborhoodHeroBySlug } from "@/lib/hero-images";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return midtownNeighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getMidtownNeighborhood(slug);
  if (!area) return {};

  return {
    title: `${area.name} Condos for Sale | Midtown Las Vegas | Dr. Jan Duffy`,
    description: `${area.description} Search ${area.name} condos with Dr. Jan Duffy, midtown Las Vegas condo specialist. Median ${area.medianPrice}. Call ${agentInfo.phone}.`,
    keywords: [
      `${area.name} condos Las Vegas`,
      `${area.name} midtown condos`,
      "midtown Las Vegas real estate",
      "Dr Jan Duffy condo agent",
    ],
  };
}

export default async function MidtownNeighborhoodPage({ params }: PageProps) {
  const { slug } = await params;
  const area = getMidtownNeighborhood(slug);
  if (!area) notFound();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Midtown Neighborhoods", url: "/neighborhoods" },
    { name: area.name, url: `/neighborhoods/${area.slug}` },
  ];

  const schemas = [
    generateBreadcrumbSchema(breadcrumbs),
    generateNeighborhoodSchema({
      name: area.name,
      slug: area.slug,
      description: area.description,
      latitude: area.latitude,
      longitude: area.longitude,
      containedIn: "Midtown Las Vegas",
    }),
  ];

  if (area.faqs.length > 0) {
    schemas.push(generateFAQSchema([...area.faqs]));
  }

  const pageSchema = combineSchemas(...schemas);
  const heroKey = neighborhoodHeroBySlug[area.slug] ?? "neighborhoodsHub";

  return (
    <>
      <SchemaScript schema={pageSchema} id={`${area.slug}-schema`} />
      <Navbar />
      <PageHero
        imageKey={heroKey}
        pagePath={`/neighborhoods/${area.slug}`}
        badge="Midtown Las Vegas Condos"
        title={`${area.name} Condos for Sale`}
        subtitle={area.description}
        priority
      >
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
            <div className="text-2xl font-bold text-white">{area.medianPrice}</div>
            <div className="text-sm text-white/70">Median condo price</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
            <div className="text-2xl font-bold text-green-400">{area.priceChange}</div>
            <div className="text-sm text-white/70">Year over year</div>
          </div>
        </div>
        <p className="text-white/85 mb-4">
          <strong className="text-white">Best for:</strong> {area.bestFor}
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
          {area.highlights.map((h) => (
            <li
              key={h}
              className="bg-blue-500/30 text-white text-sm font-medium px-3 py-1 rounded-full border border-blue-300/30"
            >
              {h}
            </li>
          ))}
        </ul>
      </PageHero>
      <main className="pb-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-slate-500 mb-6 pt-8">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            {" / "}
            <Link href="/neighborhoods" className="hover:text-blue-600">
              Neighborhoods
            </Link>
            {" / "}
            <span className="text-slate-900">{area.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-start max-w-6xl mx-auto mb-12">
            <div>
              <p className="text-slate-700 mb-6">
                Explore {area.name} with Dr. Jan Duffy — HOA review, building comps, and condo-specific
                guidance from a midtown specialist at Berkshire Hathaway HomeServices Nevada Properties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={agentInfo.phoneTel}
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call {agentInfo.phone}
                </a>
                <Link
                  href="/buyers"
                  className="inline-flex items-center justify-center border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-semibold"
                >
                  Condo Buying Guide
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <AgentPhoto size="lg" />
              <p className="mt-3 text-sm text-slate-500 text-center max-w-[200px]">
                {agentInfo.name}
                <br />
                Midtown condo specialist
              </p>
            </div>
          </div>

          {area.faqs.length > 0 && (
            <section className="max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {area.name} Condo FAQs
              </h2>
              <div className="space-y-4">
                {area.faqs.map((faq) => (
                  <div key={faq.question} className="border border-slate-200 rounded-lg p-5">
                    <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center mb-12">
            <MapPin className="h-10 w-10 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Search {area.name} Condos
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Dr. Jan Duffy knows every midtown building, floor plan, and HOA — get expert guidance
              on your {area.name} condo search.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold"
            >
              Schedule a Consultation
            </Link>
          </section>
        </div>
        <RealScoutListings />
      </main>
      <Footer />
    </>
  );
}
