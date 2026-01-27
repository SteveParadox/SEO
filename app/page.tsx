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
  Trophy,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RecentlyViewed } from "@/components/recently-viewed";

import { DATA } from "@/lib/data";
import { Scale } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const { tools, prompts, updates, collections, comparisons, bestPages } = DATA;

const itemTypeMeta = {
  tool: { label: "Tool", icon: Wrench },
  prompt: { label: "Prompt", icon: Copy },
  update: { label: "Update", icon: TrendingUp },
  collection: { label: "Collection", icon: BadgeCheck },
  comparison: { label: "Comparison", icon: Scale },
  best: { label: "Best List", icon: Trophy },
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
  if (kind === "best") return `/best/${slug}`;
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
          "Discover new, trending, and powerful AI tools. Vetted and categorized for efficiency.",
        bullets: ["Free resources", "Latest releases", "Hidden gems"],
      },
      {
        key: "prompts",
        label: "Prompts",
        icon: BookOpen,
        blurb:
          "Production-ready prompts engineered to improve AI output quality and consistency.",
        bullets: ["Top-rated prompts", "Curated collections", "Advanced techniques"],
      },
      {
        key: "updates",
        label: "Model Updates",
        icon: TrendingUp,
        blurb:
          "Track changes in GPT, Claude, Gemini, and other leading models with clear explanations.",
        bullets: ["Change summaries", "Impact analysis", "Practical implications"],
      },
      {
        key: "compare",
        label: "Comparisons",
        icon: LineChart,
        blurb: "Side-by-side comparisons highlighting strengths, limitations, and use cases.",
        bullets: ["Chat models", "Image generators", "Writing assistants"],
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Why visit ToolDrop AI regularly?",
        a: "The AI landscape evolves rapidly. ToolDrop AI filters industry noise to surface tools, updates, and resources that deserve your attention.",
      },
      {
        q: "What is your curation criteria?",
        a: "We feature tools and resources that are newly released, demonstrate clear utility, or show significant traction in the community.",
      },
      {
        q: "Who is ToolDrop AI designed for?",
        a: "ToolDrop AI serves both newcomers discovering AI tools and experienced practitioners seeking the latest developments.",
      },
    ],
    []
  );

  const trending = useMemo(() => unifiedIndex.slice(0, 6), [unifiedIndex]);

  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) {
      setToast("Please enter a valid email address.");
      return;
    }
    setToast("Successfully subscribed! Check your inbox for confirmation.");
    setEmail("");
    window.setTimeout(() => setToast(null), 2500);
  }

  const active = categories.find((c) => c.key === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
  

      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <div className="flex flex-wrap gap-2 mb-4">
            <Pill icon={Flame}>Daily updates</Pill>
            <Pill icon={ShieldCheck}>Curated for quality</Pill>
            <Pill icon={Globe}>Signal over noise</Pill>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            What changed in AI today?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Discover vetted AI tools, effective prompts, and significant model updates. 
            We filter the noise so you can focus on what matters.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button className="rounded-2xl" asChild>
              <a href="#trending" className="inline-flex items-center">
                Explore trending tools <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button variant="outline" className="rounded-2xl" asChild>
              <a href="#categories">Browse all categories</a>
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
                    <div className="text-2xl font-semibold leading-tight">Comprehensive Search</div>
                    <div className="text-sm text-muted-foreground">
                      Quickly find tools, prompts, and comparisons with intelligent search.
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
                    <div className="text-2xl font-semibold leading-tight">Stay Informed</div>
                    <div className="text-sm text-muted-foreground">
                      Weekly digest and daily updates delivered to keep you informed.
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
                placeholder="Search tools, prompts, updates, or comparisons..."
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
                  No results found. Try different keywords or browse our categories below.
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
                  <div className="font-medium">Why ToolDrop AI</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Daily updates keep content fresh. Curated collections provide immediate value. 
                    Weekly digests ensure you never miss important developments.
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="flex items-end justify-between gap-3 flex-wrap">
              <div>
                <div className="font-medium">Featured collections</div>
                <div className="text-sm text-muted-foreground">
                  Hand-picked collections of tools and resources for specific use cases.
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

      <section id="categories" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Explore by Category</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Browse AI tools, prompts, model updates, and comparison guides.
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
          <Card className="rounded-2xl shadow-sm md:col-span-3">
            <CardHeader className="border-b">
              <CardTitle className="text-base">{active?.label}</CardTitle>
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
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="trending" className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Trending now</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Most popular resources based on user engagement, shares, and bookmarks.
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

                      <Button
                        className="rounded-2xl"
                        variant="outline"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>View details</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
<RecentlyViewed limit={6} />
      <section id="newsletter" className="mx-auto max-w-6xl px-4 py-10">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Subscribe to weekly updates
              </h2>
              <p className="mt-3 text-muted-foreground">
                Get the week's best AI tools, prompts, and updates delivered to your inbox.
              </p>

              <form onSubmit={subscribe} className="mt-6 flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-2xl flex-1"
                />
                <Button type="submit" className="rounded-2xl">
                  Subscribe
                </Button>
              </form>

              {toast && (
                <div className="mt-4 rounded-2xl border bg-muted/40 p-3 text-sm">
                  {toast}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="faq" className="mx-auto max-w-6xl px-4 py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.q} className="rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <div className="font-medium">{faq.q}</div>
                <div className="mt-2 text-sm text-muted-foreground">{faq.a}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}
// What changed in AI today?