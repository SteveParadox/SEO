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
  Dot,
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
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
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

function Pill({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1.5 rounded-full border bg-background/70 backdrop-blur px-3 py-1 text-xs text-muted-foreground hover:bg-muted/40 transition-colors cursor-default"
    >
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
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

function GlowCard({
  children,
  tone = "primary",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "primary" | "green" | "orange" | "neutral";
  className?: string;
}) {
  const ring =
    tone === "primary"
      ? "from-primary/35 via-primary/10 to-transparent"
      : tone === "green"
      ? "from-green-500/35 via-green-500/10 to-transparent"
      : tone === "orange"
      ? "from-orange-500/35 via-orange-500/10 to-transparent"
      : "from-muted/60 via-muted/20 to-transparent";

  return (
    <div className={`relative rounded-3xl ${className}`}>
      <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${ring} blur-sm`} />
      <div className="relative rounded-3xl border bg-background/80 backdrop-blur">
        {children}
      </div>
    </div>
  );
}

function ItemRow({ item }: { item: IndexItem }) {
  const meta = itemTypeMeta[item.kind];
  const Icon = meta.icon;

  return (
    <Link
      href={hrefFor(item.kind, item.slug)}
      className="group block rounded-2xl border bg-background hover:bg-muted/35 transition-colors"
      aria-label={`Open ${meta.label}: ${item.title}`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
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

            <div className="mt-2 font-medium leading-snug truncate">{item.title}</div>
            <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.subtitle}</div>
          </div>

          <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function StatTile({
  title,
  desc,
  icon: Icon,
  tone,
}: {
  title: string;
  desc: string;
  icon: any;
  tone: "primary" | "green" | "orange";
}) {
  const iconBg =
    tone === "primary"
      ? "bg-primary/10 text-primary"
      : tone === "green"
      ? "bg-green-500/10 text-green-500"
      : "bg-orange-500/10 text-orange-500";

  return (
    <GlowCard tone={tone} className="h-full">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${iconBg}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg font-semibold leading-tight">{title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

export default function ToolDropAI() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<"tools" | "prompts" | "updates" | "compare">("tools");
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
  const latestFeed = useMemo(() => unifiedIndex.slice(0, 6), [unifiedIndex]);

  const categories = useMemo(
    () => [
      {
        key: "tools" as const,
        label: "AI Tools",
        icon: Cpu,
        blurb: "Fast, vetted tools. Not 300 fake directories and a prayer.",
        bullets: ["Free resources", "Latest releases", "Hidden gems"],
        to: "/tools",
      },
      {
        key: "prompts" as const,
        label: "Prompts",
        icon: BookOpen,
        blurb: "Prompts you’ll actually reuse, not motivational quotes in disguise.",
        bullets: ["Top-rated prompts", "Curated collections", "Advanced techniques"],
        to: "/prompts",
      },
      {
        key: "updates" as const,
        label: "Model Updates",
        icon: TrendingUp,
        blurb: "What changed, why it matters, and what breaks because of it.",
        bullets: ["Change summaries", "Impact analysis", "Practical implications"],
        to: "/updates",
      },
      {
        key: "compare" as const,
        label: "Comparisons",
        icon: LineChart,
        blurb: "Side-by-side, no fluff. Pick the right model and move on.",
        bullets: ["Chat models", "Image generators", "Writing assistants"],
        to: "/comparisons",
      },
    ],
    []
  );

  const active = categories.find((c) => c.key === activeCategory);

  const categoryItems = useMemo(() => {
    const base =
      activeCategory === "tools"
        ? unifiedIndex.filter((x) => x.kind === "tool")
        : activeCategory === "prompts"
        ? unifiedIndex.filter((x) => x.kind === "prompt")
        : activeCategory === "updates"
        ? unifiedIndex.filter((x) => x.kind === "update")
        : unifiedIndex.filter((x) => x.kind === "comparison");

    // editorial split: 1 hero item + supporting list
    return {
      hero: base[0],
      rest: base.slice(1, 6),
    };
  }, [activeCategory, unifiedIndex]);

  const faqs = useMemo(
    () => [
      {
        q: "Why visit regularly?",
        a: "Because AI changes daily and humans love reinventing the same tool with a new name. This filters the noise.",
      },
      {
        q: "How do you curate?",
        a: "New, clearly useful, or showing real traction. If it’s vague or hype-first, it doesn’t get featured.",
      },
      {
        q: "Who is this for?",
        a: "Builders, students, and working humans who want signal, not a 40-tab research session.",
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-48 -left-24 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      {/* HERO: split + live feed */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8">
        <motion.div initial="hidden" animate="show" variants={staggerChildren} className="grid gap-6 lg:grid-cols-12">
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <div className="flex flex-wrap gap-2 mb-4">
              <Pill icon={Flame}>Daily updates</Pill>
              <Pill icon={ShieldCheck}>Curated for quality</Pill>
              <Pill icon={Globe}>Signal over noise</Pill>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              What changed in AI today?
            </h1>

            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Discover vetted tools, reusable prompts, and model updates that actually matter.
              No noise. No “Top 200 AI Tools” nonsense.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button className="rounded-2xl group" asChild>
                <Link href="/trending" className="inline-flex items-center">
                  Explore trending
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button variant="outline" className="rounded-2xl" asChild>
                <Link href="/search">Search everything</Link>
              </Button>

              <Button variant="outline" className="rounded-2xl" asChild>
                <a href="#explore">Browse categories</a>
              </Button>
            </div>

            {/* micro marquee */}
            <div className="mt-7 rounded-3xl border bg-muted/25 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 text-xs text-muted-foreground">
                <Dot className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">Live:</span>
                <span>new tools, prompts, and model updates rolling in</span>
              </div>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="flex gap-2 whitespace-nowrap px-4 pb-3"
              >
                {[...latestFeed, ...latestFeed].map((it, i) => (
                  <span
                    key={`${it.kind}-${it.id}-${i}`}
                    className="inline-flex items-center gap-1 rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground"
                  >
                    <span className="text-foreground">{itemTypeMeta[it.kind].label}:</span>
                    <span className="truncate max-w-[220px]">{it.title}</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-5">
            <GlowCard tone="primary" className="h-full">
              <CardHeader className="border-b">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Today’s feed
                  </span>
                  <Link href="/updates" className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground">
                    See all
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-3">
                  {latestFeed.map((it) => (
                    <ItemRow key={`${it.kind}-${it.id}`} item={it} />
                  ))}
                </div>
              </CardContent>
            </GlowCard>
          </motion.div>
        </motion.div>
      </section>

      {/* BENTO: stats + featured collections in one interesting grid */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <StatTile
              tone="primary"
              title="Fast Discover"
              desc="Browse curated tools & resources without losing your weekend."
              icon={Zap}
            />
          </div>
          <div className="lg:col-span-4">
            <StatTile
              tone="green"
              title="Daily Fresh"
              desc="New content every day, not “updated 6 months ago.”"
              icon={TrendingUp}
            />
          </div>
          <div className="lg:col-span-4">
            <StatTile
              tone="orange"
              title="Curated"
              desc="Quality over quantity. Shocking concept, I know."
              icon={Star}
            />
          </div>

          <div className="lg:col-span-8">
            <GlowCard tone="neutral" className="h-full">
              <CardHeader className="border-b">
                <CardTitle className="text-base flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4" /> Featured collections
                  </span>
                  <Link href="/collections" className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground">
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
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.06 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Link
                        href={hrefFor("collection", c.slug)}
                        className="block rounded-2xl border p-4 hover:bg-muted/35 hover:shadow-md transition-all"
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
                            <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{c.description}</div>
                          </div>
                          <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </GlowCard>
          </div>

          <div className="lg:col-span-4">
            <GlowCard tone="primary" className="h-full">
              <div className="p-6">
                <div className="text-sm text-muted-foreground">Quick actions</div>
                <div className="mt-2 text-lg font-semibold">Go from browsing to building</div>
                <div className="mt-4 grid gap-3">
                  <Button className="rounded-2xl justify-between" asChild>
                    <Link href="/tools">
                      Browse tools <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="rounded-2xl justify-between" asChild>
                    <Link href="/prompts">
                      Browse prompts <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="rounded-2xl justify-between" asChild>
                    <Link href="/updates">
                      Model updates <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-5 text-xs text-muted-foreground">
                  Pro tip: keep the layout asymmetric. Symmetry screams “template.”
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* EXPLORE: side tabs + editorial layout */}
      <section id="explore" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Explore by Category</h2>
          <p className="mt-2 text-muted-foreground">Pick a lane. Get the best of it, fast.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* left rail */}
          <div className="lg:col-span-4">
            <GlowCard tone="neutral">
              <div className="p-4">
                <div className="grid gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setActiveCategory(c.key)}
                      className={[
                        "w-full text-left rounded-2xl border px-4 py-3 transition-colors",
                        activeCategory === c.key ? "bg-muted/40 border-primary/30" : "hover:bg-muted/30",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <c.icon className="h-4 w-4" />
                          <span className="font-medium">{c.label}</span>
                        </div>
                        <ChevronDown
                          className={[
                            "h-4 w-4 text-muted-foreground transition-transform",
                            activeCategory === c.key ? "rotate-180" : "rotate-0",
                          ].join(" ")}
                        />
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{c.blurb}</div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {c.bullets.map((b) => (
                          <Badge key={b} variant="outline" className="rounded-full text-[11px]">
                            {b}
                          </Badge>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </GlowCard>
          </div>

          {/* content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* hero item */}
                {categoryItems.hero ? (
                  <GlowCard tone="primary">
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          {active && <active.icon className="h-4 w-4 text-primary" />}
                          <span className="font-semibold">{active?.label}</span>
                          <span className="text-muted-foreground">• spotlight</span>
                        </div>
                        <Link
                          href={active?.to || "/"}
                          className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
                        >
                          Browse all
                        </Link>
                      </div>

                      <Separator className="my-4" />

                      <Link
                        href={hrefFor(categoryItems.hero.kind, categoryItems.hero.slug)}
                        className="group block rounded-2xl border p-5 hover:bg-muted/35 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              <Badge variant="outline" className="rounded-full">
                                {itemTypeMeta[categoryItems.hero.kind].label}
                              </Badge>
                              <Badge variant="secondary" className="rounded-full">
                                {freshnessLabel(categoryItems.hero.updatedAtISO)}
                              </Badge>
                              <span className="inline-flex items-center gap-1">
                                <Timer className="h-3.5 w-3.5" /> {categoryItems.hero.minutes} min
                              </span>
                            </div>
                            <div className="mt-2 text-xl font-semibold leading-snug">
                              {categoryItems.hero.title}
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                              {categoryItems.hero.subtitle}
                            </div>
                          </div>
                          <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </GlowCard>
                ) : null}

                {/* supporting list */}
                <div className="grid gap-3">
                  {categoryItems.rest.map((it) => (
                    <ItemRow key={`${it.kind}-${it.id}`} item={it} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <RecentlyViewed limit={6} />

      {/* Newsletter */}
      <section id="newsletter" className="mx-auto max-w-6xl px-4 py-10">
        <GlowCard tone="primary">
          <CardContent className="p-8">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div initial={{ scale: 0.96, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Subscribe to weekly updates</h2>
                <p className="mt-3 text-muted-foreground">
                  Get the week’s best AI tools, prompts, and updates delivered to your inbox.
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
        </GlowCard>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card
                className="rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-medium flex-1">{faq.q}</div>
                    <motion.div animate={{ rotate: expandedFAQ === idx ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {expandedFAQ === idx ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
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
