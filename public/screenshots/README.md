# Screenshots

Drop real Atithideva PMS screenshots into this folder, then register them in
`data/screenshots.ts`.

Recommended:

- PNG or WebP, exported at 2x (roughly 2400 x 1500)
- One screen per file, no browser chrome — the site draws its own window frame
- Filenames matching the slot keys: `room-board.png`, `check-in.png`,
  `checkout.png`, `night-audit.png`

In `data/screenshots.ts`, set `src` to `/screenshots/<file>` and set `width` and
`height` to the file's real pixel dimensions. The aspect ratio is taken from
those numbers, so nothing gets stretched.

Until a slot has a `src`, the site renders a built-in mockup of the same screen
in its place, so the site is complete either way.
