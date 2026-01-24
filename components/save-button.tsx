"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";

export type SaveKey = {
  kind: "tool" | "prompt" | "update" | "collection" | "comparison";
  id: string;
};

const STORAGE_KEY = "tooldrop_saved_v1";

function readSaved(): SaveKey[] {
  if (typeof window === "undefined") return [];
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

function writeSaved(list: SaveKey[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function isSaved(key: SaveKey) {
  const list = readSaved();
  return list.some((x) => x.kind === key.kind && x.id === key.id);
}

export function toggleSaved(key: SaveKey) {
  const list = readSaved();
  const exists = list.some((x) => x.kind === key.kind && x.id === key.id);
  const next = exists ? list.filter((x) => !(x.kind === key.kind && x.id === key.id)) : [key, ...list];
  writeSaved(next);
  return !exists;
}

export function SaveButton({
  kind,
  id,
  className,
  labelSaved = "Saved",
  labelUnsaved = "Save",
}: {
  kind: SaveKey["kind"];
  id: string;
  className?: string;
  labelSaved?: string;
  labelUnsaved?: string;
}) {
  const key = React.useMemo(() => ({ kind, id }), [kind, id]);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    setSaved(isSaved(key));
  }, [key]);

  React.useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setSaved(isSaved(key));
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  return (
    <Button
      type="button"
      variant={saved ? "default" : "outline"}
      size="sm"
      className={className}
      onClick={() => setSaved(toggleSaved(key))}
      aria-label={saved ? "Remove from saved" : "Save this item"}
    >
      {saved ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
      {saved ? labelSaved : labelUnsaved}
    </Button>
  );
}