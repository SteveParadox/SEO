"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Flame,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  LineChart,
  Cpu,
  Globe,
  Timer,
  Copy,
  Wrench,
  Trophy,
  ChevronDown,
  Star,
  Zap,
} from "lucide-react";
import { Scale } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RecentlyViewed } from "@/components/recently-viewed";

import { DATA } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const { tools, prompts, updates, collections, comparisons } = DATA;

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
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground hover:bg-muted/50 transition-colors cursor-default"
    >
      {Icon ? <Icon className="h-3.5 w-3.5 mr-1" /> : null}
      {children}
    </motion.span>
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

function ItemCard({ item, index = 0 }: { item: IndexItem; index?: number }) {
  const meta = itemTypeMeta[item.kind];
  const Icon = meta.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link
        href={hrefFor(item.kind, item.slug)}
        className="block rounded-2xl border p-4 hover:bg-muted/40 hover:shadow-md transition-all"
        aria-label={`Open ${meta.label}: ${item.title}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
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
            <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {item.subtitle}
            </div>
          </div>

          <motion.div animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground" aria-hidden="true" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ToolDropAI() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("tools");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const unifiedIndex = useMemo<IndexItem[]>(() => {
    const idx: IndexItem[] = [];

    tools.forEach((t) =>
      idx.push({
        kind: "tool",
        id: t.id,
        slug: t.slug,
        title: t.name,
        subtitle: t.oneLiner,
        typeTag: (t.tags[0] || "tool").toUpperCase(),
        minutes: 6,
        updatedAtISO: t.updatedAtISO,
      })
    );

    prompts.forEach((p) =>
      idx.push({
        kind: "prompt",
        id: p.id,
        slug: p.slug,
        title: p.title,
        subtitle: p.purpose,
        typeTag: (p.tags[0] || "prompt").toUpperCase(),
        minutes: 5,
        updatedAtISO: p.updatedAtISO,
      })
    );

    updates.forEach((u) =>
      idx.push({
        kind: "update",
        id: u.id,
        slug: u.slug,
        title: u.headline,
        subtitle: u.tldr,
        typeTag: u.model.toUpperCase(),
        minutes: 4,
        updatedAtISO: u.updatedAtISO,
      })
    );

    collections.forEach((c) =>
      idx.push({
        kind: "collection",
        id: c.id,
        slug: c.slug,
        title: c.title,
        subtitle: c.description,
        typeTag: "COLLECTION",
        minutes: 7,
        updatedAtISO: c.updatedAtISO,
      })
    );

    comparisons.forEach((c) =>
      idx.push({
        kind: "comparison",
        id: c.id,
        slug: c.slug,
        title: c.title,
        subtitle: c.description,
        typeTag: "VS",
        minutes: 6,
        updatedAtISO: c.updatedAtISO,
      })
    );

    idx.sort((a, b) => new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime());
    return idx;
  }, []);

  const featuredCollections = useMemo(() => collections.slice(0, 4), []);

  const activeCategoryItems = useMemo(() => {
    if (activeCategory === "tools") return unifiedIndex.filter((x) => x.kind === "tool").slice(0, 6);
    if (activeCategory === "prompts") return unifiedIndex.filter((x) => x.kind === "prompt").slice(0, 6);
    if (activeCategory === "updates") return unifiedIndex.filter((x) => x.kind === "update").slice(0, 6);
    if (activeCategory === "compare") return unifiedIndex.filter((x) => x.kind === "comparison").slice(0, 6);
    return unifiedIndex.slice(0, 6);
  }, [activeCategory, unifiedIndex]);

  const categories = useMemo(
    () => [
      {
        key: "tools",
        label: "AI Tools",
        icon: Cpu,
        blurb: "Discover powerful AI tools. Vetted and categorized for speed.",
        bullets: ["Free resources", "Latest releases", "Hidden gems"],
      },
      {
        key: "prompts",
        label: "Prompts",
        icon: BookOpen,
        blurb: "Production-ready prompts engineered to improve output quality.",
        bullets: ["Top-rated prompts", "Curated collections", "Advanced techniques"],
      },
      {
        key: "updates",
        label: "Model Updates",
        icon: TrendingUp,
        blurb: "Track changes in GPT, Claude, Gemini, and others with clear explanations.",
        bullets: ["Change summaries", "Impact analysis", "Practical implications"],
      },
      {
        key: "compare",
        label: "Comparisons",
        icon: LineChart,
        blurb: "Side-by-side comparisons highlighting strengths and ideal use cases.",
        bullets: ["Chat models", "Image generators", "Writing assistants"],
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Why visit ToolDrop AI regularly?",
        a: "The AI landscape evolves rapidly. ToolDrop AI filters noise to surface tools, updates, and resources worth your time.",
      },
      {
        q: "What is your curation criteria?",
        a: "We feature tools and resources that are newly released, clearly useful, or showing meaningful traction.",
      },
      {
        q: "Who is ToolDrop AI designed for?",
        a: "Both newcomers discovering AI tools and experienced builders tracking what’s changing.",
      },
    ],
    []
  );

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
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-6">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <div className="flex flex-wrap gap-2 mb-4">
            <Pill icon={Flame}>Daily updates</Pill>
            <Pill icon={ShieldCheck}>Curated for quality</Pill>
            <Pill icon={Globe}>Signal over noise</Pill>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">What changed in AI today?</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Discover vetted AI tools, effective prompts, and significant model updates. We filter the noise so you can
            focus on what matters.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button className="rounded-2xl group" asChild>
              <Link href="/trending" className="inline-flex items-center">
                Explore trending
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>

            <Button variant="outline" className="rounded-2xl" asChild>
              <Link href="/search">Search everything</Link>
            </Button>

            <Button variant="outline" className="rounded-2xl" asChild>
              <a href="#categories">Browse categories</a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerChildren}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          <motion.div variants={fadeUp}>
            <Card className="rounded-2xl shadow-sm border-l-4 border-l-primary hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold leading-tight">Fast Discover</div>
                    <div className="text-sm text-muted-foreground">Browse curated tools & resources</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="rounded-2xl shadow-sm border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-green-500/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold leading-tight">Daily Fresh</div>
                    <div className="text-sm text-muted-foreground">New content every day</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="rounded-2xl shadow-sm border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold leading-tight">Curated</div>
                    <div className="text-sm text-muted-foreground">Quality over quantity</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Collections (kept, moved up since Search is gone) */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-base flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" /> Featured collections
              </span>
              <Link href="/collections" className="text-sm underline underline-offset-4">
                Browse all
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {featuredCollections.map((c, idx) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    href={hrefFor("collection", c.slug)}
                    className="block rounded-2xl border p-4 hover:bg-muted/40 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Badge variant="outline" className="rounded-full">
                            Collection
                          </Badge>
                          <Badge variant="secondary" className="rounded-full">
                            {freshnessLabel(c.updatedAtISO)}
                          </Badge>
                        </div>
                        <div className="font-medium leading-snug">{c.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {c.description}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-6xl px-4 pb-8">
        <div className="mb-5">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Explore by Category</h2>
          <p className="mt-2 text-muted-foreground">
            Browse AI tools, prompts, model updates, and comparison guides.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap mb-5">
          {categories.map((c) => (
            <motion.div key={c.key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={activeCategory === c.key ? "default" : "outline"}
                className="rounded-2xl"
                onClick={() => setActiveCategory(c.key)}
              >
                <c.icon className="h-4 w-4 mr-2" /> {c.label}
              </Button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="border-b">
                <CardTitle className="text-base flex items-center gap-2">
                  {active && <active.icon className="h-4 w-4" />}
                  {active?.label}
                </CardTitle>
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

                <div className="space-y-3">
                  {activeCategoryItems.map((it, idx) => (
                    <ItemCard key={`${it.kind}-${it.id}`} item={it} index={idx} />
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  {activeCategory === "tools" ? (
                    <Link className="underline underline-offset-4" href="/tools">
                      Browse all tools
                    </Link>
                  ) : null}
                  {activeCategory === "prompts" ? (
                    <Link className="underline underline-offset-4" href="/prompts">
                      Browse all prompts
                    </Link>
                  ) : null}
                  {activeCategory === "updates" ? (
                    <Link className="underline underline-offset-4" href="/updates">
                      Browse all updates
                    </Link>
                  ) : null}
                  {activeCategory === "compare" ? (
                    <Link className="underline underline-offset-4" href="/comparisons">
                      Browse all comparisons
                    </Link>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Best Lists (Money Pages) */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="mb-5">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Popular AI Tool Rankings</h2>
          <p className="mt-2 text-muted-foreground">
            Find the right AI tools for your specific use case. Ranked by usefulness with honest assessments of strengths and limitations.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerChildren}
          className="grid gap-4 md:grid-cols-3"
        >
          <motion.div variants={fadeUp}>
            <Link href="/best/best-ai-tools-for-students" className="block rounded-2xl border p-5 hover:bg-muted/40 hover:shadow-lg transition-all h-full">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-sm text-primary font-semibold uppercase">Best For Students</div>
                  <div className="mt-2 font-semibold leading-snug">Best AI Tools for Students</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Research tools, writing helpers, and coding assistants students actually use without academic trouble.
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              </div>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link href="/best/best-ai-tools-for-writing" className="block rounded-2xl border p-5 hover:bg-muted/40 hover:shadow-lg transition-all h-full">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-sm text-primary font-semibold uppercase">Best For Writing</div>
                  <div className="mt-2 font-semibold leading-snug">Best AI Tools for Writing</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Drafting, editing, and clarity tools that help you write better without losing your voice.
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              </div>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link href="/best/best-ai-coding-tools" className="block rounded-2xl border p-5 hover:bg-muted/40 hover:shadow-lg transition-all h-full">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-sm text-primary font-semibold uppercase">Best For Coding</div>
                  <div className="mt-2 font-semibold leading-snug">Best AI Coding Tools for Developers</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Code generation, debugging, and refactoring tools that actually speed up development.
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              </div>
            </Link>
          </motion.div>
        </motion.div>

        <div className="mt-4 text-center">
          <Link href="/best" className="text-sm underline underline-offset-4 hover:text-primary transition-colors">
            Browse all AI tool rankings →
          </Link>
        </div>
      </section>

      {/* Key Comparisons */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="mb-5">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Detailed Comparisons</h2>
          <p className="mt-2 text-muted-foreground">
            Side-by-side breakdowns helping you choose between popular tools. Real-world scenarios, tradeoffs, and recommendations.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerChildren}
          className="grid gap-4 md:grid-cols-3"
        >
          <motion.div variants={fadeUp}>
            <Link href="/comparisons/cursor-vs-vscode-ai-vs-jetbrains-ai" className="block rounded-2xl border p-5 hover:bg-muted/40 hover:shadow-lg transition-all h-full">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Comparison</div>
                  <div className="mt-2 font-semibold leading-snug">Cursor vs VS Code + AI vs JetBrains</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Which AI-enhanced editor actually speeds up shipping without breaking code review.
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              </div>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link href="/comparisons/perplexity-vs-kagi-vs-google" className="block rounded-2xl border p-5 hover:bg-muted/40 hover:shadow-lg transition-all h-full">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Comparison</div>
                  <div className="mt-2 font-semibold leading-snug">Perplexity vs Kagi vs Google</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    AI answers, quality search, and which one actually wins for research-heavy work.
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              </div>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link href="/comparisons/elevenlabs-vs-playht-vs-azure-tts" className="block rounded-2xl border p-5 hover:bg-muted/40 hover:shadow-lg transition-all h-full">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Comparison</div>
                  <div className="mt-2 font-semibold leading-snug">ElevenLabs vs PlayHT vs Azure TTS</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Text-to-speech quality, pricing, and which one delivers natural voices at scale.
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              </div>
            </Link>
          </motion.div>
        </motion.div>

        <div className="mt-4 text-center">
          <Link href="/comparisons" className="text-sm underline underline-offset-4 hover:text-primary transition-colors">
            Browse all detailed comparisons →
          </Link>
        </div>
      </section>

      
      <section id="newsletter" className="mx-auto max-w-6xl px-4 py-8">
        <Card className="rounded-2xl shadow-sm border-2 border-primary/20 bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-8">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Subscribe to weekly updates</h2>
                <p className="mt-3 text-muted-foreground">
                  Get the week's best AI tools, prompts, and updates delivered to your inbox.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!/.+@.+\..+/.test(email)) {
                      setToast("Please enter a valid email address.");
                      return;
                    }
                    setToast("Successfully subscribed! Check your inbox for confirmation.");
                    setEmail("");
                    window.setTimeout(() => setToast(null), 2500);
                  }}
                  className="mt-6 flex flex-col sm:flex-row gap-3"
                >
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

                <AnimatePresence>
                  {toast ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 rounded-2xl border bg-muted/40 p-3 text-sm"
                    >
                      {toast}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card
                className="rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-medium flex-1">{faq.q}</div>
                    <motion.div
                      animate={{ rotate: expandedFAQ === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {expandedFAQ === idx ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 text-sm text-muted-foreground pt-3 border-t">{faq.a}</div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
