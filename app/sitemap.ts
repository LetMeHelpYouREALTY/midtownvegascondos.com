import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { imagesForSitemapPage } from "@/lib/image-seo";
import { midtownNeighborhoods } from "@/lib/hyperlocal-content";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type PageEntry = {
  path: string;
  priority: number;
  changeFrequency: Freq;
};

/**
 * GSC-ready sitemap: only final 200 URLs on the www host.
 * Omits legacy neighborhood slugs and /55-plus-communities/* (permanent redirects).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  // Stable-ish timestamp: day granularity so GSC does not see "changed every deploy"
  const lastModified = new Date();
  lastModified.setUTCHours(0, 0, 0, 0);

  const pages: PageEntry[] = [
    // Core
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/listings", priority: 0.9, changeFrequency: "daily" },
    { path: "/why-berkshire-hathaway", priority: 0.9, changeFrequency: "monthly" },
    { path: "/market-report", priority: 0.9, changeFrequency: "weekly" },
    { path: "/market-update", priority: 0.9, changeFrequency: "weekly" },
    { path: "/market-insights", priority: 0.9, changeFrequency: "monthly" },
    { path: "/google-business", priority: 0.9, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/midtown-real-estate", priority: 0.9, changeFrequency: "weekly" },
    { path: "/security-policy", priority: 0.3, changeFrequency: "yearly" },

    // Midtown lifestyle (GSC recovery — singular /neighborhood paths)
    { path: "/neighborhood", priority: 0.8, changeFrequency: "weekly" },
    { path: "/neighborhood/run-club", priority: 0.7, changeFrequency: "monthly" },
    { path: "/neighborhood/ev-program", priority: 0.7, changeFrequency: "monthly" },
    { path: "/neighborhood/pepper-club", priority: 0.7, changeFrequency: "monthly" },

    // Services
    { path: "/buyers", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sellers", priority: 0.8, changeFrequency: "monthly" },
    { path: "/luxury-homes", priority: 0.8, changeFrequency: "weekly" },
    { path: "/new-construction", priority: 0.8, changeFrequency: "weekly" },
    { path: "/investment-properties", priority: 0.8, changeFrequency: "weekly" },
    { path: "/relocation", priority: 0.8, changeFrequency: "monthly" },
    { path: "/home-valuation", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.7, changeFrequency: "monthly" },

    // Buyer personas
    { path: "/buyers/california-relocator", priority: 0.8, changeFrequency: "monthly" },
    { path: "/buyers/first-time-buyers", priority: 0.8, changeFrequency: "monthly" },
    { path: "/buyers/luxury-homes-las-vegas", priority: 0.8, changeFrequency: "monthly" },

    // Seller personas
    { path: "/sellers/move-up", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sellers/downsizing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sellers/divorce-probate", priority: 0.7, changeFrequency: "monthly" },
    { path: "/sellers/relocation", priority: 0.8, changeFrequency: "monthly" },

    // Midtown neighborhoods hub + live [slug] pages only
    { path: "/neighborhoods", priority: 0.9, changeFrequency: "weekly" },
    ...midtownNeighborhoods.map((n) => ({
      path: `/neighborhoods/${n.slug}`,
      priority: 0.8,
      changeFrequency: "weekly" as const,
    })),
  ];

  return pages.map((page) => {
    const url = page.path === "/" ? baseUrl : `${baseUrl}${page.path}`;
    const images = imagesForSitemapPage(url);
    return {
      url,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      ...(images.length > 0 ? { images } : {}),
    };
  });
}
