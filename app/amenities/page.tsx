import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PageHero from "@/components/sections/PageHero";
import AmenityMapSection from "@/components/sections/AmenityMapSection";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { withPageHeroMetadata } from "@/lib/image-seo";
import {
  AMENITIES_PAGE_PATH,
  amenitiesFaqs,
  amenityWrittenSections,
  communityAmenitiesConfig,
  curatedNearbyPlaces,
  generateAmenitiesPageSchemaGraph,
  placeSearchUrl,
} from "@/lib/amenities-map";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";

const PATH = AMENITIES_PAGE_PATH;

export const metadata: Metadata = withPageHeroMetadata(PATH, {
  title: `Nearby Amenities in ${communityAmenitiesConfig.fullName}, Las Vegas | Dr. Jan Duffy`,
  description:
    "Interactive map of restaurants, entertainment, grocery, healthcare, and more near Midtown Las Vegas and Arts District condos. Hyperlocal guide from Dr. Jan Duffy, BHHS Nevada. Call (702) 500-1980.",
  keywords: [
    "Midtown Las Vegas amenities",
    "Arts District restaurants",
    "condos near downtown Las Vegas",
    "nearby grocery Arts District",
    "Dr Jan Duffy midtown condos",
  ],
  alternates: {
    canonical: `${siteConfig.url}${PATH}`,
  },
});

export default function AmenitiesPage() {
  const pageSchema = generateAmenitiesPageSchemaGraph();

  return (
    <>
      <SchemaScript schema={pageSchema} id="amenities-page-schema" />
      <Navbar />
      <PageHero
        imageKey="neighborhoodsHub"
        pagePath={PATH}
        badge="Hyperlocal guide"
        title={`Nearby Amenities in ${communityAmenitiesConfig.fullName}, Las Vegas`}
      >
        <p className="text-xl md:text-2xl text-white/85 mb-4 max-w-3xl mx-auto">
          Restaurants, entertainment, grocery, healthcare, and commute context for midtown and
          Arts District condo buyers — mapped from{" "}
          <strong>{officeInfo.address.street}</strong>.
        </p>
      </PageHero>

      <main className="pb-8">
        <AmenityMapSection compact={false} showPageLink={false} hideHeader />

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {amenityWrittenSections.map((section) => (
            <article key={section.id} className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{section.title}</h2>
              <p className="text-slate-700 leading-relaxed">{section.body}</p>
            </article>
          ))}

          <section className="mb-12" aria-labelledby="featured-places-heading">
            <h2 id="featured-places-heading" className="text-2xl font-bold text-slate-900 mb-4">
              Featured nearby places
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {curatedNearbyPlaces.map((place) => (
                <li
                  key={place.name}
                  className="rounded-lg border border-slate-200 p-4 text-sm"
                >
                  <p className="font-semibold text-slate-900">{place.name}</p>
                  <p className="text-slate-600 mt-1">{place.address}</p>
                  <a
                    href={placeSearchUrl(place.name, place.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    Directions
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12" aria-labelledby="amenities-faq-heading">
            <h2 id="amenities-faq-heading" className="text-2xl font-bold text-slate-900 mb-4">
              Midtown condo amenities FAQ
            </h2>
            <dl className="space-y-4">
              {amenitiesFaqs.map((faq) => (
                <div
                  key={faq.question}
                  data-amenity-faq
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <dt className="font-semibold text-slate-900">{faq.question}</dt>
                  <dd className="mt-2 text-sm text-slate-700 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            className="rounded-2xl bg-slate-900 text-white p-8 md:p-10 text-center"
            aria-labelledby="amenities-cta-heading"
          >
            <h2 id="amenities-cta-heading" className="text-2xl font-bold mb-3">
              Tour midtown condos with a local expert
            </h2>
            <p className="text-slate-300 mb-2">
              {agentInfo.name}, {agentInfo.title} · License {agentInfo.license}
            </p>
            <p className="text-slate-400 text-sm mb-2">{agentInfo.brokerage}</p>
            <p className="text-slate-400 text-sm mb-6">{officeInfo.address.full}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden />
                Call {agentInfo.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 font-semibold hover:bg-white/10"
              >
                Schedule a consultation
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
