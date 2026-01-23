import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DATA, getPromptBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { absoluteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return DATA.prompts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPromptBySlug(params.slug);
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

export default function PromptPage({ params }: { params: { slug: string } }) {
  const p = getPromptBySlug(params.slug);
  if (!p) return notFound();

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
        <CardHeader>
          <CardTitle>Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap rounded-xl border p-4 text-sm">{p.prompt}</pre>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Variations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {p.variations.map((v) => (
              <div key={v}>• {v}</div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Works well with</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {p.modelCompatibility.map((m) => (
              <div key={m}>• {m}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
