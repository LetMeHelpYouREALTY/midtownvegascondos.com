import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { generateLocalBusinessSchema } from "./gbp-schema";
import { officeInfo, siteConfig } from "./site-config";
import {
  COMMUTES_MAP_EMBED_URL,
  COMMUTES_MAP_PLACE_URL,
  COMMUTES_MAP_DIRECTIONS_URL,
} from "./commutes-map";

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
    expect(officeInfo.maps.directions).toContain(
      `destination_place_id=${officeInfo.googlePlace.placeId}`,
    );
    expect(schema.openingHours).toEqual(["Su-Th 09:00-17:00"]);
    expect(schema.employee.name).toBe("Dr. Jan Duffy");
    expect(schema.knowsAbout).toContain("Arts District condos");
    expect(
      schema.areaServed.some(
        (area: { url?: string }) =>
          area.url === `${siteConfig.url}/neighborhoods/one-las-vegas`,
      ),
    ).toBe(true);
    expect(schema.potentialAction[2]["@type"]).toBe("FindAction");
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

  it("pins the commute map to the same GBP CID", () => {
    expect(COMMUTES_MAP_EMBED_URL).toBe(officeInfo.maps.embed);
    expect(COMMUTES_MAP_PLACE_URL).toBe(officeInfo.maps.place);
    expect(COMMUTES_MAP_DIRECTIONS_URL).toBe(officeInfo.maps.directions);
    expect(COMMUTES_MAP_DIRECTIONS_URL).toContain(
      `destination_place_id=${officeInfo.googlePlace.placeId}`,
    );
    expect(COMMUTES_MAP_PLACE_URL).toContain(officeInfo.googlePlace.cid);
  });

  it("includes heading-matched office photos as ImageObjects", () => {
    expect(Array.isArray(schema.image)).toBe(true);
    expect(schema.image.length).toBeGreaterThanOrEqual(14);
    expect(schema.photo).toHaveLength(schema.image.length);
    expect(schema.image).toEqual(
      expect.arrayContaining([
        expect.stringContaining("/images/hero/fremont-east-daytime.webp"),
        expect.stringContaining("/images/hero/symphony-park-midrise.webp"),
        expect.stringContaining("/images/hero/midtown-plaza-walkable.webp"),
      ]),
    );
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

describe("GBP engage CTAs on live pages", () => {
  const pages = [
    "app/sellers/page.tsx",
    "app/services/page.tsx",
    "app/listings/page.tsx",
    "app/buyers/page.tsx",
    "app/relocation/page.tsx",
    "app/investment-properties/page.tsx",
    "app/luxury-homes/page.tsx",
    "app/new-construction/page.tsx",
    "app/faq/page.tsx",
    "app/blog/page.tsx",
    "app/contact/page.tsx",
    "app/about/page.tsx",
    "app/55-plus-communities/page.tsx",
    "app/neighborhood/page.tsx",
    "app/midtown-real-estate/page.tsx",
    "app/google-business/page.tsx",
    "app/security-policy/page.tsx",
    "app/not-found.tsx",
    "app/page.tsx",
    "app/neighborhoods/page.tsx",
    "app/neighborhoods/[slug]/page.tsx",
  ];

  it("includes Call, Directions, and Reviews on high-intent pages", () => {
    for (const rel of pages) {
      const text = readFileSync(join(process.cwd(), rel), "utf8");
      const hasButtons = text.includes("GbpEngageButtons");
      const hasReviews = text.includes("View Google Reviews");
      expect(hasButtons || hasReviews).toBe(true);
    }
  });

  it("keeps GBP service-card photos matched to each service heading", () => {
    const text = readFileSync(
      join(process.cwd(), "app/google-business/page.tsx"),
      "utf8",
    );
    expect(text.split('heading="Primary Markets"').length - 1).toBe(1);
    expect(text).toContain("Arts District");
    expect(text).toContain("Symphony Park");
    expect(text).not.toContain('heroKey="nbHenderson"');
  });
});
