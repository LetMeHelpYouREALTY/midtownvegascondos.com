import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import {
  Phone,
  MapPin,
  Home as HomeIcon,
  Dumbbell,
  Trophy,
  CheckCircle,
} from "lucide-react";
import type { Metadata } from "next";
import { withPageHeroMetadata } from "@/lib/image-seo";
import { generateCommunityPageSchema } from "@/lib/community-seo";
import PageHero from "@/components/sections/PageHero";
import SchemaScript from "@/components/SchemaScript";
import { agentInfo, officeInfo } from "@/lib/site-config";

const PATH = "/55-plus-communities/heritage-stonebridge";

const faqs = [
  {
    question: "Where is Heritage at Stonebridge?",
    answer:
      "Heritage at Stonebridge is a 55+ active adult community in North Las Vegas near the Beltway, about 20–30 minutes from Midtown Las Vegas Boulevard depending on traffic. It is not a Midtown high-rise condo building.",
  },
  {
    question: "Is Heritage at Stonebridge the same as Midtown Vegas Condos?",
    answer:
      "No. Heritage at Stonebridge is a suburban 55+ community with golf and club amenities. Midtown Vegas Condos covers high-rise and mid-rise condos along Las Vegas Boulevard. Compare product type, HOA structure, and commute before choosing.",
  },
  {
    question: "What lifestyle does Heritage at Stonebridge offer?",
    answer:
      "Expect golf-course living, clubhouse programming, fitness, and single-story or low-maintenance homes aimed at 55+ buyers. Tour current inventory and confirm age restrictions, HOA dues, and membership rules with listing documents. Call (702) 500-1980 for live MLS comps.",
  },
  {
    question: "How does Heritage at Stonebridge compare to Midtown for investors?",
    answer:
      "Heritage at Stonebridge is typically owner-occupied 55+ housing. Midtown condo towers often allow short-term or long-term rental strategies depending on HOA rules. Match the property type to your hold period and income goals with Dr. Jan Duffy.",
  },
];

export const metadata: Metadata = {
  ...withPageHeroMetadata(PATH, {
    title: "Heritage at Stonebridge Homes for Sale | 55+ North Las Vegas",
    description:
      "Heritage at Stonebridge 55+ homes in North Las Vegas — golf-course living, club amenities, single-story plans. Compare with Midtown condos. Dr. Jan Duffy. Call (702) 500-1980.",
    keywords: [
      "Heritage at Stonebridge",
      "Stonebridge 55+",
      "North Las Vegas active adult",
      "55 plus golf community Las Vegas",
      "Heritage Stonebridge homes for sale",
    ],
  }),
  robots: { index: true, follow: true },
};

const communitySchema = generateCommunityPageSchema({
  path: PATH,
  name: "Heritage at Stonebridge",
  description:
    "55+ active adult community in North Las Vegas featuring golf-course living, club amenities, and low-maintenance homes — distinct from Midtown Las Vegas Boulevard condo towers.",
  locality: "North Las Vegas",
  postalCode: "89084",
  latitude: 36.2745,
  longitude: -115.1485,
  faqs,
  placeType: "HousingComplex",
});

export default function HeritageStonebridgePage() {
  return (
    <>
      <SchemaScript schema={communitySchema} id="heritage-stonebridge-schema" />
      <Navbar />
      <PageHero
        imageKey="fiftyFiveHeritage"
        pagePath={PATH}
        title="Heritage at Stonebridge homes for sale"
        subtitle="55+ golf-course living in North Las Vegas — with a clear Midtown condo comparison from Dr. Jan Duffy."
        priority
      >
        <p data-community-summary className="text-white/85 max-w-3xl mx-auto">
          Age-restricted active adult community near the Beltway. Call{" "}
          {agentInfo.phone} to compare HOA dues, age rules, and Midtown tower
          alternatives.
        </p>
      </PageHero>
      <main className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-6 pt-8">
            <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              {" / "}
              <Link href="/55-plus-communities" className="hover:text-blue-600">
                55+ Communities
              </Link>
              {" / "}
              <span className="text-slate-900">Heritage at Stonebridge</span>
            </nav>
          </div>

          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why buyers look at Heritage at Stonebridge
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-3">
                <Trophy className="w-8 h-8 text-amber-400 shrink-0" aria-hidden />
                <div>
                  <h3 className="font-semibold mb-1">Golf-course living</h3>
                  <p className="text-slate-300 text-sm">
                    Fairway proximity and club programming for active adult
                    routines.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Dumbbell className="w-8 h-8 text-amber-400 shrink-0" aria-hidden />
                <div>
                  <h3 className="font-semibold mb-1">Club amenities</h3>
                  <p className="text-slate-300 text-sm">
                    Fitness, social spaces, and community events aimed at 55+
                    residents.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <HomeIcon className="w-8 h-8 text-amber-400 shrink-0" aria-hidden />
                <div>
                  <h3 className="font-semibold mb-1">Low-maintenance homes</h3>
                  <p className="text-slate-300 text-sm">
                    Single-story and lock-and-leave floor plans on many lots.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Heritage at Stonebridge vs Midtown condos
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Heritage at Stonebridge</strong> is a North Las Vegas 55+
              community built around golf and club living—not a Midtown high-rise.
              Buyers often compare it with{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                Midtown Las Vegas Boulevard condos
              </Link>{" "}
              when deciding between suburban active-adult homes and urban tower
              living with walkable dining and Strip access.
            </p>
            <ul className="space-y-2 text-slate-700">
              {[
                "Choose Heritage for golf-oriented 55+ living and suburban lot size",
                "Choose Midtown for Boulevard dining, high-rise views, and condo HOA structures",
                "Beltway commute toward downtown Midtown is typically 20–30 minutes by car",
                "Confirm age rules, HOA dues, and membership fees on every listing",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle
                    className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Current Heritage at Stonebridge listings
            </h2>
            <RealScoutListings />
          </section>

          <section className="mb-16 max-w-4xl mx-auto" data-community-faq>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-slate-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto rounded-2xl bg-blue-50 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Tour Heritage at Stonebridge or Midtown
            </h2>
            <p className="text-slate-700 mb-1">
              Dr. Jan Duffy · License {agentInfo.license} · {officeInfo.name}
            </p>
            <p className="text-sm text-slate-600 mb-4 flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
              {officeInfo.address.full}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${agentInfo.phone}`}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
              >
                <Phone className="w-4 h-4" aria-hidden />
                Call {agentInfo.phoneFormatted}
              </a>
              <Link
                href="/contact"
                className="rounded-lg border border-blue-600 px-5 py-2.5 font-semibold text-blue-700 hover:bg-blue-50"
              >
                Contact
              </Link>
              <Link
                href="/55-plus-communities"
                className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
              >
                All 55+ communities
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
