import Link from "next/link";
import { gbpPostTemplates } from "@/lib/gbp-posts";
import { agentInfo, siteConfig } from "@/lib/site-config";
import SectionPhoto from "@/components/sections/SectionPhoto";
import HeadingCardPhoto from "@/components/sections/HeadingCardPhoto";
import type { HeroImageKey } from "@/lib/hero-images";

type GbpPostsSectionProps = {
  limit?: number;
};

const postHeroById: Record<string, HeroImageKey> = {
  "gbp-arts-district-2026-05-14": "artsDistrict",
  "gbp-heritage-sight-unseen-2026-07-15": "fiftyFiveHeritage",
  "gbp-market-window-2026-05-14": "marketUpdate",
  "california-relocation": "buyersCaRelocator",
  "55-plus-spotlight": "fiftyFivePlus",
  "luxury-homes": "luxuryHomes",
};

/**
 * Surfaces latest GBP localPosts on-site so Maps/web stay consistent.
 */
export default function GbpPostsSection({ limit = 3 }: GbpPostsSectionProps) {
  const posts = gbpPostTemplates.slice(0, limit);
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Google Business Profile posts",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.publishDate,
        description: post.content.slice(0, 180),
        url: `${siteConfig.url}/google-business`,
        image: post.image,
        author: {
          "@type": "Person",
          name: agentInfo.name,
        },
      },
    })),
  };

  return (
    <section
      className="bg-white py-16 md:py-20"
      aria-labelledby="gbp-posts-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <div className="container mx-auto px-4">
        <SectionPhoto
          imageKey="gbpPosts"
          heading="Latest from the Arts District office"
          className="mx-auto mb-10 max-w-4xl text-left"
        />
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2
            id="gbp-posts-heading"
            className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl"
          >
            Latest from the Arts District office
          </h2>
          <p className="text-lg text-slate-600">
            The same Google Business Profile notes homebuyers see in Maps —
            dated as posted, written for downtown and Arts District condos.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-6"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                {post.type} · {post.publishDate}
                {post.sourcedFrom === "gbp-local-posts" ? " · Google" : ""}
              </p>
              <HeadingCardPhoto
                heading={post.title}
                heroKey={
                  post.heroKey ?? postHeroById[post.id] ?? "googleBusiness"
                }
                src={post.image}
                alt={post.title}
                className="mb-3"
              />
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                {post.title}
              </h3>
              <p className="mb-4 flex-1 text-sm text-slate-600 line-clamp-5">
                {post.content}
              </p>
              {post.cta ? (
                <Link
                  href={post.cta.url.replace(
                    /^https:\/\/www\.midtownvegascondos\.com/,
                    "",
                  )}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  {post.cta.text} →
                </Link>
              ) : null}
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Questions? Call {agentInfo.name} at{" "}
          <a href={agentInfo.phoneTel} className="font-semibold text-blue-600">
            {agentInfo.phone}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
