import type { Metadata } from "next";
import { site } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Path beginning with a slash, e.g. "/pricing". */
  path: string;
  noIndex?: boolean;
};

/**
 * Builds page metadata with a canonical URL, Open Graph and Twitter cards.
 * Every route in the app uses this so nothing drifts out of sync.
 */
export function createMetadata({ title, description, path, noIndex }: PageMetaInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: `${title} · ${site.name}`,
      description,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
