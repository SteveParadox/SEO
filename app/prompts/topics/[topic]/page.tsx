import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA } from "@/lib/data";
import { PROMPT_TOPICS, getPromptTopic, promptsForTopic } from "@/lib/prompt-topics";
import { INDEXABLE_ROBOTS, NOINDEX_NOFOLLOW_ROBOTS, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

type Props = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return PROMPT_TOPICS.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getPromptTopic(slug);
  if (!topic) return { title: "Prompt topic not found", robots: NOINDEX_NOFOLLOW_ROBOTS };
  const url = absoluteUrl(`/prompts/topics/${topic.slug}`);
  return {
    title: topic.title,
    description: topic.summary,
    alternates: { canonical: url },
    robots: INDEXABLE_ROBOTS,
    openGraph: {
      title: `${topic.title} | Xavkit`,
      description: topic.summary,
      siteName: "Xavkit",
      type: "website",
      url,
    },
    twitter: { card: "summary_large_image", title: topic.title, description: topic.summary },
  };
}

export default async function PromptTopicPage({ params }: Props) {
  const { topic: slug } = await params;
  const topic = getPromptTopic(slug);
  if (!topic) return notFound();

  const prompts = promptsForTopic(topic, DATA.prompts);
  const url = absoluteUrl(`/prompts/topics/${topic.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: topic.title,
    description: topic.summary,
    url,
    isPartOf: absoluteUrl("/prompts"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: prompts.map((prompt, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: prompt.title,
        url: absoluteUrl(`/prompts/${prompt.slug}`),
      })),
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={schema} />
      <h1 className="mt-5 max-w-4xl text-3xl font-semibold sm:text-4xl">{topic.title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{topic.summary}</p>
      <div className="mt-8 max-w-4xl space-y-4 leading-relaxed">
        {topic.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      <section className="mt-10 rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">What you can do with these prompts</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {topic.whatYouWillFind.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mt-5 text-sm"><strong>How to use them:</strong> {topic.practicalAdvice}</p>
      </section>

      <section className="mt-10" aria-labelledby="topic-prompt-list">
        <h2 id="topic-prompt-list" className="text-2xl font-semibold">
          {prompts.length} related AI prompt templates
        </h2>
        <p className="mt-2 text-muted-foreground">
          Every prompt includes editable instructions and guidance on when to use it.
          Open one to copy the template and adapt it to your own task.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {prompts.map((prompt) => (
            <article key={prompt.id} className="rounded-2xl border p-5">
              <h3 className="font-semibold">
                <Link className="hover:underline" href={`/prompts/${prompt.slug}`}>
                  {prompt.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{prompt.purpose}</p>
              <Link className="mt-3 inline-block text-sm font-medium text-primary hover:underline" href={`/prompts/${prompt.slug}`}>
                View the template
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Explore other workflows</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {PROMPT_TOPICS.filter((other) => other.slug !== topic.slug).map((other) => (
            <Link key={other.slug} className="rounded-xl border px-3 py-2 text-sm hover:bg-muted" href={`/prompts/topics/${other.slug}`}>
              {other.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
