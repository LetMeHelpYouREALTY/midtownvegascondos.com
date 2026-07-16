import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { DEFAULT_CONFIG } from "@/lib/domain-config";
import { siteConfig } from "@/lib/site-config";
import { getDefaultSocialImage, heroImageMetadata } from "@/lib/image-seo";
import { getSearchConsoleVerification } from "@/lib/search-console";
import { generateLocalBusinessSchema } from "@/lib/gbp-schema";
import { generateWebSiteSchema } from "@/lib/schema";
import SchemaScript from "@/components/SchemaScript";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

/**
 * Static midtown metadata — avoid headers() here so the document shell can
 * be cached (mobile TTFB / LCP). Per-domain pages override via their own
 * generateMetadata + getPageDomainConfig().
 */
export const metadata: Metadata = (() => {
  const config = DEFAULT_CONFIG;
  const siteUrl = siteConfig.url;
  const title = `${config.heroHeadline} | Dr. Jan Duffy, REALTOR® | BHHS Nevada`;
  const description = config.description;
  const social = getDefaultSocialImage();
  const geoMeta = heroImageMetadata("homeStripDusk", {
    title: config.heroHeadline,
    description,
    path: "/",
  });
  const verification = getSearchConsoleVerification();

  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: config.keywords,
    metadataBase: new URL(siteUrl),
    // Do NOT set alternates.canonical here — a root "/" canonical fights every child page
    // and triggers GSC "Duplicate without user-selected canonical".
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...(verification ? { verification } : {}),
    openGraph: {
      title: config.heroHeadline,
      description,
      type: "website" as const,
      url: siteUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      images: [
        {
          url: social.url,
          width: social.width,
          height: social.height,
          alt: social.alt,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: config.heroHeadline,
      description,
      images: [social.url],
    },
    other: {
      ...(geoMeta.other as Record<string, string>),
    },
  };
})();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <SchemaScript schemas={[localBusinessSchema, webSiteSchema]} id="site-schema" />
        {/* WidgetTracker — lazyOnload so ~450KB + fonts stay off LCP */}
        <Script id="widget-tracker" strategy="lazyOnload">{`
          (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
          {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
          (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
          e.parentNode.insertBefore(t,e);})
          (window,"https://widgetbe.com/agent",document,"widgetTracker");
          window.widgetTracker("create","WT-XQHVYQWW");
          window.widgetTracker("send","pageview");
        `}</Script>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
