import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getCdnImageSrc,
  getGitBackupSrc,
  getPagesImageUrl,
  getR2ObjectUrl,
  isRemoteImageSrc,
} from "./cloudflare-assets";

describe("cloudflare-assets", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("treats http(s) URLs as remote", () => {
    expect(isRemoteImageSrc("https://example.com/a.webp")).toBe(true);
    expect(isRemoteImageSrc("/images/hero/a.webp")).toBe(false);
  });

  it("keeps git backup paths same-origin", () => {
    expect(getGitBackupSrc("images/hero/a.webp")).toBe("/images/hero/a.webp");
    expect(getGitBackupSrc("/images/hero/a.webp")).toBe("/images/hero/a.webp");
  });

  it("builds R2 object URLs under the site prefix", () => {
    expect(getR2ObjectUrl("/images/hero/juhl-downtown-condo-tower.webp")).toBe(
      "https://pub-720ca9b7443b47be981def05abd3d7f0.r2.dev/midtownvegascondos/images/hero/juhl-downtown-condo-tower.webp",
    );
  });

  it("serves git backup by default so LCP does not 404 before R2 sync", () => {
    vi.stubEnv("NEXT_PUBLIC_R2_ENABLED", "false");
    expect(getCdnImageSrc("/images/hero/a.webp")).toBe("/images/hero/a.webp");
  });

  it("switches to R2 when delivery is enabled", () => {
    vi.stubEnv("NEXT_PUBLIC_R2_ENABLED", "true");
    expect(getCdnImageSrc("/images/hero/a.webp")).toContain(
      "/midtownvegascondos/images/hero/a.webp",
    );
  });

  it("uses Cloudflare Pages/Workers assets when that host is enabled", () => {
    vi.stubEnv("NEXT_PUBLIC_R2_ENABLED", "false");
    vi.stubEnv("NEXT_PUBLIC_CF_PAGES_IMAGES_ENABLED", "true");
    vi.stubEnv(
      "NEXT_PUBLIC_CF_PAGES_IMAGES_BASE",
      "https://midtownvegascondos-heading-photos.pages.dev",
    );
    expect(getPagesImageUrl("/images/hero/a.webp")).toBe(
      "https://midtownvegascondos-heading-photos.pages.dev/images/hero/a.webp",
    );
    expect(getCdnImageSrc("/images/hero/a.webp")).toBe(
      "https://midtownvegascondos-heading-photos.pages.dev/images/hero/a.webp",
    );
  });
});
