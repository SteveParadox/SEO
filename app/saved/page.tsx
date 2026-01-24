"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUnifiedIndex, hrefFor, type UnifiedIndexItem } from "@/lib/data";

type SavedKey = { kind: UnifiedIndexItem["kind"]; id: string };

const STORAGE_KEY = "tooldrop_saved_v1";

function readSaved(): SavedKey[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x?.kind && x?.id)
      .map((x) => ({ kind: x.kind, id: x.id }));
  } catch {
    return [];
  }
}

function clearSaved() {
  window.localStorage.removeItem(STORAGE_KEY);
}

function kindLabel(kind: UnifiedIndexItem["kind"]) {
  if (kind === "tool") return "Tool";
  if (kind === "prompt") return "Prompt";
  if (kind === "update") return "Update";
  if (kind === "collection") return "Collection";
  return "Comparison";
}

export default function SavedPage() {
  const [savedKeys, setSavedKeys] = React.useState<SavedKey[]>([]);
  const all = React.useMemo(() => getUnifiedIndex(), []);

  React.useEffect(() => {
    setSavedKeys(readSaved());

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setSavedKeys(readSaved());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const savedItems = React.useMemo(() => {
    const map = new Map(all.map((it) => [`${it.kind}:${it.id}`, it] as const));
    return savedKeys
      .map((k) => map.get(`${k.kind}:${k.id}`))
      .filter(Boolean) as UnifiedIndexItem[];
  }, [savedKeys, all]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl border flex items-center justify-center">
              <Bookmark className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">Saved</h1>
              <p className="mt-1 text-muted-foreground">
                Your personal stash of tools, prompts, and updates.
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="rounded-2xl"
          disabled={savedKeys.length === 0}
          onClick={() => {
            clearSaved();
            setSavedKeys([]);
          }}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear all
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {savedItems.map((it) => (
          <Link key={`${it.kind}-${it.id}`} href={hrefFor(it.kind, it.slug)}>
            <Card className="rounded-2xl hover:bg-muted/40 transition">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full">
                    {kindLabel(it.kind)}
                  </Badge>
                  <span className="line-clamp-1">{it.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {it.subtitle}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {savedItems.length === 0 ? (
          <Card className="rounded-2xl md:col-span-2">
            <CardContent className="p-8 text-center">
              <div className="text-lg font-medium">Nothing saved yet.</div>
              <div className="mt-2 text-muted-foreground">
                Go hit “Save” on anything useful. Collect them like digital Pokémon.
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