import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import { Phone } from "lucide-react";
import type { Metadata } from "next";
import { withPageHeroMetadata } from "@/lib/image-seo";
import SchemaScript from "@/components/SchemaScript";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebPageSchema,
  combineSchemas,
} from "@/lib/schema";

import { hyperlocalMeta, midtownCondoFaqs } from "@/lib/hyperlocal-content";
import { commonFAQs, agentInfo, officeInfo } from "@/lib/site-config";
import PageHero from "@/components/sections/PageHero";

export const metadata: Metadata = withPageHeroMetadata("/faq", {
  title: hyperlocalMeta.faq.title,
  description: hyperlocalMeta.faq.description,
  keywords: [
    "midtown Las Vegas condo FAQ",
    "downtown Las Vegas condo questions",
    "HOA fees midtown Vegas",
    "condo rental rules Las Vegas",
    "Dr Jan Duffy condo agent",
  ],
});

// Breadcrumb items
const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "FAQ", url: "/faq" },
];

const faqCategories = [
  {
    title: "Midtown Las Vegas Condos",
    faqs: midtownCondoFaqs.map((f) => ({ q: f.question, a: f.answer })),
  },
  {
    title: "About Dr. Jan Duffy & BHHS",
    faqs: commonFAQs.general.map((f) => ({ q: f.question, a: f.answer })),
  },
  {
    title: "Buying a Midtown Condo",
    faqs: commonFAQs.buying.map((f) => ({ q: f.question, a: f.answer })),
  },
  {
    title: "Selling Your Midtown Condo",
    faqs: commonFAQs.selling.map((f) => ({ q: f.question, a: f.answer })),
  },
  {
    title: "Midtown Condo Investing",
    faqs: [
      {
        q: "Is midtown Las Vegas good for condo investing?",
        a: "Midtown condos can offer strong rental demand from urban professionals and entertainment workers. Dr. Jan analyzes rental caps, STR rules, and HOA reserves before you invest.",
      },
      {
        q: "Which midtown buildings allow short-term rentals?",
        a: "Rules vary by tower. Some allow Airbnb-style rentals; others restrict to long-term leases. Dr. Jan reviews CC&Rs for every investment purchase.",
      },
    ],
  },
  {
    title: "Working with Dr. Jan Duffy",
    faqs: [
      {
        q: "What is Dr. Jan Duffy's midtown condo experience?",
        a: "Dr. Jan has served Las Vegas since 2008 with $127M+ in closed transactions. She specializes in midtown and downtown condos including One Las Vegas, Juhl, Arts District lofts, and Palms Place.",
      },
      {
        q: "How do I contact Dr. Jan Duffy?",
        a: `Call or text ${agentInfo.phone} or email ${agentInfo.email}. Office: ${officeInfo.address.full}.`,
      },
    ],
  },
];

// Flatten all FAQs for schema generation
const allFaqs = faqCategories.flatMap((category) =>
  category.faqs.map((faq) => ({
    question: faq.q,
    answer: faq.a,
  }))
);

// Combined page schemas including all FAQs
const pageSchemas = combineSchemas(
  generateBreadcrumbSchema(breadcrumbs),
  generateWebPageSchema({
    name: "Frequently Asked Questions | Berkshire Hathaway HomeServices Las Vegas",
    description:
      "Comprehensive FAQ about Las Vegas real estate, buying, selling, investing, and working with Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties.",
    url: "/faq",
    dateModified: "2026-01-25",
  }),
  generateFAQSchema(allFaqs)
);

export default function FAQPage() {
  return (
    <>
      {/* Combined JSON-LD Schema: Breadcrumb + WebPage + FAQPage (all categories) */}
      <SchemaScript schema={pageSchemas} id="faq-page-schema" />
      <Navbar />
      <PageHero
        imageKey="faqLoft"
        pagePath="/faq"
        badge="Berkshire Hathaway HomeServices Nevada Properties"
        title="Frequently Asked Questions"
      >
        <p className="text-xl md:text-2xl text-white/85 mb-8 max-w-3xl mx-auto">Midtown Las Vegas condo questions — HOA fees, rental rules, buildings, and working
              with <strong>Dr. Jan Duffy</strong> at Berkshire Hathaway HomeServices</p>
      </PageHero>
      <main className="pb-16">
        <div className="container mx-auto px-4">

          {/* FAQ Categories */}
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category) => (
              <section key={category.title}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.faqs.map((faq, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-6">
                      <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                      <p className="text-slate-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <section className="mt-16 text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Dr. Jan Duffy is happy to answer questions about midtown Las Vegas condos, HOA
              review, and buying or selling downtown towers.
            </p>
            <a
              href="tel:+17025001942"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call (702) 500-1942
            </a>
            <p className="mt-4 text-blue-200 text-sm">
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
