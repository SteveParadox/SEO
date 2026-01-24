import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DATA,
  getCollectionBySlug,
  resolveCollectionItems,
  getRelatedCollections,
} from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { absoluteUrl } from "@/lib/seo";
import { SaveButton } from "@/components/save-button";
import { TrackRecent } from "@/components/track-recent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return DATA.collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollectionBySlug(slug);
  if (!c) return { title: "Collection not found" };

  const title = `${c.title} — Collection`;
  const description = c.description;
  const url = absoluteUrl(`/collections/${c.slug}`);

  return {
    title: `${title} — ToolDrop AI`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ToolDrop AI`,
      description,
      url,
      siteName: "ToolDrop AI",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ToolDrop AI`,
      description,
    },
  };
}

function hrefFor(kind: "tool" | "prompt" | "update", slug: string) {
  if (kind === "tool") return `/tools/${slug}`;
  if (kind === "prompt") return `/prompts/${slug}`;
  return `/updates/${slug}`;
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const c = getCollectionBySlug(slug);
  if (!c) return notFound();

  const relatedCollections = getRelatedCollections(c.id, 6);
  const items = resolveCollectionItems(c);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
<TrackRecent
  kind="collection"
  id={c.id}
  slug={c.slug}
  title={c.title}
  subtitle={c.description}
/>
      <div className="flex flex-wrap gap-2">
        {c.tags.map((t) => (
          <Badge key={t} variant="secondary" className="rounded-full">
            {t}
          </Badge>
        ))}
      </div>

      <h1 className="mt-4 text-3xl font-semibold">{c.title}</h1>
      <p className="mt-2 text-muted-foreground">{c.description}</p>

      <div className="mt-4 flex items-center gap-2">
        <SaveButton kind="collection" id={c.id} className="rounded-xl" />
      </div>

      <div className="mt-6 grid gap-3">
        {items.map((x, i) => {
          const item: any = x.item;

          const slug =
            x.kind === "tool"
              ? item.slug
              : x.kind === "prompt"
              ? item.slug
              : item.slug;

          const title =
            x.kind === "tool"
              ? item.name
              : x.kind === "prompt"
              ? item.title
              : item.headline;

          const subtitle =
            x.kind === "tool"
              ? item.oneLiner
              : x.kind === "prompt"
              ? item.purpose
              : item.tldr;

          return (
            <Link
              key={`${x.kind}-${item.id}`}
              href={hrefFor(x.kind, slug)}
              className="block rounded-2xl border p-4 hover:bg-muted/40 transition"
            >
              <Card className="rounded-2xl border-0 shadow-none">
                <CardHeader className="p-0">
                  <CardTitle className="text-base">
                    {i + 1}. {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-2 text-sm text-muted-foreground">
                  {subtitle}
                </CardContent>
              </Card>
            </Link>
          );
        })}

        {relatedCollections.length > 0 ? (
          <Card className="mt-8 rounded-2xl">
            <CardHeader>
              <CardTitle>More collections like this</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {relatedCollections.map((rc) => (
                <Link
                  key={rc.id}
                  href={`/collections/${rc.slug}`}
                  className="block rounded-xl border p-3 hover:bg-muted/40 transition"
                >
                  <div className="font-medium">{rc.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {rc.description}
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}