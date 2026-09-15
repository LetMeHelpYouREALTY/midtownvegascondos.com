#!/usr/bin/env node
/**
 * Upload git-backed public/images to Cloudflare R2 (primary storage).
 *
 * Auth (either):
 *   CLOUDFLARE_API_TOKEN [+ CLOUDFLARE_ACCOUNT_ID]  → R2 REST or wrangler put
 *   R2_ACCESS_KEY_ID + R2_SECRET_ACCESS_KEY + account id → S3-compatible sync
 *
 * Bucket: realestatedomains-assets (same public host as the agent headshot).
 *
 * Per Cloudflare R2 upload docs (as of 2026): wrangler r2 object put
 * https://developers.cloudflare.com/r2/objects/upload-objects/
 */

import { fileURLToPath } from "node:url";
import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative, dirname } from "node:path";
import { spawn } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_DIR = join(ROOT, "public", "images");
const WRANGLER_CONFIG = join(ROOT, "scripts", "wrangler.r2.toml");
const BUCKET = process.env.R2_BUCKET ?? "realestatedomains-assets";
const PREFIX = process.env.NEXT_PUBLIC_R2_PREFIX ?? "midtownvegascondos";
const CACHE_CONTROL = "public, max-age=31536000, immutable";
const ACCOUNT_ID_RE = /\b([a-f0-9]{32})\b/gi;

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
  return (
    process.env.R2_ACCOUNT_ID ||
    process.env.CLOUDFLARE_ACCOUNT_ID ||
    ""
  ).trim();
}

function setAccountId(id, label = "") {
  process.env.CLOUDFLARE_ACCOUNT_ID = id;
  process.env.R2_ACCOUNT_ID = id;
  console.log(`Resolved Cloudflare account ${label || id}`);
}

function hasWranglerAuth() {
  return isUsableSecret(process.env.CLOUDFLARE_API_TOKEN);
}

function hasS3Auth() {
  return Boolean(
    isUsableSecret(process.env.R2_ACCESS_KEY_ID) &&
      isUsableSecret(process.env.R2_SECRET_ACCESS_KEY) &&
      accountId(),
  );
}

function pickAccount(accounts) {
  const list = Array.isArray(accounts) ? accounts.filter(Boolean) : [];
  return (
    list.find((account) =>
      /real.?estate|duffy/i.test(String(account?.name ?? "")),
    ) ?? list[0]
  );
}

function accountsFromCfBody(path, body) {
  const result = body?.result;
  if (!Array.isArray(result)) return [];
  if (path === "/memberships") {
    return result
      .map((row) => row?.account ?? row)
      .filter((account) => account?.id);
  }
  return result.filter((account) => account?.id);
}

function cloudflareError(body) {
  const first = Array.isArray(body?.errors) ? body.errors[0] : undefined;
  return {
    code: first?.code,
    message: String(first?.message ?? ""),
  };
}

function isTokenLocationBlocked(body) {
  const { code, message } = cloudflareError(body);
  return (
    code === 9109 ||
    /cannot use the access token from location/i.test(message)
  );
}

function locationBlockedError(detail = "") {
  const where = detail ? ` (${detail})` : "";
  const error = new Error(
    `Cloudflare Account API token is blocked from this IP (error 9109)${where}. Vercel and GitHub runner addresses change every job, so adding one IP to the token allowlist will not keep working. Create R2 S3 credentials instead: Cloudflare dashboard → R2 → Overview → Manage R2 API Tokens → Create API token with Object Read & Write on bucket realestatedomains-assets. Set R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and CLOUDFLARE_ACCOUNT_ID on Vercel production env and the Production GitHub Environment. Re-run this sync, confirm the public object is HTTP 200, then set NEXT_PUBLIC_R2_ENABLED=true. Git public/images remains the fallback.`,
  );
  error.skipSync = true;
  return error;
}

async function lookupCloudflareAccounts(path) {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const response = await fetch(
    `https://api.cloudflare.com/client/v4${path}?per_page=50`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error(
      `Cloudflare ${path} lookup HTTP ${response.status} — ${cloudflareError(body).message || "continuing"}`,
    );
    if (isTokenLocationBlocked(body)) {
      throw locationBlockedError(cloudflareError(body).message);
    }
    return [];
  }
  return accountsFromCfBody(path, body);
}

function runCapture(command, args, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      env: { ...process.env, ...extraEnv },
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("exit", (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else {
        reject(
          new Error(
            `${command} ${args.join(" ")} exited ${code}: ${(stderr || stdout).trim()}`,
          ),
        );
      }
    });
  });
}

