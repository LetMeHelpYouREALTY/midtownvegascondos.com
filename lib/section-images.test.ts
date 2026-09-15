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
    expect(sectionImages.aboutBio.src).toBe("/images/hero/condo-lobby.webp");
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
});
