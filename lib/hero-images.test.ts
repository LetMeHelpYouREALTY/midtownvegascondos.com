import { describe, expect, it } from "vitest";
import { heroImages, pageHeroByPath, getHeroKeyForPath } from "./hero-images";

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
      "/images/hero/contact-arts-district-main-street.webp",
    );
    expect(heroImages.juhl.src).toBe(
      "/images/hero/juhl-downtown-condo-tower.webp",
    );
    expect(heroImages.securityPolicy.src).toBe("/images/hero/condo-lobby.webp");
  });

  it("maps /security-policy to a unique hero", () => {
    expect(pageHeroByPath["/security-policy"]).toBe("securityPolicy");
  });

  it("resolves neighborhood slug heroes for blog and listing shortcut cards", () => {
    expect(getHeroKeyForPath("/neighborhoods/the-english-residences")).toBe(
      "englishResidences",
    );
    expect(getHeroKeyForPath("/neighborhoods/arts-district")).toBe(
      "artsDistrict",
    );
    expect(getHeroKeyForPath("/market-update")).toBe("marketUpdate");
  });

  it("uses Las Vegas heading photos instead of off-market stock for named buildings", () => {
    expect(heroImages.artsDistrict.src).toContain("arts-district-galleries");
    expect(heroImages.palmsPlace.src).toContain("palms-place-condotel");
    expect(heroImages.listingsSearch.src).not.toMatch(/glass-facade/i);
    expect(heroImages.artsDistrict.src).not.toMatch(/highrise-windows/i);
    expect(heroImages.listingsSearch.src).toContain(
      "juhl-downtown-condo-tower",
    );
  });
});
