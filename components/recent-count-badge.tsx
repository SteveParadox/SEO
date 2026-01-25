"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { readRecent, RECENT_EVENT } from "@/lib/recent";

export function RecentCountBadge() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const update = () => setCount(readRecent().length);
    update();

    function onStorage(e: StorageEvent) {
      if (e.key === "tooldrop_recent_v1") update();
    }

    function onLocal() {
      update();
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener(RECENT_EVENT, onLocal as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(RECENT_EVENT, onLocal as EventListener);
    };
  }, []);

  if (count <= 0) return null;

  return (
    <Badge variant="secondary" className="ml-2 rounded-full px-2 py-0.5 text-xs">
      {count}
    </Badge>
  );
}