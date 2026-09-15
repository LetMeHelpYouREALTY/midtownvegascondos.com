import { Button } from "@/components/ui/button";
import DeferredRealScoutWidget from "@/components/realscout/DeferredRealScoutWidget";
import SectionPhoto from "@/components/sections/SectionPhoto";
import Link from "next/link";

const LISTINGS_HTML = `<realscout-office-listings 
  agent-encoded-id="QWdlbnQtMjI1MDUw" 
  sort-order="NEWEST" 
  listing-status="For Sale" 
  property-types=",SFR,MF,TC,CND"
></realscout-office-listings>`;

/** Server Component — RealScout script loads only when this section nears the viewport. */
export default function RealScoutListings() {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionPhoto
          imageKey="featuredAreas"
          heading="Featured Properties"
          className="mx-auto mb-8 max-w-4xl text-left"
        />
        <div className="mb-12 flex flex-col items-center justify-between md:flex-row">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Featured Properties
            </h2>
            <p className="text-lg text-slate-600">
              Live MLS condos and homes in midtown Las Vegas, the Arts District,
              and downtown towers
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href="/listings">View All Properties</Link>
          </Button>
        </div>

        <DeferredRealScoutWidget html={LISTINGS_HTML} minHeight="420px" />
      </div>
    </section>
  );
}
