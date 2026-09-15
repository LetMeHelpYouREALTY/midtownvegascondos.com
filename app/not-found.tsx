import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SectionPhoto from "@/components/sections/SectionPhoto";
import GbpEngageButtons from "@/components/sections/GbpEngageButtons";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `The page you requested was not found on ${siteConfig.name}.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-slate-50 px-4 pt-28 pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <SectionPhoto
            imageKey="searchMidtown"
            heading="Page not found"
            className="mx-auto mb-8 max-w-xl text-left"
          />
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-2">
            404
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Page not found
          </h1>
          <p className="text-slate-600 mb-2">
            That URL is not on {siteConfig.name}. Search live midtown condos or
            call {agentInfo.name} at {agentInfo.phone}.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            {officeInfo.address.full}
          </p>
          <GbpEngageButtons className="mb-4">
            <Link
              href="/listings"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Search listings
            </Link>
          </GbpEngageButtons>
        </div>
        <RealScoutListings />
      </main>
      <Footer />
    </>
  );
}
