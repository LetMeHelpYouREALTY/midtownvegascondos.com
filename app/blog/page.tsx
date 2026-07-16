import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PageHero from "@/components/sections/PageHero";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { Phone, ArrowRight, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import { withPageHeroMetadata } from "@/lib/image-seo";
import { blogPosts } from "@/lib/gsc-recovery-pages";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = withPageHeroMetadata("/blog", {
  title: "Midtown Las Vegas Condo Blog | Market & Lifestyle Guides | Dr. Jan Duffy",
  description:
    "Midtown Las Vegas condo blog — market updates, building guides, Run Club, EV living, and Arts District tips from Dr. Jan Duffy, BHHS Nevada Properties. Call (702) 500-1942.",
  keywords: [
    "midtown Las Vegas condo blog",
    "Las Vegas real estate blog",
    "Arts District condo guides",
    "Dr Jan Duffy market updates",
  ],
});

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Midtown Vegas Condos Blog",
  url: `${siteConfig.url}/blog`,
  description:
    "Market updates and lifestyle guides for midtown Las Vegas condominium buyers and sellers.",
  publisher: {
    "@type": "RealEstateAgent",
    name: agentInfo.name,
    url: siteConfig.url,
    telephone: agentInfo.phoneTel.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: officeInfo.address.street,
      addressLocality: officeInfo.address.city,
      addressRegion: officeInfo.address.state,
      postalCode: officeInfo.address.zip,
      addressCountry: "US",
    },
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: post.href.startsWith("http") ? post.href : `${siteConfig.url}${post.href}`,
    author: { "@type": "Person", name: agentInfo.name },
  })),
};

export default function BlogPage() {
  return (
    <>
      <SchemaScript schema={blogSchema} id="blog-schema" />
      <Navbar />
      <PageHero
        imageKey="homeSkylineDay"
        pagePath="/blog"
        badge="Guides & market notes"
        title="Midtown Vegas Condos Blog"
        subtitle="Market data, building notes, and lifestyle guides for Arts District and midtown high-rise buyers."
        priority
      />
      <main className="pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid gap-6 mb-12">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl border border-slate-200 bg-white p-6 hover:border-blue-300 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-2">
                  <span className="inline-flex items-center gap-1 font-semibold uppercase tracking-wide text-blue-600">
                    <Newspaper className="h-3.5 w-3.5" />
                    {post.category}
                  </span>
                  <time dateTime={post.date}>
                    {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  <Link href={post.href} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-slate-600 mb-4">{post.description}</p>
                <Link
                  href={post.href}
                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Read article
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <section className="rounded-2xl bg-slate-900 text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Want a custom midtown shortlist?</h2>
            <p className="text-slate-300 mb-6">
              Call {agentInfo.name} at {agentInfo.phone} · {officeInfo.address.full}
            </p>
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call now
            </a>
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
