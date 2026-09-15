#!/usr/bin/env node
/**
 * Upload git-backed public/images to Cloudflare R2 (primary storage).
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... npm run cloudflare:images
 *
 * Requires wrangler auth and a bucket named realestatedomains-assets
 * (same public host already serving the agent headshot).
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

function wranglerPut(localFile, objectKey) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "npx",
      [
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
      ],
      { stdio: "inherit", cwd: ROOT, env: process.env },
    );
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`wrangler exited ${code} for ${objectKey}`));
    });
  });
}

async function main() {
  if (!process.env.CLOUDFLARE_API_TOKEN && !process.env.CLOUDFLARE_ACCOUNT_ID) {
    console.error(
      "CLOUDFLARE_API_TOKEN (and CLOUDFLARE_ACCOUNT_ID) required to sync R2.",
    );
    process.exit(2);
  }

  const files = await walk(IMAGES_DIR);
  console.log(
    `Syncing ${files.length} images to r2://${BUCKET}/${PREFIX}/images/ ...`,
  );
  for (const file of files) {
    const rel = relative(join(ROOT, "public"), file).replaceAll("\\", "/");
    const objectKey = `${PREFIX}/${rel}`;
    const size = (await stat(file)).size;
    console.log(`→ ${objectKey} (${Math.round(size / 1024)} KB)`);
    await wranglerPut(file, objectKey);
  }
  console.log(
    "Done. Verify a public object 200, then set NEXT_PUBLIC_R2_ENABLED=true.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
