"use client";

import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import type { Variants, Easing } from "framer-motion";

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
  ArrowUpRight,
  ScanLine,
  Radio,
} from "lucide-react";
import { Scale } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RecentlyViewed } from "@/components/recently-viewed";
import { DATA } from "@/lib/data";

// ─── Data ─────────────────────────────────────────────────────────────────────
const { tools, prompts, updates, collections, comparisons } = DATA;

const KIND_META = {
  tool: {
    label: "Tool",
    icon: Wrench,
    accent: "bg-primary",
    text: "text-primary",
  },
  prompt: {
    label: "Prompt",
    icon: Copy,
    accent: "bg-green-500",
    text: "text-green-500",
  },
  update: {
    label: "Update",
    icon: TrendingUp,
    accent: "bg-orange-500",
    text: "text-orange-500",
  },
  collection: {
    label: "Collection",
    icon: BadgeCheck,
    accent: "bg-primary",
    text: "text-primary",
  },
  comparison: {
    label: "Comparison",
    icon: Scale,
    accent: "bg-muted-foreground",
    text: "text-muted-foreground",
  },
  best: {
    label: "Best List",
    icon: Trophy,
    accent: "bg-orange-500",
    text: "text-orange-500",
  },
} as const;

type Kind = keyof typeof KIND_META;

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

type CategoryKey = "tools" | "prompts" | "updates" | "compare";

function daysAgo(iso: string) {
  return Math.max(
    0,
    Math.floor(
      (Date.now() - new Date(iso + "T00:00:00").getTime()) / 86400000
    )
  );
}
function freshnessLabel(iso: string) {
  const d = daysAgo(iso);
  if (d <= 1) return "NEW";
  if (d <= 7) return "THIS WK";
  if (d <= 21) return "RECENT";
  return "EVERGREEN";
}
function hrefFor(kind: Kind, slug: string) {
  if (kind === "tool") return `/tools/${slug}`;
  if (kind === "prompt") return `/prompts/${slug}`;
  if (kind === "update") return `/updates/${slug}`;
  if (kind === "collection") return `/collections/${slug}`;
  if (kind === "best") return `/best/${slug}`;
  return `/comparisons/${slug}`;
}

// ─── Motion (FIXED) ───────────────────────────────────────────────────────────
const EASE_OUT: Easing = [0.22, 1, 0.36, 1];

const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  show: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const slideUp: Variants = {
  hidden: { y: 32, opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: EASE_OUT,
    },
  }),
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    key: "tools" as CategoryKey,
    label: "AI Tools",
    icon: Cpu,
    blurb: "Vetted. Not 300 fake directories.",
    bullets: ["Free", "Latest", "Gems"],
    to: "/tools",
  },
  {
    key: "prompts" as CategoryKey,
    label: "Prompts",
    icon: BookOpen,
    blurb: "Prompts you'll actually reuse.",
    bullets: ["Top-rated", "Collections", "Advanced"],
    to: "/prompts",
  },
  {
    key: "updates" as CategoryKey,
    label: "Model Updates",
    icon: TrendingUp,
    blurb: "What changed & why it matters.",
    bullets: ["Summaries", "Impact", "Implications"],
    to: "/updates",
  },
  {
    key: "compare" as CategoryKey,
    label: "Comparisons",
    icon: LineChart,
    blurb: "Side-by-side. No fluff.",
    bullets: ["Chat models", "Image gen", "Writers"],
    to: "/comparisons",
  },
] as const;

