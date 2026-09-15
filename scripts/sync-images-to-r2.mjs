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
const ASSETS_CONFIG = join(ROOT, "scripts", "wrangler.images-assets.toml");
const PAGES_PROJECT =
  process.env.CF_PAGES_IMAGES_PROJECT ?? "midtownvegascondos-heading-photos";
const BUCKET = process.env.R2_BUCKET ?? "realestatedomains-assets";
const PREFIX = process.env.NEXT_PUBLIC_R2_PREFIX ?? "midtownvegascondos";
/** Invoice-verified dash account; not a secret. Env vars still override. */
const DEFAULT_ACCOUNT_ID = "2cc579c1ec9e426ed585e933ebf4753b";
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
    DEFAULT_ACCOUNT_ID
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
    code === 9109 || /cannot use the access token from location/i.test(message)
  );
}

function isR2WriteForbidden(body, status, text = "") {
  const { code, message } = cloudflareError(body);
  return (
    status === 401 ||
    code === 10000 ||
    /authentication error/i.test(message) ||
    /authentication error/i.test(text)
  );
}

function r2WriteForbiddenError(detail = "") {
  const where = detail ? ` (${detail})` : "";
  const error = new Error(
    `Cloudflare Account API token cannot write R2 objects${where}. Create R2 S3 credentials instead: Cloudflare dashboard → R2 → Overview → Manage R2 API Tokens → Create API token with Object Read & Write on bucket realestatedomains-assets. Set R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY on Vercel production and the Production GitHub Environment (account ${DEFAULT_ACCOUNT_ID} is already pinned). Re-run this sync, confirm the public object is HTTP 200, then set NEXT_PUBLIC_R2_ENABLED=true. Git public/images remains the fallback.`,
  );
  error.skipSync = true;
  return error;
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
    let body = {};
    try {
      body = JSON.parse(text);
    } catch {
      body = {};
    }
    if (
      isTokenLocationBlocked(body) ||
      /cannot use the access token from location/i.test(text)
    ) {
      throw locationBlockedError(
        cloudflareError(body).message || text.slice(0, 120),
      );
    }
    if (isR2WriteForbidden(body, response.status, text)) {
      throw r2WriteForbiddenError(
        cloudflareError(body).message || `HTTP ${response.status}`,
      );
    }
    throw new Error(
      `R2 REST put HTTP ${response.status}: ${text.slice(0, 400)}`,
    );
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

async function imagesPut(localFile, objectKey) {
  const id = accountId();
  if (!id) {
    throw new Error("Cloudflare Images put needs an account id");
  }
  const imageId = objectKey
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-");
  const buf = await readFile(localFile);
  const form = new FormData();
  form.append(
    "file",
    new Blob([buf], { type: contentTypeFor(localFile) }),
    objectKey.split("/").pop(),
  );
  form.append("id", imageId);
  form.append("requireSignedURLs", "false");
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${id}/images/v1`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}` },
      body: form,
    },
  );
  const text = await response.text();
  let body = {};
  try {
    body = JSON.parse(text);
  } catch {
    body = {};
  }
  if (response.status === 409 || /already exists|duplicate/i.test(text)) {
    console.log(`  Cloudflare Images already has ${imageId}`);
    return body;
  }
  if (
    isTokenLocationBlocked(body) ||
    /cannot use the access token from location/i.test(text)
  ) {
    throw locationBlockedError(
      cloudflareError(body).message || text.slice(0, 120),
    );
  }
  if (!response.ok) {
    if (isR2WriteForbidden(body, response.status, text)) {
      throw r2WriteForbiddenError(
        `Cloudflare Images HTTP ${response.status} ${cloudflareError(body).message || ""}`.trim(),
      );
    }
    throw new Error(
      `Cloudflare Images put HTTP ${response.status}: ${text.slice(0, 400)}`,
    );
  }
  const variant = Array.isArray(body?.result?.variants)
    ? body.result.variants[0]
    : "";
  if (variant) console.log(`  Images ${imageId} → ${variant}`);
  return body;
}

