type JsonLdProps = { id: string; data: Record<string, unknown> };

/**
 * Structured data. Rendered server-side, so it is present in the initial HTML
 * for crawlers rather than injected later.
 */
export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // The payload is authored in this repository, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
