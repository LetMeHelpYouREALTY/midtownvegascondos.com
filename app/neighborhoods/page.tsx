import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import { MapPin, Phone, Home, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { withPageHeroMetadata } from "@/lib/image-seo";
import { hyperlocalMeta, midtownNeighborhoods } from "@/lib/hyperlocal-content";
import { agentInfo, officeInfo } from "@/lib/site-config";
import PageHero from "@/components/sections/PageHero";
import SectionPhoto from "@/components/sections/SectionPhoto";
import Image from "next/image";
import { getHeroImage, neighborhoodHeroBySlug } from "@/lib/hero-images";

export const metadata: Metadata = withPageHeroMetadata("/neighborhoods", {
  title: hyperlocalMeta.neighborhoods.title,
  description: hyperlocalMeta.neighborhoods.description,
  keywords: hyperlocalMeta.neighborhoods.keywords,
});

export default function NeighborhoodsPage() {
  return (
    <>
      <Navbar />
      <PageHero
        imageKey="neighborhoodsHub"
        leadSectionKey="neighborhoods"
        leadSectionHeading="Midtown Las Vegas Condo Neighborhoods"
        pagePath="/neighborhoods"
        badge="Midtown Las Vegas Condo Specialist"
        title="Midtown Las Vegas Condo Neighborhoods"
      >
        <p className="text-xl md:text-2xl text-white/85 mb-8 max-w-3xl mx-auto">
          From Arts District lofts to Strip-view high-rises — explore every
          midtown building and neighborhood with Dr. Jan Duffy, your condo
          specialist at{" "}
          <strong>Berkshire Hathaway HomeServices Nevada Properties</strong>.
        </p>
      </PageHero>
      <main className="pb-16">
        <div className="container mx-auto px-4">
          <SectionPhoto
            imageKey="neighborhoods"
            heading="Midtown Las Vegas Condo Neighborhoods"
            className="mx-auto mb-10 max-w-4xl"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {midtownNeighborhoods.map((area) => {
              const heroKey =
                neighborhoodHeroBySlug[area.slug] ?? "neighborhoodsHub";
              const img = getHeroImage(heroKey);
              return (
                <Link
                  key={area.slug}
                  href={`/neighborhoods/${area.slug}`}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="relative h-40">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600">
                        {area.name}
                      </h2>
                      <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    </div>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {area.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-blue-600">
                        Median {area.medianPrice}
                      </span>
                      <span className="text-green-600">
                        {area.priceChange} YoY
                      </span>
                    </div>
                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                      View condos
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center">
            <Home className="h-10 w-10 text-blue-400 mx-auto mb-4" />
            <SectionPhoto
              imageKey="neighborhoods"
              heading="Not sure which midtown neighborhood fits you?"
              className="mx-auto mb-6 max-w-3xl text-left"
              onDark
            />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Not sure which midtown neighborhood fits you?
            </h2>
            <p className="text-slate-300 mb-6">
              Dr. Jan Duffy knows every building, floor plan, and HOA in midtown
              Las Vegas. Get a personalized neighborhood match based on your
              lifestyle and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call {agentInfo.phone}
              </a>
              <a
                href={officeInfo.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-slate-900 px-6 py-3 rounded-md font-semibold hover:bg-slate-100"
              >
                Directions
              </a>
              <a
                href={officeInfo.maps.reviews}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-semibold"
              >
                View Google Reviews
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-semibold"
              >
                Schedule Consultation
              </Link>
            </div>
          </section>
        </div>
        <RealScoutListings />
      </main>
      <Footer />
    </>
  );
}
