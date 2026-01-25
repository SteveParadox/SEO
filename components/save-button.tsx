"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import {
  isSaved,
  toggleSaved,
  SAVED_EVENT,
  STORAGE_KEY,
  type SavedKind,
} from "@/lib/saved";

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
  const key = React.useMemo(() => ({ kind, id }), [kind, id]);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    setSaved(isSaved(kind, id));
  }, [kind, id]);

  React.useEffect(() => {
    const sync = () => setSaved(isSaved(kind, id));

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) sync();
    }
    function onLocal() {
      sync();
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener(SAVED_EVENT, onLocal as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(SAVED_EVENT, onLocal as EventListener);
    };
  }, [kind, id]);

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