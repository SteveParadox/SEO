// components/breadcrumbs.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { ChevronRight, Home } from "lucide-react";

function titleize(input: string) {
  const decoded = decodeURIComponent(input);
  return decoded
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function segmentLabel(seg: string) {
  // You can customize these labels whenever you want
  const map: Record<string, string> = {
    tools: "Tools",
    prompts: "Prompts",
    updates: "Model Updates",
    collections: "Collections",
    comparisons: "Comparisons",
    tags: "Tags",
  };
  return map[seg] ?? titleize(seg);
}

export function Breadcrumbs() {
  const pathname = usePathname() || "/";
  const clean = pathname.split("?")[0].split("#")[0];

  const parts = clean.split("/").filter(Boolean);

  // Don’t show breadcrumbs on the homepage (optional)
  if (parts.length === 0) return null;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com";

  const crumbs = [
    { name: "Home", href: "/" },
    ...parts.map((seg, idx) => {
      const href = "/" + parts.slice(0, idx + 1).join("/");
      return { name: segmentLabel(seg), href };
    }),
  ];

  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: baseUrl + c.href,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-3">
      {/* JSON-LD: Google likes this more than your feelings */}
      <Script
        id={`breadcrumbs-jsonld-${clean}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground">
        {crumbs.map((c, idx) => (
          <span key={c.href} className="flex items-center gap-1">
            {idx !== 0 ? <ChevronRight className="h-3.5 w-3.5 opacity-60" /> : null}

            {idx === 0 ? (
              <Link href={c.href} className="inline-flex items-center gap-1 hover:text-foreground">
                <Home className="h-3.5 w-3.5" />
                <span>{c.name}</span>
              </Link>
            ) : idx === crumbs.length - 1 ? (
              <span className="text-foreground font-medium">{c.name}</span>
            ) : (
              <Link href={c.href} className="hover:text-foreground">
                {c.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}