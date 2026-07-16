# Hero images (unique per page)

Each WebP is assigned to exactly one route via `lib/hero-images.ts`.

| Role | File | Notes |
|------|------|--------|
| **Homepage (best)** | `home-strip-dusk.webp` | Las Vegas Strip twilight / Bellagio |
| Buyers / sellers / market / 55+ / neighborhoods | other `*.webp` | Unique key + ImageObject schema |

## SEO / GEO / AEO

`PageHero` emits JSON-LD `ImageObject` with:

- `contentUrl`, `description` (SEO alt), `caption` (AEO)
- `contentLocation` Place + GeoCoordinates (GEO)
- `keywords`, `representativeOfPage`, creator/credit

Sources: Unsplash License (free commercial use).
