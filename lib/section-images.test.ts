import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { sectionImages } from "./section-images";

const PUBLIC_ROOT = join(process.cwd(), "public");

describe("section-images", () => {
  it("does not reference placeholder Unsplash or extra* filenames", () => {
    for (const [key, img] of Object.entries(sectionImages)) {
      expect(img.src, key).not.toMatch(/unsplash-/i);
      expect(img.src, key).not.toMatch(/extra\d+/i);
      expect(img.src, key).not.toMatch(/wiki-fremont/i);
    }
  });

  it("keeps git-backed local paths until R2 is enabled", () => {
    expect(sectionImages.contactTouch.src).toBe(
      "/images/hero/gbp-arts-district-office.webp",
    );
    expect(sectionImages.aboutBio.src).toBe(
      "/images/hero/gbp-arts-district-office.webp",
    );
  });

  it("does not use Fair Housing proxies in heading-matched captions", () => {
    const banned =
      /safe neighborhood|good schools|family-friendly|established community/i;
    for (const [key, img] of Object.entries(sectionImages)) {
      expect(img.heading, key).not.toMatch(banned);
      expect(img.alt, key).not.toMatch(banned);
      expect(img.caption, key).not.toMatch(banned);
    }
  });

  it("points every catalog entry at a file that exists in git", () => {
    for (const [key, img] of Object.entries(sectionImages)) {
      const relative = img.src.replace(/^\//, "");
      expect(
        existsSync(join(PUBLIC_ROOT, relative)),
        `${key}: ${img.src}`,
      ).toBe(true);
      expect(img.heading.length, key).toBeGreaterThan(2);
      expect(img.alt.length, key).toBeGreaterThan(20);
    }
  });

  it("matches community headings to that community's own photo file", () => {
    const pairs: Array<[keyof typeof sectionImages, string]> = [
      ["skyeCanyonWhy", "skye-canyon"],
      ["centennialWhy", "centennial-hills"],
      ["southernHighlandsWhy", "southern-highlands"],
      ["mountainsEdgeWhy", "mountains-edge"],
      ["greenValleyWhy", "green-valley"],
      ["hendersonWhy", "henderson"],
      ["inspiradaWhy", "inspirada"],
      ["summerlinWhy", "summerlin"],
      ["ridgesWhy", "the-ridges"],
      ["northLasVegasWhy", "north-las-vegas"],
      ["sunCitySummerlinAbout", "summerlin-community"],
      ["trilogyAbout", "trilogy-summerlin"],
      ["soleraAbout", "solera-anthem"],
      ["sunCityAnthemAbout", "sun-city-anthem"],
      ["sunCityAlianteAbout", "sun-city-aliante"],
      ["delWebbAbout", "del-webb-lake-las-vegas"],
      ["heritageWhy", "heritage-stonebridge"],
    ];
    expect(sectionImages.buyersAgent.src).not.toMatch(/glass-facade/i);
    expect(sectionImages.listingsChecklist.src).not.toMatch(
      /highrise-windows/i,
    );
    expect(sectionImages.buyersAgent.src).toContain(
      "juhl-downtown-condo-tower",
    );
    expect(sectionImages.listingsChecklist.src).toContain(
      "faq-midtown-loft-interior",
    );
    expect(sectionImages.marketForces.src).toContain("home-strip-dusk");
    expect(sectionImages.searchMidtown.src).toContain(
      "juhl-downtown-condo-tower",
    );
    expect(sectionImages.marketSnapshot.src).toContain("home-skyline-day");
    expect(sectionImages.fiftyFiveAmenities.src).toContain(
      "sun-city-anthem-golf",
    );
    for (const [key, slug] of pairs) {
      expect(sectionImages[key].src, key).toContain(slug);
    }
  });

  it("does not catalog wrong-city or off-subject stock filenames", () => {
    const banned =
      /night-neon|city-avenue|sky-terrace|modern-home-front|new-construction\.webp|condo-balconies|apartment-row|bright-living|penthouse\.webp|pool-amenity|balcony-city|glass-facade|highrise-windows|night-city|open-plan|desert-skyline|condo-lobby|active-adult|modern-bath|hoa-review|why-choose-jan|market-update-downtown-night|home-strip-night|handshake-deal|map-planning|luxury-interior|agent-office|golf-community|why-bhhs-brokerage/;
    for (const [key, img] of Object.entries(sectionImages)) {
      expect(img.src, key).not.toMatch(banned);
    }
  });
});
