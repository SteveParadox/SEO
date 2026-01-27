import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Prompts — ToolDrop AI",
  description: "Browse copy-paste prompts that actually improve results.",
};

export default function PromptsIndexPage() {
  const prompts = [...DATA.prompts].sort(
    (a, b) => new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime()
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Prompts</h1>
      <p className="mt-2 text-muted-foreground">
        Effective, ready-to-use prompts designed to improve your AI results.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {prompts.map((p) => (
          <Link key={p.id} href={`/prompts/${p.slug}`}>
            <Card className="rounded-2xl hover:bg-muted/40 transition">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 flex-wrap">
                  {p.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-2 font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{p.purpose}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}