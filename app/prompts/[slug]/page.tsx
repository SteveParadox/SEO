import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  DATA,
  getPromptBySlug,
  getRelatedPrompts,
  findCollectionsContaining,
} from "@/lib/data";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { absoluteUrl } from "@/lib/seo";
import { CopyButton } from "@/components/copy-button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return DATA.prompts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = getPromptBySlug(slug);
  if (!p) return { title: "Prompt not found" };

  const title = `${p.title} — Prompt`;
  const description = p.purpose;
  const url = absoluteUrl(`/prompts/${p.slug}`);

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

export default async function PromptPage({ params }: PageProps) {
  const { slug } = await params;
  const p = getPromptBySlug(slug);

  if (!p) return notFound();

  const related = getRelatedPrompts(p.id, 6);
  const inCollections = findCollectionsContaining({ kind: "prompt", id: p.id });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <Badge key={t} variant="secondary" className="rounded-full">
            {t}
          </Badge>
        ))}
      </div>

      <h1 className="mt-4 text-3xl font-semibold">{p.title}</h1>
      <p className="mt-2 text-muted-foreground">{p.purpose}</p>

      <Card className="mt-6 rounded-2xl">
  <CardHeader className="flex flex-row items-center justify-between gap-3">
    <CardTitle>Prompt</CardTitle>
    <CopyButton text={p.prompt} label="Copy prompt" className="rounded-xl" />
  </CardHeader>
  <CardContent>
    <pre className="whitespace-pre-wrap rounded-xl border p-4 text-sm">
      {p.prompt}
    </pre>
  </CardContent>
</Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="rounded-2xl">
       
  <CardHeader>
    <CardTitle>Variations</CardTitle>
  </CardHeader>
  <CardContent className="space-y-2">
    {p.variations.map((v) => (
      <div
        key={v}
        className="flex items-start justify-between gap-3 rounded-xl border p-3"
      >
        <div className="text-sm">• {v}</div>
        <CopyButton text={v} label="Copy" className="rounded-xl" />
      </div>
    ))}
  </CardContent>
</Card>
          <CardContent className="space-y-2">
            {p.modelCompatibility.map((m) => (
              <div key={m}>• {m}</div>
            ))}
          </CardContent>
        </Card>
      </div>

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
              <CardTitle>Related prompts</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/prompts/${rp.slug}`}
                  className="block rounded-xl border p-3 hover:bg-muted/40 transition"
                >
                  <div className="font-medium">{rp.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {rp.purpose}
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
