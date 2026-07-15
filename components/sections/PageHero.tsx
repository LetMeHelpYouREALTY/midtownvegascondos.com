import Image from "next/image";
import { getHeroImage, type HeroImageKey } from "@/lib/hero-images";

type PageHeroProps = {
  /** Optional badge above the H1 */
  badge?: string;
  title: string;
  subtitle?: string;
  /** Hero asset key from lib/hero-images */
  imageKey?: HeroImageKey;
  /** Override image src (rare) */
  imageSrc?: string;
  imageAlt?: string;
  /** Extra content under subtitle (CTAs, search widgets) */
  children?: React.ReactNode;
  /** Tight padding for secondary pages */
  compact?: boolean;
  /** Prefer priority loading for LCP pages */
  priority?: boolean;
  className?: string;
};

/**
 * Full-bleed dark page hero matching the homepage visual language:
 * edge-to-edge photo wash over slate-900, centered badge + H1 + subtitle.
 */
export default function PageHero({
  badge,
  title,
  subtitle,
  imageKey = "midtownSkyline",
  imageSrc,
  imageAlt,
  children,
  compact = false,
  priority = false,
  className = "",
}: PageHeroProps) {
  const fallback = getHeroImage(imageKey);
  const src = imageSrc ?? fallback.src;
  const alt = imageAlt ?? fallback.alt;

  return (
    <section
      className={`relative bg-slate-900 text-white overflow-hidden ${
        compact ? "pt-28 pb-14 md:pt-32 md:pb-16" : "pt-32 pb-20 md:pt-40 md:pb-28"
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/40 to-slate-900/70" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {badge ? (
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6">
            {badge}
          </span>
        ) : null}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-xl md:text-2xl text-white/85 mb-8 max-w-3xl mx-auto">{subtitle}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
