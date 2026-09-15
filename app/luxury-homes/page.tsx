import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import {
  Star,
  Shield,
  Globe,
  Eye,
  CheckCircle,
  Home,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import { withPageHeroMetadata } from "@/lib/image-seo";
import PageHero from "@/components/sections/PageHero";
import SectionPhoto from "@/components/sections/SectionPhoto";
import HeadingCardPhoto from "@/components/sections/HeadingCardPhoto";
import GbpEngageButtons from "@/components/sections/GbpEngageButtons";
import type { HeroImageKey } from "@/lib/hero-images";

export const metadata: Metadata = withPageHeroMetadata("/luxury-homes", {
  title: "Las Vegas Luxury Homes for Sale | Berkshire Hathaway HomeServices",
  description:
    "Discover Las Vegas luxury condos with Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties. One Las Vegas, Symphony Park, Palms Place, Southern Highlands. Call (702) 500-1980.",
  keywords: [
    "Las Vegas luxury condos",
    "One Las Vegas condos",
    "Symphony Park residences",
    "Palms Place condos",
    "Southern Highlands homes",
    "Berkshire Hathaway luxury",
    "midtown Las Vegas luxury",
    "luxury real estate agent Las Vegas",
  ],
});

const luxurySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Las Vegas Luxury Home Services",
  provider: {
    "@type": "RealEstateAgent",
    name: "Dr. Jan Duffy - Berkshire Hathaway HomeServices Nevada Properties",
    telephone: "+17025001980",
  },
  areaServed: "Arts District, Downtown Las Vegas, Strip-corridor high-rises",
  serviceType: "Luxury Real Estate",
  priceRange: "$380,000+",
};

const luxuryNeighborhoods: {
  name: string;
  location: string;
  slug: string;
  priceRange: string;
  description: string;
  features: string[];
  heroKey: HeroImageKey;
}[] = [
  {
    name: "One Las Vegas",
    location: "Strip corridor",
    slug: "one-las-vegas",
    priceRange: "Median $650K",
    description:
      "Luxury high-rise with Strip-corridor views, resort pool, and concierge. Typical HOA $400–$1,200+/mo. Dr. Jan reviews parking and CC&Rs before you write.",
    features: ["Concierge", "Resort pool", "Strip views", "Live MLS page"],
    heroKey: "oneLasVegas",
  },
  {
    name: "Symphony Park",
    location: "Downtown / Smith Center",
    slug: "symphony-park",
    priceRange: "Median $410K",
    description:
      "Residential-cultural district at the Smith Center — mid-rise condos without resort fees. Compare new-construction incentives and HOA reserves with Dr. Jan.",
    features: ["Smith Center", "Mid-rise", "Downtown routes", "New inventory"],
    heroKey: "symphonyPark",
  },
  {
    name: "Palms Place",
    location: "West of the Strip",
    slug: "palms-place",
    priceRange: "Median $380K",
    description:
      "High-rise condotel behind the Palms with valet, pool complex, and resort amenities. HOA typically covers utilities, cable, and internet.",
    features: ["Condotel", "Valet", "Pool complex", "Utilities in HOA"],
    heroKey: "palmsPlace",
  },
  {
    name: "Juhl",
    location: "Downtown Las Vegas",
    slug: "juhl",
    priceRange: "Median $520K",
    description:
      "Modern downtown loft-style condos with rooftop pool and walkable access to Fremont Street. Confirm parking and HOA docs per unit.",
    features: ["Rooftop pool", "Loft layouts", "Downtown", "Modern design"],
    heroKey: "juhl",
  },
  {
    name: "The English Residences",
    location: "Arts District",
    slug: "the-english-residences",
    priceRange: "Median $475K",
    description:
      "Condo-hotel residences in the Arts District — own, stay, or earn when you're away. Dr. Jan explains management agreements before you buy.",
    features: ["Condo-hotel", "Arts District", "Rental program", "Boutique"],
    heroKey: "englishResidences",
  },
  {
    name: "Southern Highlands",
    location: "South Las Vegas",
    slug: "southern-highlands",
    priceRange: "$750K - $3M+",
    description:
      "Golf-course homes with mountain views and about a 15-minute drive to Harry Reid Airport. Guard-gated sections available.",
    features: ["Golf", "Mountain views", "Airport commute", "Gated sections"],
    heroKey: "nbSouthernHighlands",
  },
];

