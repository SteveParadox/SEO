// components/json-ld.tsx
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // next-safe: JSON.stringify is what Google expects
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
