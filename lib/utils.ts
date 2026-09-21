export type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Tiny class-name joiner. Keeps JSX readable without pulling in a dependency. */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }

  return out.join(" ");
}

/** Formats a number as Indian rupees. Used only for sample data in mockups. */
export function formatINR(value: number, options: { compact?: boolean } = {}): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    notation: options.compact ? "compact" : "standard",
  }).format(value);
}

export function absoluteUrl(path = "/"): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.atithideva.com").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
