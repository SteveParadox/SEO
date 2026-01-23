"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  Flame,
  TrendingUp,
  ShieldCheck,
  Rocket,
  ArrowRight,
  Newspaper,
  BadgeCheck,
  BookOpen,
  LineChart,
  Cpu,
  Globe,
  Timer,
  Copy,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { DATA } from "@/lib/data";
import { Scale } from "lucide-react"; // add this icon import
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const { tools, prompts, updates, collections, comparisons } = DATA;



const itemTypeMeta = {
  tool: { label: "Tool", icon: Wrench },
  prompt: { label: "Prompt", icon: Copy },
  update: { label: "Update", icon: TrendingUp },
  collection: { label: "Collection", icon: BadgeCheck },
  comparison: { label: "Comparison", icon: Scale },
} as const;


type Kind = keyof typeof itemTypeMeta;

function daysAgo(iso: string) {
  const ms = Date.now() - new Date(iso + "T00:00:00").getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

function freshnessLabel(iso: string) {
  const d = daysAgo(iso);
  if (d <= 1) return "New";
  if (d <= 7) return "This week";
  if (d <= 21) return "Recent";
  return "Evergreen";
}

function hrefFor(kind: Kind, slug: string) {
  if (kind === "tool") return `/tools/${slug}`;
  if (kind === "prompt") return `/prompts/${slug}`;
  if (kind === "update") return `/updates/${slug}`;
  if (kind === "collection") return `/collections/${slug}`;
  return `/comparisons/${slug}`;
}


function Pill({
  icon: Icon,
  children,
}: {
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
      {Icon ? <Icon className="h-3.5 w-3.5 mr-1" /> : null}
      {children}
    </span>
  );
}

type IndexItem = {
  kind: Kind;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  typeTag: string;
  minutes: number;
  updatedAtISO: string;
};

function ItemCard({ item }: { item: IndexItem }) {
  const meta = itemTypeMeta[item.kind];
  const Icon = meta.icon;

  return (
    <Link
      href={hrefFor(item.kind, item.slug)}
      className="block rounded-2xl border p-4 hover:bg-muted/40 transition"
      aria-label={`Open ${meta.label}: ${item.title}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="rounded-full">
              {meta.label}
            </Badge>
            <span className="inline-flex items-center gap-1">
              <Icon className="h-3.5 w-3.5" /> {item.typeTag}
            </span>
            <Badge variant="secondary" className="rounded-full">
              {freshnessLabel(item.updatedAtISO)}
            </Badge>
            <span className="inline-flex items-center gap-1">
              <Timer className="h-3.5 w-3.5" /> {item.minutes} min
            </span>
          </div>
          <div className="mt-2 font-medium leading-snug">{item.title}</div>
          <div className="mt-2 text-sm text-muted-foreground">{item.subtitle}</div>
        </div>
        <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground" />
      </div>
    </Link>
  );
}

export default function ToolDropAI() {
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("tools");

  const unifiedIndex = useMemo<IndexItem[]>(() => {
    const idx: IndexItem[] = [];

    tools.forEach((t) => {
      idx.push({
        kind: "tool",
        id: t.id,
        slug: t.slug,
        title: t.name,
        subtitle: t.oneLiner,
        typeTag: (t.tags[0] || "tool").toUpperCase(),
        minutes: 6,
        updatedAtISO: t.updatedAtISO,
      });
    });

    prompts.forEach((p) => {
      idx.push({
        kind: "prompt",
        id: p.id,
        slug: p.slug,
        title: p.title,
        subtitle: p.purpose,
        typeTag: (p.tags[0] || "prompt").toUpperCase(),
        minutes: 5,
        updatedAtISO: p.updatedAtISO,
      });
    });

    updates.forEach((u) => {
      idx.push({
        kind: "update",
        id: u.id,
        slug: u.slug,
        title: u.headline,
        subtitle: u.tldr,
        typeTag: u.model.toUpperCase(),
        minutes: 4,
        updatedAtISO: u.updatedAtISO,
      });
    });

    collections.forEach((c) => {
      idx.push({
        kind: "collection",
        id: c.id,
        slug: c.slug,
        title: c.title,
        subtitle: c.description,
        typeTag: "COLLECTION",
        minutes: 7,
        updatedAtISO: c.updatedAtISO,
      });
    });
    comparisons.forEach((c) => {
    idx.push({
      kind: "comparison",
      id: c.id,
      slug: c.slug,
      title: c.title,
      subtitle: c.description,
      typeTag: "VS",
      minutes: 6,
      updatedAtISO: c.updatedAtISO,
    });
  });


    idx.sort(
      (a, b) =>
        new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime()
    );
    return idx;
  }, []);

  const filteredIndex = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return unifiedIndex.slice(0, 8);
    return unifiedIndex
      .filter((x) =>
        (x.title + " " + x.subtitle + " " + x.typeTag).toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [query, unifiedIndex]);

  const featuredCollections = useMemo(() => collections.slice(0, 4), []);

const activeCategoryItems = useMemo(() => {
  if (activeCategory === "tools")
    return unifiedIndex.filter((x) => x.kind === "tool").slice(0, 6);
  if (activeCategory === "prompts")
    return unifiedIndex.filter((x) => x.kind === "prompt").slice(0, 6);
  if (activeCategory === "updates")
    return unifiedIndex.filter((x) => x.kind === "update").slice(0, 6);
  if (activeCategory === "compare")
    return unifiedIndex.filter((x) => x.kind === "comparison").slice(0, 6);
  return unifiedIndex.slice(0, 6);
}, [activeCategory, unifiedIndex]);

  const categories = useMemo(
    () => [
      {
        key: "tools",
        label: "AI Tools",
        icon: Cpu,
        blurb:
          "New, trending, and quietly powerful tools. Filtered so you don’t waste time.",
        bullets: ["Free tools", "New releases", "Underrated picks"],
      },
      {
        key: "prompts",
        label: "Prompts",
        icon: BookOpen,
        blurb:
          "Copy-paste prompts that noticeably improve results. No roleplay theatre.",
        bullets: ["Best prompts", "Prompt packs", "Prompt techniques"],
      },
      {
        key: "updates",
        label: "Model Updates",
        icon: TrendingUp,
        blurb:
          "What changed in GPT, Claude, Gemini, and others. Translated into plain English.",
        bullets: ["What changed", "Why it matters", "Who should care"],
      },
      {
        key: "compare",
        label: "Comparisons",
        icon: LineChart,
        blurb: "X vs Y vs Z. Strengths, weaknesses, and who should care.",
        bullets: ["Chatbots", "Image tools", "Writing tools"],
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Why should I check this regularly?",
        a: "Because AI changes weekly and most updates are buried under noise. This filters the chaos into things worth your attention.",
      },
      { q: "Do you review everything?", a: "No. Only things that are new, useful, or oddly popular." },
      { q: "Is this for beginners or experts?", a: "Both. Beginners discover. Experts skim and steal." },
    ],
    []
  );

  const trending = useMemo(() => unifiedIndex.slice(0, 6), [unifiedIndex]);

  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) {
      setToast("That email looks imaginary.");
      return;
    }
    setToast("Subscribed. You’ll get the next drop.");
    setEmail("");
    window.setTimeout(() => setToast(null), 2500);
  }

  const active = categories.find((c) => c.key === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl border flex items-center justify-center shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold">ToolDrop AI</div>
              <div className="text-xs text-muted-foreground">
                Daily AI tools, prompts, and model updates
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#categories">
              Categories
            </a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#trending">
              Trending Now
            </a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#newsletter">
              Weekly ToolDrop
            </a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#faq">
              FAQ
            </a>
          </nav>

          <Button variant="outline" className="rounded-2xl" asChild>
            <a href="#newsletter" className="inline-flex items-center">
              <Newspaper className="h-4 w-4 mr-2" /> Get the weekly drop
            </a>
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <div className="flex flex-wrap gap-2 mb-4">
            <Pill icon={Flame}>Updated daily</Pill>
            <Pill icon={ShieldCheck}>No hype, just usefulness</Pill>
            <Pill icon={Globe}>Curated, not spammed</Pill>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            What changed in AI today?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            New tools. Better prompts. Model updates that actually matter. Updated
            constantly so you don’t have to chase links like it’s a second job.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button className="rounded-2xl" asChild>
              <a href="#trending" className="inline-flex items-center">
                See what’s trending <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button variant="outline" className="rounded-2xl" asChild>
              <a href="#categories">Browse categories</a>
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl border flex items-center justify-center">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold leading-tight">Searchable</div>
                    <div className="text-sm text-muted-foreground">
                      Fast lookups for tools, prompts, and comparisons.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl border flex items-center justify-center">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold leading-tight">Return-worthy</div>
                    <div className="text-sm text-muted-foreground">
                      Weekly digest + daily drops. Humans love routines.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <Search className="h-4 w-4" /> Search tools & prompts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex gap-2">
              <Input
                placeholder="Try: free AI tools, best prompts, ChatGPT alternatives"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="rounded-2xl"
              />
              <Button variant="outline" className="rounded-2xl" onClick={() => setQuery("")}>
                Clear
              </Button>
            </div>

            <div className="mt-4 space-y-3">
              {filteredIndex.map((it) => (
                <ItemCard key={`${it.kind}-${it.id}`} item={it} />
              ))}

              {filteredIndex.length === 0 ? (
                <div className="text-sm text-muted-foreground p-4 border rounded-2xl">
                  No matches. Humans keep inventing new words.
                </div>
              ) : null}
            </div>

            <Separator className="my-5" />

            <div className="rounded-2xl border p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-2xl border flex items-center justify-center">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Why people keep coming back</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Daily updates → new reasons to return. Prompts & collections → bookmarks and
                    shares. Weekly digest → retention without begging.
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-5" />

<div className="flex items-end justify-between gap-3 flex-wrap">
  <div>
    <div className="font-medium">Featured collections</div>
    <div className="text-sm text-muted-foreground">
      Curated bundles people actually save. Convenient, unlike most things.
    </div>
  </div>
  <Badge variant="secondary" className="rounded-full">Collections</Badge>
</div>

<div className="mt-4 grid gap-3 md:grid-cols-2">
  {featuredCollections.map((c) => (
    <Link
      key={c.id}
      href={hrefFor("collection", c.slug)}
      className="block rounded-2xl border p-4 hover:bg-muted/40 transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="rounded-full">Collection</Badge>
            <Badge variant="secondary" className="rounded-full">
              {freshnessLabel(c.updatedAtISO)}
            </Badge>
          </div>
          <div className="mt-2 font-medium leading-snug">{c.title}</div>
          <div className="mt-2 text-sm text-muted-foreground">{c.description}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.tags.slice(0, 3).map((t) => (
              <Badge key={t} variant="outline" className="rounded-full">{t}</Badge>
            ))}
          </div>
        </div>
        <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground" />
      </div>
    </Link>
  ))}
</div>

          </CardContent>
        </Card>
      </section>

      {/* The rest of your page stays the same. Trending cards now already link via ItemCard above.
          If you want Trending section cards to link too, I can convert them to <Link> the same way. */}
      {/* ...keep your Categories / Trending / Newsletter / FAQ / Footer as-is... */}
      {/* (No behavioral changes needed beyond ItemCard + unified index.) */}
      <section id="categories" className="mx-auto max-w-6xl px-4 pb-10">
        {/* unchanged from your version */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Browse by intent</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Tools, prompts, updates. The internet’s favorite three things.
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-2 flex-wrap">
          {categories.map((c) => (
            <Button
              key={c.key}
              variant={activeCategory === c.key ? "default" : "outline"}
              className="rounded-2xl"
              onClick={() => setActiveCategory(c.key)}
            >
              <c.icon className="h-4 w-4 mr-2" /> {c.label}
            </Button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl shadow-sm md:col-span-2">
            <CardHeader className="border-b">
              <CardTitle className="text-base">{active?.label} playbook</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground">{active?.blurb}</div>
              <div className="mt-4 flex gap-2 flex-wrap">
                {active?.bullets?.map((b) => (
                  <Badge key={b} variant="outline" className="rounded-full">
                    {b}
                  </Badge>
                ))}
              </div>

              <Separator className="my-5" />
              <div className="font-medium">Top picks</div>
            <div className="mt-3 space-y-3">
              {activeCategoryItems.map((it) => (
                <ItemCard key={`${it.kind}-${it.id}`} item={it} />
              ))}
            </div>

            <Separator className="my-5" />


              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border p-4">
                  <div className="font-medium">Make it rank</div>
                  <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>One keyword per page (title + H1)</li>
                    <li>FAQ block for long-tail queries</li>
                    <li>Internal links: tools → collections → tools</li>
                    <li>Schema: Article, FAQ, Breadcrumb</li>
                  </ul>
                </div>
                <div className="rounded-2xl border p-4">
                  <div className="font-medium">Make it shareable</div>
                  <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Prompt packs users can copy</li>
                    <li>Saveable checklists</li>
                    <li>Weekly “best of” roundups</li>
                    <li>One-liner summaries for social</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="border-b">
              <CardTitle className="text-base">Content model (locked)</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="rounded-2xl border p-4">
                <div className="font-medium">1) Tool page</div>
                <div className="text-sm text-muted-foreground mt-1">
                  What it does, use-cases, pros/cons, pricing, alternatives, tags.
                </div>
              </div>
              <div className="rounded-2xl border p-4">
                <div className="font-medium">2) Prompt page</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Copy prompt, variations, compatibility, tags.
                </div>
              </div>
              <div className="rounded-2xl border p-4">
                <div className="font-medium">3) Model update page</div>
                <div className="text-sm text-muted-foreground mt-1">
                  What changed, who it affects, what to do now, TL;DR.
                </div>
              </div>
              <div className="rounded-2xl border p-4">
                <div className="font-medium">4) Collection page</div>
                <div className="text-sm text-muted-foreground mt-1">
                  A ranked list of tools/prompts/updates with a clear audience.
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                This is the part that prevents your site from becoming a random blog.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
<section id="trending" className="mx-auto max-w-6xl px-4 py-10">
  <div className="flex items-end justify-between gap-4 flex-wrap">
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Trending now</h2>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        These are getting saved, shared, and bookmarked. Which is how the internet quietly votes.
      </p>
    </div>
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="rounded-full">Tool lists</Badge>
      <Badge variant="secondary" className="rounded-full">Prompts</Badge>
      <Badge variant="secondary" className="rounded-full">Model updates</Badge>
    </div>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2">
    {trending.map((it) => {
      const href = hrefFor(it.kind, it.slug);

      return (
        <Link
          key={`${it.kind}-${it.id}`}
          href={href}
          className="block focus:outline-none"
          aria-label={`Open ${itemTypeMeta[it.kind].label}: ${it.title}`}
        >
          <Card className="rounded-2xl shadow-sm hover:bg-muted/40 transition">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full">
                      {itemTypeMeta[it.kind].label}
                    </Badge>
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                      <Timer className="h-3.5 w-3.5" /> {it.minutes} min
                    </span>
                    <Badge variant="secondary" className="rounded-full">
                      {freshnessLabel(it.updatedAtISO)}
                    </Badge>
                  </div>

                  <div className="mt-2 text-lg font-semibold leading-snug">{it.title}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{it.subtitle}</div>
                </div>

                {/* Make the button navigate without doing weird nested-link stuff */}
                <Button
                  className="rounded-2xl"
                  variant="outline"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Read</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      );
    })}
  </div>
</section>

      {/* Keep your remaining sections (Trending/Newsletter/FAQ/Footer) unchanged */}
      {/* You can also convert Trending section cards to Link if you want them clickable too. */}
    </div>
  );
}
