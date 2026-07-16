import Image from "next/image";
import SchemaScript from "@/components/SchemaScript";
import {
  generateHeroImageSchema,
  getHeroImage,
  type HeroImageKey,
} from "@/lib/hero-images";
import { siteConfig } from "@/lib/site-config";

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
  className?: string;
};

/**
 * Full-bleed photo hero with ImageObject schema (SEO / GEO / AEO).
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
  className = "",
}: PageHeroProps) {
  const meta = getHeroImage(imageKey);
  const src = imageSrc ?? meta.src;
  const alt = imageAlt ?? meta.alt;
  const pageUrl = `${siteConfig.url}${pagePath ?? ""}`;
  const imageSchema = generateHeroImageSchema(imageKey, pageUrl, title);

  return (
    <section
      className={`relative bg-slate-950 text-white overflow-hidden ${
        compact ? "pt-28 pb-14 md:pt-32 md:pb-16" : "pt-32 pb-20 md:pt-40 md:pb-28"
      } ${className}`}
    >
      <SchemaScript schema={imageSchema} id="hero-image-schema" />
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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">{subtitle}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
