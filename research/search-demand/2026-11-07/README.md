# Xavkit search-demand implementation — 2026-11-07

This is a **site-specific editorial hypothesis list** prepared on 2026-11-07 using public category-level demand indicators and a review of the existing Xavkit content inventory. It is **not** a completed keyword-volume study, not the final result of a separate deep-research task, not a raw Google Trends export, and not evidence that Xavkit ranks for these phrases.

## Scope and decision

Xavkit focuses on AI tools, prompt workflows, model updates and comparisons. Large navigational head terms such as "chatgpt", "youtube", "amazon", "canva" and "gemini" establish ecosystem interest but are poor standalone page targets for this site. Broad medical, financial, sports, news and "near me" queries are **out of scope** and were not added.

The proposed growth opportunity is useful task-led tutorials adjacent to the existing inventory. AI-assisted guide drafts cover PDF summaries with citations, CSV/Excel validation, evidence-led keyword research and Canva/social-graphics workflows. Each addresses a distinct question with illustrative (not independently tested) examples, links to existing tools/templates, a canonical URL and sitemap coverage.

## Content map

See [opportunities.csv](opportunities.csv) for target queries, destination URLs, intent, priority, action, evidence limitations and publication status. "Not measured" is intentional: **no query-level search volumes, competition scores, current rankings or Xavkit clicks were obtained**. Brand-scale estimates from third parties are not automatically applicable to these long-tail phrases.

P1/P2/P3 are provisional editorial priorities, **not measured keyword difficulty or demonstrated query demand**. Validate each query with dated first-party Search Console data where possible and a market/locale-specific search dataset before treating it as high-demand. Implemented guide URLs require deployment and indexing checks; "implemented in PR" does not mean live.

## Evidence sources and handling

- [Google Year in Search 2025](https://blog.google/products-and-platforms/products/search/year-in-search-2025/) reported a 25% year-over-year rise in queries beginning "How do I" during 2025 (category signal only; not proof of demand for any target query in this repository).
- [Ahrefs most searched terms](https://ahrefs.com/blog/top-google-searches/) and [Semrush most searched keywords](https://www.semrush.com/blog/most-searched-keywords-google/) show outsized brand navigation and AI-product interest. Their numbers are **modeled vendor estimates** with different geographies/dates.
- [Exploding Topics](https://explodingtopics.com/technology-exploding-topics) surfaces rising technology themes. Its growth windows are not query-level forecasts.
- [Google Trends help](https://support.google.com/trends/answer/4365533?hl=en) explicitly describes normalized interest. **Never label a 0–100 Trends score as monthly searches.**
- [Google Search Console documentation](https://support.google.com/webmasters/answer/7576553/performance-report-search) is the preferred source for Xavkit's *observed* query/page clicks, impressions, CTR and ranking position.
- [Bing Keyword Research](https://www.bing.com/webmasters/help/keyword-research-628070b6) can independently triangulate markets and question variants.

## Release checklist

1. Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run validate-data`, `npm test` and `npm run build` with `NEXT_PUBLIC_SITE_URL=https://xavkit.com`.
2. Verify unique internal links, URL canonicals, metadata, `/guides`, all four `/guides/[slug]` pages and sitemap entries on the preview deployment.
3. Once deployed, inspect the guides with Search Console URL Inspection; do not claim indexation until Google confirms it.
4. After a meaningful data window, export query/page/country/device data and update this backlog. Refresh the existing comparison, best and prompt pages before expanding further.
5. Do not publish made-up usage statistics, AI tool prices, verified test results or synthetic volume numbers; keep editorial dates meaningful.

## Publication and disclosure precautions

- The guide drafts were prepared with AI assistance and the described workflows have not undergone independent first-hand testing for these articles. Do not represent the content-version date as a human editorial review, and do not add a `datePublished` value until a real production publication date is known.
- The root layout already contains the HTML `main` landmark; page components must not nest another one. The new route regression tests cover this.
- Confirm external provider documentation, examples and accessibility before publishing. General provider documentation is further reading, not evidence that every procedure was individually tested.
- No current query-level monthly volumes, SERP competition data, or site Search Console measurements have been obtained. Do not make an SEO outcome claim on the basis of a PR merge.

## Editorial extension rules

- One canonical URL per distinct visitor intent; consolidate overlapping variants.
- Each guide must answer the main question immediately, include executable steps and examples, and explain verification or limitations.
- Only use structured data that matches visible content; adding schema never guarantees rich results.
- Prefer first-party product docs and observed performance before modeled demand; log the source's date and geography.
