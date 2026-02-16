import { absoluteUrl } from "@/lib/seo";

export function GET() {
  // Use configured site URL when available; absoluteUrl will throw in prod if not set.
  let sitemap: string | null = null;
  try {
    sitemap = absoluteUrl("/sitemap.xml");
  } catch (err) {
    // If NEXT_PUBLIC_SITE_URL not configured in production, omit sitemap line.
    sitemap = null;
  }

  const body = `User-agent: *\nAllow: /\n\n${sitemap ? `Sitemap: ${sitemap}\n` : ""}`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
