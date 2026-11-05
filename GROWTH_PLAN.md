# Xavkit: measured organic-growth operating plan

**Started:** 2026-11-05  
**Objective:** grow *qualified, returning visitors* to Xavkit through useful search results, better browsing, and credible distribution.  
**Rule:** no assumed rankings, unverified traffic claims, purchased links, fake reviews, or mass-generated doorway pages.

## Current verified implementation

- The site uses Next.js App Router with explicit metadata, a generated sitemap and a robots.txt endpoint.
- Tools, prompts, collections, comparisons, best lists and tags have separate content routes.
- Vercel Analytics is included in the root layout. No actual visitor counts were available in this audit.
- Prompt topic pages and a directory index have been added on the growth branch to strengthen descriptive internal links and search-intent paths.
- Prompt directory summaries and home-page featured summaries are now prepared on the server; personalized home widgets are deferred. Measure actual page-weight and Web Vitals after deployment.
- Google Search Console verification can be supplied by `GOOGLE_SITE_VERIFICATION` or DNS. Verification, Search Console account access, and sitemap submission remain account-side actions.

## Baseline to capture immediately after deployment

| Metric | Data source | First target |
| --- | --- | --- |
| Organic clicks by landing page | Google Search Console | Establish real 28-day baseline |
| Queries, impressions, CTR, average position | Google Search Console | Find pages with high impressions but poor relevance/CTR |
| Pages indexed, not indexed, canonical selections | Search Console Pages + URL inspection | Investigate unexpected exclusions |
| Visitors, referrals, returning visitors | Vercel Analytics / GA4 if independently configured | Establish channel and retention baseline |
| LCP, INP, CLS | PageSpeed Insights / Chrome UX Report, where available | Meet Google's published Core Web Vitals thresholds |
| Prompt-copy and outbound link use | Privacy-respecting product event analytics, if implemented | Measure value, not vanity page counts |

Do not equate tool clicks, locally stored trending events, or developer visits with global unique visitors.

## Phase 1: technical access and measurement (days 1–14)

1. Unblock GitHub Actions runner/test execution and Vercel build failures; do not attribute failures to code without job logs. Verify production deploy and redirect behavior, especially www vs apex.
2. Inspect live `/`, `/robots.txt`, `/sitemap.xml`, `/prompts`, `/prompts/topics`, representative topic pages and tool pages for 200 responses, correct canonical tags and indexability.
3. Verify ownership in Search Console, submit the actual sitemap and inspect indexed/crawled pages. Check both mobile and desktop PageSpeed reports.
4. Create a baseline report for search clicks, impressions, indexing and landing-page traffic. Review weekly; no invented growth percentage.
5. Check ad scripts for layout shift, speed regressions and intrusive placement; preserve legitimate monetization while testing user impact.

## Phase 2: improve existing pages before adding volume (days 15–45)

1. Rank opportunities by: evidence of search demand, relevance to Xavkit, achievable differentiation and existing page quality.
2. Refresh the 10 best candidates with original screenshots (rights-cleared), reproducible examples, current sources, accurate dates and useful decision tables.
3. Strengthen internal links from category hubs, best-of pages and relevant related prompts. Keep anchors accurate and avoid sitewide keyword repetition.
4. For software comparisons, state the criteria, intended use, testing methodology, pricing source/date, and important limitations.
5. Use content audit outcomes **improve, consolidate or noindex** only when justified. Do not create a new article for every keyword variant.

## Phase 3: reach users outside Google (days 30–90)

1. Publish genuinely useful answers in communities where questions arise (developer forums, relevant Reddit communities, professional groups) without spam or undisclosed promotion.
2. Create short demonstrations of prompt workflows: input, prompt, verified output, and limitations. Share contextual links to the corresponding guide.
3. Seek editorial mentions through helpful original resources, not paid link schemes or automated backlink blasts.
4. Build a real opt-in newsletter only after implementing consent capture, delivery, unsubscribe handling, and privacy documentation. The existing static informational UI should not imply subscribers are being registered.
5. Track referral quality, time on useful pages, saves or repeat visits, not only visits from low-intent channels.

## Weekly review cadence

- **Monday:** Search Console index coverage and crawl errors; compare last 7 vs previous 7 days where sample sizes allow.
- **Wednesday:** Review high-impression low-CTR pages; decide whether page intent and title need real changes.
- **Friday:** Check deployment health, Core Web Vitals, broken links, highest-value referral sources, and progress on content improvements.

A weekly report should list **measurements, verified interventions, observed outcomes, uncertainty, and the next three actions**. It should not claim causal SEO gains without enough evidence.

## Non-negotiable editorial policies

- Every new page must serve a distinct visitor task and add value beyond rearranged model output.
- Search-volume estimates, rankings, competitor research and performance claims must have actual sources and dates.
- Do not fabricate user reviews, independent testing, citations, tool pricing, or fresh update dates.
- Use AI for research organization and drafting assistance, with human factual review before publication.
- Keep user consent and privacy in view when adding analytics, email or advertising integrations.

**Definition of success:** over sustained measurement windows, Xavkit increases verified organic clicks and engaged/returning visitors, while maintaining healthy indexing, fast pages, and a useful editorial standard. Results require real-world measurement and cannot be guaranteed by code changes alone.
