import { describe, expect, it } from "vitest";
import { gbpPostTemplates } from "./gbp-posts";

describe("GBP localPosts mirrored on-site", () => {
  it("leads with live Google posts instead of January 2026 placeholders", () => {
    const live = gbpPostTemplates.filter(
      (post) => post.sourcedFrom === "gbp-local-posts",
    );
    expect(live.length).toBeGreaterThanOrEqual(3);
    expect(gbpPostTemplates.slice(0, 3).every((post) => post.sourcedFrom)).toBe(
      true,
    );
    expect(gbpPostTemplates.map((post) => post.id)).not.toContain(
      "market-update-jan-2026",
    );
  });

  it("keeps this site's CTA phone and skips Fair Housing proxies", () => {
    const blob = gbpPostTemplates.map((post) => post.content).join("\n");
    expect(blob).toContain("(702) 500-1980");
    expect(blob).not.toMatch(/702-222-1964|702-500-1942/);
    expect(blob).not.toMatch(
      /family-friendly|safe neighborhood|good schools|established community/i,
    );
  });

  it("carries GBP media URLs or heading-matched hero keys", () => {
    for (const post of gbpPostTemplates.slice(0, 3)) {
      expect(post.heroKey, post.id).toBeTruthy();
      expect(post.gbpPostName, post.id).toMatch(/localPosts\//);
    }
    expect(
      gbpPostTemplates.some((post) =>
        post.image?.includes("lh3.googleusercontent.com"),
      ),
    ).toBe(true);
  });
});
