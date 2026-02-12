"use client";

import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  Menu,
  X,
} from "lucide-react";
import { Scale } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RecentlyViewed } from "@/components/recently-viewed";

import { DATA } from "@/lib/data";

// ─── Motion variants ──────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── Shared sub-components ────────────────────────────────────────────────────

function Pill({
  icon: Icon,
  children,
}: {
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border bg-background/70 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
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
    <div className={`relative rounded-2xl sm:rounded-3xl ${className}`}>
      <div
        className={`absolute -inset-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-br ${ring} blur-sm`}
        aria-hidden="true"
      />
      <div className="relative rounded-2xl sm:rounded-3xl border bg-background/80 backdrop-blur">
        {children}
      </div>
    </div>
  );
}

/** Touch-friendly row – min 48px tap target */
function ItemRow({ item }: { item: IndexItem }) {
  const meta = itemTypeMeta[item.kind];
  const Icon = meta.icon;

  return (
    <Link
      href={hrefFor(item.kind, item.slug)}
      className="group block rounded-xl sm:rounded-2xl border bg-background active:bg-muted/60 hover:bg-muted/35 transition-colors"
      aria-label={`Open ${meta.label}: ${item.title}`}
    >
      {/* min-height ensures 48px tap target */}
      <div className="p-3 sm:p-4 min-h-[56px] flex items-start">
        <div className="flex items-start justify-between gap-2 w-full">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="rounded-full text-[10px] sm:text-xs px-1.5 py-0">
                {meta.label}
              </Badge>
              <span className="inline-flex items-center gap-1 leading-none">
                <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate max-w-[80px] sm:max-w-none">{item.typeTag}</span>
              </span>
              <Badge
                variant="secondary"
                className="rounded-full text-[10px] sm:text-xs px-1.5 py-0"
              >
                {freshnessLabel(item.updatedAtISO)}
              </Badge>
              {/* Hide read-time on smallest screens */}
              <span className="hidden xs:inline-flex items-center gap-1 leading-none">
                <Timer className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" aria-hidden="true" />
                {item.minutes} min
              </span>
            </div>
            <div className="mt-1.5 font-medium leading-snug line-clamp-1 text-sm sm:text-base">
              {item.title}
            </div>
            <div className="mt-0.5 text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {item.subtitle}
            </div>
          </div>
          <ArrowRight
            className="h-4 w-4 mt-1 shrink-0 text-muted-foreground group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          />
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
  icon: React.ElementType;
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
      <div className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className={`h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center ${iconBg}`}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="text-base sm:text-lg font-semibold leading-tight">{title}</div>
            <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{desc}</div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

// ─── Horizontal scroll marquee (pauses on reduced-motion) ─────────────────────

function LiveMarquee({ items }: { items: IndexItem[] }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-3">
        {items.slice(0, 6).map((it) => (
          <span
            key={`${it.kind}-${it.id}`}
            className="inline-flex shrink-0 items-center gap-1 rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="text-foreground">{itemTypeMeta[it.kind].label}:</span>
            <span className="truncate max-w-[180px]">{it.title}</span>
          </span>
        ))}
      </div>
    );
  }

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex gap-2 whitespace-nowrap px-4 pb-3"
      >
        {doubled.map((it, i) => (
          <span
            key={`${it.kind}-${it.id}-${i}`}
            className="inline-flex shrink-0 items-center gap-1 rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="text-foreground">{itemTypeMeta[it.kind].label}:</span>
            <span className="truncate max-w-[180px] sm:max-w-[220px]">{it.title}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Category tabs (horizontal scroll on mobile, sidebar on desktop) ──────────

type CategoryKey = "tools" | "prompts" | "updates" | "compare";

const CATEGORIES = [
  {
    key: "tools" as CategoryKey,
    label: "AI Tools",
    icon: Cpu,
    blurb: "Fast, vetted tools. Not 300 fake directories and a prayer.",
    bullets: ["Free resources", "Latest releases", "Hidden gems"],
    to: "/tools",
  },
  {
    key: "prompts" as CategoryKey,
    label: "Prompts",
    icon: BookOpen,
    blurb: "Prompts you'll actually reuse, not motivational quotes in disguise.",
    bullets: ["Top-rated prompts", "Curated collections", "Advanced techniques"],
    to: "/prompts",
  },
  {
    key: "updates" as CategoryKey,
    label: "Model Updates",
    icon: TrendingUp,
    blurb: "What changed, why it matters, and what breaks because of it.",
    bullets: ["Change summaries", "Impact analysis", "Practical implications"],
    to: "/updates",
  },
  {
    key: "compare" as CategoryKey,
    label: "Comparisons",
    icon: LineChart,
    blurb: "Side-by-side, no fluff. Pick the right model and move on.",
    bullets: ["Chat models", "Image generators", "Writing assistants"],
    to: "/comparisons",
  },
] as const;

// ─── Main component ───────────────────────────────────────────────────────────

export default function ToolDropAI() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("tools");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Scroll active tab into view on mobile
  useEffect(() => {
    const el = tabsRef.current?.querySelector(`[data-active="true"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeCategory]);

  // ── Data ──

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

  const active = CATEGORIES.find((c) => c.key === activeCategory)!;

  const categoryItems = useMemo(() => {
    const base =
      activeCategory === "tools"
        ? unifiedIndex.filter((x) => x.kind === "tool")
        : activeCategory === "prompts"
        ? unifiedIndex.filter((x) => x.kind === "prompt")
        : activeCategory === "updates"
        ? unifiedIndex.filter((x) => x.kind === "update")
        : unifiedIndex.filter((x) => x.kind === "comparison");

    return { hero: base[0], rest: base.slice(1, 6) };
  }, [activeCategory, unifiedIndex]);

  const faqs = [
    {
      q: "Why visit regularly?",
      a: "Because AI changes daily and humans love reinventing the same tool with a new name. This filters the noise.",
    },
    {
      q: "How do you curate?",
      a: "New, clearly useful, or showing real traction. If it's vague or hype-first, it doesn't get featured.",
    },
    {
      q: "Who is this for?",
      a: "Builders, students, and working humans who want signal, not a 40-tab research session.",
    },
  ];

  const subscribe = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!/.+@.+\..+/.test(email)) {
        setToast("Please enter a valid email address.");
        setTimeout(() => setToast(null), 2500);
        return;
      }
      setToast("Successfully subscribed! Check your inbox for confirmation.");
      setEmail("");
      setTimeout(() => setToast(null), 2500);
    },
    [email]
  );

  const toggleFAQ = useCallback(
    (idx: number) => setExpandedFAQ((prev) => (prev === idx ? null : idx)),
    []
  );

  // ── Render ──

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Background accents (hidden on reduced-motion) ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 motion-safe:block hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-48 -left-24 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          HERO
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:pt-12 pb-6 sm:pb-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerChildren}
          className="grid gap-6 lg:grid-cols-12"
        >
          {/* Left: headline + CTAs */}
          <motion.div variants={fadeUp} className="lg:col-span-7">
            {/* Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Pill icon={Flame}>Daily updates</Pill>
              <Pill icon={ShieldCheck}>Curated for quality</Pill>
              <Pill icon={Globe}>Signal over noise</Pill>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              What changed in AI today?
            </h1>

            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-xl">
              Discover vetted tools, reusable prompts, and model updates that actually matter.
              No noise. No "Top 200 AI Tools" nonsense.
            </p>

            {/* CTA row – stacks to single col on mobile */}
            <div className="mt-5 sm:mt-6 grid grid-cols-1 xs:grid-cols-3 gap-2 sm:flex sm:flex-row sm:gap-3">
              <Button className="rounded-2xl group w-full sm:w-auto h-11 sm:h-10 text-sm" asChild>
                <Link href="/trending" className="inline-flex items-center justify-center gap-2">
                  Explore trending
                  <ArrowRight
                    className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl w-full sm:w-auto h-11 sm:h-10 text-sm"
                asChild
              >
                <Link href="/search">Search everything</Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl w-full sm:w-auto h-11 sm:h-10 text-sm"
                asChild
              >
                <a href="#explore">Browse categories</a>
              </Button>
            </div>

            {/* Live marquee strip */}
            <div className="mt-6 rounded-2xl sm:rounded-3xl border bg-muted/25 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 text-xs text-muted-foreground border-b">
                <Dot className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <span className="font-medium text-foreground">Live:</span>
                <span>new tools, prompts, and model updates rolling in</span>
              </div>
              <LiveMarquee items={latestFeed} />
            </div>
          </motion.div>

          {/* Right: today's feed card */}
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <GlowCard tone="primary" className="h-full">
              <CardHeader className="border-b px-4 sm:px-6 py-3 sm:py-4">
                <CardTitle className="text-sm sm:text-base flex items-center justify-between">
                  <span className="inline-flex items-center gap-2">
                    <Sparkles
                      className="h-4 w-4 text-primary shrink-0"
                      aria-hidden="true"
                    />
                    Today's feed
                  </span>
                  <Link
                    href="/updates"
                    className="text-xs sm:text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
                  >
                    See all
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-5">
                <div className="space-y-2 sm:space-y-3">
                  {latestFeed.map((it) => (
                    <ItemRow key={`${it.kind}-${it.id}`} item={it} />
                  ))}
                </div>
              </CardContent>
            </GlowCard>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          BENTO – stats + featured collections
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:pb-10">
        {/* Stat tiles – 1 col mobile, 3 col md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <StatTile
            tone="primary"
            title="Fast Discover"
            desc="Browse curated tools & resources without losing your weekend."
            icon={Zap}
          />
          <StatTile
            tone="green"
            title="Daily Fresh"
            desc={`New content every day, not "updated 6 months ago."`}
            icon={TrendingUp}
          />
          <StatTile
            tone="orange"
            title="Curated"
            desc="Quality over quantity. Shocking concept, I know."
            icon={Star}
          />
        </div>

        {/* Featured collections + quick actions */}
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <GlowCard tone="neutral" className="h-full">
              <CardHeader className="border-b px-4 sm:px-6 py-3 sm:py-4">
                <CardTitle className="text-sm sm:text-base flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Featured collections
                  </span>
                  <Link
                    href="/collections"
                    className="text-xs sm:text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
                  >
                    Browse all
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-5">
                {/* 1-col on mobile, 2-col on sm+ */}
                <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
                  {featuredCollections.map((c, idx) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.06 }}
                    >
                      <Link
                        href={hrefFor("collection", c.slug)}
                        className="block rounded-xl sm:rounded-2xl border p-3 sm:p-4 active:bg-muted/60 hover:bg-muted/35 hover:shadow-md transition-all"
                        aria-label={`Open collection: ${c.title}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                              <Badge
                                variant="outline"
                                className="rounded-full text-[10px] sm:text-xs px-1.5 py-0"
                              >
                                Collection
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="rounded-full text-[10px] sm:text-xs px-1.5 py-0"
                              >
                                {freshnessLabel(c.updatedAtISO)}
                              </Badge>
                            </div>
                            <div className="font-medium leading-snug text-sm sm:text-base line-clamp-1">
                              {c.title}
                            </div>
                            <div className="mt-0.5 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                              {c.description}
                            </div>
                          </div>
                          <ArrowRight
                            className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0"
                            aria-hidden="true"
                          />
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
              <div className="p-4 sm:p-6">
                <div className="text-xs sm:text-sm text-muted-foreground">Quick actions</div>
                <div className="mt-1 text-base sm:text-lg font-semibold">
                  Go from browsing to building
                </div>
                <div className="mt-3 sm:mt-4 grid gap-2 sm:gap-3">
                  <Button
                    className="rounded-2xl justify-between h-11 sm:h-10 text-sm"
                    asChild
                  >
                    <Link href="/tools" className="flex items-center justify-between">
                      Browse tools <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-2xl justify-between h-11 sm:h-10 text-sm"
                    asChild
                  >
                    <Link href="/prompts" className="flex items-center justify-between">
                      Browse prompts <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-2xl justify-between h-11 sm:h-10 text-sm"
                    asChild
                  >
                    <Link href="/updates" className="flex items-center justify-between">
                      Model updates <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 text-xs text-muted-foreground hidden sm:block">
                  Pro tip: keep the layout asymmetric. Symmetry screams "template."
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          EXPLORE – horizontal tab strip on mobile, sidebar on desktop
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="explore" className="mx-auto max-w-6xl px-4 pb-8 sm:pb-10">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
            Explore by Category
          </h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
            Pick a lane. Get the best of it, fast.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* ── Mobile: scrollable chip strip ── */}
          <div className="lg:hidden">
            <div
              ref={tabsRef}
              role="tablist"
              aria-label="Browse categories"
              className="flex gap-2 overflow-x-auto no-scrollbar pb-1"
            >
              {CATEGORIES.map((c) => {
                const isActive = activeCategory === c.key;
                return (
                  <button
                    key={c.key}
                    role="tab"
                    aria-selected={isActive}
                    data-active={isActive}
                    onClick={() => setActiveCategory(c.key)}
                    className={[
                      "shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors h-10",
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground hover:bg-muted/40",
                    ].join(" ")}
                  >
                    <c.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Desktop: left rail ── */}
          <div className="hidden lg:block lg:col-span-4">
            <GlowCard tone="neutral">
              <div className="p-4">
                <div className="grid gap-2" role="tablist" aria-label="Browse categories">
                  {CATEGORIES.map((c) => {
                    const isActive = activeCategory === c.key;
                    return (
                      <button
                        key={c.key}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveCategory(c.key)}
                        className={[
                          "w-full text-left rounded-2xl border px-4 py-3 transition-colors",
                          isActive
                            ? "bg-muted/40 border-primary/30"
                            : "hover:bg-muted/30",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <c.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span className="font-medium">{c.label}</span>
                          </div>
                          <ChevronDown
                            className={[
                              "h-4 w-4 text-muted-foreground transition-transform",
                              isActive ? "rotate-180" : "rotate-0",
                            ].join(" ")}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{c.blurb}</div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {c.bullets.map((b) => (
                            <Badge
                              key={b}
                              variant="outline"
                              className="rounded-full text-[11px]"
                            >
                              {b}
                            </Badge>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </GlowCard>
          </div>

          {/* ── Content panel (full width on mobile, 8/12 on desktop) ── */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="space-y-3"
                role="tabpanel"
                aria-label={`${active.label} content`}
              >
                {/* Hero item */}
                {categoryItems.hero && (
                  <GlowCard tone="primary">
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <active.icon
                            className="h-4 w-4 text-primary shrink-0"
                            aria-hidden="true"
                          />
                          <span className="font-semibold">{active.label}</span>
                          <span className="text-muted-foreground hidden xs:inline">
                            • spotlight
                          </span>
                        </div>
                        <Link
                          href={active.to}
                          className="text-xs sm:text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
                        >
                          Browse all
                        </Link>
                      </div>

                      <Separator className="my-3 sm:my-4" />

                      <Link
                        href={hrefFor(categoryItems.hero.kind, categoryItems.hero.slug)}
                        className="group block rounded-xl sm:rounded-2xl border p-3 sm:p-5 active:bg-muted/60 hover:bg-muted/35 transition-colors"
                        aria-label={`Open ${categoryItems.hero.title}`}
                      >
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                              <Badge
                                variant="outline"
                                className="rounded-full text-[10px] sm:text-xs px-1.5 py-0"
                              >
                                {itemTypeMeta[categoryItems.hero.kind].label}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="rounded-full text-[10px] sm:text-xs px-1.5 py-0"
                              >
                                {freshnessLabel(categoryItems.hero.updatedAtISO)}
                              </Badge>
                              <span className="inline-flex items-center gap-1 leading-none">
                                <Timer className="h-3 w-3 shrink-0" aria-hidden="true" />
                                {categoryItems.hero.minutes} min
                              </span>
                            </div>
                            <div className="mt-1.5 text-base sm:text-xl font-semibold leading-snug line-clamp-2">
                              {categoryItems.hero.title}
                            </div>
                            <div className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                              {categoryItems.hero.subtitle}
                            </div>
                          </div>
                          <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center">
                            <ArrowRight
                              className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:translate-x-1 transition-transform"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </GlowCard>
                )}

                {/* Supporting list */}
                <div className="grid gap-2 sm:gap-3">
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

      {/* ────────────────────────────────────────────────────────────────────────
          NEWSLETTER
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="newsletter" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <GlowCard tone="primary">
          <CardContent className="p-5 sm:p-8">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center h-11 w-11 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-primary/10 mb-3 sm:mb-4">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" aria-hidden="true" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                  Subscribe to weekly updates
                </h2>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">
                  Get the week's best AI tools, prompts, and updates delivered to your inbox.
                </p>

                <form
                  onSubmit={subscribe}
                  className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3"
                  noValidate
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-2xl flex-1 h-11"
                    autoComplete="email"
                    inputMode="email"
                    aria-label="Email address"
                    required
                  />
                  <Button type="submit" className="rounded-2xl h-11 sm:h-auto">
                    Subscribe
                  </Button>
                </form>

                <AnimatePresence>
                  {toast && (
                    <motion.div
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 rounded-2xl border bg-muted/40 p-3 text-xs sm:text-sm"
                    >
                      {toast}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </CardContent>
        </GlowCard>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          FAQ
      ──────────────────────────────────────────────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-10 sm:pb-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-2 sm:space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card
                className="rounded-xl sm:rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => toggleFAQ(idx)}
              >
                <CardContent className="p-4 sm:p-5">
                  {/* aria: treat as disclosure button */}
                  <button
                    className="flex items-start justify-between gap-3 w-full text-left"
                    aria-expanded={expandedFAQ === idx}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <div className="font-medium flex-1 text-sm sm:text-base">{faq.q}</div>
                    <motion.div
                      animate={{ rotate: expandedFAQ === idx ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      className="shrink-0 mt-0.5"
                    >
                      <ChevronDown
                        className="h-5 w-5 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedFAQ === idx && (
                      <motion.div
                        id={`faq-answer-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 text-xs sm:text-sm text-muted-foreground pt-3 border-t">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
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
