# Production Deployment Checklist

Use this checklist before deploying to production.

## Environment & Configuration

- [ ] **Set NEXT_PUBLIC_SITE_URL** to your actual domain (e.g., `https://xavkit.com`)
  - This is CRITICAL. Without it, canonicals and SEO metadata will be broken
  - Verify no typos or trailing slashes
  - Example: ✅ `https://xavkit.com` ❌ `example.com` ❌ `https://xavkit.com/`

- [ ] Verify `.env.local` is NOT committed to git (check `.gitignore`)
  - [ ] Set environment variables in your hosting platform (Vercel, Netlify, etc.)

## Data Integrity

- [ ] Run `npm run validate-data` and ensure no errors
  - All tools, prompts, updates have required fields
  - All collections/comparisons reference valid items
  - No slug collisions exist

- [ ] Verify DATA files are complete
  - [ ] `lib/content/tools.ts` has all tools
  - [ ] `lib/content/prompts.ts` has all prompts
  - [ ] `lib/content/updates.ts` has all updates
  - [ ] `lib/content/collections.ts` has all collections
  - [ ] `lib/content/comparisons.ts` has all comparisons
  - [ ] `lib/content/best-pages.ts` has all best pages

## Build & Performance

- [ ] Run `npm run build` locally and verify it succeeds
  - [ ] No TypeScript errors
  - [ ] No ESLint warnings
  - [ ] All static pages are pre-rendered

- [ ] Test build output
  - [ ] Homepage loads at `/`
  - [ ] Tools page loads at `/tools`
  - [ ] Random tool loads at `/tools/[any-slug]`
  - [ ] Prompts, updates, collections, comparisons pages load
  - [ ] Tag pages load at `/tags/[tag]`
  - [ ] Best pages load at `/best/[slug]`
  - [ ] 404 page shows at `/nonexistent-page`

## SEO & Metadata

- [ ] Verify canonical URLs point to your domain
  - [ ] Check page source or DevTools for correct `<link rel="canonical">`
  - [ ] Example: Should be `https://xavkit.com/tools/cursor`, not `http://localhost:3000`

- [ ] Check sitemap.xml
  - [ ] URL: `https://yoursite.com/sitemap.xml` returns valid XML
  - [ ] All main categories are listed
  - [ ] All tool, prompt, update, collection, comparison, best, and tag pages are included
  - [ ] `lastModified` dates are reasonable
  - [ ] All URLs use your actual domain

- [ ] Verify robots.txt
  - [ ] URL: `https://yoursite.com/robots.txt` returns valid robots.txt
  - [ ] Sitemap URL is correct
  - [ ] `/api/` is blocked (currently empty but safe to disallow)

- [ ] OG Tags & Social Sharing
  - [ ] Test a tool/prompt/update/collection/comparison page on social media debugger
  - [ ] Title, description, and image appear correctly

## Browser & Compatibility

- [ ] Test on Chrome, Firefox, Safari (at least on one OS)
  - [ ] Mobile responsiveness (use DevTools device emulation)
  - [ ] Navigation works
  - [ ] Cards and layout look good
  - [ ] Buttons are clickable

- [ ] Analytics (if using any)
  - [ ] Is Google Analytics / your analytics platform configured?
  - [ ] Check that events are being tracked

## Performance

- [ ] Lighthouse audit
  - [ ] Run Google Lighthouse in DevTools (or PageSpeed Insights)
  - [ ] Aim for 90+ on Performance, SEO, Best Practices
  - [ ] Fix any critical issues

- [ ] Bundle size
  - [ ] Verify no unexpected large dependencies in build output
  - [ ] Use `npm run build -- --analyze` if using bundle analyzer

## Security

- [ ] No hardcoded secrets in code
  - [ ] No API keys, tokens, or passwords visible in source
  - [ ] All sensitive data in environment variables

- [ ] Security headers are present
  - [ ] Check that `next.config.ts` security headers are applied
  - [ ] Verify X-Frame-Options, X-Content-Type-Options, CSP headers

- [ ] HTTPS enabled
  - [ ] Hosting platform forces HTTPS
  - [ ] No mixed content warnings in DevTools

## Final Checks

- [ ] All links work
  - [ ] Navigation links work
  - [ ] Footer links (Privacy, Terms, Contact) are valid
  - [ ] Tags and search work
  - [ ] Related items and collections load

- [ ] Local storage features work (client-side only)
  - [ ] Save/unsave items persists
  - [ ] Recently viewed shows correct items
  - [ ] Clear saved items works

- [ ] 404 handling
  - [ ] `/nonexistent-page` shows 404 page, not white screen
  - [ ] Has links back to homepage

- [ ] Monitor logs after deployment
  - [ ] Check your hosting platform's error logs
  - [ ] No unhandled exceptions in first 24 hours

## Post-Deployment

- [ ] Verify live site
  - [ ] Test all main pages on live domain
  - [ ] Check sitemap.xml is accessible
  - [ ] Confirm robots.txt is correct
  - [ ] Google Search Console: Submit sitemap
  - [ ] Monitor search console for errors (24 hours after deployment)

- [ ] Monitor performance
  - [ ] Set up error tracking (Sentry, Vercel, etc.)
  - [ ] Monitor Core Web Vitals
  - [ ] Check for 404 spikes

- [ ] Check Content
  - [ ] Verify no broken references in collections/comparisons
  - [ ] Tools in best pages exist and load
  - [ ] All tool alternatives are valid

---

## Common Mistakes to Avoid

❌ Forgetting to set `NEXT_PUBLIC_SITE_URL`  
❌ Uploading `.env.local` to production  
❌ Not running `validate-data` before deploying  
❌ Using `example.com` as default domain  
❌ Broken tool/prompt/update/collection references  
❌ Outdated build output (always rebuild before deploying)  
❌ Forgetting to test canonical URLs  

---

If everything passes, you're ready to deploy! 🚀
