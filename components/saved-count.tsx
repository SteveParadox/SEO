"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

const STORAGE_KEY = "tooldrop_saved_v1";

function readCount() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

export function SavedCountBadge() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setCount(readCount());

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setCount(readCount());
    }
    window.addEventListener("storage", onStorage);

    // Same-tab updates: SaveButton writes localStorage but storage event doesn't fire in same tab
    // So we poll lightly (cheap + reliable).
    const t = window.setInterval(() => setCount(readCount()), 800);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(t);
    };
  }, []);

  if (count <= 0) return null;

  return (
    <Badge variant="secondary" className="rounded-full ml-2">
      {count}
    </Badge>
  );
}