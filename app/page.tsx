import Navbar from "@/components/layouts/Navbar";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import RealScoutSimpleSearch from "@/components/realscout/RealScoutSimpleSearch";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/layouts/Footer";
import AgentPhoto from "@/components/shared/AgentPhoto";
import SectionPhoto from "@/components/sections/SectionPhoto";
import HeadingCardPhoto from "@/components/sections/HeadingCardPhoto";
import GbpPostsSection from "@/components/sections/GbpPostsSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Home as HomeIcon,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";
import { DEFAULT_CONFIG } from "@/lib/domain-config";
import {
  agentInfo,
  agentStats,
  getAgentImageSrc,
  marketStats,
  officeInfo,
  siteConfig,
} from "@/lib/site-config";
import { defaultFaqs } from "@/lib/faqs";
import { getHeroImage, neighborhoodHeroBySlug } from "@/lib/hero-images";
import { midtownNeighborhoods } from "@/lib/hyperlocal-content";
import {
  generatePageHeroSchemaGraph,
  withPageHeroMetadata,
} from "@/lib/image-seo";
import SchemaScript, { FAQSchema } from "@/components/SchemaScript";
import type { Metadata } from "next";

/** ISR — homepage stays cacheable (no headers()) for mobile TTFB/LCP. */
export const revalidate = 3600;

const config = DEFAULT_CONFIG;

export const metadata: Metadata = withPageHeroMetadata("/", {
  title: `${config.heroHeadline} | Dr. Jan Duffy, REALTOR® | BHHS Nevada`,
  description: config.description,
  keywords: config.keywords,
});

