// lib/seo.ts

function normalizeBaseUrl(raw: string) {
  const trimmed = raw.trim().replace(/\/+$/, ""); // remove ALL trailing slashes

  // If someone sets NEXT_PUBLIC_SITE_URL="tooldropai.com" (humans love doing that),
  // force it to be an absolute origin.
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;

  return trimmed;
}

export function siteUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL;

  // Use localhost only in dev. In prod, don't quietly ship http://localhost canonicals.
  if (!env) {
    return process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://example.com"; // replace with your real default domain if you want
  }

  return normalizeBaseUrl(env);
}

export function absoluteUrl(path: string) {
  const base = siteUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}