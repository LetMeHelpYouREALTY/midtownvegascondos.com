import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PageHero from "@/components/sections/PageHero";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { Phone, ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { withPageHeroMetadata } from "@/lib/image-seo";
import {
  midtownLifestylePages,
  generateLifestylePageSchema,
  type MidtownLifestyleSlug,
} from "@/lib/gsc-recovery-pages";
import { agentInfo, officeInfo } from "@/lib/site-config";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const slugs = Object.keys(midtownLifestylePages) as MidtownLifestyleSlug[];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = midtownLifestylePages[slug as MidtownLifestyleSlug];
  if (!page) return {};
  return withPageHeroMetadata(page.path, {
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  });
}

export default async function NeighborhoodLifestylePage({ params }: PageProps) {
  const { slug } = await params;
  const page = midtownLifestylePages[slug as MidtownLifestyleSlug];
  if (!page) notFound();

  return (
    <>
      <SchemaScript schema={generateLifestylePageSchema(page.slug)} id={`${page.slug}-schema`} />
      <Navbar />
      <PageHero
        imageKey={page.heroKey}
        pagePath={page.path}
        badge={page.badge}
        title={page.headline}
        subtitle={page.summary}
        priority
      >
        <p className="text-sm text-white/75 flex items-center justify-center gap-2">
          <MapPin className="h-4 w-4" aria-hidden />
          {page.addressLabel}
        </p>
      </PageHero>
      <main className="pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <ul className="grid sm:grid-cols-2 gap-3 mb-10">
            {page.highlights.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>

          <article className="prose prose-slate max-w-none mb-12">
            {page.body.map((para) => (
              <p key={para.slice(0, 40)} className="text-slate-700 leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </article>

          <section className="mb-12" aria-labelledby="lifestyle-faq">
            <h2 id="lifestyle-faq" className="text-2xl font-bold text-slate-900 mb-4">
              FAQ
            </h2>
            <dl className="space-y-4">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg border border-slate-200 p-4">
                  <dt className="font-semibold text-slate-900">{faq.question}</dt>
                  <dd className="mt-2 text-slate-600 text-sm leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Related midtown pages</h2>
            <div className="flex flex-wrap gap-3">
              {page.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                >
                  {link.label}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-slate-900 text-white p-8 text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Tour midtown condos with Dr. Jan Duffy</h2>
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
