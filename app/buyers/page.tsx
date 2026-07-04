import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import {
  Phone,
  Search,
  FileText,
  Home,
  Key,
  CheckCircle,
  DollarSign,
  Shield,
  MapPin,
  TrendingUp,
  Users,
  Award,
  Clock,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import { hyperlocalMeta, midtownNeighborhoods, midtownServiceSchema } from "@/lib/hyperlocal-content";

export const metadata: Metadata = {
  title: hyperlocalMeta.buyers.title,
  description: hyperlocalMeta.buyers.description,
  keywords: hyperlocalMeta.buyers.keywords,
};

const buyerSchema = midtownServiceSchema(
  "Midtown Las Vegas Condo Buying Services",
  "Condo Buyer Representation"
);

const buyingSteps = [
  {
    icon: DollarSign,
    title: "Get Pre-Approved for Condo Financing",
    description:
      "Know your budget before touring midtown towers. Dr. Jan connects you with lenders experienced in high-rise and condo financing — including FHA-approved buildings, VA loans, and conventional programs.",
  },
  {
    icon: Search,
    title: "Choose Your Building & Neighborhood",
    description:
      "Compare Arts District lofts, Fremont East boutiques, and Strip-view high-rises. Dr. Jan reviews HOA fees, rental rules, parking deeded rights, and building amenities so you find the right midtown fit.",
  },
  {
    icon: FileText,
    title: "Tour Units & Make an Offer",
    description:
      "Dr. Jan's midtown condo expertise ensures your offer is competitive. She negotiates price, closing costs, and HOA document review periods — protecting you in every high-rise transaction.",
  },
  {
    icon: Home,
    title: "HOA Review & Inspections",
    description:
      "Review HOA budgets, reserve studies, special assessments, and CC&Rs before you commit. Dr. Jan coordinates inspections and helps negotiate credits if issues arise during due diligence.",
  },
  {
    icon: Key,
    title: "Close on Your Midtown Condo",
    description:
      "Dr. Jan coordinates with lenders, title, and escrow for a smooth closing — typically 30–45 days for financed purchases. Then you get the keys to your midtown Las Vegas condo.",
  },
];

const neighborhoods = midtownNeighborhoods.slice(0, 6).map((n) => ({
  name: n.name,
  price: n.medianPrice,
  description: n.description,
  slug: n.slug,
}));

export default function BuyersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buyerSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Berkshire Hathaway HomeServices Nevada Properties
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Buy Your Midtown Las Vegas Condo with Confidence
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              When you work with Dr. Jan Duffy, a midtown condo specialist at{" "}
              <strong>Berkshire Hathaway HomeServices</strong>, you get HOA expertise, building
              comparisons, and expert negotiation — and buyer representation costs you nothing.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Free Buyer Representation</span>
              <span className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Full MLS Access</span>
              <span className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Expert Negotiation</span>
            </div>
          </div>

          {/* Value Prop */}
          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Why You Need a Buyer's Agent</h2>
                <p className="text-slate-300 mb-6">
                  Here's what many buyers don't know: having your own agent costs you nothing. The
                  seller pays the commission, but the representation is yours.{" "}
                  <strong>Berkshire Hathaway HomeServices</strong> agents protect your interests,
                  not the seller's. In a competitive market like Las Vegas, having expert 
                  representation can mean the difference between winning your dream home and losing out.
                </p>
                <ul className="space-y-2">
                  {[
                    "Full MLS access + off-market opportunities",
                    "Expert negotiation on your behalf",
                    "Contract and disclosure review",
                    "Inspection coordination and repair negotiation",
                    "Lender and service provider referrals",
                    "Local market expertise since 2008",
                  ].map((item) => (
                    <li key={item} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800 rounded-lg p-8 text-center">
                <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <p className="text-2xl font-bold mb-2">Your Agent, Your Advocate</p>
                <p className="text-slate-400 mb-4">
                  Dr. Jan Duffy works exclusively for your interests throughout the entire
                  transaction—from the first showing to the closing table and beyond.
                </p>
                <div className="text-sm text-slate-500">
                  Serving Las Vegas since 2008 | $127M+ in transactions
                </div>
              </div>
            </div>
          </section>

          {/* Buying Process */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              The Midtown Condo Buying Process
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Buying a midtown condo means reviewing HOA documents, rental restrictions, and
              building-specific comps — not just square footage. Here&apos;s what to expect when
              purchasing a condo in midtown Las Vegas with Dr. Jan Duffy.
            </p>
            <div className="space-y-6">
              {buyingSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="flex gap-6 items-start bg-white border border-slate-200 rounded-lg p-6"
                  >
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                          Step {index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                      </div>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Neighborhood Guide */}
          <section className="mb-16 bg-slate-50 rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Midtown Las Vegas Condo Neighborhoods
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Midtown offers walkable urban living from Arts District lofts to Strip-view high-rises.
              Dr. Jan helps you compare buildings by HOA fees, rental rules, amenities, and
              walkability — so you buy in the right tower for your lifestyle.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {neighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.name}
                  href={`/neighborhoods/${neighborhood.slug}`}
                  className="bg-white rounded-lg p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-slate-900">{neighborhood.name}</h3>
                    <span className="text-blue-600 font-semibold">{neighborhood.price}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{neighborhood.description}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/neighborhoods"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center"
              >
                Explore All Neighborhoods <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </section>

          {/* Buyer Types */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Specialized Guidance for Every Buyer
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Different buyers have different needs. A first-time buyer needs education and 
              hand-holding through the process. A California relocator needs tax guidance and 
              neighborhood matching. A luxury buyer needs discretion and access. Dr. Jan Duffy 
              tailors her approach to match your specific situation and goals.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/buyers/california-relocator"
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="text-3xl mb-4">🌴</div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600">
                  California Relocators
                </h3>
                <p className="text-slate-600 text-sm mb-3">
                  0% state income tax, 40-60% lower home prices. See what your CA equity buys in 
                  Las Vegas. Dr. Jan specializes in helping California families transition to Nevada.
                </p>
                <span className="text-blue-600 font-semibold text-sm">Learn More →</span>
              </Link>
              <Link
                href="/buyers/first-time-buyers"
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="text-3xl mb-4">🔑</div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600">
                  First-Time Buyers
                </h3>
                <p className="text-slate-600 text-sm mb-3">
                  Down payment assistance programs, FHA/VA loans, and builder incentives explained. 
                  Step-by-step guidance through your first home purchase.
                </p>
                <span className="text-blue-600 font-semibold text-sm">Learn More →</span>
              </Link>
              <Link
                href="/buyers/luxury-homes-las-vegas"
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="text-3xl mb-4">💎</div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600">
                  Luxury Home Buyers
                </h3>
                <p className="text-slate-600 text-sm mb-3">
                  $1M+ properties with discrete service. The Ridges, MacDonald Highlands, Southern 
                  Highlands, and Las Vegas Strip views. Off-market opportunities available.
                </p>
                <span className="text-blue-600 font-semibold text-sm">Learn More →</span>
              </Link>
            </div>
          </section>

          {/* Why BHHS */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Why Buy with Berkshire Hathaway HomeServices
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Not all real estate agents are created equal. When you choose a Berkshire Hathaway 
              HomeServices agent, you're choosing the only real estate brand backed by Warren 
              Buffett's Berkshire Hathaway Inc.—a name synonymous with trust, ethical standards, 
              and financial strength.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Trusted Brand</h3>
                <p className="text-slate-600 text-sm">
                  The only real estate brand backed by Berkshire Hathaway Inc.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Global Network</h3>
                <p className="text-slate-600 text-sm">
                  50,000+ agents worldwide for seamless relocations and referrals
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Local Expertise</h3>
                <p className="text-slate-600 text-sm">
                  Dr. Jan has served Las Vegas since 2008 with $127M+ in transactions
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Expert Negotiation</h3>
                <p className="text-slate-600 text-sm">
                  500+ successful transactions mean proven negotiation skills
                </p>
              </div>
            </div>
          </section>

          {/* Expert Quote */}
          <section className="mb-16 max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-lg p-8">
              <blockquote className="text-lg text-slate-700 italic mb-4">
                "My job isn't just to show you houses—it's to make sure you don't overpay, that you
                understand what you're buying, and that you're protected through every step of the
                transaction. That's what Berkshire Hathaway HomeServices representation means. I treat 
                every client like family and won't stop until we find the right home for your needs."
              </blockquote>
              <cite className="text-slate-900 font-semibold">
                — Dr. Jan Duffy, BHHS Nevada Properties | Serving Las Vegas Since 2008
              </cite>
            </div>
          </section>

          {/* Market Stats */}
          <section className="mb-16 bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Las Vegas Buyer Market Statistics | January 2026
            </h2>
            <p className="text-blue-100 text-center max-w-3xl mx-auto mb-8">
              Understanding the current market helps you make informed decisions about timing, 
              pricing, and negotiation strategies. Here's a snapshot of what buyers are facing 
              in the Las Vegas market right now.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">$450K</div>
                <div className="text-blue-200 text-sm">Median Home Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">4,850</div>
                <div className="text-blue-200 text-sm">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">28 Days</div>
                <div className="text-blue-200 text-sm">Avg. Days on Market</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">+4.2%</div>
                <div className="text-blue-200 text-sm">Year-Over-Year</div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Frequently Asked Questions About Buying in Las Vegas
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Get answers to the most common questions from Las Vegas home buyers. If you don't 
              see your question here, call Dr. Jan Duffy at (702) 500-1942 for a free consultation.
            </p>
            <div className="space-y-4">
              {[
                {
                  q: "What should I know about HOA fees before buying a midtown condo?",
                  a: "HOA fees vary widely — some midtown towers include utilities, cable, and internet; others cover only common areas. Dr. Jan reviews HOA budgets, reserve studies, and special assessment history for every building before you make an offer.",
                },
                {
                  q: "Should I get pre-approved before touring midtown condos?",
                  a: "Yes. Pre-approval shows sellers you're serious and confirms you qualify for condo financing — which can differ from single-family loans. The process typically takes 1–3 days with proper documentation.",
                },
                {
                  q: "Can I rent out my midtown condo on Airbnb?",
                  a: "Rental rules are building-specific. Some midtown towers allow short-term rentals; others require 6-month minimum leases. Dr. Jan checks CC&Rs before you buy, especially if you're purchasing for investment.",
                },
                {
                  q: "What midtown buildings does Dr. Jan know best?",
                  a: "One Las Vegas, Juhl, Ogden, Palms Place, The English Residences, and Arts District loft conversions. She compares floor plans, HOA fees, and recent sales in each building.",
                },
                {
                  q: "How competitive is the midtown condo market?",
                  a: "Well-priced midtown units with updated interiors and reasonable HOA fees typically sell in 30–45 days. Strip-view and walkable Arts District lofts move faster. Dr. Jan's building-specific comps help you make competitive offers.",
                },
                {
                  q: "What's the best midtown neighborhood for walkable urban living?",
                  a: "The Arts District and Fremont East offer the highest walk scores for dining, galleries, and nightlife. Symphony Park suits culture lovers near the Smith Center. Dr. Jan matches you based on lifestyle, budget, and parking needs.",
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Midtown Condo?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Questions about buying a midtown Las Vegas condo? Call Dr. Jan Duffy for a free
              consultation — HOA review, building comparisons, and expert negotiation included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+17025001942"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (702) 500-1942
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>
            <p className="mt-4 text-slate-400 text-sm">
              Berkshire Hathaway HomeServices Nevada Properties
            </p>
          </section>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: January 2026</div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
