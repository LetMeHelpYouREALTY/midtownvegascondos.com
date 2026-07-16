# Hero images (unique per page)

Each WebP is assigned to exactly one route via `lib/hero-images.ts`.

| Role | File | Notes |
|------|------|--------|
| **Homepage (best)** | `home-strip-dusk.webp` | Las Vegas Strip twilight / Bellagio |
| Buyers / sellers / market / 55+ / neighborhoods | other `*.webp` | Unique key + ImageObject schema |

## SEO / GEO / AEO (2026)

`lib/image-seo.ts` + `PageHero` provide:

### Open Graph / Twitter / GEO meta
- Per-page `withPageHeroMetadata(path, base)` sets unique OG/Twitter images
- `geo.region`, `geo.placename`, `geo.position`, `ICBM` from the hero Place

### JSON-LD (`generatePageHeroSchemaGraph`)
- `WebPage` with `primaryImageOfPage` + SpeakableSpecification (`h1`, `[data-hero-caption]`)
- `ImageObject` with `contentUrl`, alt/description, caption, keywords
- `contentLocation` Place + GeoCoordinates (GEO)
- `creditText`, `copyrightNotice`, `creator`, license/usage URLs
- `representativeOfPage: true`

### Visible captions
- Figcaption under each hero (`data-hero-caption`) matches schema caption for AEO

### Sitemap images
- `app/sitemap.ts` includes `images: [absolute hero URL]` per Next.js `MetadataRoute.Sitemap`

Sources: Unsplash License (free commercial use).
