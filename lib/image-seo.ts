/**
 * Image SEO / GEO / AEO helpers (2026 Google Images + AI Overview attribution).
 * Builds Next.js Metadata openGraph/twitter images and enhanced ImageObject JSON-LD.
 */

import type { Metadata } from "next";
import {
  generateHeroImageSchema,
  getHeroImage,
  getHeroKeyForPath,
  neighborhoodHeroBySlug,
  pageHeroByPath,
  type HeroImageKey,
} from "@/lib/hero-images";
import { siteConfig, agentInfo } from "@/lib/site-config";

export function absoluteImageUrl(src: string): string {
  if (src.startsWith("http")) return src;
  return `${siteConfig.url}${src.startsWith("/") ? src : `/${src}`}`;
}

/** Open Graph / Twitter / geo metadata for a hero key */
export function heroImageMetadata(
  imageKey: HeroImageKey,
  opts?: { title?: string; description?: string; path?: string }
): Pick<Metadata, "openGraph" | "twitter" | "other"> {
  const img = getHeroImage(imageKey);
  const url = absoluteImageUrl(img.src);
  const title = opts?.title ?? img.caption;
  const description = opts?.description ?? img.alt;

  return {
    openGraph: {
      title,
      description,
      ...(opts?.path ? { url: `${siteConfig.url}${opts.path}` } : {}),
      images: [
        {
          url,
          width: img.width,
          height: img.height,
          alt: img.alt,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [url],
    },
    other: {
      "geo.region": "US-NV",
      "geo.placename": img.geoName,
      "geo.position": `${img.geoLatitude};${img.geoLongitude}`,
      ICBM: `${img.geoLatitude}, ${img.geoLongitude}`,
    },
  };
}

/**
 * Merge page metadata with unique hero image OG/Twitter/GEO tags.
 * Always emits an absolute self-canonical (GSC-safe).
 */
export function withPageHeroMetadata(
  path: string,
  base: Metadata,
  imageKey?: HeroImageKey
): Metadata {
  const key = imageKey ?? getHeroKeyForPath(path);
  const normalizedPath = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl =
    normalizedPath === "/"
      ? siteConfig.url
      : `${siteConfig.url}${normalizedPath.replace(/\/$/, "")}`;

  const imgMeta = heroImageMetadata(key, {
    title: typeof base.title === "string" ? base.title : undefined,
    description: typeof base.description === "string" ? base.description : undefined,
    path: normalizedPath,
  });

  return {
    ...base,
    alternates: {
      ...(typeof base.alternates === "object" ? base.alternates : {}),
      canonical: canonicalUrl,
    },
    openGraph: {
      ...imgMeta.openGraph,
      ...(base.openGraph as object | undefined),
      url: canonicalUrl,
      images: imgMeta.openGraph?.images,
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
    },
    twitter: {
      ...imgMeta.twitter,
      ...(base.twitter as object | undefined),
      images: imgMeta.twitter?.images,
      card: "summary_large_image",
    },
    other: {
      ...(typeof base.other === "object" && base.other ? base.other : {}),
      ...imgMeta.other,
    },
  };
}

/**
 * WebPage + ImageObject @graph with primaryImageOfPage for Google Images / AEO.
 */
export function generatePageHeroSchemaGraph(opts: {
  imageKey: HeroImageKey;
  pagePath: string;
  pageName: string;
  pageDescription?: string;
}): Record<string, unknown> {
  const pageUrl = `${siteConfig.url}${opts.pagePath === "/" ? "" : opts.pagePath}`;
  const img = getHeroImage(opts.imageKey);
  const imageObject = generateHeroImageSchema(opts.imageKey, pageUrl, opts.pageName);
  // Drop top-level @context when nesting in @graph
  const { "@context": _c, ...imageNode } = imageObject;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: opts.pageName,
        description: opts.pageDescription ?? img.alt,
        isPartOf: { "@id": `${siteConfig.url}#website` },
        about: { "@id": `${siteConfig.url}#organization` },
        primaryImageOfPage: { "@id": `${pageUrl}#hero-image` },
        image: { "@id": `${pageUrl}#hero-image` },
        inLanguage: "en-US",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "[data-hero-caption]"],
        },
      },
      {
        ...imageNode,
        license: `${siteConfig.url}/security-policy`,
        acquireLicensePage: `${siteConfig.url}/contact`,
        usageInfo: `${siteConfig.url}/contact`,
        isPartOf: { "@id": `${pageUrl}#webpage` },
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      },
    ],
  };
}

/** Absolute hero image URLs for sitemap image extensions */
export function sitemapImageEntries(): Array<{
  pageUrl: string;
  imageUrl: string;
  title: string;
  caption: string;
  geoLocation: string;
}> {
  const fromPaths = Object.entries(pageHeroByPath).map(([path, key]) => {
    const img = getHeroImage(key);
    const pageUrl = path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
    return {
      pageUrl,
      imageUrl: absoluteImageUrl(img.src),
      title: img.alt,
      caption: img.caption,
      geoLocation: img.geoName,
    };
  });

  const fromNeighborhoods = Object.entries(neighborhoodHeroBySlug).map(
    ([slug, key]) => {
      const img = getHeroImage(key);
      return {
        pageUrl: `${siteConfig.url}/neighborhoods/${slug}`,
        imageUrl: absoluteImageUrl(img.src),
        title: img.alt,
        caption: img.caption,
        geoLocation: img.geoName,
      };
    }
  );

  const byPage = new Map<string, (typeof fromPaths)[number]>();
  for (const entry of [...fromPaths, ...fromNeighborhoods]) {
    byPage.set(entry.pageUrl, entry);
  }
  return Array.from(byPage.values());
}

/** Look up hero image URL(s) for a sitemap page URL */
export function imagesForSitemapPage(pageUrl: string): string[] {
  const entry = sitemapImageEntries().find((e) => e.pageUrl === pageUrl);
  return entry ? [entry.imageUrl] : [];
}

export function getDefaultSocialImage() {
  const img = getHeroImage("homeStripDusk");
  return {
    url: absoluteImageUrl(img.src),
    width: img.width,
    height: img.height,
    alt: img.alt,
  };
}

export const imageSeoDefaults = {
  publisher: agentInfo.name,
  brokerage: siteConfig.fullName,
  siteUrl: siteConfig.url,
};