async function deployCloudflareAssets() {
  const publicDir = join(ROOT, "public");
  console.log(
    "R2 and Cloudflare Images writes denied. Deploying heading photos as Cloudflare Pages / Workers static assets...",
  );
  try {
    await run("npx", [
      "wrangler",
      "pages",
      "deploy",
      publicDir,
      "--project-name",
      PAGES_PROJECT,
      "--commit-dirty=true",
    ]);
    console.log(
      `Done via Cloudflare Pages. Probe https://${PAGES_PROJECT}.pages.dev/images/hero/home-strip-dusk.webp then set NEXT_PUBLIC_CF_PAGES_IMAGES_ENABLED=true and NEXT_PUBLIC_CF_PAGES_IMAGES_BASE=https://${PAGES_PROJECT}.pages.dev. Prefer R2 S3 keys when they exist.`,
    );
    return;
  } catch (pagesError) {
    console.warn(
      "Cloudflare Pages deploy failed:",
      pagesError instanceof Error ? pagesError.message : pagesError,
    );
  }
  await run("npx", ["wrangler", "deploy", "--config", ASSETS_CONFIG]);
  console.log(
    "Done via Cloudflare Workers static assets. Confirm the workers.dev image URL is HTTP 200, then set NEXT_PUBLIC_CF_PAGES_IMAGES_ENABLED=true and NEXT_PUBLIC_CF_PAGES_IMAGES_BASE to that origin.",
  );
}

const IMAGE_EDGE_HOST = "img.midtownvegascondos.com";
const IMAGE_EDGE_ORIGIN = "www.midtownvegascondos.com";

async function cfJson(path, { method = "GET", json } = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: json ? JSON.stringify(json) : undefined,
  });
  const text = await response.text();
  let body = {};
  try {
    body = JSON.parse(text);
  } catch {
    body = {};
  }
  return { response, body, text };
}

