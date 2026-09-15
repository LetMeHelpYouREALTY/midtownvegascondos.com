import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const SCRIPT = join(ROOT, "scripts", "sync-images-to-r2.mjs");

describe("R2 image sync script", () => {
  it("walks directories with string names, not the invalid withTypes option", () => {
    const src = readFileSync(SCRIPT, "utf8");
    expect(src).not.toMatch(/readdir\([^)]*withTypes/);
    expect(src).toMatch(/const names = await readdir\(dir\)/);
  });

  it("names Cloudflare IP allowlist error 9109 so CI can skip doomed uploads", () => {
    const src = readFileSync(SCRIPT, "utf8");
    expect(src).toMatch(/code === 9109/);
    expect(src).toMatch(/Manage R2 API Tokens/);
  });

  it("skips cleanly when Cloudflare credentials are absent", () => {
    const result = spawnSync(process.execPath, [SCRIPT], {
      cwd: ROOT,
      encoding: "utf8",
      env: {
        ...process.env,
        CLOUDFLARE_API_TOKEN: "",
        CLOUDFLARE_ACCOUNT_ID: "",
        R2_ACCOUNT_ID: "",
        R2_ACCESS_KEY_ID: "",
        R2_SECRET_ACCESS_KEY: "",
        VERCEL: "",
        CI: "",
      },
    });
    expect(result.status).toBe(0);
    expect(result.stdout).toMatch(/Skipping R2 image sync/);
  });
});
