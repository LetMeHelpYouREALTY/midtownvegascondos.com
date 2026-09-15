import { Clock, MapPin, Phone, Star } from "lucide-react";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";
import SectionPhoto from "@/components/sections/SectionPhoto";

type GbpLocalPackProps = {
  showMap?: boolean;
  className?: string;
};

/**
 * Sitewide NAP + Maps actions that must match Google Business Profile exactly.
 * Renders on every page via Footer to support local pack / Maps ranking.
 */
export default function GbpLocalPack({
  showMap = true,
  className = "",
}: GbpLocalPackProps) {
  return (
    <section
      className={`border-t border-slate-800 bg-slate-950 text-white ${className}`}
      aria-labelledby="gbp-local-pack-heading"
    >
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div
          className={`grid gap-8 ${showMap ? "lg:grid-cols-2" : ""} items-start`}
        >
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
              Google Business Profile
            </p>
            <SectionPhoto
              imageKey="gbpVisit"
              heading={`Visit ${officeInfo.name}`}
              className="mb-6 max-w-xl text-left"
              onDark
            />
            <h2
              id="gbp-local-pack-heading"
              className="mb-3 text-2xl font-bold md:text-3xl"
            >
              Visit {officeInfo.name}
            </h2>
            <p className="mb-6 max-w-xl text-slate-300">
              Same name, address, and phone as Google Maps. Call, get
              directions, or read reviews before you tour Arts District and
              downtown Las Vegas condos.
            </p>

            <address className="mb-6 not-italic text-slate-200">
              <span className="block font-semibold text-white">
                {siteConfig.name}
              </span>
              {officeInfo.address.street}
              <br />
              {officeInfo.address.city}, {officeInfo.address.state}{" "}
              {officeInfo.address.zip}
            </address>

            <ul className="mb-6 space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <Clock
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400"
                  aria-hidden
                />
                <span>
                  {officeInfo.hoursDisplay[0]}
                  <br />
                  {officeInfo.hoursDisplay[1]} · Appointment required
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone
                  className="h-4 w-4 flex-shrink-0 text-blue-400"
                  aria-hidden
                />
                <a
                  href={agentInfo.phoneTel}
                  className="font-semibold text-white hover:text-blue-300"
                >
                  {agentInfo.phone}
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden />
                Call
              </a>
              <a
                href={officeInfo.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                <MapPin className="mr-2 h-4 w-4" aria-hidden />
                Directions
              </a>
              <a
                href={officeInfo.maps.reviews}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-white/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Star className="mr-2 h-4 w-4 text-yellow-400" aria-hidden />
                View Google Reviews
              </a>
            </div>
          </div>

          {showMap ? (
            <div className="overflow-hidden rounded-xl shadow-lg">
              <iframe
                src={officeInfo.maps.embed}
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${officeInfo.name} map pin — ${officeInfo.address.full}`}
                className="w-full"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
