# Xavkit architecture

## Application layer
Next.js 16 App Router owns index, detail, collection, search, recommendation, and utility routes in `app/`. Shared UI components reside in `components/`.

## Data layer
`lib/data-types.ts` defines content records. Legacy content arrays live in `lib/content/`. `lib/content/recent-updates-2026.ts` holds additional source-linked releases. `lib/data.ts` combines catalog modules and exposes slug resolution, tag indexes and relationships. Most catalog data remains static, so larger-scale migration to per-record structured content and smaller client payloads is still future work.

## SEO
`lib/seo.ts` normalizes the site origin; `app/sitemap.ts` generates canonical URL entries; `app/robots.txt/route.ts` serves crawler rules and the same sitemap origin. Each dynamic route declares metadata; `next.config.ts` defines legacy redirects and security headers.

## Browser-local features
Saved items, recently viewed and local engagement remain browser-storage features. Their metrics cannot be treated as global popularity figures. The prior email-only local-storage signup no longer collects email.

## Editorial pipeline
`scripts/discover-content.ts` reads metadata from selected GitHub Releases APIs to a draft review queue. `.github/workflows/discover-content.yml` may propose a draft pull request if Actions and repository token permissions allow it. This is not an article publishing pipeline, and source verification/human writing remain mandatory.

## Reliability
Validation tools: `scripts/validate-data.ts` and `scripts/validate-seo-robots.mjs`. Preliminary Node tests live under `tests/`, and CI is declared in `.github/workflows/validate.yml`. GitHub Actions jobs currently fail before recording steps in the execution environment, so build and test success have not been established.
