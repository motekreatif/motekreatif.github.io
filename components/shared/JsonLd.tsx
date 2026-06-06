type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Render JSON-LD inline (server-side) agar terbaca AI crawlers
 * yang tidak mengeksekusi JavaScript.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
