"use client";

import Image from "next/image";
import { getCdnImageSrc } from "@/lib/cloudflare-assets";
import { getSectionImage, type SectionImageKey } from "@/lib/section-images";
import { agentInfo, siteConfig } from "@/lib/site-config";

type SectionPhotoProps = {
  imageKey?: SectionImageKey;
  src?: string;
  alt?: string;
  caption?: string;
  heading?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Heading-matched section photograph for H2/H3 blocks (SEO alt + visible caption).
 */
export default function SectionPhoto({
  imageKey,
  src,
  alt,
  caption,
  heading,
  priority = false,
  className = "",
}: SectionPhotoProps) {
  const catalog = imageKey ? getSectionImage(imageKey) : null;
  const resolvedSrc = getCdnImageSrc(src ?? catalog?.src ?? "/images/hero/home-skyline-day.webp");
  const resolvedAlt = alt ?? catalog?.alt ?? heading ?? "Midtown Las Vegas real estate";
  const resolvedCaption = caption ?? catalog?.caption;
  const resolvedHeading = heading ?? catalog?.heading;

  return (
    <figure className={`overflow-hidden rounded-xl ${className}`}>
      <div className="relative aspect-[16/9] w-full bg-slate-200">
        <Image
          src={resolvedSrc}
          alt={resolvedAlt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
          className="object-cover"
          title={resolvedCaption ?? resolvedAlt}
        />
      </div>
      {resolvedCaption ? (
        <figcaption className="mt-2 text-left text-xs text-slate-500 md:text-sm">
          {resolvedHeading ? (
            <span className="font-medium text-slate-700">{resolvedHeading}. </span>
          ) : null}
          {resolvedCaption}
          <span className="mt-0.5 block text-slate-400">
            Photo: {agentInfo.name}, {siteConfig.shortBrand}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
