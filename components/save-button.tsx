"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";

export type SaveKey = {
  kind: "tool" | "prompt" | "update" | "collection" | "comparison";
  id: string;
};

const STORAGE_KEY = "tooldrop_saved_v1";
const EVENT_NAME = "tooldrop:saved-changed"; // same-tab signal

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
    // notify same tab listeners
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // ignore
  }
}

export function getSavedCount() {
  return readSaved().length;
}

export function clearSaved() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
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
  const next = exists
    ? list.filter((x) => !(x.kind === key.kind && x.id === key.id))
    : [key, ...list];

  writeSaved(next);
  return !exists;
}

/**
 * Optional helper: lets any component react to saved changes
 * without polling.
 */
export function useSavedCount() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const update = () => setCount(getSavedCount());
    update();

    // cross-tab
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) update();
    }

    // same-tab
    function onLocal() {
      update();
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener(EVENT_NAME, onLocal as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVENT_NAME, onLocal as EventListener);
    };
  }, []);

  return count;
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
    const sync = () => setSaved(isSaved(key));

    // cross-tab updates
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) sync();
    }

    // same-tab updates
    function onLocal() {
      sync();
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener(EVENT_NAME, onLocal as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVENT_NAME, onLocal as EventListener);
    };
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
      {saved ? (
        <BookmarkCheck className="h-4 w-4 mr-2" />
      ) : (
        <Bookmark className="h-4 w-4 mr-2" />
      )}
      {saved ? labelSaved : labelUnsaved}
    </Button>
  );
}