export default function Home() {
  const siteUrl = siteConfig.url;
  const homeHero = getHeroImage("homeStripDusk");

  const heroPageSchema = generatePageHeroSchemaGraph({
    imageKey: "homeStripDusk",
    pagePath: "/",
    pageName: config.heroHeadline,
    pageDescription: config.description,
  });

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteUrl}#organization`,
    name: `${agentInfo.name} - ${config.neighborhood} Condo Specialist`,
    url: siteUrl,
    image: getAgentImageSrc(),
    telephone: agentInfo.phoneTel.replace("tel:", ""),
    email: agentInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: officeInfo.address.street,
      addressLocality: officeInfo.address.city,
      addressRegion: officeInfo.address.state,
      postalCode: officeInfo.address.zip,
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: agentStats.averageRating.toString(),
      reviewCount: agentStats.reviewCount.toString(),
    },
  };

  return (
    <>
      <SchemaScript schema={organizationSchema} id="home-org-schema" />
      <SchemaScript schema={heroPageSchema} id="home-hero-schema" />
      <FAQSchema faqs={defaultFaqs} />
      <Navbar />
      <main>
        {/* Domain-Aware Hero */}
        <section className="relative bg-slate-950 text-white py-24 md:py-32 overflow-hidden">
          <Image
            src={homeHero.src}
            alt={homeHero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            title={homeHero.caption}
          />
          {/* Light scrim for text contrast — keeps the photo dominant */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />
          <div className="relative z-10 container mx-auto px-4 text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
            {config.ctaBadge && (
              <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6">
                {config.ctaBadge}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {config.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
              {config.heroSubheadline}
            </p>

            <div className="mb-8 flex flex-col items-center gap-4">
              <AgentPhoto size="md" className="border-blue-400/50" />
              <p className="text-sm text-white/70">
                {agentInfo.name}, {agentInfo.title} · License{" "}
                {agentInfo.license}
              </p>
            </div>

            {/* Primary CTAs in the first viewport — RealScout loads below for LCP */}
            <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3.5 text-lg font-bold text-white transition-colors hover:bg-blue-700"
              >
                <Phone className="mr-2 h-5 w-5" aria-hidden />
                Call {agentInfo.phone}
              </a>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center rounded-md border-2 border-white/80 bg-white/10 px-8 py-3.5 text-lg font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Browse Midtown Listings
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">500+</span>
                <span>Clients Helped</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">30+ Years</span>
                <span>Las Vegas Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">4.9★</span>
                <span>Client Rating</span>
              </div>
            </div>

            <p className="mt-6 text-sm text-white/80">
              {officeInfo.address.full}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center rounded-md bg-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/25"
              >
                Call {agentInfo.phone}
              </a>
              <a
                href={officeInfo.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/25"
              >
                Directions
              </a>
              <a
                href={officeInfo.maps.reviews}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/25"
              >
                View Google Reviews
              </a>
            </div>

            <figure className="mt-10 mx-auto max-w-2xl border-t border-white/20 pt-4 text-left md:text-center">
              <figcaption
                data-hero-caption
                className="text-xs leading-relaxed text-white/70 md:text-sm"
              >
                <span className="font-medium text-white/85">
                  {homeHero.caption}
                </span>
                <span className="mt-1 block text-white/50">
                  Photo credit: {agentInfo.name}, {siteConfig.name} ·{" "}
                  {homeHero.geoName}
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        <RealScoutListings />

        {/* RealScout search — below hero so LCP is not blocked by the UMD widget */}
        <section className="border-b border-slate-200 bg-white py-10">
          <div className="container mx-auto px-4 text-center">
            <SectionPhoto
              imageKey="searchMidtown"
              heading="Search Midtown Vegas Condos"
              className="mx-auto mb-8 max-w-3xl text-left"
            />
            <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Search Midtown Vegas Condos
            </h2>
            <p className="mb-6 text-slate-600">
              Live MLS results with Dr. Jan Duffy — filter by price, beds, and
              building.
            </p>
            <div className="mx-auto flex max-w-2xl justify-center">
              <RealScoutSimpleSearch
                agentEncodedId={config.realscoutAgentId}
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-4xl text-center">
              <SectionPhoto
                imageKey="whyJan"
                heading="Why Work With Dr. Jan Duffy?"
                className="mx-auto mb-8 max-w-4xl text-left"
              />
              <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Why Work With Dr. Jan Duffy?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Midtown Las Vegas condo specialist at Berkshire Hathaway
                HomeServices Nevada Properties.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: "HOA Expertise",
                  desc: "CC&R review, rental caps, and special assessment checks on every building",
                  sectionKey: "hoaReview" as const,
                },
                {
                  icon: Users,
                  title: "50K+ Network",
                  desc: "Global BHHS referral network for relocations to or from Las Vegas",
                  heroKey: "whyBhhs" as const,
                },
                {
                  icon: TrendingUp,
                  title: "$127M+ Sold",
                  desc: "Proven midtown and valley-wide results since 2008",
                  heroKey: "sellersHighrise" as const,
                },
                {
                  icon: HomeIcon,
                  title: "Condo Specialist",
                  desc: "High-rise towers, urban lofts, Arts District — one expert for all midtown condos",
                  heroKey: "buyersCondoTower" as const,
                },
              ].map(({ icon: Icon, title, desc, sectionKey, heroKey }) => (
                <div key={title} className="text-center p-6">
                  <HeadingCardPhoto
                    heading={title}
                    sectionKey={sectionKey}
                    heroKey={heroKey}
                    className="mb-4"
                  />
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Stats */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <SectionPhoto
                imageKey="marketStats"
                heading={`${config.neighborhood} Real Estate Market`}
                className="mx-auto mb-8 max-w-4xl text-left"
                onDark
              />
              <h2 className="text-3xl font-bold mb-3">
                {config.neighborhood} Real Estate Market
              </h2>
              <p className="text-slate-400 mb-8">
                Current data — updated regularly
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                {
                  value: marketStats.midtown.medianPriceFormatted,
                  label: "Median Condo Price",
                  sub: marketStats.midtown.yearOverYearChange + " YoY",
                },
                {
                  value: String(marketStats.midtown.daysOnMarket),
                  label: "Avg Days on Market",
                  sub: "",
                },
                {
                  value: marketStats.midtown.activeListings.toLocaleString(),
                  label: "Active Condo Listings",
                  sub: "",
                },
                {
                  value: "$" + marketStats.midtown.pricePerSqFt,
                  label: "Avg Price/Sq Ft",
                  sub: "",
                },
              ].map(({ value, label, sub }) => (
                <div key={label} className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-1">
                    {value}
                  </div>
                  <div className="text-slate-300 text-sm">{label}</div>
                  {sub && (
                    <div className="text-green-400 text-xs mt-1">{sub}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/market-report"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Full Market Report
              </Link>
            </div>
          </div>
        </section>

        {/* Midtown Areas */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <SectionPhoto
                imageKey="neighborhoods"
                heading="Midtown Las Vegas Condo Neighborhoods"
                className="mx-auto mb-8 max-w-4xl text-left"
              />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Midtown Las Vegas Condo Neighborhoods
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                From Strip-adjacent high-rises to Arts District lofts — explore
                Las Vegas urban living.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {midtownNeighborhoods.slice(0, 8).map((area) => {
                const heroKey =
                  neighborhoodHeroBySlug[area.slug] ?? "neighborhoodsHub";
                const img = getHeroImage(heroKey);
                return (
                  <Link
                    key={area.slug}
                    href={`/neighborhoods/${area.slug}`}
                    className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="relative h-36">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-slate-900 mb-2">
                        {area.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4">
                        {area.description}
                      </p>
                      <p className="text-sm font-semibold text-blue-600">
                        Area median {area.medianPrice}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <FeaturedProperties />
        <WhyChooseUs />
        <ReviewsSection />
        <GbpPostsSection />
        <FAQSection
          title="Midtown Las Vegas Condo FAQs"
          subtitle="Common questions about buying and selling midtown Vegas condos"
        />

        {/* Domain-Specific CTA */}
        <section className="py-16 md:py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <SectionPhoto
              imageKey="homeCta"
              heading={config.ctaHeadline}
              className="mx-auto mb-8 max-w-3xl text-left"
              onDark
            />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {config.ctaHeadline}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {config.ctaSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call {agentInfo.phone}
              </a>
              <a
                href={officeInfo.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Directions
              </a>
              <a
                href={officeInfo.maps.reviews}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/10 transition-colors"
              >
                View Google Reviews
              </a>
              <Link
                href="/contact"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Send a Message
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              Dr. Jan Duffy | License S.0197614.LLC | Berkshire Hathaway
              HomeServices Nevada Properties
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
