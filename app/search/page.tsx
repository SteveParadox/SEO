import { Suspense } from "react";
import { SearchClient } from "./search-client";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-2xl border p-6 text-sm text-muted-foreground">
            Loading search...
          </div>
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