// ─── TICKER ITEM ──────────────────────────────────────────────────────────────
function TickerItem({ item }: { item: IndexItem }) {
  const meta = KIND_META[item.kind];
  return (
    <Link
      href={hrefFor(item.kind, item.slug)}
      className="group flex items-start gap-2 py-3 border-b border-border/40 hover:bg-muted/20 px-3 transition-colors last:border-0"
    >
      <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${meta.accent}`} />
      <div className="min-w-0 flex-1">
        <div
          className={`font-mono text-[9px] uppercase tracking-widest mb-0.5 ${meta.text}`}
        >
          {meta.label}
        </div>
        <div className="text-xs font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </div>
      </div>
    </Link>
  );
}

// ─── SIGNAL CARD (hero-style large card) ─────────────────────────────────────
function SignalCard({ item, index }: { item: IndexItem; index: number }) {
  const meta = KIND_META[item.kind];
  const Icon = meta.icon;
  return (
    <motion.div custom={index} variants={slideUp}>
      <Link
        href={hrefFor(item.kind, item.slug)}
        className="group relative flex flex-col h-full rounded-2xl border bg-background overflow-hidden hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
        aria-label={`${meta.label}: ${item.title}`}
      >
        {/* top accent bar */}
        <div className={`h-0.5 w-full ${meta.accent}`} />
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className={`h-7 w-7 rounded-lg flex items-center justify-center ${meta.accent}/10`}
              >
                <Icon className={`h-3.5 w-3.5 ${meta.text}`} aria-hidden />
              </div>
              <span
                className={`font-mono text-[9px] uppercase tracking-widest ${meta.text}`}
              >
                {meta.label}
              </span>
            </div>
            <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-widest">
              {freshnessLabel(item.updatedAtISO)}
            </span>
          </div>
          <div className="font-semibold text-sm sm:text-base leading-snug line-clamp-2 flex-1 mb-2">
            {item.title}
          </div>
          <div className="text-xs text-muted-foreground line-clamp-2 mb-4">
            {item.subtitle}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-muted-foreground/50 uppercase">
              {item.minutes} MIN READ
            </span>
            <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
              <span>Read</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── DENSE ROW (list-style item) ─────────────────────────────────────────────
function DenseRow({ item, index }: { item: IndexItem; index: number }) {
  const meta = KIND_META[item.kind];
  return (
    <motion.div custom={index} variants={slideUp}>
      <Link
        href={hrefFor(item.kind, item.slug)}
        className="group flex items-start gap-3 py-3.5 px-4 rounded-xl hover:bg-muted/30 active:bg-muted/50 transition-colors border border-transparent hover:border-border/60"
        aria-label={`${meta.label}: ${item.title}`}
      >
        <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${meta.accent} mt-1.5`} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-medium text-sm leading-snug">{item.title}</span>
            <span className={`font-mono text-[9px] uppercase tracking-widest shrink-0 ${meta.text}`}>
              {meta.label}
            </span>
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
            {item.subtitle}
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 text-muted-foreground/40">
          <span className="font-mono text-[9px]">{item.minutes}m</span>
            <ArrowRight
              className="h-3.5 w-3.5 group-hover:translate-x-1 group-hover:text-primary transition-all"
              aria-hidden="true"
            />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── LIVE TICKER STRIP (vertical on desktop, horizontal marquee on mobile) ────
function VerticalTicker({ items }: { items: IndexItem[] }) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) {
    return (
      <div className="flex flex-col">
        {items.slice(0, 8).map((it) => (
          <TickerItem key={`${it.kind}-${it.id}`} item={it} />
        ))}
      </div>
    );
  }
  const tripled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden h-full" style={{ maxHeight: 480 }}>
      <motion.div
        animate={{ y: "-33.33%" }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex flex-col"
      >
        {tripled.map((it, i) => (
          <TickerItem key={`${it.kind}-${it.id}-${i}`} item={it} />
        ))}
      </motion.div>
    </div>
  );
}

