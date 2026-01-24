"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

const STORAGE_KEY = "tooldrop_saved_v1";

function readCount() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.length : 0;
  } catch {
    return 0;
  }
}

export function SavedCountBadge() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setCount(readCount());

    // same-tab refresh (storage event doesn't fire in same tab)
    const t = window.setInterval(() => setCount(readCount()), 800);

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setCount(readCount());
    }
    window.addEventListener("storage", onStorage);

    return () => {
      window.clearInterval(t);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (count <= 0) return null;

  return (
    <Badge variant="secondary" className="ml-2 rounded-full px-2 py-0.5 text-xs">
      {count}
    </Badge>
  );
}