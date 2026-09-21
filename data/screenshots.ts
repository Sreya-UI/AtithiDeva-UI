/**
 * Screenshot slots.
 *
 * Each slot renders a real screenshot when `src` is set, and falls back to a
 * hand-built mockup of the same screen when it is null.
 *
 * To use real screenshots of the AtithiDeva PMS:
 *   1. Drop the image into `public/screenshots/` (PNG or WebP, 2x resolution).
 *   2. Set `src`, `width` and `height` below to the file's real pixel size.
 *      The aspect ratio is taken from those numbers, so the image is never
 *      distorted by the frame around it.
 *   3. Write an `alt` that describes the screen, not the file.
 *
 * Nothing else needs to change — the frames, floating cards and animation all
 * adapt automatically.
 */

export type Screenshot = {
  src: string | null;
  alt: string;
  width: number;
  height: number;
};

export const screenshots = {
  /** Hero: the room status board. */
  roomBoard: {
    src: null,
    alt: "AtithiDeva room status board showing rooms grouped by availability, occupancy, cleaning and maintenance.",
    width: 2400,
    height: 1500,
  },
  /** Showcase: the front-desk check-in form. */
  checkIn: {
    src: null,
    alt: "AtithiDeva check-in form with guest profile, room details, stay dates and payment fields.",
    width: 2400,
    height: 1500,
  },
  /** Showcase: guest checkout and folio. */
  checkout: {
    src: null,
    alt: "AtithiDeva guest checkout view showing grand total, total paid and balance due.",
    width: 2400,
    height: 1500,
  },
  /** Showcase: night audit. */
  nightAudit: {
    src: null,
    alt: "AtithiDeva night audit summary with revenue by department, collections and occupancy metrics.",
    width: 2400,
    height: 1500,
  },
} satisfies Record<string, Screenshot>;

export type ScreenshotKey = keyof typeof screenshots;
