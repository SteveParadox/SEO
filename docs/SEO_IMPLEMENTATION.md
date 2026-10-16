# SEO implementation notes

- Set `NEXT_PUBLIC_SITE_URL` to the final canonical origin in production; use the same origin for page metadata, the sitemap and robots output.
- `app/sitemap.ts` no longer stamps every static route with the current time on every request. Item entries use their editorial `updatedAtISO` values.
- Legacy `/prompts/prompts` URLs redirect permanently to `/prompts` or `/prompts/:slug`. The duplicate physical route subtree was removed, while the original canonical routes remain.
- User-specific search, saved, and recent-history pages are intentionally excluded from indexing and sitemap generation.
- New model updates show original sources and distinct announcement, publication, and editorial revision dates. Older updates need a systematic provenance audit.
- Check `/robots.txt`, `/sitemap.xml`, canonical tags, and SEO headers against the deployed host. A PR source review alone does not establish that production indexing is correct.
- CSP uses less permissive script handling in production than development but must still be tested in a deployed environment.
