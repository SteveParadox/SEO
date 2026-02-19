"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 12;

export default function PromptsIndexClient() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPrompts = React.useMemo(
    () => {
      const sorted = [...DATA.prompts].sort(
        (a, b) =>
          new Date(b.updatedAtISO).getTime() -
          new Date(a.updatedAtISO).getTime()
      );

      if (!searchQuery.trim()) return sorted;

      const lowerQuery = searchQuery.toLowerCase();
      return sorted.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.purpose.toLowerCase().includes(lowerQuery) ||
          p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
          p.description?.toLowerCase().includes(lowerQuery)
      );
    },
    [searchQuery]
  );

  const totalPages = Math.ceil(filteredPrompts.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const current = filteredPrompts.slice(start, start + PAGE_SIZE);

  // Reset to page 1 when search query changes
  React.useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Prompts</h1>
      <p className="mt-2 text-muted-foreground">
        Effective, ready-to-use prompts designed to improve your AI results.<br/>
        Search prompts by title, purpose, or category to find exactly what you need.
      </p>

      {/* Search Input */}
      <div className="mt-6">
        <Input
          type="text"
          placeholder="Search prompts by title, topic, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
          aria-label="Search prompts"
        />
        {searchQuery && (
          <p className="mt-2 text-sm text-muted-foreground">
            Found {filteredPrompts.length} result{filteredPrompts.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {current.map((p) => (
          <Card
            key={p.id}
            role="link"
            tabIndex={0}
            onClick={() => router.push(`/prompts/${p.slug}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(`/prompts/${p.slug}`);
              }
            }}
            className="rounded-2xl hover:bg-muted/40 transition cursor-pointer"
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-2 flex-wrap">
                {p.tags.slice(0, 3).map((rawTag) => {
                  const tag = rawTag.trim();
                  const tagSlug = encodeURIComponent(tag.toLowerCase());

                  return (
                    <Link
                      key={`${p.id}-${tagSlug}`}
                      href={`/tags/${tagSlug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex"
                    >
                      <Badge variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-2 font-semibold">{p.title}</div>
              <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {p.purpose}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results Message */}
      {current.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            No prompts found matching "{searchQuery}". Try different keywords.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-xl border px-3 py-1 text-sm disabled:opacity-40"
            aria-label="Previous page"
          >
            Prev
          </button>

          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-xl border px-3 py-1 text-sm disabled:opacity-40"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
