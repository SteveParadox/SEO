"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { readRecentKeys, RECENT_EVENT } from "@/lib/recent";

function readCount() {
  try {
    return readRecentKeys().length;
  } catch {
    return 0;
  }
}

export function RecentCountBadge() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const refresh = () => setCount(readCount());
    refresh();

    const t = window.setInterval(refresh, 800);

    function onStorage(e: StorageEvent) {
      if (e.key === "tooldrop_recent_v1") refresh();
    }
    function onRecentChanged() {
      refresh();
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener(RECENT_EVENT, onRecentChanged as EventListener);

    return () => {
      window.clearInterval(t);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(RECENT_EVENT, onRecentChanged as EventListener);
    };
  }, []);

  if (count <= 0) return null;

  return (
    <Badge variant="secondary" className="ml-2 rounded-full px-2 py-0.5 text-xs">
      {count}
    </Badge>
  );
}