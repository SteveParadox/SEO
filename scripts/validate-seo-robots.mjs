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

const robotsRoute = read("app/robots.ts");
if (/disallow:\s*["']\/["']/i.test(robotsRoute)) {
  errors.push("app/robots.ts must not disallow the whole site.");
}

const sitemapRoute = read("app/sitemap.ts");
for (const route of ["/search", "/recent", "/saved"]) {
  if (sitemapRoute.includes(`absoluteUrl("${route}")`) || sitemapRoute.includes(`absoluteUrl('${route}')`)) {
    errors.push(`app/sitemap.ts must not include intentionally noindexed route ${route}.`);
  }
}

if (process.argv.includes("--built")) {
  const builtPublicRoutes = [
    ["app/index.html", "/"],
    ["app/tools.html", "/tools"],
    ["app/prompts.html", "/prompts"],
    ["app/updates.html", "/updates"],
    ["app/collections.html", "/collections"],
    ["app/comparisons.html", "/comparisons"],
    ["app/best.html", "/best"],
    ["app/tags.html", "/tags"],
    ["app/alternatives.html", "/alternatives"],
    ["app/ai-stack-builder.html", "/ai-stack-builder"],
    ["app/compare-tools.html", "/compare-tools"],
  ];

  for (const [relativePath, route] of builtPublicRoutes) {
    const builtFile = path.join(root, ".next", "server", relativePath);
    if (!existsSync(builtFile)) {
      errors.push(`Built output missing ${route}: .next/server/${relativePath}`);
      continue;
    }

    const html = readFileSync(builtFile, "utf8");
    if (/<meta\s+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
      errors.push(`Built public route ${route} emits a noindex robots meta tag.`);
    }
    if (/x-robots-tag[^>]+noindex/i.test(html)) {
      errors.push(`Built public route ${route} contains an X-Robots-Tag noindex marker.`);
    }
  }
}

if (errors.length) {
  console.error("SEO robots validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("SEO robots validation passed.");
