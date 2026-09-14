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

```bash
npx wrangler login   # or CLOUDFLARE_API_TOKEN
npm run cloudflare:images
```

Then set `NEXT_PUBLIC_R2_ENABLED=true` in Vercel.

Do **not** orange-cloud the Vercel production hostname. R2 is object storage only.

## Specs

| Folder | Size | Format |
|--------|------|--------|
| hero/ | 1920px wide | WebP, typically 90–250KB |
| sections/ | 1920px wide | WebP |
| agent/ | 800px square | JPG/WebP |

Alt text includes location + property type. No Unsplash filenames in production routes.
