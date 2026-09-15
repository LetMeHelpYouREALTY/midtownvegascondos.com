#!/usr/bin/env node
/**
 * Upload git-backed public/images to Cloudflare R2 (primary storage).
 *
 * Auth (either):
 *   CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID  → wrangler r2 object put
 *   R2_ACCESS_KEY_ID + R2_SECRET_ACCESS_KEY + account id → S3-compatible sync
 *
 * Bucket: realestatedomains-assets (same public host as the agent headshot).
 *
 * Per Cloudflare R2 upload docs (as of 2026): wrangler r2 object put
 * https://developers.cloudflare.com/r2/objects/upload-objects/
 */

import { fileURLToPath } from "node:url";
import { readdir, stat } from "node:fs/promises";
import { extname, join, relative, dirname } from "node:path";
import { spawn } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_DIR = join(ROOT, "public", "images");
const BUCKET = process.env.R2_BUCKET ?? "realestatedomains-assets";
const PREFIX = process.env.NEXT_PUBLIC_R2_PREFIX ?? "midtownvegascondos";
const CACHE_CONTROL = "public, max-age=31536000, immutable";

function contentTypeFor(file) {
  const ext = extname(file).toLowerCase();
  switch (ext) {
    case ".webp":
      return "image/webp";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".svg":
      return "image/svg+xml";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

function isUsableSecret(value) {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed === "[SENSITIVE]" || trimmed === "SENSITIVE") return false;
  return true;
}

function accountId() {
  return process.env.R2_ACCOUNT_ID || process.env.CLOUDFLARE_ACCOUNT_ID || "";
}

function hasWranglerAuth() {
  return Boolean(isUsableSecret(process.env.CLOUDFLARE_API_TOKEN) && accountId());
}

function hasS3Auth() {
  return Boolean(
    isUsableSecret(process.env.R2_ACCESS_KEY_ID) &&
      isUsableSecret(process.env.R2_SECRET_ACCESS_KEY) &&
      accountId(),
  );
}

async function resolveAccountIdFromToken() {
  if (accountId()) return accountId();
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!isUsableSecret(token)) return "";
  const response = await fetch("https://api.cloudflare.com/client/v4/accounts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    console.error(`Cloudflare accounts lookup HTTP ${response.status}`);
    return "";
  }
  const body = await response.json();
  const accounts = Array.isArray(body?.result) ? body.result : [];
  const preferred =
    accounts.find((account) =>
      /real.?estate|duffy/i.test(String(account?.name ?? "")),
    ) ?? accounts[0];
  const id = preferred?.id ? String(preferred.id) : "";
  if (id) {
    process.env.CLOUDFLARE_ACCOUNT_ID = id;
    process.env.R2_ACCOUNT_ID = id;
    console.log(`Resolved Cloudflare account ${preferred.name ?? id}`);
  }
  return id;
}

async function walk(dir) {
  const entries = await readdir(dir, { withTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(webp|jpg|jpeg|png|svg)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function run(command, args, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      cwd: ROOT,
      env: { ...process.env, ...extraEnv },
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited ${code}`));
    });
  });
}

function wranglerPut(localFile, objectKey) {
  return run("npx", [
    "wrangler",
    "r2",
    "object",
    "put",
    `${BUCKET}/${objectKey}`,
    "--file",
    localFile,
    "--content-type",
    contentTypeFor(localFile),
    "--cache-control",
    CACHE_CONTROL,
  ]);
}

async function s3Put(localFile, objectKey) {
  const endpoint = `https://${accountId()}.r2.cloudflarestorage.com`;
  await run(
    "aws",
    [
      "s3",
      "cp",
      localFile,
      `s3://${BUCKET}/${objectKey}`,
      "--endpoint-url",
      endpoint,
      "--content-type",
      contentTypeFor(localFile),
      "--cache-control",
      CACHE_CONTROL,
    ],
    {
      AWS_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
      AWS_DEFAULT_REGION: "auto",
    },
  );
}

async function main() {
  if (isUsableSecret(process.env.CLOUDFLARE_API_TOKEN) && !accountId()) {
    await resolveAccountIdFromToken();
  }
  const useS3 = hasS3Auth();
  const useWrangler = hasWranglerAuth();
  if (!useS3 && !useWrangler) {
    console.log(
      "Skipping R2 image sync (no usable Cloudflare token/account or R2 S3 keys). Git public/images remains the fallback.",
    );
    return;
  }

  const files = await walk(IMAGES_DIR);
  const mode = useS3 ? "s3" : "wrangler";
  console.log(
    `Syncing ${files.length} images to r2://${BUCKET}/${PREFIX}/ via ${mode} ...`,
  );
  for (const file of files) {
    const rel = relative(join(ROOT, "public"), file).replaceAll("\\", "/");
    const objectKey = `${PREFIX}/${rel}`;
    const size = (await stat(file)).size;
    console.log(`→ ${objectKey} (${Math.round(size / 1024)} KB)`);
    if (useS3) {
      await s3Put(file, objectKey);
    } else {
      await wranglerPut(file, objectKey);
    }
  }
  console.log(
    "Done. Verify a public object 200, then set NEXT_PUBLIC_R2_ENABLED=true.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
