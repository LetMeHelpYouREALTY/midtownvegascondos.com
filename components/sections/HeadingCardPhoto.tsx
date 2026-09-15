import Image from "next/image";
import { getCdnImageSrc } from "@/lib/cloudflare-assets";
import { getHeroImage, type HeroImageKey } from "@/lib/hero-images";
import { getSectionImage, type SectionImageKey } from "@/lib/section-images";

type HeadingCardPhotoProps = {
  heading: string;
  heroKey?: HeroImageKey;
  sectionKey?: SectionImageKey;
  src?: string;
  alt?: string;
  className?: string;
};

/**
 * Compact heading-matched photograph for H2/H3 cards and grids.
 */
export default function HeadingCardPhoto({
  heading,
  heroKey,
  sectionKey,
  src,
  alt,
  className = "",
}: HeadingCardPhotoProps) {
  const catalog = sectionKey
    ? getSectionImage(sectionKey)
    : getHeroImage(heroKey ?? "homeSkylineDay");
  const resolvedSrc = getCdnImageSrc(src ?? catalog.src);
  const resolvedAlt = alt ?? catalog.alt;

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-slate-200 ${className}`}
    >
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={resolvedSrc}
          alt={resolvedAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          title={heading}
        />
      </div>
    </div>
  );
}