const luxuryServices = [
  "Private, off-market listing opportunities",
  "Professional architectural photography",
  "Drone and aerial video production",
  "Global syndication to luxury platforms",
  "Targeted marketing to high-net-worth buyers",
  "Confidential transactions available",
  "International buyer connections",
  "Concierge closing coordination",
  "Staging consultations with luxury specialists",
  "Market analysis for pricing strategy",
];

export default function LuxuryHomesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(luxurySchema) }}
      />
      <Navbar />
      <PageHero
        imageKey="luxuryHomes"
        leadSectionKey="luxuryStats"
        leadSectionHeading="Las Vegas Luxury Market Statistics | January 2026"
        pagePath="/luxury-homes"
        badge="Berkshire Hathaway HomeServices Nevada Properties"
        title="Las Vegas Luxury Real Estate"
      >
        <p className="text-xl md:text-2xl text-white/85 mb-8 max-w-3xl mx-auto">
          <strong>Berkshire Hathaway HomeServices</strong> represents the gold
          standard in luxury real estate. When you're buying or selling a $1M+
          home, trust matters more than ever. Our global network, discretion,
          and expertise ensure your luxury transaction receives the exceptional
          service it deserves.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
          <span className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> White Glove
            Service
          </span>
          <span className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Global Buyer
            Network
          </span>
          <span className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Discrete
            Transactions
          </span>
        </div>
      </PageHero>
      <main className="pb-16">
        <div className="container mx-auto px-4">
          {/* Luxury Stats */}
          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <SectionPhoto
              imageKey="luxuryStats"
              heading="Las Vegas Luxury Market Statistics | January 2026"
              className="mx-auto mb-8 max-w-4xl text-left"
              onDark
            />
            <h2 className="text-2xl font-bold mb-4 text-center">
              Las Vegas Luxury Market Statistics | January 2026
            </h2>

            <p className="text-slate-300 text-center max-w-3xl mx-auto mb-8">
              The Las Vegas luxury market continues to attract affluent buyers
              from California, the Midwest, and international markets.
              Understanding current market conditions is essential for both
              buyers and sellers in this segment.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  $1.2M
                </div>
                <div className="text-slate-300 text-sm">
                  Median Luxury Price
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  +8.5%
                </div>
                <div className="text-slate-300 text-sm">YoY Appreciation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">890</div>
                <div className="text-slate-300 text-sm">
                  Active $1M+ Listings
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">45 Days</div>
                <div className="text-slate-300 text-sm">
                  Avg. Days on Market
                </div>
              </div>
            </div>
          </section>

          {/* Why BHHS for Luxury */}
          <section className="mb-16 max-w-6xl mx-auto">
            <SectionPhoto
              imageKey="whyBuffett"
              heading="Why Choose Berkshire Hathaway for Luxury Real Estate"
              className="mx-auto mb-8 max-w-4xl text-left"
            />
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Why Choose Berkshire Hathaway for Luxury Real Estate
            </h2>

            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              In luxury real estate, the agent you choose can impact both the
              sale price and the transaction experience. Berkshire Hathaway
              HomeServices agents bring resources, reputation, and expertise
              that make a measurable difference in this competitive segment.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Trusted Brand",
                  desc: "The Berkshire Hathaway name commands respect and attracts serious, qualified buyers to your property",
                  heroKey: "whyBhhs" as const,
                },
                {
                  icon: Globe,
                  title: "Global Reach",
                  desc: "50,000+ agents worldwide connecting your property to affluent buyers in every major market",
                  heroKey: "relocationHub" as const,
                },
                {
                  icon: Eye,
                  title: "Discretion",
                  desc: "Privacy-focused marketing for clients who value confidentiality. Off-market sales available.",
                  heroKey: "buyersLuxury" as const,
                },
                {
                  icon: Star,
                  title: "White Glove",
                  desc: "Concierge-level service for luxury transactions from first showing to closing and beyond",
                  heroKey: "luxuryHomes" as const,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="text-center p-6 bg-slate-50 rounded-xl"
                  >
                    <HeadingCardPhoto
                      heading={item.title}
                      heroKey={item.heroKey}
                      className="mb-4"
                    />
                    <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Expert Quote */}
          <section className="mb-16 max-w-4xl mx-auto">
            <SectionPhoto
              imageKey="luxuryMarket"
              heading="Expert Luxury Real Estate Guidance"
              className="mx-auto mb-8 max-w-4xl text-left"
            />
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              Expert Luxury Real Estate Guidance
            </h2>

            <div className="bg-slate-50 rounded-lg p-8">
              <blockquote className="text-lg text-slate-700 italic mb-4">
                "Luxury buyers expect discretion, market expertise, and flawless
                execution. In this price range, one wrong move can cost hundreds
                of thousands of dollars. That's why the Berkshire Hathaway
                HomeServices name matters—it tells buyers and sellers alike that
                they're working with the best. I've helped clients purchase and
                sell homes from $1 million to over $10 million, and every
                transaction receives my full attention and the complete
                resources of BHHS."
              </blockquote>
              <cite className="text-slate-900 font-semibold">
                — Dr. Jan Duffy, BHHS Nevada Properties | Serving Las Vegas
                Since 2008
              </cite>
            </div>
          </section>

          {/* Luxury Neighborhoods */}
          <section className="mb-16 max-w-6xl mx-auto">
            <SectionPhoto
              imageKey="ridgesWhy"
              heading="Premier Las Vegas Luxury Communities"
              className="mx-auto mb-8 max-w-4xl text-left"
            />
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Premier Las Vegas Luxury Communities
            </h2>

            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Open a live midtown luxury condo page — One Las Vegas, Symphony
              Park, Palms Place, Juhl — plus Southern Highlands golf-course
              homes. Call (702) 500-1980 for current MLS comps.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {luxuryNeighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.slug}
                  href={`/neighborhoods/${neighborhood.slug}`}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow block"
                >
                  <HeadingCardPhoto
                    heading={neighborhood.name}
                    heroKey={neighborhood.heroKey}
                    className="mb-4"
                  />
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">
                        {neighborhood.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {neighborhood.location}
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      {neighborhood.priceRange}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    {neighborhood.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.features.map((feature) => (
                      <span
                        key={feature}
                        className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/neighborhoods"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center"
              >
                Explore All Neighborhoods{" "}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </section>

          {/* Luxury Services */}
          <section className="mb-16 bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
            <SectionPhoto
              imageKey="sellersAdvantage"
              heading="Luxury Home Marketing Services"
              className="mx-auto mb-8 max-w-4xl text-left"
              onDark
            />
            <h2 className="text-2xl font-bold mb-4 text-center">
              Luxury Home Marketing Services
            </h2>

            <p className="text-blue-100 text-center max-w-3xl mx-auto mb-8">
              Selling a luxury home requires more than just an MLS listing. Dr.
              Jan Duffy provides comprehensive marketing services that showcase
              your property to qualified buyers worldwide through Berkshire
              Hathaway HomeServices' premium marketing channels.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {luxuryServices.map((service) => (
                <div
                  key={service}
                  className="flex items-center bg-blue-500/30 p-4 rounded-lg"
                >
                  <CheckCircle className="h-5 w-5 text-blue-200 mr-3 flex-shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Buying vs Selling */}
          <section className="mb-16 max-w-5xl mx-auto">
            <SectionPhoto
              imageKey="buyersSpecialized"
              heading="Luxury Buyer & Seller Services"
              className="mx-auto mb-8 max-w-4xl text-left"
            />
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Luxury Buyer & Seller Services
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 rounded-xl p-8">
                <HeadingCardPhoto
                  heading="For Luxury Buyers"
                  heroKey="buyersLuxury"
                  className="mb-4"
                />
                <h3 className="font-bold text-xl text-slate-900 mb-4 flex items-center">
                  <Home className="h-6 w-6 text-blue-600 mr-2" />
                  For Luxury Buyers
                </h3>
                <p className="text-slate-600 mb-4">
                  Access to exclusive listings, off-market opportunities, and
                  discrete showings. Dr. Jan provides personalized search
                  services for discerning buyers seeking Las Vegas's finest
                  properties.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Off-market property access
                  </li>
                  <li className="flex items-center text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Private, scheduled showings
                  </li>
                  <li className="flex items-center text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Expert negotiation
                  </li>
                  <li className="flex items-center text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Confidential representation
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-8">
                <HeadingCardPhoto
                  heading="For Luxury Sellers"
                  heroKey="sellersHighrise"
                  className="mb-4"
                />
                <h3 className="font-bold text-xl text-slate-900 mb-4 flex items-center">
                  <DollarSign className="h-6 w-6 text-blue-600 mr-2" />
                  For Luxury Sellers
                </h3>
                <p className="text-slate-600 mb-4">
                  World-class marketing that reaches qualified buyers globally.
                  The Berkshire Hathaway brand attracts serious buyers and
                  commands premium prices for exceptional properties.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Professional photography & video
                  </li>
                  <li className="flex items-center text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Global marketing syndication
                  </li>
                  <li className="flex items-center text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Off-market sale options
                  </li>
                  <li className="flex items-center text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Strategic pricing analysis
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16 max-w-4xl mx-auto">
            <SectionPhoto
              imageKey="faqCategories"
              heading="Frequently Asked Questions About Las Vegas Luxury Homes"
              className="mx-auto mb-8 max-w-4xl text-left"
            />
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Frequently Asked Questions About Las Vegas Luxury Homes
            </h2>

            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Luxury real estate transactions involve unique considerations.
              Here are answers to common questions from buyers and sellers in
              this market segment.
            </p>
            <div className="space-y-4">
              {[
                {
                  q: "What defines a luxury home in Las Vegas?",
                  a: "Generally, homes priced at $1 million and above are considered luxury in Las Vegas. The ultra-luxury segment starts around $3 million. Features typically include custom architecture, premium locations in guard-gated communities, high-end finishes, and exclusive amenities like private pools, home theaters, and wine cellars.",
                },
                {
                  q: "How long do luxury homes take to sell in Las Vegas?",
                  a: "Luxury homes average 45 days on market, longer than the overall market average of 28 days. However, exceptional properties priced correctly can sell quickly, sometimes within weeks. Marketing strategy and pricing are crucial at this level—overpricing can lead to properties sitting for months.",
                },
                {
                  q: "Can I sell my luxury home privately without public listing?",
                  a: "Yes. Dr. Jan offers confidential, off-market sales for clients who prefer discretion. Berkshire Hathaway HomeServices' network can connect your property with qualified buyers without public marketing, protecting your privacy while still reaching serious buyers.",
                },
                {
                  q: "What commission do you charge for luxury home sales?",
                  a: "Commission rates are negotiable and discussed during your consultation. Dr. Jan provides transparent pricing based on your property and marketing needs. The value of Berkshire Hathaway's global reach and reputation often results in higher sale prices that more than offset commission.",
                },
                {
                  q: "Do you work with international buyers?",
                  a: "Yes. Berkshire Hathaway HomeServices' global network includes agents in major international markets. Dr. Jan has experience working with buyers from Asia, Europe, and the Middle East who are interested in Las Vegas luxury properties.",
                },
                {
                  q: "What's the process for buying a luxury home in Las Vegas?",
                  a: "The process is similar to standard purchases but with additional considerations. Proof of funds is typically required before showings. Inspections are more extensive. Dr. Jan coordinates all aspects, including working with attorneys, financial advisors, and other professionals as needed.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <SectionPhoto
              imageKey="luxuryStats"
              heading="Discover Las Vegas Luxury Living"
              className="mx-auto mb-8 max-w-3xl text-left"
              onDark
            />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Las Vegas Luxury Living
            </h2>

            <p className="text-xl text-slate-300 mb-8">
              Whether buying or selling a luxury property, Dr. Jan Duffy
              provides the expertise and Berkshire Hathaway prestige your
              transaction deserves. Confidential consultations available for
              discerning clients.
            </p>
            <GbpEngageButtons onDark>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-slate-700 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-600"
              >
                Schedule Private Consultation
              </Link>
            </GbpEngageButtons>
            <p className="mt-4 text-slate-400 text-sm">
              Berkshire Hathaway HomeServices Nevada Properties
            </p>
          </section>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">
          Last Updated: January 2026
        </div>
      </main>
      <Footer />
    </>
  );
}
