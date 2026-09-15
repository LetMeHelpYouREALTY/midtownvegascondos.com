# Image Assets Guide

Primary delivery: **Cloudflare R2** (`pub-720ca9b7443b47be981def05abd3d7f0.r2.dev/midtownvegascondos/...`).
Git copies in this folder are the **backup** and the Vercel fallback until `NEXT_PUBLIC_R2_ENABLED=true`.

## Folder Structure

```
images/
├── hero/           # H1 page heroes (unique per route)
├── sections/       # H2 / H3 heading-matched photos
├── agent/          # Dr. Jan Duffy photos
├── properties/     # Listing photos
├── neighborhoods/  # Area/community photos
├── testimonials/   # Unused — reviews use initials (no fake headshots)
└── logos/          # Brand assets
```

## Sync to Cloudflare R2

The Vercel `CLOUDFLARE_API_TOKEN` is an **Account API token with an IP allowlist**. Vercel and GitHub Actions IPs change every job, so that token returns Cloudflare error **9109** from CI (`Cannot use the access token from location`). Do not try to pin runner IPs.

Use **R2 S3 API tokens** instead (separate from Account API tokens):

1. Cloudflare dashboard → **R2** → **Manage R2 API Tokens** → Create API token.
2. Permission: Object Read & Write on bucket `realestatedomains-assets`.
3. Copy Access Key ID, Secret Access Key, and the account ID shown on the R2 overview.
4. Set on **Vercel production** and the GitHub **Production** environment:
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `CLOUDFLARE_ACCOUNT_ID` (or `R2_ACCOUNT_ID`)
5. Re-run `npm run cloudflare:images` (Vercel postbuild or the R2 GitHub workflow).
6. Confirm `https://pub-720ca9b7443b47be981def05abd3d7f0.r2.dev/midtownvegascondos/images/hero/home-strip-dusk.webp` returns HTTP 200.
7. Set `NEXT_PUBLIC_R2_ENABLED=true` on Vercel.

Rotate any Account API token that appeared in older public GitHub Actions logs.

Do **not** orange-cloud the Vercel production hostname. R2 is object storage only.

## Specs

| Folder | Size | Format |
|--------|------|--------|
| hero/ | 1920px wide | WebP, typically 90–250KB |
| sections/ | 1920px wide | WebP |
| agent/ | 800px square | JPG/WebP |

Alt text includes location + property type. No Unsplash filenames in production routes.
