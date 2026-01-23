export function siteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  const base = siteUrl();
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}
