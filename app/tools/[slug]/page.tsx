import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DATA, getToolBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { absoluteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return DATA.tools.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: "Tool not found" };

  const title = `${tool.name} — ToolDrop AI`;
  const description = tool.oneLiner;
  const url = absoluteUrl(`/tools/${tool.slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "ToolDrop AI",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex flex-wrap gap-2">
        {tool.tags.map((t) => (
          <Badge key={t} variant="secondary" className="rounded-full">
            {t}
          </Badge>
        ))}
      </div>

      <h1 className="mt-4 text-3xl font-semibold">{tool.name}</h1>
      <p className="mt-2 text-muted-foreground">{tool.oneLiner}</p>

      <div className="mt-6 grid gap-4">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Best use cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tool.useCases.map((x) => (
              <div key={x}>• {x}</div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Pros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tool.pros.map((x) => (
                <div key={x}>• {x}</div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Cons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tool.cons.map((x) => (
                <div key={x}>• {x}</div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="capitalize">{tool.pricing.tier}</div>
            {tool.pricing.note ? <div className="text-sm text-muted-foreground mt-1">{tool.pricing.note}</div> : null}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Alternatives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tool.alternatives.map((a) => (
              <div key={a.slug}>• {a.name}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
