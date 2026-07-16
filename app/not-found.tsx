import Link from "next/link";
import type { Metadata } from "next";
import { agentInfo, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `The page you requested was not found on ${siteConfig.name}.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-2">404</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Page not found</h1>
        <p className="text-slate-600 mb-8">
          That URL is not on {siteConfig.name}. Try midtown condo listings or contact{" "}
          {agentInfo.name}.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/listings"
            className="inline-flex justify-center rounded-md bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-500"
          >
            Search listings
          </Link>
          <Link
            href="/"
            className="inline-flex justify-center rounded-md border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-white"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
