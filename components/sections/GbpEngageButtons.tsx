import { MapPin, Phone, Star } from "lucide-react";
import { agentInfo, officeInfo } from "@/lib/site-config";

type GbpEngageButtonsProps = {
  /** Light-on-dark CTA bands */
  onDark?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Call / Directions / Reviews pinned to the verified GBP Place ID.
 * Use on high-intent pages so Maps clicks stay on this listing.
 */
export default function GbpEngageButtons({
  onDark = false,
  className = "",
  children,
}: GbpEngageButtonsProps) {
  const primary = onDark
    ? "bg-blue-600 text-white hover:bg-blue-500"
    : "bg-blue-600 text-white hover:bg-blue-700";
  const secondary = onDark
    ? "bg-white text-slate-900 hover:bg-slate-100"
    : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50";
  const tertiary = onDark
    ? "border border-white/40 text-white hover:bg-white/10"
    : "border border-slate-300 text-slate-900 hover:bg-slate-50";

  return (
    <div
      className={`flex flex-col sm:flex-row flex-wrap gap-3 justify-center ${className}`}
    >
      <a
        href={agentInfo.phoneTel}
        className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold ${primary}`}
      >
        <Phone className="mr-2 h-4 w-4" aria-hidden />
        Call {agentInfo.phone}
      </a>
      <a
        href={officeInfo.maps.directions}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold ${secondary}`}
      >
        <MapPin className="mr-2 h-4 w-4" aria-hidden />
        Directions
      </a>
      <a
        href={officeInfo.maps.reviews}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold ${tertiary}`}
      >
        <Star className="mr-2 h-4 w-4" aria-hidden />
        View Google Reviews
      </a>
      {children}
    </div>
  );
}
