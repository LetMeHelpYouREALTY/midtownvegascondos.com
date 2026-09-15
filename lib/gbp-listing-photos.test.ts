import { gbpListingPhotos } from "./gbp-listing-photos";
import { describe, expect, it } from "vitest";

const BANNED =
  /safe neighborhood|good schools|family-friendly|established community/i;

describe("GBP listing photos", () => {
  it("keeps a small Maps gallery with location alts and no Fair Housing proxies", () => {
    expect(gbpListingPhotos.length).toBeGreaterThanOrEqual(6);
    expect(
      gbpListingPhotos.some((photo) => photo.category === "EXTERIOR"),
    ).toBe(true);
    for (const photo of gbpListingPhotos) {
      expect(photo.src).toMatch(/^https:\/\/lh3\.googleusercontent\.com\/p\//);
      expect(photo.alt).toMatch(/Arts District|Main Street|Las Vegas/);
      expect(photo.alt).not.toMatch(BANNED);
    }
  });
});
