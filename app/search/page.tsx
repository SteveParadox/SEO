import { SearchClient } from "./search-client";

type PageProps = {
  searchParams?: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const raw = resolved?.q;
  const initialQuery = Array.isArray(raw) ? raw[0] ?? "" : raw ?? "";

  return <SearchClient initialQuery={initialQuery} />;
}
