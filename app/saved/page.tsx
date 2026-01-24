"use client";

import Link from "next/link";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUnifiedIndex, hrefFor, type UnifiedKind } from "@/lib/data";

type SaveKey = { kind: UnifiedKind; id: string };
const STORAGE_KEY = "tooldrop_saved_v1";

function readSaved(): SaveKey[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => x?.kind && x?.id);
  } catch {
    return [];
  }
}

function clearSaved() {
  window.localStorage.removeItem(STORAGE_KEY);
}

function label(kind: UnifiedKind) {
  if (kind === "tool") return "Tool";
  if (kind === "prompt") return "Prompt";
  if (kind === "update") return "Update";
  if (kind === "collection") return "Collection";
  return "Comparison";
}

export default function SavedPage() {
  const [savedKeys, setSavedKeys] = React.useState<SaveKey[]>([]);
  const index = React.useMemo(() => getUnifiedIndex(), []);

  React.useEffect(() => {
    setSavedKeys(readSaved());
  }, []);

  const savedItems = React.useMemo(() => {
    const byId = new Map(index.map((it) => [`${it.kind}:${it.id}`, it] as const));
    return savedKeys
      .map((k) => byId.get(`${k.kind}:${k.id}`))
      .filter(Boolean);
  }, [savedKeys, index]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold">Saved</h1>
          <p className="mt-2 text-muted-foreground">
            Your personal stash of useful stuff.
          </p>
        </div>

        <Button
          variant="outline"
          className="rounded-2xl"
          onClick={() => {
            clearSaved();
            setSavedKeys([]);
          }}
          disabled={savedKeys.length === 0}
        >
          Clear all
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {savedItems.map((it) => (
          <Link key={`${it!.kind}-${it!.id}`} href={hrefFor(it!.kind, it!.slug)}>
            <Card className="rounded-2xl hover:bg-muted/40 transition">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full">
                    {label(it!.kind)}
                  </Badge>
                  <span className="line-clamp-1">{it!.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground line-clamp-2">{it!.subtitle}</div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {savedKeys.length === 0 ? (
          <Card className="rounded-2xl md:col-span-2">
            <CardContent className="p-6 text-muted-foreground">
              Nothing saved yet. Go click “Save” on anything that doesn’t waste your time.
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
