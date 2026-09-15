import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { imagesForSitemapPage } from "./image-seo";
import { siteConfig } from "./site-config";

const PUBLIC_ROOT = join(process.cwd(), "public");

describe("imagesForSitemapPage", () => {
  it("lists office photos on the Google Business page for local-pack images", () => {
    const urls = imagesForSitemapPage(`${siteConfig.url}/google-business`);
    expect(urls.length).toBeGreaterThanOrEqual(2);
    expect(urls.filter((url, index) => urls.indexOf(url) === index)).toEqual(
      urls,
    );
    expect(
      urls.some((url) => url.includes("contact-arts-district-main-street")),
    ).toBe(true);
    for (const url of urls) {
      const relative = url.replace(siteConfig.url, "").replace(/^\//, "");
      if (relative.startsWith("images/")) {
        expect(existsSync(join(PUBLIC_ROOT, relative))).toBe(true);
      }
    }
  });
});
