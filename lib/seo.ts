// lib/seo.ts

function normalizeBaseUrl(raw: string) {
  const trimmed = raw.trim().replace(/\/+$/, ""); // remove ALL trailing slashes

  // If someone sets NEXT_PUBLIC_SITE_URL="xavkit.com" (humans love doing that),
  // force it to be an absolute origin.
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;

  return trimmed;
}

export function siteUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL;

  // Use localhost only in dev. In prod, require explicit config.
  if (!env) {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3000";
    }
    // In production, NEXT_PUBLIC_SITE_URL MUST be set - crash early rather than silently ship wrong canonicals
    throw new Error(
      "NEXT_PUBLIC_SITE_URL environment variable is required in production. " +
      "Set it to your domain (e.g., https://xavkit.com) before deploying."
    );
  }

  return normalizeBaseUrl(env);
}

export function absoluteUrl(path: string) {
  const base = siteUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}