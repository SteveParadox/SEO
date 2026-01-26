import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getItemsByTag, hrefFor } from "@/lib/data";

type PageProps = { params: { tag: string } };

function titleCase(s: string) {
  return s
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default function TagPage({ params }: PageProps) {
  const tag = decodeURIComponent(params.tag).trim().toLowerCase();
  if (!tag) return notFound();

  const items = getItemsByTag(tag);

  if (!items.length) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="rounded-full">
          Tag
        </Badge>
        <h1 className="text-3xl font-semibold">{titleCase(tag)}</h1>
      </div>

      <p className="mt-2 text-muted-foreground">
        {items.length} item{items.length === 1 ? "" : "s"} tagged with “{tag}”.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((it) => (
          <Link key={`${it.kind}-${it.id}`} href={hrefFor(it.kind, it.slug)} className="block">
            <Card className="rounded-2xl hover:bg-muted/40 transition">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full capitalize">
                    {it.kind}
                  </Badge>
                  <span className="line-clamp-1">{it.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground line-clamp-2">{it.subtitle}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
