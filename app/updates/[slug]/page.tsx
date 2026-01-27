import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  DATA,
  getUpdateBySlug,
  getRelatedUpdates,
  findCollectionsContaining,
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
  return DATA.updates.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const u = getUpdateBySlug(slug);
  if (!u) return { title: "Update not found" };

  const title = `${u.headline} — Update`;
  const description = u.tldr;
  const url = absoluteUrl(`/updates/${u.slug}`);

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

export default async function UpdatePage({ params }: PageProps) {
  const { slug } = await params;
  const u = getUpdateBySlug(slug);

  if (!u) return notFound();

  const related = getRelatedUpdates(u.id, 6);
  const inCollections = findCollectionsContaining({ kind: "update", id: u.id });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
<TrackRecent
  kind="update"
  id={u.id}
  slug={u.slug}
  title={u.headline}
  subtitle={u.tldr}
/>
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary" className="rounded-full">
        {u.model}
      </Badge>

      {u.tags.map((t) => {
        const label = t.trim();
        const tagSlug = encodeURIComponent(label.toLowerCase());

        return (
          <Link key={tagSlug} href={`/tags/${tagSlug}`}>
            <Badge variant="secondary" className="rounded-full">
              {label}
            </Badge>
          </Link>
        );
      })}
    </div>

      <h1 className="mt-4 text-3xl font-semibold">{u.headline}</h1>
      <p className="mt-2 text-muted-foreground">{u.tldr}</p>

      <div className="mt-4 flex items-center gap-2">
        <SaveButton kind="update" id={u.id} className="rounded-xl" />
      </div>

      <div className="mt-6 grid gap-4">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>What changed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {u.whatChanged.map((x) => (
              <div key={x}>• {x}</div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Who it affects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {u.whoItAffects.map((x) => (
              <div key={x}>• {x}</div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>What to do now</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {u.whatToDoNow.map((x) => (
              <div key={x}>• {x}</div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 grid gap-4">
          {inCollections.length > 0 ? (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Appears in collections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {inCollections.map((c) => (
                  <Link
                    key={c.id}
                    href={`/collections/${c.slug}`}
                    className="block rounded-xl border p-3 hover:bg-muted/40 transition"
                  >
                    <div className="font-medium">{c.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {c.description}
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ) : null}

          {related.length > 0 ? (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Related updates</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {related.map((ru) => (
                  <Link
                    key={ru.id}
                    href={`/updates/${ru.slug}`}
                    className="block rounded-xl border p-3 hover:bg-muted/40 transition"
                  >
                    <div className="font-medium">{ru.headline}</div>
                    <div className="text-sm text-muted-foreground">
                      {ru.tldr}
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>
        <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Explore more</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Link
                href="/updates"
                className="rounded-full border px-3 py-1 text-sm hover:bg-muted/40 transition"
              >
                Browse all updates
              </Link>
              <Link
                href="/tags"
                className="rounded-full border px-3 py-1 text-sm hover:bg-muted/40 transition"
              >
                Browse tags
              </Link>

              {u.tags.slice(0, 3).map((t) => {
                const label = t.trim();
                const tagSlug = encodeURIComponent(label.toLowerCase());

                return (
                  <Link
                    key={`more-${tagSlug}`}
                    href={`/tags/${tagSlug}`}
                    className="rounded-full border px-3 py-1 text-sm hover:bg-muted/40 transition"
                  >
                    More in {label}
                  </Link>
                );
              })}
            </CardContent>
          </Card>

      </div>
    </div>
  );
}