function configuredSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")
  ).replace(/\/+$/, "");
}

export function GET() {
  const site = configuredSiteUrl();
  const lines = [
    "User-Agent: *",
    "Allow: /",
    "Disallow: /api/",
    "",
    ...(site ? [`Sitemap: ${site}/sitemap.xml`] : []),
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
