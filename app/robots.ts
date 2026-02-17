import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    ...(site ? { sitemap: `${site}/sitemap.xml` } : {}),
  };
}
