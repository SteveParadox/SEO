"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, History, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { readSaved, clearSaved, type SavedItem } from "@/lib/saved";
import { readRecent, clearRecent, type RecentItem } from "@/lib/recent";
import { hrefFor, type UnifiedItem } from "@/lib/data";

type Kind = UnifiedItem["kind"];

function kindLabel(kind: Kind) {
  if (kind === "tool") return "Tool";
  if (kind === "prompt") return "Prompt";
  if (kind === "update") return "Update";
  if (kind === "collection") return "Collection";
  return "Comparison";
}

function Tabs({
  active,
  onChange,
}: {
  active: "saved" | "recent";
  onChange: (v: "saved" | "recent") => void;
}) {
  return (
    <div className="inline-flex rounded-2xl border p-1">
      <button
        onClick={() => onChange("saved")}
        className={[
          "px-3 py-2 rounded-2xl text-sm flex items-center gap-2 transition",
          active === "saved" ? "bg-muted" : "hover:bg-muted/40",
        ].join(" ")}
      >
        <Bookmark className="h-4 w-4" /> Saved
      </button>

      <button
        onClick={() => onChange("recent")}
        className={[
          "px-3 py-2 rounded-2xl text-sm flex items-center gap-2 transition",
          active === "recent" ? "bg-muted" : "hover:bg-muted/40",
        ].join(" ")}
      >
        <History className="h-4 w-4" /> Recent
      </button>
    </div>
  );
}

function ItemCard({
  href,
  kind,
  title,
  subtitle,
}: {
  href: string;
  kind: Kind;
  title: string;
  subtitle: string;
}) {
  return (
    <Link href={href} className="block">
      <Card className="rounded-2xl hover:bg-muted/40 transition">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Badge variant="outline" className="rounded-full">
              {kindLabel(kind)}
            </Badge>
            <span className="line-clamp-1">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-sm text-muted-foreground line-clamp-2">
            {subtitle}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function SavedPage() {
  const [tab, setTab] = React.useState<"saved" | "recent">("saved");
  const [q, setQ] = React.useState("");
  const [kind, setKind] = React.useState<Kind | "all">("all");

  const [saved, setSaved] = React.useState<SavedItem[]>([]);
  const [recent, setRecent] = React.useState<RecentItem[]>([]);

  React.useEffect(() => {
    // initial load
    setSaved(readSaved());
    setRecent(readRecent());

    // same-tab refresh (because storage events don’t fire in the same tab)
    const t = window.setInterval(() => {
      setSaved(readSaved());
      setRecent(readRecent());
    }, 800);

    // cross-tab sync
    function onStorage(e: StorageEvent) {
      if (e.key === "tooldrop_saved_v1") setSaved(readSaved());
      if (e.key === "tooldrop_recent_v1") setRecent(readRecent());
    }
    window.addEventListener("storage", onStorage);

    return () => {
      window.clearInterval(t);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const list = tab === "saved" ? saved : recent;

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();

    return list
      .filter((x) => (kind === "all" ? true : x.kind === kind))
      .filter((x) => {
        if (!query) return true;
        const hay = (x.title + " " + x.subtitle).toLowerCase();
        return hay.includes(query);
      })
      .slice(0, 50);
  }, [list, q, kind]);

  const clearActive = () => {
    if (tab === "saved") {
      clearSaved();
      setSaved([]);
    } else {
      clearRecent();
      setRecent([]);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl border flex items-center justify-center">
              <Bookmark className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-3xl font-semibold">Library</h1>
              <p className="mt-1 text-muted-foreground">
                Saved picks + recently viewed. Your attention span, organized.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <Tabs active={tab} onChange={setTab} />
          </div>
        </div>

        <Button
          variant="outline"
          className="rounded-2xl"
          disabled={list.length === 0}
          onClick={clearActive}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear {tab === "saved" ? "saved" : "recent"}
        </Button>
      </div>

      <div className="mt-6 rounded-2xl border p-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex items-center gap-2 w-full md:max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${tab === "saved" ? "saved" : "recent"}...`}
              className="rounded-2xl"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Type</span>
            <select
              className="rounded-2xl border bg-background px-3 py-2 text-sm"
              value={kind}
              onChange={(e) => setKind(e.target.value as any)}
            >
              <option value="all">All</option>
              <option value="tool">Tools</option>
              <option value="prompt">Prompts</option>
              <option value="update">Updates</option>
              <option value="collection">Collections</option>
              <option value="comparison">Comparisons</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((it) => (
          <ItemCard
            key={`${tab}-${it.kind}-${it.id}`}
            href={hrefFor(it.kind as Kind, it.slug)}
            kind={it.kind as Kind}
            title={it.title}
            subtitle={it.subtitle}
          />
        ))}

        {filtered.length === 0 ? (
          <Card className="rounded-2xl md:col-span-2">
            <CardContent className="p-8 text-center">
              <div className="text-lg font-medium">
                {tab === "saved" ? "Nothing saved yet." : "No recent history yet."}
              </div>
              <div className="mt-2 text-muted-foreground">
                {tab === "saved"
                  ? "Go hit “Save” on anything useful. Collect them like digital Pokémon."
                  : "Click around the site and this will fill up."}
              </div>
              <div className="mt-5 flex items-center justify-center gap-2">
                <Button asChild className="rounded-2xl">
                  <Link href="/tools">Browse tools</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl">
                  <Link href="/prompts">Browse prompts</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}