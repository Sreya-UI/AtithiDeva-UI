/**
 * Central site configuration.
 * Replace these placeholders with real business details before going live.
 */
export const site = {
  name: "AtithiDeva",
  legalName: "AtithiDeva",
  tagline: "Hotel operations software",
  description:
    "AtithiDeva is a hotel property management system that connects the front desk, rooms, housekeeping, restaurant, banquets, billing and the night audit in one place.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.atithideva.com").replace(/\/$/, ""),
  locale: "en_IN",
  contact: {
    // Placeholders — update in lib/site.ts.
    email: "icare@xcelcure.com",
    phone: "+91 9051877716",
    streetAddress: "Module-118, SDF Building, GP Block, Sector V, Bidhannagar",
    postalCode: "700091",
    fullAddress: "Module-118, SDF Building, GP Block, Sector V, Bidhannagar, Kolkata, West Bengal - 700091",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  ogImage: "/opengraph-image",
  social: {
    facebook: "https://facebook.com/atithideva",
    instagram: "https://instagram.com/atithideva",
    whatsapp: "https://wa.me/919051877716",
    linkedin: "https://linkedin.com/company/atithideva",
    youtube: "https://youtube.com/@atithideva",
  },
} as const;

export type Site = typeof site;
