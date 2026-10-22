import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { DEFAULT_CONFIG } from "@/lib/domain-config";
import { homePageTitle, siteConfig } from "@/lib/site-config";
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
  const title = homePageTitle;
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
        <Script src="/ads-conversions.js" strategy="afterInteractive" />
        <Analytics />
                {/* Google Tag */}
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_ID && (
          <>
            <Script
              id="google-tag"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-tag-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}');
              `}
            </Script>
          </>
        )}
{/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}


