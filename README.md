# Atithideva — public marketing website

The public-facing website for **Atithideva**, a hotel property management system.
This is the marketing site only. It is a separate application from the PMS
dashboard and shares no code with it.

Everything the site claims about the product comes from `BUSINESS_LOGIC.md`.
There are no invented customer counts, percentages, awards or testimonials, and
every figure inside a product visual is sample data labelled as such.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (`.ts` / `.tsx` only) |
| UI | React 19, Server Components by default |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion | Framer Motion |
| Icons | lucide-react |
| Fonts | Fraunces + Manrope, self-hosted variable woff2 |

No CSS-in-JS, no component library, no analytics, no external runtime requests.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Other scripts:

```bash
npm run lint       # ESLint (flat config)
npm run typecheck  # tsc --noEmit
```

Requires Node 20.9+ (developed on Node 22).

---

## Folder structure

```
atithideva/
├── app/
│   ├── layout.tsx              root metadata, fonts, nav/footer, JSON-LD
│   ├── page.tsx                home — composes the section components
│   ├── globals.css             design tokens + base styles (theme lives here)
│   ├── not-found.tsx           404
│   ├── opengraph-image.tsx     social card, generated at build time
│   ├── robots.ts               /robots.txt
│   ├── sitemap.ts              /sitemap.xml
│   ├── features/  solutions/  pricing/  about/  contact/  privacy/  terms/
│
├── components/
│   ├── layout/                 Navbar, Footer, Logo
│   ├── home/                   one file per home-page section
│   ├── pages/                  PageHeader, LegalPage, DemoForm
│   ├── product/                ProductFrame, RoomBoard, mocks, StatusPill
│   ├── common/                 Section, Container, SectionHeading, Button,
│   │                           Reveal, AnimatedCounter, DemoNote
│   └── seo/                    JsonLd
│
├── data/
│   ├── content.ts              all site copy that isn't inline
│   ├── features.ts             the module list
│   ├── navigation.ts           primary + footer navigation
│   └── screenshots.ts          screenshot slots (see below)
│
├── lib/
│   ├── site.ts                 name, URL, contact details — edit this first
│   ├── seo.ts                  createMetadata() helper
│   ├── structured-data.ts      Organization, WebSite, SoftwareApplication, FAQ
│   ├── utils.ts                cn(), formatINR(), absoluteUrl()
│   └── fonts/                  self-hosted woff2 + OFL licence texts
│
└── public/
    ├── screenshots/            drop real PMS screenshots here
    └── images/
```

Only components that need interaction are Client Components (`Navbar`,
`Reveal`, `AnimatedCounter`, `Hero`, `RoomBoard`, `DemoForm`). Everything else
renders on the server. All twelve routes are statically prerendered.

---

## Changing the theme colours

Every colour, shadow and font on the site resolves back to one `@theme` block
at the top of `app/globals.css`. Change the values there and the whole site
follows — nothing else hardcodes a hex value.

```css
@theme {
  --color-ivory: #f8f5ee;   /* page background */
  --color-paper: #fffdf8;   /* raised surfaces */
  --color-sand:  #efe8da;   /* alternating sections */
  --color-linen: #ded3bf;   /* hairlines and borders */
  --color-ink:   #191f1c;   /* headings */
  --color-brass: #96762f;   /* accent */

  /* Room states — these mirror the four PMS statuses. */
  --color-state-available:   #5c6e4c;
  --color-state-occupied:    #96762f;
  --color-state-cleaning:    #46606e;
  --color-state-maintenance: #a0543c;
}
```

The `-wash` variants are the tinted backgrounds that pair with each state
colour. If you change a state colour, change its wash to match.

Typography is set by `--font-display` (Fraunces) and `--font-sans` (Manrope) in
the same block. To swap a family, replace the woff2 in `lib/fonts/` and update
`lib/fonts.ts`.

---

## Changing content

- **Business details** — `lib/site.ts`. Name, URL, email, phone and location.
  The email, phone and address shipped here are **placeholders**; replace them
  before going live. They feed the contact page, the footer and the JSON-LD.
