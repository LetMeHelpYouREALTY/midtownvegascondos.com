import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { midtownNeighborhoods } from "@/lib/hyperlocal-content";
import { getHeroImage, neighborhoodHeroBySlug } from "@/lib/hero-images";

const featuredSlugs = [
  "arts-district",
  "symphony-park",
  "one-las-vegas",
] as const;

export default function FeaturedProperties() {
  const featured = featuredSlugs
    .map((slug) => midtownNeighborhoods.find((n) => n.slug === slug))
    .filter((n): n is (typeof midtownNeighborhoods)[number] => Boolean(n));

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Featured Midtown Condo Areas
            </h2>
            <p className="text-slate-600 text-lg">
              Arts District, Symphony Park, and Strip-adjacent high-rises — area
              medians, not a specific listing price.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href="/listings">Search live listings</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((area) => {
            const heroKey =
              neighborhoodHeroBySlug[area.slug] ?? "neighborhoodsHub";
            const img = getHeroImage(heroKey);
            return (
              <Link
                key={area.slug}
                href={`/neighborhoods/${area.slug}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 md:h-64">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                    Median {area.medianPrice}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {area.name} Condos
                  </h3>
                  <p className="text-slate-600 mb-4">{area.description}</p>
                  <span className="inline-flex items-center font-semibold text-blue-600">
                    View {area.name} condos{" "}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
