# Xavkit

A content-driven Next.js website for browsing and comparing AI tools, prompt templates, model updates, curated collections, and decision guides.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, shadcn-style UI components, and Vercel Analytics.

## Local setup

1. Install the Node.js version supported by Next.js 16 (Node 20.9 or later is required).
2. Run `npm ci`.
3. Copy `.env.example` to `.env.local` and replace its sample `NEXT_PUBLIC_SITE_URL` with your actual canonical origin.
4. Run `npm run dev` and visit `http://localhost:3000`.

## Validation

- `npm run lint` checks ESLint.
- `npx tsc --noEmit` checks TypeScript.
- `npm run validate-data` checks content relationships and required fields.
- `npm run validate-seo` runs the existing SEO source checks.
- `npm run build` runs validation and builds Next.js.

Before deploying, use [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md). Production builds require `NEXT_PUBLIC_SITE_URL` set to the canonical HTTPS origin.

## Content

Search-demand-driven how-to guides live in `lib/content/search-demand-guides.ts` and render at `/guides` and `/guides/[slug]`. Each article has a distinct task, dated editorial review, answer-first steps, primary references, and links to existing content. The opportunity backlog and its evidence limits are in `research/search-demand/2026-11-07/`.


Content currently lives under `lib/content/`; the central `lib/data.ts` provides typed access to tools, prompts, updates, collections, comparisons, and best pages. Preserve published slugs and IDs when editing existing entries. The `app/` directory owns routes and SEO metadata.

Updates should include publisher announcements or other primary sources and precise event dates where possible. An editorial update date must represent a meaningful revision rather than an automated crawl.

## Product limitations

The site has historically used browser storage for saves, recent items, and engagement signals. Trending scores derived from browser storage are **device-specific**, not global metrics. A previous newsletter UI stored contact details locally without registering an actual mailing-list subscription; the interface has been changed to avoid implying email delivery.

## Organic growth measurement and indexing

1. Verify the production domain in **Google Search Console** (DNS verification is preferred), or set `GOOGLE_SITE_VERIFICATION` to the HTML-tag verification token in Vercel, then redeploy.
2. Submit `https://xavkit.com/sitemap.xml` in Search Console. Test a few representative URLs with URL Inspection and ensure the canonical URL and robots directives are correct.
3. Use Vercel Analytics to measure visitors and referral channels. To prioritize SEO work, also inspect Google Search Console's page and query reports; use actual clicks, impressions, CTR, and indexing status rather than guessed keyword volumes.
4. Run the existing quality gates (`npm run lint`, `npm run typecheck`, `npm run validate-data`, `npm run validate-seo`, `npm test`, `npm run build`) before deployment. Verify the deployed `/prompts`, `/prompts/topics`, `/robots.txt` and `/sitemap.xml` endpoints after deployment.
5. For each monthly content review, prioritize refreshing useful pages with existing impressions, then publish original, sourced comparisons and examples where people have unmet questions. Do not mass-generate near-duplicate pages or manufacture backlinks.

Growth depends on real users and search demand; this implementation does not guarantee rankings or traffic.

## Deployment

The intended deployment target is Vercel. Verify `/robots.txt`, `/sitemap.xml`, canonical tags, redirects, content links, and representative detail pages on the deployed host.

## Ownership and licensing

The GitHub repository is publicly visible, but this does not by itself grant permission to reuse its source code. No license is declared; do not assume an open-source license without the owner's explicit decision.

## Content discovery

Run `npm run discover-content` to read stable releases from selected official GitHub repositories into `content-review/github-releases.json`. Only candidate metadata and publisher URLs are recorded. The scheduled review workflow can open a draft content-candidate pull request once merged into the default branch; it **never publishes articles automatically**. The repository's Actions settings must allow pull-request creation for this workflow to work.
