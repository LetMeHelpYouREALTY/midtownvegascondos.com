#!/usr/bin/env node
/**
 * Upload git-backed public/images to Cloudflare R2 (primary storage).
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=... npx wrangler r2 object put ...
 *   node scripts/sync-images-to-r2.mjs
 *
 * Requires wrangler auth and a bucket named realestatedomains-assets
 * (same bucket already serving the agent headshot).
 */

import { fileURLToPath } from "node:url";
import { readdir, stat } from "node:fs/promises";
import { join, relative, dirname } from "node:path";
import { spawn } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_DIR = join(ROOT, "public", "images");
const BUCKET = process.env.R2_BUCKET ?? "realestatedomains-assets";
const PREFIX = process.env.NEXT_PUBLIC_R2_PREFIX ?? "midtownvegascondos";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
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
      ["wrangler", "r2", "object", "put", `${BUCKET}/${objectKey}`, "--file", localFile],
      { stdio: "inherit", cwd: ROOT }
    );
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`wrangler exited ${code} for ${objectKey}`));
    });
  });
}

async function main() {
  const files = await walk(IMAGES_DIR);
  console.log(`Syncing ${files.length} images to r2://${BUCKET}/${PREFIX}/images/ ...`);
  for (const file of files) {
    const rel = relative(join(ROOT, "public"), file).replaceAll("\\", "/");
    const objectKey = `${PREFIX}/${rel}`;
    const size = (await stat(file)).size;
    console.log(`→ ${objectKey} (${Math.round(size / 1024)} KB)`);
    await wranglerPut(file, objectKey);
  }
  console.log("Done. Set NEXT_PUBLIC_R2_ENABLED=true after verifying objects are public.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
