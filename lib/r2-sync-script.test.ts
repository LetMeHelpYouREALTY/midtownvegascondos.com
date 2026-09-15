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

  it("skips Account API /accounts lookup when R2 S3 keys are already complete", () => {
    const src = readFileSync(SCRIPT, "utf8");
    expect(src).toMatch(/const s3Ready = hasS3Auth\(\);/);
    expect(src).toMatch(/!s3Ready &&/);
    expect(src).toMatch(/resolveAccountIdFromToken/);
  });

  it("pins the invoice-verified Cloudflare account id so REST/S3 skip /accounts", () => {
    const src = readFileSync(SCRIPT, "utf8");
    const wrangler = readFileSync(
      join(ROOT, "scripts/wrangler.r2.toml"),
      "utf8",
    );
    expect(src).toMatch(/2cc579c1ec9e426ed585e933ebf4753b/);
    expect(wrangler).toMatch(/account_id = "2cc579c1ec9e426ed585e933ebf4753b"/);
    expect(src).toMatch(/isTokenLocationBlocked\(body\)/);
    expect(src).toMatch(/isR2WriteForbidden/);
    expect(src).toMatch(/code === 10000/);
    expect(src).toMatch(/code === 9106/);
    expect(src).toMatch(/authentication failed/i);
    expect(src).toMatch(/Cloudflare Images/);
    expect(src).toMatch(/accounts\/\$\{id\}\/images\/v1/);
    expect(src).toMatch(/pages",\s*"deploy"/);
    expect(src).toMatch(/wrangler.images-assets.toml/);
    expect(src).toMatch(/zones\?name=midtownvegascondos.com/);
    expect(src).toMatch(/img.midtownvegascondos.com/);
    expect(src).toMatch(/http_request_origin/);
    expect(src).toMatch(/host_header/);
    expect(src).toMatch(/img_midtown_origin_www/);
    expect(src).toMatch(/too many authentication failures/i);
    expect(src).toMatch(/CF_TRY_CLOUDFLARE_FALLBACKS/);
    expect(src).toMatch(/CLOUDFLARE_R2_ACCESS_KEY_ID/);
    expect(src).toMatch(/AWS_SECRET_ACCESS_KEY/);
    expect(src).toMatch(/function normalizeS3Env/);
    expect(src).toMatch(/firstUsableSecret/);
    expect(src).toMatch(/CLOUDFLARE_GLOBAL_API_TOKEN/);
    expect(src).toMatch(/X-Auth-Email/);
    expect(src).toMatch(/X-Auth-Key/);
    expect(src).toMatch(/drduffy@bhhsnv.com/);
    expect(src).toMatch(/global-api-key/);
    expect(src).toMatch(/function wranglerAuthEnv/);
    const workflow = readFileSync(
      join(ROOT, ".github/workflows/cloudflare-r2-images.yml"),
      "utf8",
    );
    expect(workflow).toMatch(/CLOUDFLARE_R2_ACCESS_KEY_ID/);
    expect(workflow).toMatch(/AWS_SECRET_ACCESS_KEY/);
    expect(workflow).toMatch(/CLOUDFLARE_GLOBAL_API_TOKEN/);
    expect(workflow).toMatch(/global_auth=/);
    expect(workflow).toMatch(/Vercel env keys matching R2\/Cloudflare\/AWS/);
    expect(workflow).toMatch(/Vercel production env keys from env pull/);
    expect(workflow).toMatch(/Pull R2 keys from sister Vercel projects/);
    expect(workflow).toMatch(
      /hertagestonebridge.com:prj_Egvst53Qns0tSJ0K5cqfbicv2MIj/,
    );
    expect(workflow).toMatch(/copied \$key from \$source/);
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
