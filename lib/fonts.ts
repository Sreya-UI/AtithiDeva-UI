import localFont from "next/font/local";

/**
 * Fonts are self-hosted (no external requests at runtime).
 * Both families are variable fonts licensed under the SIL Open Font License;
 * the licence texts sit next to the files in `lib/fonts/`.
 */

export const fraunces = localFont({
  src: "./fonts/fraunces-latin-full-normal.woff2",
  variable: "--font-fraunces",
  display: "swap",
  weight: "100 900",
  style: "normal",
  preload: true,
  fallback: ["ui-serif", "Georgia", "serif"],
});

export const manrope = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
  style: "normal",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
