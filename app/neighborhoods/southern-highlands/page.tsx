import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { Phone, Shield, Mountain, Star, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { withPageHeroMetadata } from "@/lib/image-seo";
import { generateCommunityPageSchema } from "@/lib/community-seo";
import PageHero from "@/components/sections/PageHero";
import { agentInfo, officeInfo } from "@/lib/site-config";

const PATH = "/neighborhoods/southern-highlands";

const faqs = [
  {
    question: "What are current Southern Highlands home prices in 2026?",
    answer:
      "As of mid-2026, Southern Highlands median listing prices have been reported near the mid-$700Ks, with median sold prices often closer to the low-to-mid $600Ks depending on section and month. Call Dr. Jan Duffy at (702) 500-1942 for live comps before you write an offer.",
  },
  {
    question: "Does Southern Highlands have gated sections?",
    answer:
      "Yes. Southern Highlands includes gated estate sections around the golf club plus non-gated villages with community amenities. Dr. Jan maps HOA fees, architectural guidelines, and lot sizes for each section.",
  },
  {
    question: "What is the Southern Highlands Golf Club like?",
    answer:
      "Southern Highlands Golf Club features a Robert Trent Jones Jr. designed course, private membership options, clubhouse dining, and golf-course home sites that typically command premium pricing.",
  },
  {
    question: "How long is the commute from Southern Highlands to the Strip or airport?",
    answer:
      "Southern Highlands sits in southwest Las Vegas with direct access toward I-15. Many residents reach Harry Reid International Airport in about 10–20 minutes and the Strip corridor in about 15–25 minutes depending on traffic.",
  },
];

export const metadata: Metadata = {
  ...withPageHeroMetadata(PATH, {
    title: "Southern Highlands Homes for Sale | Las Vegas Golf Community | Dr. Jan Duffy",
    description:
      "Southern Highlands Las Vegas homes for sale — golf-course estates, gated sections, and southwest valley access. Median listings near mid-$700Ks (mid-2026). Call Dr. Jan Duffy at (702) 500-1942.",
    keywords: [
      "Southern Highlands homes for sale",
      "Southern Highlands Las Vegas",
      "Southern Highlands golf community",
      "southwest Las Vegas real estate",
      "Dr Jan Duffy Southern Highlands",
    ],
  }),
  robots: { index: true, follow: true },
};

const pageSchema = generateCommunityPageSchema({
  path: PATH,
  name: "Southern Highlands",
  description:
    "Master-planned golf community in southwest Las Vegas with championship course, gated and non-gated villages, and fast access to I-15, the Strip corridor, and Harry Reid International Airport.",
  locality: "Las Vegas",
  postalCode: "89141",
  latitude: 35.9956,
  longitude: -115.2036,
  faqs,
});

export default function SouthernHighlandsPage() {
  return (
    <>
      <SchemaScript schema={pageSchema} id="southern-highlands-schema" />
      <Navbar />
      <PageHero
        imageKey="nbSouthernHighlands"
        pagePath={PATH}
        badge="Berkshire Hathaway HomeServices Nevada Properties"
        title="Southern Highlands homes for sale"
        subtitle="Championship golf, gated and open villages, and southwest valley access — with Dr. Jan Duffy."
        priority
      >
        <p data-community-summary className="text-lg text-white/85 max-w-3xl mx-auto">
          ~2,200-acre master plan centered on Southern Highlands Golf Club. Mid-2026 listings often
          cluster in the mid-$700Ks; sold prices vary by section — confirm live numbers before you tour.
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
              <Link href="/neighborhoods" className="hover:text-blue-600">
                Neighborhoods
              </Link>
              {" / "}
              <span className="text-slate-900">Southern Highlands</span>
            </nav>
          </div>

          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Southern Highlands market snapshot | mid-2026
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">~$769K</div>
                <div className="text-slate-300 text-sm">Recent median list*</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">~$639K</div>
                <div className="text-slate-300 text-sm">Recent median sold*</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">~52 days</div>
                <div className="text-slate-300 text-sm">Median days on market*</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-1">162</div>
                <div className="text-slate-300 text-sm">Active listings (May 2026)*</div>
              </div>
            </div>
            <p className="text-center text-slate-400 text-xs mt-6">
              *Public market snapshots change weekly. Call {agentInfo.phone} for MLS-verified comps.
            </p>
          </section>

          <section className="mb-16 max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none text-slate-700">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Why buyers choose Southern Highlands
              </h2>
              <p>
                <strong>Southern Highlands</strong> is a ~2,200-acre master-planned community in
                southwest Las Vegas built around a Robert Trent Jones Jr. championship golf course.
                Buyers who want golf-course lots, gated estate sections, or larger-lot single-family
                homes with quick I-15 access work with{" "}
                <strong>Berkshire Hathaway HomeServices Nevada Properties</strong> and Dr. Jan Duffy
                to compare HOA fees, lot premiums, and commute times to the Strip and airport.
              </p>
              <p>
                Non-golfers still benefit from course views and community maintenance standards.
                Sections range from golf-club estates to newer villages with different architectural
                guidelines — Dr. Jan walks each CC&R set before you write.
              </p>
              <p>
                Also shopping walkable midtown condos? Compare{" "}
                <Link href="/midtown-real-estate" className="text-blue-600 font-medium">
                  midtown real estate
                </Link>{" "}
                and{" "}
                <Link href="/neighborhoods/arts-district" className="text-blue-600 font-medium">
                  Arts District lofts
                </Link>{" "}
                on the same tour day.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Community highlights</h3>
              <div className="grid md:grid-cols-2 gap-8 not-prose">
                <div className="bg-slate-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Star className="h-8 w-8 text-blue-600 mr-3" />
                    <h4 className="font-bold text-slate-900 text-lg">Championship golf course</h4>
                  </div>
                  <p className="text-slate-600">
                    Southern Highlands Golf Club offers private membership options, clubhouse dining,
                    and golf-course home sites that typically trade at a premium to interior lots.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-blue-600 mr-3" />
                    <h4 className="font-bold text-slate-900 text-lg">Gated estate sections</h4>
                  </div>
                  <p className="text-slate-600">
                    Select enclaves use gated entry and larger custom or semi-custom lots with
                    architectural review. Confirm HOA dues, gate policies, and rental rules in writing.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Mountain className="h-8 w-8 text-blue-600 mr-3" />
                    <h4 className="font-bold text-slate-900 text-lg">Southwest valley access</h4>
                  </div>
                  <p className="text-slate-600">
                    Positioned for I-15 corridors toward Harry Reid International Airport and the
                    Strip — often shorter than west-valley drives for airport-heavy schedules.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-8 w-8 text-blue-600 mr-3" />
                    <h4 className="font-bold text-slate-900 text-lg">Nearby schools (names only)</h4>
                  </div>
                  <p className="text-slate-600">
                    Clark County School District campuses serving the area include Elise Wolff
                    Elementary, Robert Forbuss Elementary, Coronado High School, Liberty High School,
                    and nearby private options such as Bishop Gorman High School. Verify boundaries
                    for any specific address.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 max-w-5xl mx-auto" aria-labelledby="sh-faq">
            <h2 id="sh-faq" className="text-2xl font-bold text-slate-900 mb-4">
              Southern Highlands FAQ
            </h2>
            <dl className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  data-community-faq
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <dt className="font-semibold text-slate-900">{faq.question}</dt>
                  <dd className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl bg-slate-900 text-white p-8 md:p-12 max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Tour Southern Highlands with Dr. Jan Duffy</h2>
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
                Schedule a showing
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
