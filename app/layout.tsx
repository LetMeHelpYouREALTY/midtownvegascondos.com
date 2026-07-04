import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import {
  siteConfig,
  getAgentImageSrc,
  agentImage,
} from "@/lib/site-config";
import { generateLocalBusinessSchema } from "@/lib/gbp-schema";
import { generateWebSiteSchema } from "@/lib/schema";
import SchemaScript from "@/components/SchemaScript";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
  const domain = headers().get("x-domain") || siteConfig.url.replace("https://", "");
  const config = getDomainConfig(domain);
  const siteUrl =
    config.domain !== "default" && config.domain !== "midtownvegascondos.com"
      ? `https://${config.domain}`
      : siteConfig.url;

  const title = `${config.heroHeadline} | Dr. Jan Duffy, REALTOR® | BHHS Nevada`;
  const description = config.description;

  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: config.keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: config.heroHeadline,
      description,
      type: "website",
      url: siteUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      images: [
        {
          url: getAgentImageSrc(),
          width: agentImage.width,
          height: agentImage.height,
          alt: agentImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.heroHeadline,
      description,
      images: [getAgentImageSrc()],
    },
    other: {
      "geo.region": "US-NV",
      "geo.placename": "Las Vegas",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <SchemaScript schemas={[localBusinessSchema, webSiteSchema]} id="site-schema" />
        {/* RealScout widget script — loads once globally */}
        <Script
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          strategy="afterInteractive"
        />
        {/* WidgetTracker */}
        <Script id="widget-tracker" strategy="afterInteractive">{`
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
