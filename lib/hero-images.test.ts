import { describe, expect, it } from "vitest";
import { heroImages } from "./hero-images";

describe("hero-images", () => {
  it("does not reference placeholder Unsplash or extra* filenames", () => {
    for (const [key, img] of Object.entries(heroImages)) {
      expect(img.src, key).not.toMatch(/unsplash-/i);
      expect(img.src, key).not.toMatch(/extra\d+/i);
      expect(img.src, key).not.toMatch(/wiki-fremont/i);
    }
  });

  it("keeps git-backed local paths until R2 is enabled", () => {
    expect(heroImages.contactOffice.src).toBe(
      "/images/hero/contact-arts-district-main-street.webp"
    );
    expect(heroImages.juhl.src).toBe("/images/hero/juhl-downtown-condo-tower.webp");
  });
});
