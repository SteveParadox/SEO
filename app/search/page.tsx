import { Suspense } from "react";
import { SearchClient } from "./search-client";

type PageProps = {
  searchParams?: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const raw = resolved?.q;
  const initialQuery = Array.isArray(raw) ? raw[0] ?? "" : raw ?? "";

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
      <SearchClient initialQuery={initialQuery} />
    </Suspense>
  );
}
