"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";

import { isSaved, toggleSaved, SAVED_EVENT, type SavedKind } from "@/lib/saved";

export function SaveButton({
  kind,
  id,
  className,
  labelSaved = "Saved",
  labelUnsaved = "Save",
}: {
  kind: SavedKind;
  id: string;
  className?: string;
  labelSaved?: string;
  labelUnsaved?: string;
}) {
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    setSaved(isSaved(kind, id));
  }, [kind, id]);

  React.useEffect(() => {
    const sync = () => setSaved(isSaved(kind, id));

    // same-tab updates (our custom event)
    window.addEventListener(SAVED_EVENT, sync as EventListener);

    // cross-tab updates (localStorage event)
    function onStorage(e: StorageEvent) {
      if (e.key === "tooldrop_saved_v1") sync();
    }
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(SAVED_EVENT, sync as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, [kind, id]);

  return (
    <Button
      type="button"
      variant={saved ? "default" : "outline"}
      size="sm"
      className={className}
      onClick={() => {
        const next = toggleSaved({ kind, id });
        setSaved(next);
      }}
      aria-label={saved ? "Remove from saved" : "Save this item"}
    >
      {saved ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
      {saved ? labelSaved : labelUnsaved}
    </Button>
  );
}