- **Copy** — `data/content.ts` holds the operational journey, housekeeping
  steps, banquet stages, booking inputs, sample folio, sample night audit, FAQ,
  the how-it-works steps and the solution segments.
- **Module list** — `data/features.ts`. Each entry has a title, a one-line
  summary, an icon and four detail points.
- **Navigation** — `data/navigation.ts` for both the navbar and the footer.
- **Section order** — `app/page.tsx` composes the home page from the components
  in `components/home/`. Reorder or remove lines there.

---

## Replacing the screenshots

The site ships with hand-built mockups of four PMS screens so it is complete
without any image assets. Each mockup sits in a slot that a real screenshot can
take over.

1. Export the screen as PNG or WebP at roughly 2x (about 2400 × 1500). No
   browser chrome — the site draws its own window frame.
2. Save it into `public/screenshots/`.
3. Open `data/screenshots.ts` and fill in the slot:

```ts
roomBoard: {
  src: "/screenshots/room-board.png",  // was null
  alt: "Atithideva room status board showing rooms by state.",
  width: 2400,   // the file's real pixel width
  height: 1500,  // the file's real pixel height
},
```

The frame takes its aspect ratio from `width` and `height`, so a correctly
declared image is never stretched. The floating cards, perspective and scroll
animation adapt on their own. Slots left at `src: null` keep rendering their
mockup, so you can replace them one at a time.

Slots: `roomBoard` (hero), `checkIn`, `checkout`, `nightAudit` (showcase).

---

## SEO

- **Metadata** — root defaults in `app/layout.tsx`; every route builds its own
  through `createMetadata()` in `lib/seo.ts`, which sets the title, description,
  canonical URL, Open Graph and Twitter card together so they cannot drift.
- **Structured data** — `lib/structured-data.ts` emits `Organization`,
  `WebSite` and `SoftwareApplication` on every page, `FAQPage` on the home page,
  and `BreadcrumbList` on the inner pages, injected via `components/seo/JsonLd`.
- **Sitemap and robots** — generated by `app/sitemap.ts` and `app/robots.ts`.
  Add new routes to the array in `sitemap.ts`.
- **Social card** — `app/opengraph-image.tsx` renders a 1200×630 PNG at build
  time. No network access needed.
- **Semantics** — one `h1` per page, ordered headings, `header`/`main`/`section`
  landmarks, alt text on images, and a skip link.

For Google Search Console, set `NEXT_PUBLIC_SITE_URL` to the live origin before
building — canonicals, the sitemap and OG URLs are all derived from it. Add the
verification token to `metadata.verification` in `app/layout.tsx`.

---

## Environment variables

One, and it is optional in development:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://www.atithideva.com
```

Falls back to `https://www.atithideva.com`. See `.env.example`.

---

## The demo form

`components/pages/DemoForm.tsx` works with no backend — submissions resolve
locally and the form shows a confirmation. To connect it, replace the body of
`submitDemoRequest()` with a call to your endpoint and keep the same contract
(resolve on success, throw on failure). The error and loading states are already
wired.

---

## Accessibility

Keyboard reachable throughout, with a visible brass focus ring on every
interactive element. The mobile menu traps escape, locks body scroll and returns
focus to its toggle on close. All motion is gated behind
`prefers-reduced-motion` — entrance animations, counters, the room-board
turnover loop and smooth scrolling all stop when it is set.

---

## Deployment

Static output, deployable anywhere that runs Next.js:

```bash
npm run build && npm start
```

On Vercel, import the repository and set `NEXT_PUBLIC_SITE_URL`. On any Node
host, run the build and serve with `npm start` behind a reverse proxy.

---

## Before going live

- [ ] Replace the contact details in `lib/site.ts`
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real origin
- [ ] Drop real screenshots into `public/screenshots/` and fill `data/screenshots.ts`
- [ ] Have `app/privacy/page.tsx` and `app/terms/page.tsx` reviewed by a lawyer
- [ ] Point the demo form at a real endpoint
- [ ] Add the Search Console verification token