async function addVercelImageDomain() {
  const token = process.env.VERCEL_TOKEN;
  const projectId =
    process.env.VERCEL_PROJECT_ID || "prj_cgzb65mf2GDFh37vU9hPWQ2TGJ6m";
  const teamId = process.env.VERCEL_ORG_ID || "team_EIbjFXaDDtGMTweb5Hvo3CG3";
  if (!isUsableSecret(token)) {
    console.warn(
      "No VERCEL_TOKEN — origin Host override should still serve git images from www without adding img.* on Vercel.",
    );
    return;
  }
  const response = await fetch(
    `https://api.vercel.com/v10/projects/${projectId}/domains?teamId=${teamId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: IMAGE_EDGE_HOST }),
    },
  );
  const text = await response.text();
  if (response.ok || response.status === 409) {
    console.log(`Vercel project has ${IMAGE_EDGE_HOST} (${response.status})`);
    return;
  }
  console.warn(
    `Vercel domain add HTTP ${response.status}: ${text.slice(0, 240)}`,
  );
}

async function ensureOriginHostOverride(zoneId) {
  const listed = await cfJson(`/zones/${zoneId}/rulesets`);
  if (!listed.response.ok) {
    throw r2WriteForbiddenError(
      `origin rulesets HTTP ${listed.response.status} ${cloudflareError(listed.body).message || listed.text.slice(0, 120)}`,
    );
  }
  const rulesets = Array.isArray(listed.body?.result) ? listed.body.result : [];
  const origin = rulesets.find((item) => item.phase === "http_request_origin");
  const ourRule = {
    ref: "img_midtown_origin_www",
    expression: `http.host eq "${IMAGE_EDGE_HOST}"`,
    description:
      "img.* fetches www on Vercel so Cloudflare can cache heading photos without orange-clouding the production hostname",
    action: "route",
    action_parameters: {
      host_header: IMAGE_EDGE_ORIGIN,
      origin: { host: IMAGE_EDGE_ORIGIN },
    },
  };

  if (!origin?.id) {
    const created = await cfJson(`/zones/${zoneId}/rulesets`, {
      method: "POST",
      json: {
        name: "Origin Rules ruleset",
        kind: "zone",
        phase: "http_request_origin",
        rules: [ourRule],
      },
    });
    if (!created.response.ok) {
      throw r2WriteForbiddenError(
        `origin ruleset create HTTP ${created.response.status} ${cloudflareError(created.body).message || created.text.slice(0, 160)}`,
      );
    }
    console.log(
      `Created origin rule: ${IMAGE_EDGE_HOST} Host/SNI → ${IMAGE_EDGE_ORIGIN}`,
    );
    return;
  }

  const current = await cfJson(`/zones/${zoneId}/rulesets/${origin.id}`);
  if (!current.response.ok) {
    throw r2WriteForbiddenError(
      `origin ruleset get HTTP ${current.response.status} ${cloudflareError(current.body).message || current.text.slice(0, 120)}`,
    );
  }
  const rules = Array.isArray(current.body?.result?.rules)
    ? current.body.result.rules
    : [];
  const nextRules = [];
  let replaced = false;
  for (const rule of rules) {
    if (rule.ref === ourRule.ref) {
      nextRules.push({ ...rule, ...ourRule });
      replaced = true;
    } else {
      nextRules.push(rule);
    }
  }
  if (!replaced) nextRules.push(ourRule);

  const updated = await cfJson(`/zones/${zoneId}/rulesets/${origin.id}`, {
    method: "PUT",
    json: { rules: nextRules },
  });
  if (!updated.response.ok) {
    throw r2WriteForbiddenError(
      `origin ruleset update HTTP ${updated.response.status} ${cloudflareError(updated.body).message || updated.text.slice(0, 160)}`,
    );
  }
  console.log(
    `Origin rule ${replaced ? "updated" : "added"}: ${IMAGE_EDGE_HOST} Host/SNI → ${IMAGE_EDGE_ORIGIN}`,
  );
}

/**
 * www stays gray-cloud on Vercel. img.* is a separate Cloudflare-proxied
 * hostname so heading photos can be cached on Cloudflare's network with git
 * as the origin/backup. Requires Zone DNS Edit on the Account API token.
 * An origin Host override keeps TLS on the www certificate (no Vercel SSL
 * fight on img.*). Per Cloudflare Origin Rules API as of 2026.
 */
async function ensureCloudflareImageHostname() {
  console.log(
    `R2/Images/Pages/Workers writes denied. Creating proxied ${IMAGE_EDGE_HOST} on the Cloudflare DNS zone (www stays on Vercel, not orange-clouded)...`,
  );
  const { response, body, text } = await cfJson(
    "/zones?name=midtownvegascondos.com",
  );
  if (
    isTokenLocationBlocked(body) ||
    /cannot use the access token from location/i.test(text)
  ) {
    throw locationBlockedError(cloudflareError(body).message);
  }
  if (!response.ok) {
    throw r2WriteForbiddenError(
      `zones lookup HTTP ${response.status} ${cloudflareError(body).message || text.slice(0, 120)}`,
    );
  }
  const zone = Array.isArray(body?.result) ? body.result[0] : undefined;
  if (!zone?.id) {
    throw r2WriteForbiddenError(
      "Cloudflare zone midtownvegascondos.com not in this token's account",
    );
  }
  console.log(`Cloudflare zone ${zone.id} (${zone.name})`);

  const existing = await cfJson(
    `/zones/${zone.id}/dns_records?type=CNAME&name=${IMAGE_EDGE_HOST}`,
  );
  const record = Array.isArray(existing.body?.result)
    ? existing.body.result[0]
    : undefined;
  if (!record) {
    const created = await cfJson(`/zones/${zone.id}/dns_records`, {
      method: "POST",
      json: {
        type: "CNAME",
        name: "img",
        content: IMAGE_EDGE_ORIGIN,
        proxied: true,
        ttl: 1,
      },
    });
    if (!created.response.ok) {
      throw r2WriteForbiddenError(
        `DNS create HTTP ${created.response.status} ${cloudflareError(created.body).message || created.text.slice(0, 160)}`,
      );
    }
    console.log(
      `Created proxied CNAME ${IMAGE_EDGE_HOST} → ${IMAGE_EDGE_ORIGIN}`,
    );
  } else if (!record.proxied || record.content !== IMAGE_EDGE_ORIGIN) {
    const patched = await cfJson(`/zones/${zone.id}/dns_records/${record.id}`, {
      method: "PATCH",
      json: {
        proxied: true,
        content: IMAGE_EDGE_ORIGIN,
        ttl: 1,
      },
    });
    if (!patched.response.ok) {
      throw r2WriteForbiddenError(
        `DNS patch HTTP ${patched.response.status} ${cloudflareError(patched.body).message || patched.text.slice(0, 160)}`,
      );
    }
    console.log(
      `Updated proxied CNAME ${IMAGE_EDGE_HOST} → ${IMAGE_EDGE_ORIGIN}`,
    );
  } else {
    console.log(
      `DNS record exists for ${IMAGE_EDGE_HOST} proxied=${record.proxied}`,
    );
  }

  try {
    await ensureOriginHostOverride(zone.id);
  } catch (originError) {
    console.warn(
      "Origin Host override failed; adding img.* on Vercel as a fallback:",
      originError instanceof Error ? originError.message : originError,
    );
    await addVercelImageDomain();
  }
  console.log(
    `Probe https://${IMAGE_EDGE_HOST}/images/hero/home-strip-dusk.webp — if HTTP 200, set NEXT_PUBLIC_CF_EDGE_IMAGES_ENABLED=true. Prefer R2 S3 keys when they exist.`,
  );
}

