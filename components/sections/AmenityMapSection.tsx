import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import SchemaScript from "@/components/SchemaScript";
import {
  AMENITIES_PAGE_PATH,
  communityAmenitiesConfig,
  generateAmenitySectionSchemaGraph,
  getCuratedPlacesForCategory,
} from "@/lib/amenities-map";
import { agentInfo } from "@/lib/site-config";

const AmenityMapClient = dynamic(() => import("@/components/maps/AmenityMapClient"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-xl border border-slate-200 bg-slate-100"
      style={{ minHeight: 420, height: "min(60vh, 520px)" }}
      aria-hidden
    />
  ),
});

type AmenityMapSectionProps = {
  compact?: boolean;
  /** Hide the "view full page" link when already on /amenities */
  showPageLink?: boolean;
  hideHeader?: boolean;
};

export default function AmenityMapSection({
  compact = false,
  showPageLink = true,
  hideHeader = false,
}: AmenityMapSectionProps) {
  const schema = generateAmenitySectionSchemaGraph();
  const previewPlaces = [
    ...getCuratedPlacesForCategory("restaurants").slice(0, 2),
    ...getCuratedPlacesForCategory("entertainment").slice(0, 1),
    ...getCuratedPlacesForCategory("grocery").slice(0, 1),
  ];

  return (
    <section
      id="whats-nearby"
      aria-labelledby={hideHeader ? undefined : "amenity-map-heading"}
      aria-label={hideHeader ? "Interactive nearby amenities map" : undefined}
      className="bg-white py-14 md:py-18 border-t border-slate-200"
    >
      <SchemaScript schema={schema} id="amenity-section-schema" />
      <div className="container mx-auto px-4">
        {!hideHeader && (
          <div className="mx-auto max-w-4xl text-center mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              What&apos;s nearby
            </p>
            <h2
              id="amenity-map-heading"
              className="text-3xl font-bold text-slate-900 md:text-4xl"
            >
              Life near {communityAmenitiesConfig.name}
            </h2>
            <p className="mt-3 text-lg text-slate-600" data-amenity-summary>
              Explore restaurants, entertainment, grocery, and services around the Arts District
              and Main Street corridor — then tour condos with {agentInfo.name}.
            </p>
          </div>
        )}

        <div className="mx-auto max-w-5xl">
          <AmenityMapClient compact={compact} />
        </div>

        {showPageLink && (
          <div className="mt-8 text-center">
            <Link
              href={AMENITIES_PAGE_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              Full nearby amenities guide
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        )}

        <ul className="mx-auto mt-10 grid max-w-3xl gap-2 sm:grid-cols-2 text-sm text-slate-600">
          {previewPlaces.map((place) => (
            <li key={place.name} className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" aria-hidden />
              <span>
                <strong className="text-slate-900">{place.name}</strong>
                <span className="block text-xs">{place.address}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
