"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

const STORAGE_KEY = "tooldrop_saved_v1";
const EVENT_NAME = "tooldrop:saved-changed";

function readCount(): number {
  if (typeof window === "undefined") return 0;
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
    const update = () => setCount(readCount());
    update();

    // Cross-tab updates
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) update();
    }

    // Same-tab updates (custom event)
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

  if (count <= 0) return null;

  return (
    <Badge
      variant="secondary"
      className="ml-2 rounded-full px-2 py-0.5 text-xs"
      aria-label={`${count} items saved`}
    >
      {count}
    </Badge>
  );
}