function HorizontalTicker({ items }: { items: IndexItem[] }) {
  const shouldReduce = useReducedMotion();
  const doubled = [...items, ...items];
  if (shouldReduce) {
    return (
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-4">
        {items.slice(0, 6).map((it) => {
          const meta = KIND_META[it.kind];
          return (
            <span
              key={`${it.kind}-${it.id}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-background/70 px-3 py-1.5 text-xs"
            >
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${meta.accent}`} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                {meta.label}:
              </span>
              <span className="truncate max-w-[160px] font-medium text-xs">
                {it.title}
              </span>
            </span>
          );
        })}
      </div>
    );
  }
  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: "-50%" }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="flex gap-2 whitespace-nowrap py-2 px-4"
      >
        {doubled.map((it, i) => {
          const meta = KIND_META[it.kind];
          return (
            <span
              key={`${it.kind}-${it.id}-${i}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-background/70 px-3 py-1.5 text-xs"
            >
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${meta.accent}`} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                {meta.label}:
              </span>
              <span className="font-medium text-xs">{it.title}</span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── CATEGORY PILL TAB ────────────────────────────────────────────────────────
function CategoryPill({
  cat,
  active,
  onClick,
}: {
  cat: (typeof CATEGORIES)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      data-active={active}
      onClick={onClick}
      className={[
        "shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all h-10",
        active
          ? "bg-foreground text-background border-foreground shadow-sm"
          : "bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground",
      ].join(" ")}
    >
      <cat.icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {cat.label}
    </button>
  );
}

// ─── SECTION LABEL (editorial running head) ───────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5 sm:mb-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
        {children}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

// ─── STAT STRIP ───────────────────────────────────────────────────────────────
function StatStrip({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone: "primary" | "green" | "orange";
}) {
  const color =
    tone === "primary"
      ? "text-primary"
      : tone === "green"
      ? "text-green-500"
      : "text-orange-500";
  const bg =
    tone === "primary"
      ? "bg-primary/8"
      : tone === "green"
      ? "bg-green-500/8"
      : "bg-orange-500/8";
  return (
    <div className={`rounded-2xl border ${bg} p-4 sm:p-5 flex items-center gap-3`}>
      <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${bg}`}>
        <Icon className={`h-4 w-4 ${color}`} aria-hidden />
      </div>
      <div>
        <div className={`text-xl sm:text-2xl font-bold font-mono leading-none ${color}`}>
          {value}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
      </div>
    </div>
  );
}

// ─── Logo Strip ───────────────────────────────────────────────────────────────
const heroLogos = [
  { name: "OpenAI", src: "/logos/openai.png" },
  { name: "Anthropic", src: "/logos/anthropic.png" },
  { name: "Notion", src: "/logos/notion.png" },
  { name: "Netlify", src: "/logos/netlify.png" },
  { name: "Perplexity", src: "/logos/perplexity.png" },
  { name: "Midjourney", src: "/logos/midjourney.png" },
];

function LogoStrip() {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      {heroLogos.map((l) => (
        <div
          key={l.name}
          className="flex items-center gap-2 rounded-2xl border bg-muted/20 px-3 py-2"
          title={l.name}
        >
          <div className="relative h-5 w-5 overflow-hidden rounded-md">
            <Image
              src={l.src}
              alt={`${l.name} logo`}
              fill
              className="object-contain"
              sizes="20px"
            />
          </div>
          <span className="text-xs text-muted-foreground">{l.name}</span>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ToolDropAI() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("tools");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    const el = tabsRef.current?.querySelector(
      `[data-active="true"]`
    ) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeCategory]);

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
    return idx.sort(
      (a, b) => new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime()
    );
  }, []);

  const latestFeed = useMemo(() => unifiedIndex.slice(0, 9), [unifiedIndex]);
  const featuredCols = useMemo(() => collections.slice(0, 4), []);

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
    return { cards: base.slice(0, 3), rows: base.slice(3, 9) };
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
      setToast("Subscribed! Check your inbox.");
      setEmail("");
      setTimeout(() => setToast(null), 2500);
    },
    [email]
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Subtle noise texture overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 -z-20 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden
      />

      {/* ── Background orbs ── */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/6 blur-[120px]" />
        <div className="absolute top-1/3 -left-48 h-[400px] w-[400px] rounded-full bg-green-500/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-orange-500/5 blur-[100px]" />
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          HERO — editorial asymmetric layout
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-16 pb-0"
      >
        {/* Top meta bar */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Live feed
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-muted-foreground/60 hidden sm:block uppercase tracking-widest">
              Signal / Noise ratio: ∞
            </span>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-8 text-xs font-mono"
              asChild
            >
              <Link href="/search">Search ⌘K</Link>
            </Button>
          </div>
        </motion.div>

        {/* Main hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6">
          {/* ── LEFT: Massive editorial headline ── */}
          <div className="lg:col-span-7 xl:col-span-8 pb-8 lg:pb-16 lg:pr-8 lg:border-r border-border/50">
            {/* Overline tags */}
            <motion.div
              initial="hidden"
              animate={heroInView ? "show" : "hidden"}
              variants={stagger}
              className="flex flex-wrap gap-2 mb-6"
            >
              {[
                { icon: Flame, label: "Daily updates" },
                { icon: ShieldCheck, label: "Curated for quality" },
                { icon: Globe, label: "Signal over noise" },
              ].map(({ icon: Icon, label }) => (
                <motion.span
                  key={label}
                  variants={clipReveal}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-muted-foreground bg-background/60 backdrop-blur"
                >
                  <Icon className="h-3 w-3 shrink-0" />
                  {label}
                </motion.span>
              ))}
            </motion.div>

            {/* Headline — oversized, slightly offset */}
            <div className="relative">
              {/* Decorative large number */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="absolute -right-4 sm:-right-8 -top-6 sm:-top-8 font-mono text-[80px] sm:text-[120px] font-bold text-foreground/[0.03] leading-none select-none pointer-events-none hidden sm:block"
                aria-hidden
              >
                AI
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
                className="text-[2.4rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold tracking-tight leading-[1.05] relative"
              >
                What changed
                <br />
                <span className="relative inline-block">
                  in AI
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={heroInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.55, ease: EASE_OUT }}
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-primary origin-left"
                    aria-hidden
                  />
                </span>{" "}
                today?
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-lg"
            >
              Vetted tools, reusable prompts, and model updates that actually matter.
              No noise. No "Top 200 AI Tools" nonsense.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-4 text-xs text-muted-foreground"
            >
              Tracking updates across leading AI tools
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.37 }}
            >
              <LogoStrip />
            </motion.div>

            {/* Stat strips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 max-w-lg"
            >
              <StatStrip icon={Zap} value="Daily" label="Fresh content" tone="primary" />
              <StatStrip icon={ScanLine} value="100%" label="Vetted" tone="green" />
              <StatStrip icon={Radio} value="Live" label="Updates" tone="orange" />
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.48 }}
              className="mt-6 sm:mt-8 flex flex-col xs:flex-row gap-2 sm:gap-3"
            >
              <Button className="rounded-2xl h-11 group text-sm font-medium" asChild>
                <Link href="/trending" className="inline-flex items-center gap-2">
                  Explore trending
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" className="rounded-2xl h-11 text-sm" asChild>
                <a href="#explore">Browse categories</a>
              </Button>
            </motion.div>
          </div>

          {/* ── RIGHT: Vertical live ticker (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col"
          >
            <div className="sticky top-6">
              <div className="flex items-center gap-2 mb-4 px-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Latest
                </span>
                <Link
                  href="/updates"
                  className="ml-auto text-[10px] font-mono text-muted-foreground/60 hover:text-foreground uppercase tracking-widest transition-colors"
                >
                  All →
                </Link>
              </div>
              <div className="rounded-2xl border bg-background/50 backdrop-blur overflow-hidden">
                <VerticalTicker items={latestFeed} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Mobile horizontal ticker strip ── */}
        <div className="lg:hidden mt-6 -mx-4 sm:-mx-6">
          <div className="flex items-center gap-2 mb-2 px-4 sm:px-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Latest
            </span>
          </div>
          <div className="border-t border-b border-border/60 bg-muted/10">
            <HorizontalTicker items={latestFeed} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          COLLECTIONS — magazine mosaic
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20 pb-0">
        <SectionLabel>Featured Collections</SectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {featuredCols.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: EASE_OUT }}
              className={i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
            >
              <Link
                href={hrefFor("collection", c.slug)}
                className={[
                  "group block rounded-2xl border bg-background overflow-hidden hover:shadow-lg active:scale-[0.99] transition-all duration-300",
                  i === 0 ? "p-6 sm:p-8" : "p-5",
                ].join(" ")}
                aria-label={`Open collection: ${c.title}`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 block mb-2">
                      Collection · {freshnessLabel(c.updatedAtISO)}
                    </span>
                    <div
                      className={[
                        "font-bold leading-tight",
                        i === 0 ? "text-xl sm:text-2xl" : "text-base",
                      ].join(" ")}
                    >
                      {c.title}
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-xl border flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all">
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
                <p
                  className={[
                    "text-muted-foreground line-clamp-2",
                    i === 0 ? "text-sm sm:text-base" : "text-xs",
                  ].join(" ")}
                >
                  {c.description}
                </p>
              </Link>
            </motion.div>
          ))}

          {/* Browse all tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.32, duration: 0.5 }}
          >
            <Link
              href="/collections"
              className="group flex h-full min-h-[120px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 hover:border-primary/50 hover:bg-muted/20 active:bg-muted/40 transition-all p-5 text-center"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-2">
                Browse all
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          EXPLORE — category tabs + grid/list hybrid
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="explore" className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20 pb-0">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <SectionLabel>Explore by Category</SectionLabel>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight -mt-4">
              Pick a lane. Get the best of it.
            </h2>
          </div>
          <Link
            href={active.to}
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors self-start sm:self-auto pb-0.5 border-b border-transparent hover:border-foreground"
          >
            Browse all {active.label} →
          </Link>
        </div>

        {/* Tabs */}
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Browse categories"
          className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-6 sm:mb-8"
        >
          {CATEGORIES.map((c) => (
            <CategoryPill
              key={c.key}
              cat={c}
              active={activeCategory === c.key}
              onClick={() => setActiveCategory(c.key)}
            />
          ))}
        </div>

        {/* Content: animated */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            role="tabpanel"
            aria-label={`${active.label} content`}
          >
            {/* 3-up card grid */}
            {categoryItems.cards.length > 0 && (
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4"
              >
                {categoryItems.cards.map((it, i) => (
                  <SignalCard key={`${it.kind}-${it.id}`} item={it} index={i} />
                ))}
              </motion.div>
            )}

            {/* Dense rows */}
            {categoryItems.rows.length > 0 && (
              <div className="rounded-2xl border bg-background/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    More {active.label}
                  </span>
                  <Link
                    href={active.to}
                    className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 hover:text-foreground transition-colors"
                  >
                    All →
                  </Link>
                </div>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="divide-y divide-border/30"
                >
                  {categoryItems.rows.map((it, i) => (
                    <DenseRow key={`${it.kind}-${it.id}`} item={it} index={i} />
                  ))}
                </motion.div>
              </div>
            )}

            {categoryItems.cards.length === 0 && categoryItems.rows.length === 0 && (
              <div className="text-center py-16 text-muted-foreground font-mono text-sm">
                No items yet — check back soon.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Quick actions strip ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: "Browse tools", href: "/tools", tone: "primary" as const },
            { label: "Browse prompts", href: "/prompts", tone: "green" as const },
            { label: "Model updates", href: "/updates", tone: "orange" as const },
          ].map(({ label, href, tone }) => {
            const bg =
              tone === "primary"
                ? "hover:bg-primary/5 hover:border-primary/40"
                : tone === "green"
                ? "hover:bg-green-500/5 hover:border-green-500/40"
                : "hover:bg-orange-500/5 hover:border-orange-500/40";
            const text =
              tone === "primary"
                ? "group-hover:text-primary"
                : tone === "green"
                ? "group-hover:text-green-500"
                : "group-hover:text-orange-500";
            return (
              <Link
                key={href}
                href={href}
                className={`group rounded-2xl border bg-background p-4 sm:p-5 flex items-center justify-between transition-all active:scale-[0.98] ${bg}`}
              >
                <span className="font-medium text-sm">{label}</span>
                <ArrowUpRight
                  className={`h-4 w-4 text-muted-foreground transition-colors ${text} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`}
                />
              </Link>
            );
          })}
        </div>
      </section>

      <RecentlyViewed limit={6} />

      {/* Best Lists (Money Pages) */}
<section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-14">
  <div className="mb-5">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
      Popular AI Tool Rankings
    </h2>
    <p className="mt-2 text-muted-foreground">
      Find the right AI tools for your specific use case. Ranked by usefulness with honest
      assessments of strengths and limitations.
    </p>
  </div>

  <motion.div
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="grid gap-4 md:grid-cols-3"
  >
    {[
      {
        href: "/best/best-ai-tools-for-students",
        kicker: "Best For Students",
        title: "Best AI Tools for Students",
        desc: "Research tools, writing helpers, and coding assistants students actually use without academic trouble.",
      },
      {
        href: "/best/best-ai-tools-for-writing",
        kicker: "Best For Writing",
        title: "Best AI Tools for Writing",
        desc: "Drafting, editing, and clarity tools that help you write better without losing your voice.",
      },
      {
        href: "/best/best-ai-coding-tools",
        kicker: "Best For Coding",
        title: "Best AI Coding Tools for Developers",
        desc: "Code generation, debugging, and refactoring tools that actually speed up development.",
      },
    ].map((x) => (
      <motion.div key={x.href} variants={slideUp}>
        <Link
          href={x.href}
          className="block rounded-2xl border p-5 hover:bg-muted/40 hover:shadow-lg transition-all h-full"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="text-sm text-primary font-semibold uppercase">
                {x.kicker}
              </div>
              <div className="mt-2 font-semibold leading-snug">{x.title}</div>
              <div className="mt-2 text-sm text-muted-foreground">{x.desc}</div>
            </div>
            <ArrowRight
              className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0"
              aria-hidden="true"
            />
          </div>
        </Link>
      </motion.div>
    ))}
  </motion.div>

  <div className="mt-4 text-center">
    <Link
      href="/best"
      className="text-sm underline underline-offset-4 hover:text-primary transition-colors"
    >
      Browse all AI tool rankings →
    </Link>
  </div>
</section>

{/* Key Comparisons */}
<section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-14">
  <div className="mb-5">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
      Detailed Comparisons
    </h2>
    <p className="mt-2 text-muted-foreground">
      Side-by-side breakdowns helping you choose between popular tools. Real-world scenarios,
      tradeoffs, and recommendations.
    </p>
  </div>

  <motion.div
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="grid gap-4 md:grid-cols-3"
  >
    {[
      {
        href: "/comparisons/cursor-vs-vscode-ai-vs-jetbrains-ai",
        title: "Cursor vs VS Code + AI vs JetBrains",
        desc: "Which AI-enhanced editor actually speeds up shipping without breaking code review.",
      },
      {
        href: "/comparisons/perplexity-vs-kagi-vs-google",
        title: "Perplexity vs Kagi vs Google",
        desc: "AI answers, quality search, and which one actually wins for research-heavy work.",
      },
      {
        href: "/comparisons/elevenlabs-vs-playht-vs-azure-tts",
        title: "ElevenLabs vs PlayHT vs Azure TTS",
        desc: "Text-to-speech quality, pricing, and which one delivers natural voices at scale.",
      },
    ].map((x) => (
      <motion.div key={x.href} variants={slideUp}>
        <Link
          href={x.href}
          className="block rounded-2xl border p-5 hover:bg-muted/40 hover:shadow-lg transition-all h-full"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Comparison
              </div>
              <div className="mt-2 font-semibold leading-snug">{x.title}</div>
              <div className="mt-2 text-sm text-muted-foreground">{x.desc}</div>
            </div>
            <ArrowRight
              className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0"
              aria-hidden="true"
            />
          </div>
        </Link>
      </motion.div>
    ))}
  </motion.div>

  <div className="mt-4 text-center">
    <Link
      href="/comparisons"
      className="text-sm underline underline-offset-4 hover:text-primary transition-colors"
    >
      Browse all detailed comparisons →
    </Link>
  </div>
</section>


      {/* ════════════════════════════════════════════════════════════════════════
          NEWSLETTER — editorial inset block
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="newsletter" className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20">
        <div className="relative rounded-3xl border bg-foreground text-background overflow-hidden">
          {/* decorative bg text */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden
          >
            <span className="font-mono font-bold text-[100px] sm:text-[160px] text-background/[0.04] leading-none">
              SIGNAL
            </span>
          </div>

          <div className="relative p-8 sm:p-12 max-w-2xl mx-auto text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-background/50 block mb-3">
              Weekly digest
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Subscribe to weekly updates
            </h2>
            <p className="text-background/60 text-sm sm:text-base mb-6 sm:mb-8">
              Get the week's best AI tools, prompts, and updates delivered to your inbox.
            </p>
            <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2 sm:gap-3" noValidate>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl flex-1 h-12 bg-background/10 border-background/20 placeholder:text-background/40 text-background focus:border-background/60"
                autoComplete="email"
                inputMode="email"
                aria-label="Email address"
                required
              />
              <Button
                type="submit"
                className="rounded-2xl h-12 bg-background text-foreground hover:bg-background/90 font-medium px-6 sm:px-8"
              >
                Subscribe
              </Button>
            </form>
            <AnimatePresence>
              {toast && (
                <motion.div
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 rounded-xl bg-background/10 border border-background/20 p-3 text-sm text-background/80"
                >
                  {toast}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ — accordion with editorial formatting
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20 pb-14 sm:pb-20">
        <SectionLabel>FAQ</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0 max-w-5xl">
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.09, duration: 0.45 }}
              className="border-t border-border/60"
            >
              <button
                className="flex items-start justify-between gap-4 w-full text-left py-5 group"
                aria-expanded={expandedFAQ === idx}
                aria-controls={`faq-answer-${idx}`}
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] text-muted-foreground/50 mt-0.5 shrink-0 w-4">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: expandedFAQ === idx ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors"
                >
                  <ChevronDown className="h-4 w-4" aria-hidden />
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
                    <div className="pl-7 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
