import Image from "next/image";
import SchemaScript from "@/components/SchemaScript";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SectionPhoto from "@/components/sections/SectionPhoto";
import GbpEngageButtons from "@/components/sections/GbpEngageButtons";
import { getHeroImage, type HeroImageKey } from "@/lib/hero-images";
import { type SectionImageKey } from "@/lib/section-images";
import { generatePageHeroSchemaGraph } from "@/lib/image-seo";
import { agentInfo, siteConfig } from "@/lib/site-config";

type PageHeroProps = {
  /** Optional badge above the H1 */
  badge?: string;
  title: string;
  subtitle?: string;
  /** Unique hero asset key from lib/hero-images */
  imageKey?: HeroImageKey;
  /** Override image src (rare) */
  imageSrc?: string;
  imageAlt?: string;
  /** Canonical page path for ImageObject @id (e.g. /buyers) */
  pagePath?: string;
  /** Extra content under subtitle (CTAs, search widgets) */
  children?: React.ReactNode;
  /** Tight padding for secondary pages */
  compact?: boolean;
  /** Prefer priority loading for LCP pages */
  priority?: boolean;
  /** Visible figcaption for AEO / image context (default true) */
  showCaption?: boolean;
  className?: string;
  /** Heading-matched H2 photograph rendered under the hero */
  leadSectionKey?: SectionImageKey;
  leadSectionHeading?: string;
  /** Optional building-specific lead photo (overrides catalog key) */
  leadSrc?: string;
  leadAlt?: string;
  leadCaption?: string;
  /** Call / Directions / Reviews in the first viewport (GBP local-pack) */
  showGbpActions?: boolean;
};

/**
 * Full-bleed photo hero with WebPage + ImageObject schema (SEO / GEO / AEO).
 */
export default function PageHero({
  badge,
  title,
  subtitle,
  imageKey = "homeStripDusk",
  imageSrc,
  imageAlt,
  pagePath,
  children,
  compact = false,
  priority = false,
  showCaption = true,
  className = "",
  leadSectionKey,
  leadSectionHeading,
  leadSrc,
  leadAlt,
  leadCaption,
  showGbpActions = true,
}: PageHeroProps) {
  const meta = getHeroImage(imageKey);
  const src = imageSrc ?? meta.src;
  const alt = imageAlt ?? meta.alt;
  const path = pagePath ?? "/";
  const schemaGraph = generatePageHeroSchemaGraph({
    imageKey,
    pagePath: path,
    pageName: title,
    pageDescription: subtitle,
  });

  return (
    <>
      <section
        className={`relative bg-slate-950 text-white overflow-hidden ${
          compact
            ? "pt-28 pb-14 md:pt-32 md:pb-16"
            : "pt-32 pb-20 md:pt-40 md:pb-28"
        } ${className}`}
        aria-labelledby="page-hero-heading"
      >
        <SchemaScript schema={schemaGraph} id="hero-image-schema" />
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
          title={meta.caption}
        />
        {/* Light scrim for text contrast — keeps the photo dominant */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />

        <div className="relative z-10 container mx-auto px-4 text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
          {badge ? (
            <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6">
              {badge}
            </span>
          ) : null}
          <h1
            id="page-hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto"
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
              {subtitle}
            </p>
          ) : null}
          {children}
          {showGbpActions ? <GbpEngageButtons onDark className="mt-6" /> : null}
          {showCaption ? (
            <figure className="mt-10 mx-auto max-w-2xl border-t border-white/20 pt-4 text-left md:text-center">
              <figcaption
                data-hero-caption
                className="text-xs leading-relaxed text-white/70 md:text-sm"
              >
                <span className="font-medium text-white/85">
                  {meta.caption}
                </span>
                <span className="mt-1 block text-white/50">
                  Photo credit: {agentInfo.name}, {siteConfig.name} ·{" "}
                  {meta.geoName}
                </span>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </section>
      {leadSectionKey || leadSrc ? (
        <div className="border-b border-slate-100 bg-white px-4 py-8 md:py-10">
          <SectionPhoto
            imageKey={leadSrc ? undefined : leadSectionKey}
            src={leadSrc}
            alt={leadAlt}
            caption={leadCaption}
            heading={leadSectionHeading}
            className="mx-auto max-w-5xl text-left"
          />
        </div>
      ) : null}
      <RealScoutListings />
    </>
  );
}
