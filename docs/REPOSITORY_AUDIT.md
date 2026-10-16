# Xavkit repository audit (October 16, 2026)

Scope: Static inspection of the public `main` branch, content catalog, and the cleanup implementation branch. Full local build validation was unavailable in the inspection runtime because GitHub DNS resolution failed. CI is provided to validate these changes on GitHub.

| Priority | Finding and evidence | Action | Status |
|---|---|---|---|
| P0 | 1,901 tracked paths under `.next/` | Removed from Git index, retained ignore rule | Implemented |
| P1 | `/prompts/prompts` mirrored canonical prompt routes | Added permanent redirects and removed duplicate route source | Implemented |
| P1 | Static sitemap paths used `new Date()` on each render | Omitted unsupported change timestamps | Implemented |
| P1 | Robots origin could diverge from metadata and sitemap origin | Shared `siteUrl()` | Implemented |
| P1 | Newsletter only stored an email in local storage, yet claimed subscription | Replaced with honest updates link until an email provider exists | Implemented |
| P1 | Trending counts used local storage and implied global popularity | Relabeled as device-local activity | Implemented |
| P1 | Newest prior content was dated April 2026 | Added nine source-linked release articles with genuine announcement and publication dates | Partial: older content still needs review |
| P1 | No visible automated CI/tests | Added initial content tests and pull-request validation workflow | Pending CI execution |
| P1 | `app/home.tsx` and content modules are large | Component and content migration audit required | Open |
| P1 | CSP includes `unsafe-eval` and `unsafe-inline` | Validate production behavior before tightening | Open |
| P2 | No operational editorial discovery pipeline | Need verified feeds, review queue and scheduled proposals | Open |
| P2 | Pricing/benchmark claims in older entries lack systematic provenance | Audit all historical tool profiles and comparisons | Open |

No claims are made about successful builds, browser tests, or a deployed production site until the CI and deployment checks are actually completed.
