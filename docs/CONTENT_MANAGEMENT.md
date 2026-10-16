# Content editing guide

- Legacy records reside in `lib/content/`, and new sourced announcements reside in `lib/content/recent-updates-2026.ts`.
- Each record needs a stable ID and a URL-safe unique slug in its collection.
- Use `announcedAtISO` for the original announcement date, `publishedAtISO` for the site's first publication date, and `updatedAtISO` only when a significant editorial change occurs.
- Provide an official `sources` URL with an informative label; keep sources as HTTPS URLs.
- Distinguish vendor-reported figures from independent tests. Do not invent benchmarks, paid plan availability, or ratings.
- Verify referenced tool and prompt IDs. Run `npm run validate-data` and `npm test` before publishing.
- Source ingestion should propose pull requests for editorial review rather than auto-publish.
- Do not copy press releases or other copyrighted content. Write original interpretation and practical implications.

## Official release candidate discovery

The repository ships `scripts/discover-content.ts` with three initial provider repositories: OpenAI Agents Python, Anthropic Claude Code, and Google Gemini CLI. It reads the public GitHub Releases API, ignores drafts and prereleases, deduplicates stable releases by repository and tag, and keeps a bounded review queue. No release body or copyrighted prose is republished. Run `npm run discover-content` locally with network access. The weekly workflow can propose a PR for review if GitHub Actions token permissions allow it. An editor must follow the original release page, verify claims, and hand-author a Xavkit update before publishing. Scheduled workflows must first be merged into the default branch and currently cannot be confirmed to have run.
