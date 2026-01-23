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


export function generateStaticParams() {
  return DATA.updates.map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const u = getUpdateBySlug(params.slug);
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

export default function UpdatePage({ params }: { params: { slug: string } }) {
  const u = getUpdateBySlug(params.slug);
  if (!u) return notFound();
  const related = getRelatedUpdates(u.id, 6);
  const inCollections = findCollectionsContaining({ kind: "update", id: u.id });


  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="rounded-full">
          {u.model}
        </Badge>
        {u.tags.map((t) => (
          <Badge key={t} variant="secondary" className="rounded-full">
            {t}
          </Badge>
        ))}
      </div>

      <h1 className="mt-4 text-3xl font-semibold">{u.headline}</h1>
      <p className="mt-2 text-muted-foreground">{u.tldr}</p>

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
            <div className="text-sm text-muted-foreground">{c.description}</div>
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
            <div className="text-sm text-muted-foreground">{ru.tldr}</div>
          </Link>
        ))}
      </CardContent>
    </Card>
  ) : null}
</div>

      </div>
    </div>
  );
}
