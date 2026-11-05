// Safely embed JSON-LD in an HTML script tag. Raw "<" can terminate the
// element via a string containing "</script>".
export function serializeJsonLd(data: unknown): string {
  return (JSON.stringify(data) ?? "null").replace(/</g, "\\u003c");
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
