import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DATA, getItemsByTag, hrefFor } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

type PageProps = {
  params: Promise<{ tag: string }>;
};

function titleCase(s: string) {
  return s
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function normalizeTag(raw: string) {
  return decodeURIComponent(raw).trim().toLowerCase();
}

export function generateStaticParams() {
  // Build unique tag slugs from your data so Next can statically generate tag pages.
  const set = new Set<string>();

  // Tools
  for (const t of DATA.tools) for (const tag of t.tags ?? []) set.add(tag.trim().toLowerCase());

  // Prompts
  for (const p of DATA.prompts) for (const tag of p.tags ?? []) set.add(tag.trim().toLowerCase());

  // Updates
  for (const u of DATA.updates) for (const tag of u.tags ?? []) set.add(tag.trim().toLowerCase());

  // Collections
  for (const c of DATA.collections) for (const tag of c.tags ?? []) set.add(tag.trim().toLowerCase());

  // Comparisons
  for (const c of DATA.comparisons) for (const tag of c.tags ?? []) set.add(tag.trim().toLowerCase());

  // Best pages
  for (const b of DATA.bestPages) for (const tag of b.tags ?? []) set.add(tag.trim().toLowerCase());

  return Array.from(set).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = normalizeTag(rawTag);

  if (!tag) {
    return {
      title: "Tag not found — ToolDrop AI",
      robots: { index: false, follow: false },
    };
  }

  const items = getItemsByTag(tag);

  if (!items.length) {
    return {
      title: "Tag not found — ToolDrop AI",
      robots: { index: false, follow: false },
    };
  }

  const title = `${titleCase(tag)} — Tag — ToolDrop AI`;
  const description = `${items.length} item${items.length === 1 ? "" : "s"} tagged with “${tag}”.`;
  const url = absoluteUrl(`/tags/${encodeURIComponent(tag)}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "ToolDrop AI",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag: rawTag } = await params;

  const tag = normalizeTag(rawTag);
  if (!tag) return notFound();

  const items = getItemsByTag(tag);
  if (!items.length) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="rounded-full">
          Tag
        </Badge>
        <h1 className="text-3xl font-semibold">{titleCase(tag)}</h1>
      </div>

      <p className="mt-2 text-muted-foreground">
        {items.length} item{items.length === 1 ? "" : "s"} tagged with “{tag}”.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((it) => (
          <Link key={`${it.kind}-${it.id}`} href={hrefFor(it.kind, it.slug)} className="block">
            <Card className="rounded-2xl hover:bg-muted/40 transition">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full capitalize">
                    {it.kind}
                  </Badge>
                  <span className="line-clamp-1">{it.title}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground line-clamp-2">{it.subtitle}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