async function resolveAccountIdFromWhoami() {
  const { stdout, stderr } = await runCapture("npx", [
    "wrangler",
    "whoami",
    "--config",
    WRANGLER_CONFIG,
  ]);
  const text = `${stdout}\n${stderr}`;
  const ids = [...text.matchAll(ACCOUNT_ID_RE)].map((match) => match[1]);
  const id = ids.find(Boolean) ?? "";
  if (id) setAccountId(id, "from wrangler whoami");
  else console.error("wrangler whoami did not print an account id");
  return id;
}

async function resolveAccountIdFromToken() {
  if (accountId()) return accountId();
  if (!isUsableSecret(process.env.CLOUDFLARE_API_TOKEN)) return "";

  for (const path of ["/accounts", "/memberships"]) {
    try {
      const preferred = pickAccount(await lookupCloudflareAccounts(path));
      if (preferred?.id) {
        setAccountId(String(preferred.id), preferred.name);
        return String(preferred.id);
      }
    } catch (error) {
      if (error?.skipSync) throw error;
      console.error(`Cloudflare ${path} lookup failed:`, error);
    }
  }

  try {
    return await resolveAccountIdFromWhoami();
  } catch (error) {
    console.error(
      "wrangler whoami failed — continuing with token-only wrangler auth:",
      error instanceof Error ? error.message : error,
    );
    return "";
  }
}

/**
 * Recurse image files using string names from readdir. The invalid
 * readdir option that returns strings (not Dirents) made entry.name
 * undefined on Vercel, so path.join threw.
 */
async function walk(dir) {
  const names = await readdir(dir);
  const files = [];
  for (const name of names) {
    if (typeof name !== "string" || !name) continue;
    const full = join(dir, name);
    const info = await stat(full);
    if (info.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(webp|jpg|jpeg|png|svg|gif)$/i.test(name)) {
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
    "--config",
    WRANGLER_CONFIG,
    "--file",
    localFile,
    "--content-type",
    contentTypeFor(localFile),
    "--cache-control",
    CACHE_CONTROL,
  ]);
}

async function restPut(localFile, objectKey) {
  const id = accountId();
  if (!id) {
    throw new Error("R2 REST put needs CLOUDFLARE_ACCOUNT_ID");
  }
  const url = `https://api.cloudflare.com/client/v4/accounts/${id}/r2/buckets/${BUCKET}/objects/${objectKey}`;
  const body = await readFile(localFile);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      "Content-Type": contentTypeFor(localFile),
      "Cache-Control": CACHE_CONTROL,
    },
    body,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`R2 REST put HTTP ${response.status}: ${text.slice(0, 400)}`);
  }
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

async function putObject(localFile, objectKey, mode) {
  if (mode === "s3") {
    await s3Put(localFile, objectKey);
    return;
  }
  if (mode === "rest") {
    await restPut(localFile, objectKey);
    return;
  }
  await wranglerPut(localFile, objectKey);
}

async function main() {
  const s3Ready = hasS3Auth();
  if (
    !s3Ready &&
    isUsableSecret(process.env.CLOUDFLARE_API_TOKEN) &&
    !accountId()
  ) {
    await resolveAccountIdFromToken();
  }
  const useS3 = hasS3Auth();
  const useRest = hasWranglerAuth() && Boolean(accountId());
  const useWrangler = hasWranglerAuth();
  if (!useS3 && !useWrangler) {
    console.log(
      "Skipping R2 image sync (no usable Cloudflare token/account or R2 S3 keys). Git public/images remains the fallback.",
    );
    return;
  }

  const files = await walk(IMAGES_DIR);
  const mode = useS3 ? "s3" : useRest ? "rest" : "wrangler";
  console.log(
    `Syncing ${files.length} images to r2://${BUCKET}/${PREFIX}/ via ${mode} ...`,
  );
  for (const file of files) {
    const rel = relative(join(ROOT, "public"), file).replaceAll("\\", "/");
    const objectKey = `${PREFIX}/${rel}`;
    const size = (await stat(file)).size;
    console.log(`→ ${objectKey} (${Math.round(size / 1024)} KB)`);
    await putObject(file, objectKey, mode);
  }
  console.log(
    "Done. Verify a public object 200, then set NEXT_PUBLIC_R2_ENABLED=true.",
  );
}

function keepSiteBuild() {
  return Boolean(process.env.VERCEL || process.env.CI);
}

main().catch((error) => {
  console.error("R2 image sync failed:", error);
  if (keepSiteBuild()) {
    console.warn(
      "Vercel/CI postbuild: continuing after R2 sync error so git-backed images still deploy.",
    );
    process.exit(0);
  }
  process.exit(1);
});
