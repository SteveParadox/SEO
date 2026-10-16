# Xavkit

A content-driven Next.js website for browsing and comparing AI tools, prompt templates, model updates, curated collections, and decision guides.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, shadcn-style UI components, and Vercel Analytics.

## Local setup

1. Install the Node.js version supported by Next.js 16 (Node 20.9 or later is required).
2. Run `npm ci`.
3. Copy `.env.example` to `.env.local` and configure `NEXT_PUBLIC_SITE_URL` when testing production metadata.
4. Run `npm run dev` and visit `http://localhost:3000`.

## Validation

- `npm run lint` checks ESLint.
- `npx tsc --noEmit` checks TypeScript.
- `npm run validate-data` checks content relationships and required fields.
- `npm run validate-seo` runs the existing SEO source checks.
- `npm run build` runs validation and builds Next.js.

Before deploying, use [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md). Production builds require `NEXT_PUBLIC_SITE_URL` set to the canonical HTTPS origin.

## Content

Content currently lives under `lib/content/`; the central `lib/data.ts` provides typed access to tools, prompts, updates, collections, comparisons, and best pages. Preserve published slugs and IDs when editing existing entries. The `app/` directory owns routes and SEO metadata.

Updates should include publisher announcements or other primary sources and precise event dates where possible. An editorial update date must represent a meaningful revision rather than an automated crawl.

## Product limitations

The site has historically used browser storage for saves, recent items, and engagement signals. Trending scores derived from browser storage are **device-specific**, not global metrics. A previous newsletter UI stored contact details locally without registering an actual mailing-list subscription; the interface has been changed to avoid implying email delivery.

## Deployment

The intended deployment target is Vercel. Verify `/robots.txt`, `/sitemap.xml`, canonical tags, redirects, content links, and representative detail pages on the deployed host.

## Ownership and licensing

The GitHub repository is publicly visible, but this does not by itself grant permission to reuse its source code. No license is declared; do not assume an open-source license without the owner's explicit decision.

## Content discovery

Run `npm run discover-content` to read stable releases from selected official GitHub repositories into `content-review/github-releases.json`. Only candidate metadata and publisher URLs are recorded. The scheduled review workflow can open a draft content-candidate pull request once merged into the default branch; it **never publishes articles automatically**. The repository's Actions settings must allow pull-request creation for this workflow to work.
