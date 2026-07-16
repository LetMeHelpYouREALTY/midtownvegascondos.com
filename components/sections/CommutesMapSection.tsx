import Link from "next/link";
import { MapPin, Phone, Navigation, Clock } from "lucide-react";
import SchemaScript from "@/components/SchemaScript";
import {
  COMMUTES_MAP_DIRECTIONS_URL,
  COMMUTES_MAP_EMBED_URL,
  COMMUTES_MAP_PLACE_URL,
  commuteDestinations,
  commuteFaqs,
  generateCommutesMapSchemaGraph,
} from "@/lib/commutes-map";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";

type CommutesMapSectionProps = {
  /** Optional compact height for nested layouts */
  compact?: boolean;
};

/**
 * Site-wide Google Commute Times embed — maximized for SEO / GEO / AEO + Map schema.
 */
export default function CommutesMapSection({
  compact = false,
}: CommutesMapSectionProps) {
  const schema = generateCommutesMapSchemaGraph();
  const iframeHeight = compact ? "min(70vh, 560px)" : "min(78vh, 720px)";

  return (
    <section
      id="commute-times"
      aria-labelledby="commutes-map-heading"
      className="relative bg-slate-950 text-white"
      itemScope
      itemType="https://schema.org/Map"
    >
      <SchemaScript schema={schema} id="commutes-map-schema" />

      <div className="border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              Las Vegas commute planner
            </p>
            <h2
              id="commutes-map-heading"
              data-commute-heading
              className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
              itemProp="name"
            >
              Check drive times from midtown Las Vegas condos
            </h2>
            <p
              data-commute-summary
              className="mt-4 text-base text-slate-300 md:text-lg"
              itemProp="description"
            >
              Live Google Commute Times for midtown high-rises, the Strip, Harry Reid
              Airport, Downtown, Summerlin, and Henderson — plan showings with{" "}
              {agentInfo.name} at {siteConfig.name}.
            </p>
            <p className="mt-3 text-sm text-slate-400">
              <span itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">{officeInfo.address.street}</span>,{" "}
                <span itemProp="addressLocality">{officeInfo.address.city}</span>,{" "}
                <span itemProp="addressRegion">{officeInfo.address.state}</span>{" "}
                <span itemProp="postalCode">{officeInfo.address.zip}</span>
              </span>
              {" · "}
              <Link
                href={agentInfo.phoneTel}
                className="text-blue-300 underline-offset-2 hover:underline"
              >
                {agentInfo.phone}
              </Link>
            </p>
          </div>

          <ul className="mx-auto mt-8 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {commuteDestinations.map((dest) => (
              <li
                key={dest.name}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left"
              >
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" aria-hidden />
                  <div>
                    <p className="font-medium text-white">{dest.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{dest.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Maximized map plane */}
      <div
        className="relative w-full bg-slate-900"
        style={{ height: iframeHeight, minHeight: compact ? 420 : 520 }}
      >
        <iframe
          src={COMMUTES_MAP_EMBED_URL}
          title={`Google Commute Times map — ${officeInfo.name} at ${officeInfo.address.full}`}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="geolocation; clipboard-write"
          className="absolute inset-0 h-full w-full border-0"
          itemProp="url"
        />
      </div>

      <div className="border-t border-white/10 bg-slate-900">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            <a
              href={COMMUTES_MAP_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              <Navigation className="mr-2 h-4 w-4" aria-hidden />
              Get directions
            </a>
            <a
              href={COMMUTES_MAP_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              <MapPin className="mr-2 h-4 w-4" aria-hidden />
              View on Google Maps
            </a>
            <Link
              href={agentInfo.phoneTel}
              className="inline-flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              <Phone className="mr-2 h-4 w-4" aria-hidden />
              Call {agentInfo.phone}
            </Link>
          </div>
          <p className="text-sm text-slate-400">
            Ask {agentInfo.name} to compare routes before your midtown condo tour.
          </p>
        </div>

        <div className="container mx-auto border-t border-white/10 px-4 py-8">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Commute questions buyers ask
          </h3>
          <dl className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {commuteFaqs.map((faq) => (
              <div
                key={faq.question}
                data-commute-faq
                className="rounded-lg border border-white/10 bg-white/5 p-4 text-left"
              >
                <dt className="font-medium text-white">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-300">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
