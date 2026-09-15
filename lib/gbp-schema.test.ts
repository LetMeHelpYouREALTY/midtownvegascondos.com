import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { generateLocalBusinessSchema } from "./gbp-schema";
import { officeInfo, siteConfig } from "./site-config";

const PUBLIC_ROOT = join(process.cwd(), "public");

describe("generateLocalBusinessSchema", () => {
  const schema = generateLocalBusinessSchema();

  it("matches GBP NAP, hours, and Maps actions", () => {
    expect(schema.name).toBe(
      "Las Vegas Arts District Condos | Homes by Dr. Jan Duffy",
    );
    expect(schema.telephone).toBe("+17025001980");
    expect(schema.address.streetAddress).toBe("921 South Main Street");
    expect(schema.hasMap).toContain(officeInfo.maps.directions);
    expect(schema.hasMap).toContain(officeInfo.maps.reviews);
    expect(schema.sameAs).toContain(`${siteConfig.url}/google-business`);
    expect(schema.sameAs).toContain(officeInfo.maps.place);
    expect(schema.sameAs).toContain(
      `https://www.google.com/maps/place/?q=place_id:${officeInfo.googlePlace.placeId}`,
    );
    expect(schema.identifier.value).toBe(officeInfo.googlePlace.placeId);
    expect(schema.potentialAction[0]["@type"]).toBe("ReserveAction");
    expect(schema.potentialAction[0].target.urlTemplate).toBe(
      `${siteConfig.url}/contact`,
    );
    expect(schema.potentialAction[1]["@type"]).toBe("CallAction");
    expect(schema.potentialAction[1].target.urlTemplate).toBe(
      "tel:+17025001980",
    );
    expect(officeInfo.maps.place).toContain(officeInfo.googlePlace.cid);
    expect(officeInfo.maps.reviews).toContain(officeInfo.googlePlace.placeId);
  });

  it("includes heading-matched office photos as ImageObjects", () => {
    expect(Array.isArray(schema.image)).toBe(true);
    expect(schema.image.length).toBeGreaterThanOrEqual(9);
    expect(schema.photo).toHaveLength(schema.image.length);
    for (const photo of schema.photo) {
      expect(photo["@type"]).toBe("ImageObject");
      expect(photo.contentUrl).toMatch(
        /^https:\/\/www\.midtownvegascondos\.com\//,
      );
      const relative = photo.contentUrl.replace(siteConfig.url, "");
      if (relative.startsWith("/images/")) {
        expect(existsSync(join(PUBLIC_ROOT, relative.replace(/^\//, "")))).toBe(
          true,
        );
      }
    }
  });
});
