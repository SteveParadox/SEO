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
import { SaveButton } from "@/components/save-button";
import { TrackRecent } from "@/components/track-recent";
import { JsonLd } from "@/components/json-ld";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type PromptSection = {
  key: string;
  title: string;
  body?: string;
};

function extractPlaceholders(prompt: string) {
  return Array.from(new Set(prompt.match(/\{[A-Z0-9_]+\}/g) ?? []));
}

function buildSections(prompt: NonNullable<ReturnType<typeof getPromptBySlug>>) {
  const sections: PromptSection[] = [
    { key: "description", title: "What this prompt helps you do", body: prompt.description },
    { key: "when-to-use", title: "When to use it", body: prompt.whenToUse },
    { key: "decision-context", title: "Decision context", body: prompt.decisionContext },
    { key: "how-it-works", title: "How it works", body: prompt.howItWorks },
    { key: "best-practices", title: "Best practices", body: prompt.bestPractices },
    { key: "common-mistakes", title: "Common mistakes", body: prompt.commonMistakes },
    { key: "expected-output", title: "What you should expect back", body: prompt.expectedOutput },
    { key: "limitations", title: "Limitations", body: prompt.limitations },
    { key: "technical-requirements", title: "Model notes", body: prompt.technicalRequirements },
    { key: "real-world-applications", title: "Real-world applications", body: prompt.realWorldApplications },
    { key: "success-metrics", title: "How to tell if it worked", body: prompt.successMetrics },
    { key: "specific-recommendations", title: "Specific recommendations", body: prompt.specificRecommendations },
    { key: "related-prompts", title: "Where to go next", body: prompt.relatedPrompts },
    { key: "when-to-ignore", title: "When to skip this prompt", body: prompt.whenToIgnore },
  ];

  return sections.filter((section) => Boolean(section.body?.trim()));
}

export function generateStaticParams() {
  return DATA.prompts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    return {
      title: "Prompt not found - Xavkit",
      robots: { index: false, follow: false },
    };
  }

  const baseTitle = prompt.title?.trim() || "Unnamed Prompt";
  const baseDescription = (prompt.description || prompt.purpose)?.trim() || "AI prompt template";
  const title = `${baseTitle} - Xavkit`;
  const description = baseDescription.slice(0, 160);
  const url = absoluteUrl(`/prompts/${prompt.slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "Xavkit",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PromptPage({ params }: PageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) return notFound();

  const related = getRelatedPrompts(prompt.id, 6);
  const inCollections = findCollectionsContaining({ kind: "prompt", id: prompt.id });
  const placeholders = extractPlaceholders(prompt.prompt);
  const sections = buildSections(prompt);
  const pageUrl = absoluteUrl(`/prompts/${prompt.slug}`);

  const promptSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: prompt.title,
    description: prompt.description || prompt.purpose,
    text: prompt.prompt,
    url: pageUrl,
    dateModified: prompt.updatedAtISO,
    keywords: prompt.tags.join(", "),
    about: prompt.purpose,
  };

  const faqSections = sections
    .filter((section) =>
      ["when-to-use", "best-practices", "common-mistakes", "limitations"].includes(section.key)
    )
    .slice(0, 4);

  const faqSchema =
    faqSections.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqSections.map((section) => ({
            "@type": "Question",
            name: section.title,
            acceptedAnswer: {
              "@type": "Answer",
              text: section.body,
            },
          })),
        }
      : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd data={promptSchema} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}

      <TrackRecent
        kind="prompt"
        id={prompt.id}
        slug={prompt.slug}
        title={prompt.title}
        subtitle={prompt.purpose}
      />

      <div className="flex flex-wrap gap-2">
        {prompt.tags.map((tag) => {
          const label = tag.trim();
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

      <h1 className="mt-4 text-3xl font-semibold">{prompt.title}</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">{prompt.description || prompt.purpose}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <SaveButton kind="prompt" id={prompt.id} className="rounded-xl" />
        <Badge variant="outline" className="rounded-full">
          {prompt.modelCompatibility.join(" / ")}
        </Badge>
        {placeholders.length > 0 ? (
          <Badge variant="outline" className="rounded-full">
            {placeholders.length} variable{placeholders.length === 1 ? "" : "s"}
          </Badge>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.3fr_minmax(0,0.8fr)]">
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle>Prompt</CardTitle>
            <CopyButton text={prompt.prompt} label="Copy prompt" className="rounded-xl" />
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-xl border p-4 text-sm">{prompt.prompt}</pre>
          </CardContent>
        </Card>

        <div className="grid gap-4 self-start">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">Quick brief</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>
                <div className="font-medium text-foreground">Purpose</div>
                <p className="mt-1">{prompt.purpose}</p>
              </div>
              {prompt.expectedOutput ? (
                <div>
                  <div className="font-medium text-foreground">Expected output</div>
                  <p className="mt-1">{prompt.expectedOutput}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {placeholders.length > 0 ? (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Customize before copying</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Replace these placeholders with your own context before you run the prompt.
                </p>
                <div className="flex flex-wrap gap-2">
                  {placeholders.map((token) => (
                    <Badge key={token} variant="outline" className="rounded-full">
                      {token}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">Works well with</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {prompt.modelCompatibility.map((model) => (
                <div key={model} className="rounded-xl border px-3 py-2 text-sm">
                  {model}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Variations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {prompt.variations.map((variation) => (
              <div
                key={variation}
                className="flex items-start justify-between gap-3 rounded-xl border p-3"
              >
                <div className="text-sm">{variation}</div>
                <CopyButton text={variation} label="Copy" className="rounded-xl" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {sections.length > 0 ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.key} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      <div className="mt-8 grid gap-4">
        {inCollections.length > 0 ? (
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Appears in collections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {inCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.slug}`}
                  className="block rounded-xl border p-3 hover:bg-muted/40 transition"
                >
                  <div className="font-medium">{collection.title}</div>
                  <div className="text-sm text-muted-foreground">{collection.description}</div>
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
              {related.map((relatedPrompt) => (
                <Link
                  key={relatedPrompt.id}
                  href={`/prompts/${relatedPrompt.slug}`}
                  className="block rounded-xl border p-3 hover:bg-muted/40 transition"
                >
                  <div className="font-medium">{relatedPrompt.title}</div>
                  <div className="text-sm text-muted-foreground">{relatedPrompt.purpose}</div>
                </Link>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>

      <Card className="mt-6 rounded-2xl">
        <CardHeader>
          <CardTitle>Explore more</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Link
            href="/prompts"
            className="rounded-full border px-3 py-1 text-sm hover:bg-muted/40 transition"
          >
            Browse all prompts
          </Link>

          <Link
            href="/tags"
            className="rounded-full border px-3 py-1 text-sm hover:bg-muted/40 transition"
          >
            Browse tags
          </Link>

          {prompt.tags.slice(0, 3).map((tag) => {
            const label = tag.trim();
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
  );
}