async function putObject(localFile, objectKey, mode) {
  switch (mode) {
    case "s3":
      await s3Put(localFile, objectKey);
      return;
    case "rest":
      await restPut(localFile, objectKey);
      return;
    case "images":
      await imagesPut(localFile, objectKey);
      return;
    case "wrangler":
      await wranglerPut(localFile, objectKey);
      return;
    default: {
      const exhaustive = mode;
      throw new Error(`Unknown R2 sync mode: ${exhaustive}`);
    }
  }
}

async function syncFiles(files, mode) {
  const target =
    mode === "images"
      ? `Cloudflare Images account ${accountId()}`
      : `r2://${BUCKET}/${PREFIX}/`;
  console.log(`Syncing ${files.length} images to ${target} via ${mode} ...`);
  for (const file of files) {
    const rel = relative(join(ROOT, "public"), file).replaceAll("\\", "/");
    const objectKey = `${PREFIX}/${rel}`;
    const size = (await stat(file)).size;
    console.log(`→ ${objectKey} (${Math.round(size / 1024)} KB)`);
    await putObject(file, objectKey, mode);
  }
  if (mode === "images") {
    console.log(
      "Done via Cloudflare Images. Confirm an imagedelivery.net URL is HTTP 200, then set NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED=true and NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH. Prefer R2 S3 keys for the public r2.dev prefix.",
    );
    return;
  }
  console.log(
    "Done. Verify a public object 200, then set NEXT_PUBLIC_R2_ENABLED=true.",
  );
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
  try {
    await syncFiles(files, mode);
  } catch (error) {
    if (error?.skipSync && mode === "rest" && hasWranglerAuth()) {
      console.warn(
        "R2 object write denied. Trying Cloudflare Images with the same Account API token...",
      );
      try {
        await syncFiles(files, "images");
        return;
      } catch (imagesError) {
        if (imagesError?.skipSync) {
          try {
            await deployCloudflareAssets();
            return;
          } catch (assetsError) {
            console.warn(
              "Cloudflare Pages/Workers image host failed:",
              assetsError instanceof Error ? assetsError.message : assetsError,
            );
            try {
              await ensureCloudflareImageHostname();
            } catch (dnsError) {
              console.warn(
                "Cloudflare img hostname fallback failed:",
                dnsError instanceof Error ? dnsError.message : dnsError,
              );
            }
            return;
          }
        }
        throw imagesError;
      }
    }
    throw error;
  }
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
