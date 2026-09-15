import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

function walkTsx(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkTsx(full));
    } else if (entry.name.endsWith(".tsx")) {
      out.push(full);
    }
  }
  return out;
}

describe("RealScout office listings under the hero", () => {
  const pageHero = readFileSync(
    join(ROOT, "components/sections/PageHero.tsx"),
    "utf8",
  );
  const listings = readFileSync(
    join(ROOT, "components/realscout/RealScoutListings.tsx"),
    "utf8",
  );
  const home = readFileSync(join(ROOT, "app/page.tsx"), "utf8");
  const notFound = readFileSync(join(ROOT, "app/not-found.tsx"), "utf8");
  const listingsPage = readFileSync(
    join(ROOT, "app/listings/page.tsx"),
    "utf8",
  );

  it("mounts the office widget at the end of PageHero", () => {
    expect(pageHero).toContain(
      'import RealScoutListings from "@/components/realscout/RealScoutListings"',
    );
    expect(pageHero).toContain("<RealScoutListings />");
    const heroClose = pageHero.lastIndexOf("</section>");
    const widget = pageHero.lastIndexOf("<RealScoutListings />");
    expect(widget).toBeGreaterThan(heroClose);
  });

  it("keeps a single deferred office-listings widget in RealScoutListings", () => {
    expect(listings).toContain('id="featured-properties"');
    expect(listings).toContain("data-realscout-office-listings");
    expect(listings).toContain("<realscout-office-listings");
    expect(listings).toContain('agent-encoded-id="QWdlbnQtMjI1MDUw"');
    expect(listings).toContain("CND");
  });

  it("places the office widget below the homepage hero", () => {
    expect(home).toContain("<RealScoutListings />");
    const heroClose = home.indexOf("</section>");
    const widget = home.indexOf("<RealScoutListings />");
    const searchBand = home.indexOf("Search Midtown Vegas Condos");
    expect(widget).toBeGreaterThan(heroClose);
    expect(searchBand).toBeGreaterThan(widget);
    expect(home.split("<RealScoutListings />").length - 1).toBe(1);
  });

  it("shows the office widget on the 404 page", () => {
    expect(notFound).toContain("<RealScoutListings />");
  });

  it("does not duplicate the office widget on /listings", () => {
    expect(listingsPage).not.toContain("RealScoutListings");
    expect(listingsPage).not.toContain("DeferredRealScoutWidget");
    expect(listingsPage).not.toContain("realscout-office-listings");
    expect(listingsPage).toContain('href="#featured-properties"');
  });

  it("does not remount RealScoutListings on pages that already use PageHero", () => {
    const pages = walkTsx(join(ROOT, "app")).filter((file) =>
      file.endsWith("/page.tsx"),
    );
    expect(pages.length).toBeGreaterThan(40);

    for (const file of pages) {
      const rel = file.slice(ROOT.length + 1);
      const text = readFileSync(file, "utf8");
      if (rel === "app/page.tsx") {
        expect(text.includes("<RealScoutListings"), rel).toBe(true);
        expect(text.includes("<PageHero"), rel).toBe(false);
        continue;
      }
      expect(text.includes("<PageHero"), rel).toBe(true);
      expect(text.includes("RealScoutListings"), rel).toBe(false);
      expect(text.includes("realscout-office-listings"), rel).toBe(false);
    }
  });
});
