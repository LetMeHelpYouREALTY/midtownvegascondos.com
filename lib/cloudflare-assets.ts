/**
 * Cloudflare R2 is primary image storage; git copies under /public/images are the backup.
 *
 * Native products used (not a custom CDN wrapper):
 * - Cloudflare R2 public bucket (already hosts the agent headshot)
 * - Optional Cloudflare Images (imagedelivery.net) when account hash is set
 *
 * Do not orange-cloud the Vercel apex — R2 is object storage only.
 */

export const R2_PUBLIC_HOST = "pub-720ca9b7443b47be981def05abd3d7f0.r2.dev";
export const R2_PUBLIC_BASE =
  process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL ?? `https://${R2_PUBLIC_HOST}`;
export const R2_SITE_PREFIX = process.env.NEXT_PUBLIC_R2_PREFIX ?? "midtownvegascondos";

export function isRemoteImageSrc(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

export function normalizeLocalPath(src: string): string {
  if (isRemoteImageSrc(src)) return src;
  return src.startsWith("/") ? src : `/${src}`;
}

/** Git backup path, always same-origin. */
export function getGitBackupSrc(src: string): string {
  return normalizeLocalPath(src);
}

/**
 * Public R2 object URL for a same-origin image path like `/images/hero/foo.webp`.
 */
export function getR2ObjectUrl(src: string): string {
  const local = normalizeLocalPath(src).replace(/^\//, "");
  return `${R2_PUBLIC_BASE.replace(/\/$/, "")}/${R2_SITE_PREFIX}/${local}`;
}

export function isR2DeliveryEnabled(): boolean {
  return process.env.NEXT_PUBLIC_R2_ENABLED === "true";
}

/**
 * Resolve the URL Next.js Image should request.
 * R2 when NEXT_PUBLIC_R2_ENABLED=true; otherwise the git-backed public/ file.
 */
export function getCdnImageSrc(src: string): string {
  if (isRemoteImageSrc(src)) return src;
  if (isR2DeliveryEnabled()) return getR2ObjectUrl(src);
  return normalizeLocalPath(src);
}
