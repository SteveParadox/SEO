import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function read(relativePath) {
  const filePath = path.join(root, relativePath);
  if (!existsSync(filePath)) {
    errors.push(`Missing expected file: ${relativePath}`);
    return "";
  }

  return readFileSync(filePath, "utf8");
}

function hasIndexableRobots(source) {
  return (
    source.includes("INDEXABLE_ROBOTS") ||
    /robots:\s*\{\s*index:\s*true,\s*follow:\s*true\s*\}/s.test(source)
  );
}

function hasNoindexFollowRobots(source) {
  return (
    source.includes("NOINDEX_FOLLOW_ROBOTS") ||
    /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/s.test(source)
  );
}

function hasNoindexNofollowRobots(source) {
  return (
    source.includes("NOINDEX_NOFOLLOW_ROBOTS") ||
    /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/s.test(source)
  );
}

function assertIndexable(relativePath) {
  const source = read(relativePath);

  if (!hasIndexableRobots(source)) {
    errors.push(`${relativePath} must explicitly use index,follow robots metadata.`);
  }

  if (/robots:\s*\{\s*index:\s*false/s.test(source)) {
    errors.push(`${relativePath} is a public route but contains index:false robots metadata.`);
  }
}

function assertNoindexFollow(relativePath) {
  const source = read(relativePath);

  if (!hasNoindexFollowRobots(source)) {
    errors.push(`${relativePath} must explicitly use noindex,follow robots metadata.`);
  }
}

function assertDynamicPublicRoute(relativePath) {
  const source = read(relativePath);

  if (!hasIndexableRobots(source)) {
    errors.push(`${relativePath} must index valid content records.`);
  }

  if (!hasNoindexNofollowRobots(source)) {
    errors.push(`${relativePath} must noindex missing content records.`);
  }
}

const publicRouteFiles = [
  "app/layout.tsx",
  "app/page.tsx",
  "app/tools/page.tsx",
  "app/prompts/page.tsx",
  "app/prompts/topics/page.tsx",
  "app/guides/page.tsx",
  "app/updates/page.tsx",
  "app/collections/page.tsx",
  "app/comparisons/page.tsx",
  "app/best/page.tsx",
  "app/tags/page.tsx",
  "app/alternatives/page.tsx",
  "app/ai-stack-builder/page.tsx",
  "app/compare-tools/page.tsx",
  "app/contact/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
];

const dynamicPublicRouteFiles = [
  "app/tools/[slug]/page.tsx",
  "app/prompts/[slug]/page.tsx",
  "app/prompts/topics/[topic]/page.tsx",
  "app/guides/[slug]/page.tsx",
  "app/updates/[slug]/page.tsx",
  "app/collections/[slug]/page.tsx",
  "app/comparisons/[slug]/page.tsx",
  "app/best/[slug]/page.tsx",
  "app/alternatives/[slug]/page.tsx",
];

const intentionallyNoindexedRouteFiles = [
  "app/search/page.tsx",
  "app/recent/page.tsx",
  "app/saved/page.tsx",
  "app/trending/layout.tsx",
  "app/not-found.tsx",
];

for (const file of publicRouteFiles) assertIndexable(file);
for (const file of dynamicPublicRouteFiles) assertDynamicPublicRoute(file);
for (const file of intentionallyNoindexedRouteFiles) assertNoindexFollow(file);

const tagPage = read("app/tags/[tag]/page.tsx");
if (!tagPage.includes("items.length >= 2")) {
  errors.push("app/tags/[tag]/page.tsx must keep the weak-tag threshold before indexing tag archives.");
}
if (!hasIndexableRobots(tagPage) || !hasNoindexFollowRobots(tagPage) || !hasNoindexNofollowRobots(tagPage)) {
  errors.push("app/tags/[tag]/page.tsx must handle indexable tags, weak tags, and missing tags explicitly.");
}



const nextConfig = read("next.config.ts");
if (/x-robots-tag/i.test(nextConfig)) {
  errors.push("next.config.ts must not add an X-Robots-Tag header globally.");
}

if (existsSync(path.join(root, "app", "robots.ts"))) {
  errors.push("Use app/robots.txt/route.ts instead of app/robots.ts to avoid metadata-route conflicts.");
}

const robotsRoute = read("app/robots.txt/route.ts");
if (/Disallow:\s*\/["'`]/i.test(robotsRoute) || /disallow:\s*["']\/["']/i.test(robotsRoute)) {
  errors.push("app/robots.txt/route.ts must not disallow the whole site.");
}
if (!robotsRoute.includes("Sitemap:")) {
  errors.push("app/robots.txt/route.ts must include the sitemap URL when a site URL is configured.");
}

const sitemapRoute = read("app/sitemap.ts");
if (!sitemapRoute.includes('absoluteUrl("/guides")') || !sitemapRoute.includes("...guides,")) {
  errors.push("app/sitemap.ts must include the guide hub and detail URLs.");
}
const utilityRoutes = ["/search", "/recent", "/saved", "/trending"];
for (const route of utilityRoutes) {
  if (sitemapRoute.includes(`absoluteUrl("${route}")`) || sitemapRoute.includes(`absoluteUrl('${route}')`)) {
    errors.push(`app/sitemap.ts must not include intentionally noindexed route ${route}.`);
  }
}

if (process.argv.includes("--built")) {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  const expectedOrigin = origin && (/^https?:\/\//i.test(origin) ? origin : `https://${origin}`);
  const robots = read(".next/server/app/robots.txt.body");
  const sitemap = read(".next/server/app/sitemap.xml.body");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
  const routes = new Set();

  if (!expectedOrigin) {
    errors.push("Set NEXT_PUBLIC_SITE_URL to validate built crawl files.");
  } else if (!robots.split(/\r?\n/).includes(`Sitemap: ${expectedOrigin}/sitemap.xml`)) {
    errors.push("Built robots.txt must advertise the canonical sitemap URL.");
  }
  if (!/^User-agent: \*$/m.test(robots) || /^Disallow:\s*\/\s*$/m.test(robots)) {
    errors.push("Built robots.txt must allow crawlers to access public pages.");
  }
  if (!sitemapUrls.length || new Set(sitemapUrls).size !== sitemapUrls.length) {
    errors.push("Built sitemap must contain unique URLs.");
  }

  for (const url of new Set(sitemapUrls)) {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      errors.push(`Invalid sitemap URL: ${url}`);
      continue;
    }
    if (parsed.origin !== expectedOrigin || parsed.search || parsed.hash) {
      errors.push(`Noncanonical sitemap URL: ${url}`);
      continue;
    }

    const route = parsed.pathname;
    routes.add(route);
    const html = read(`.next/server/app${route === "/" ? "/index" : route}.html`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== url && !(route === "/" && canonical === expectedOrigin)) {
      errors.push(`Built sitemap page ${route} must declare its sitemap URL as canonical.`);
    }
    const isPreviewGuide = process.env.VERCEL_ENV === "preview" &&
      (route === "/guides" || route.startsWith("/guides/"));
    if (!isPreviewGuide && /<meta name="robots" content="[^"]*noindex/i.test(html)) {
      errors.push(`Built sitemap page ${route} emits a noindex robots meta tag.`);
    }
  }

  for (const route of utilityRoutes) {
    const html = read(`.next/server/app${route}.html`);
    if (routes.has(route) || !/<meta name="robots" content="[^"]*noindex/i.test(html)) {
      errors.push(`Built utility page ${route} must be noindex and omitted from the sitemap.`);
    }
  }

  for (const route of ["/", "/tools", "/alternatives", "/prompts", "/prompts/topics",
    "/guides", "/updates", "/collections", "/comparisons", "/best", "/tags",
    "/ai-stack-builder", "/compare-tools"]) {
    if (!routes.has(route)) errors.push(`Built sitemap omits ${route}.`);
  }
}

if (errors.length) {
  console.error("SEO robots validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("SEO robots validation passed.");
