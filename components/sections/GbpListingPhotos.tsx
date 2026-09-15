import Image from "next/image";
import SectionPhoto from "@/components/sections/SectionPhoto";
import { gbpListingPhotos } from "@/lib/gbp-listing-photos";
import { officeInfo } from "@/lib/site-config";

/**
 * Maps listing photos homebuyers already see on Google. Shown on-site so
 * the website gallery matches the GBP / local-pack photos.
 */
export default function GbpListingPhotos() {
  return (
    <section className="max-w-5xl mx-auto mb-16">
      <SectionPhoto
        imageKey="gbpVisit"
        heading="Photos from Google Business Profile"
        className="mb-6 text-left"
      />
      <h2 className="text-2xl font-bold text-slate-900 mb-3">
        Photos from Google Business Profile
      </h2>
      <p className="text-slate-600 mb-6">
        The same listing photos Google Maps shows for {officeInfo.name} at{" "}
        {officeInfo.address.full}. Call {officeInfo.phone} to tour Arts District
        and downtown Las Vegas condos.
      </p>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {gbpListingPhotos.map((photo) => (
          <li
            key={photo.id}
            className="overflow-hidden rounded-lg bg-slate-100"
          >
            <a
              href={officeInfo.maps.place}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                className="h-36 w-full object-cover md:h-40"
                loading="lazy"
                unoptimized
              />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-slate-500">
        <a
          href={officeInfo.maps.place}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-700 hover:underline"
        >
          Open the Google listing
        </a>{" "}
        for the full photo gallery.
      </p>
    </section>
  );
}
