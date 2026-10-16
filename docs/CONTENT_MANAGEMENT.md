# Content editing guide

- Legacy records reside in `lib/content/`, and new sourced announcements reside in `lib/content/recent-updates-2026.ts`.
- Each record needs a stable ID and a URL-safe unique slug in its collection.
- Use `announcedAtISO` for the original announcement date, `publishedAtISO` for the site's first publication date, and `updatedAtISO` only when a significant editorial change occurs.
- Provide an official `sources` URL with an informative label; keep sources as HTTPS URLs.
- Distinguish vendor-reported figures from independent tests. Do not invent benchmarks, paid plan availability, or ratings.
- Verify referenced tool and prompt IDs. Run `npm run validate-data` and `npm test` before publishing.
- Source ingestion should propose pull requests for editorial review rather than auto-publish.
- Do not copy press releases or other copyrighted content. Write original interpretation and practical implications.
