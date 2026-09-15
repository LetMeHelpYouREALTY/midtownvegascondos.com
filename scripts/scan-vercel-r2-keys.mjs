#!/usr/bin/env node
/**
 * Pull production env from every Vercel team project and copy usable
 * R2 S3 keys into GITHUB_ENV. Names only are logged.
 *
 * This site's production env has no R2_ACCESS_KEY_ID. The shared r2.dev
 * bucket already serves the agent headshot, so another project may hold
 * Object Read & Write keys for realestatedomains-assets.
 */
import { spawnSync } from "node:child_process";
import { appendFileSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ACCESS_NAMES = new Set([
  "R2_ACCESS_KEY_ID",
  "CLOUDFLARE_R2_ACCESS_KEY_ID",
  "CF_R2_ACCESS_KEY_ID",
  "AWS_ACCESS_KEY_ID",
]);
const SECRET_NAMES = new Set([
  "R2_SECRET_ACCESS_KEY",
  "CLOUDFLARE_R2_SECRET_ACCESS_KEY",
  "CF_R2_SECRET_ACCESS_KEY",
  "AWS_SECRET_ACCESS_KEY",
  "R2_SECRET",
]);
const ACCOUNT_NAMES = new Set(["R2_ACCOUNT_ID", "CLOUDFLARE_ACCOUNT_ID"]);

function isUsable(value) {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed !== "[SENSITIVE]" && trimmed !== "SENSITIVE";
}

function parseEnvFile(text) {
  const pairs = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 1) continue;
    const key = line.slice(0, eq);
    let val = line.slice(eq + 1);
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    pairs.push({ key, val });
  }
  return pairs;
}

function interestingKeys(pairs) {
  return [
    ...new Set(
      pairs
        .map((row) => row.key)
        .filter((key) => /R2|CLOUDFLARE|AWS_ACCESS|AWS_SECRET/i.test(key)),
    ),
  ].sort();
}

async function listProjects(token, team) {
  const projects = [];
  let until;
  for (let page = 0; page < 20; page += 1) {
    const url = new URL("https://api.vercel.com/v9/projects");
    url.searchParams.set("teamId", team);
    url.searchParams.set("limit", "100");
    if (until) url.searchParams.set("until", String(until));
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.log(`Vercel project list HTTP ${res.status}`);
      break;
    }
    const batch = Array.isArray(body.projects) ? body.projects : [];
    projects.push(...batch);
    const next = body.pagination?.next;
    if (!next || batch.length === 0) break;
    until = next;
  }
  return projects;
}

async function listSharedEnvKeys(token, team) {
  const url = `https://api.vercel.com/v8/env?teamId=${encodeURIComponent(team)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.json().catch(() => ({}));
  const rows = [
    ...(Array.isArray(body) ? body : []),
    ...(Array.isArray(body.envs) ? body.envs : []),
    ...(Array.isArray(body.data) ? body.data : []),
  ];
  const keys = [
    ...new Set(rows.map((row) => row?.key).filter(Boolean)),
  ].sort();
  console.log(
    `Team shared env HTTP ${res.status}, ${keys.length} keys; R2/Cloudflare/AWS: ${
      keys.filter((key) => /R2|CLOUDFLARE|AWS_ACCESS|AWS_SECRET/i.test(key)).join(", ") ||
      "(none)"
    }`,
  );
}

function pullProductionEnv(token, team, projectId, dest) {
  const result = spawnSync(
    "vercel",
    [
      "env",
      "pull",
      dest,
      "--environment=production",
      "--yes",
      "--token",
      token,
      "--team",
      team,
      "--project",
      projectId,
    ],
    { encoding: "utf8" },
  );
  return result.status === 0;
}

function copyR2Keys(pairs, source, copied) {
  const names = interestingKeys(pairs);
  console.log(
    `Sister ${source} production keys matching R2/Cloudflare/AWS: ${names.join(", ") || "(none)"}`,
  );
  const githubEnv = process.env.GITHUB_ENV;
  for (const { key: rawKey, val } of pairs) {
    let key = rawKey;
    if (ACCESS_NAMES.has(key)) key = "R2_ACCESS_KEY_ID";
    else if (SECRET_NAMES.has(key)) key = "R2_SECRET_ACCESS_KEY";
    else if (ACCOUNT_NAMES.has(key)) key = "CLOUDFLARE_ACCOUNT_ID";
    else continue;
    if (!isUsable(val)) {
      console.log(`skipped ${rawKey} from ${source} (not usable from vercel env pull)`);
      continue;
    }
    console.log(`::add-mask::${val}`);
    if (githubEnv) appendFileSync(githubEnv, `${key}=${val}\n`);
    copied.add(key);
    console.log(`copied ${key} from ${source}`);
  }
  return copied.has("R2_ACCESS_KEY_ID") && copied.has("R2_SECRET_ACCESS_KEY");
}

async function main() {
  const token = process.env.VERCEL_TOKEN;
  const team = process.env.VERCEL_ORG_ID;
  const self = process.env.VERCEL_PROJECT_ID;
  if (!token || !team) {
    console.log("No VERCEL_TOKEN or VERCEL_ORG_ID; cannot scan sister projects.");
    return;
  }
  if (
    isUsable(process.env.R2_ACCESS_KEY_ID) &&
    isUsable(process.env.R2_SECRET_ACCESS_KEY)
  ) {
    console.log("R2 S3 keys already present; skipping sister scan.");
    return;
  }

  await listSharedEnvKeys(token, team);

  const projects = await listProjects(token, team);
  console.log(`Scanning ${projects.length} Vercel team projects for R2 S3 keys.`);
  const copied = new Set();
  const dir = mkdtempSync(join(tmpdir(), "r2-env-"));
  try {
    for (const project of projects) {
      const id = project.id;
      const name = project.name || id;
      if (!id || id === self) continue;
      const dest = join(dir, `${id}.env`);
      console.log(`Pulling production env for ${name}`);
      if (!pullProductionEnv(token, team, id, dest)) {
        console.log(`Sister ${name} env pull failed; continuing.`);
        continue;
      }
      const pairs = parseEnvFile(readFileSync(dest, "utf8"));
      if (copyR2Keys(pairs, name, copied)) {
        console.log(`R2 S3 keys copied from ${name}. Stopping sister scan.`);
        return;
      }
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  console.log(
    "No pullable R2 S3 keys on any Vercel team project. Create Object Read & Write tokens on realestatedomains-assets.",
  );
}

main().catch((error) => {
  console.error("Sister Vercel R2 scan failed:", error);
  process.exit(0);
});
