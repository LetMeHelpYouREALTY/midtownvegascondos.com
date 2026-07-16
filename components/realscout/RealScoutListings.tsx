import { Button } from "@/components/ui/button";
import DeferredRealScoutWidget from "@/components/realscout/DeferredRealScoutWidget";

const LISTINGS_HTML = `<realscout-office-listings 
  agent-encoded-id="QWdlbnQtMjI1MDUw" 
  sort-order="NEWEST" 
  listing-status="For Sale" 
  property-types=",SFR,MF,TC" 
  price-min="500000" 
  price-max="800000"
></realscout-office-listings>`;

/** Server Component — RealScout script loads only when this section nears the viewport. */
export default function RealScoutListings() {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center justify-between md:flex-row">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Featured Properties
            </h2>
            <p className="text-lg text-slate-600">
              Discover exceptional homes in Las Vegas and Henderson
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <a
              href="https://drjanduffy.realscout.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Properties
            </a>
          </Button>
        </div>

        <DeferredRealScoutWidget html={LISTINGS_HTML} minHeight="420px" />
      </div>
    </section>
  );
}
