# Meander & Myrtle — Deloraine Day Spa

Vanilla HTML / CSS / JS. No build step, no framework, no dependencies.
Upload the folder to any static host (Netlify, Cloudflare Pages, GitHub Pages,
cPanel) and it runs. Must be served over **HTTPS** for the PWA to install.

## Change your business details in one place

Open `assets/js/data.js` and edit the `SITE` object at the top. Business name,
phone, email, address, hours, gift card payment link. Every button, `tel:` link,
`mailto:` link and heading on the site reads from it.

Everything currently in there is a **placeholder**, including:

| Field | Currently |
|---|---|
| `SITE.name` | Meander & Myrtle |
| `SITE.phone` / `phoneDial` | 0456 148 459 — **real** |
| `SITE.email` | hello@meanderandmyrtle.com.au |
| `SITE.address` | 00 Emu Bay Road |
| `SITE.therapist.name` | Brea — **real** |
| `SITE.giftCardUrl` | https://example.com/gift-cards |

## Photography

Drop files into `assets/img/` and name them in the `IMAGES` object in
`data.js`. Slots: `room`, `brea`, `sauna`, `chair`, `gift`. Leave a slot empty
and the site draws a woven texture in its place — it never shows a broken
image or a stock photo. Suggested sizes: 1600px wide, WebP or JPG.

## Files

```
index.html               structure only
assets/css/style.css     all styling and motion
assets/js/data.js        config + every word of treatment copy
assets/js/app.js         rendering and interaction
manifest.webmanifest     PWA install metadata
sw.js                    offline caching
offline.html             fallback when there is no cache and no signal
assets/icons/            app icons (SVG + PNG + maskable)
```

## How the treatment menu works

Treatments live in the `SERVICES` array. Each entry lists **only the durations
it is actually offered at**, in a `prices` object:

```js
prices: { 30: 65, 45: 90, 60: 118, 90: 168 }
```

The duration rail at the top of the menu filters to that length and re-prices
every card. Add, remove or reprice a treatment by editing the array — nothing
else needs touching.

Categories are `body`, `face` and `hands`.

## Pricing basis

Prices were set against the northern Tasmanian market (Launceston clinics and
day spas surveyed August 2026), positioned slightly under Launceston CBD rates
to suit Deloraine. Sanity-check them against your costs before going live.

## Sources

Massage chair specifications: Masseuse Massage Chairs, Remedial Deluxe+®
product page. Infrared sauna wavelength ranges and clinical claims: published
far-infrared sauna research summaries. Claims in the sauna copy are written
conservatively and none promise a medical outcome.

## Progressive web app

- Service worker precaches the whole site on first visit
- Menu, prices, sauna and chair content all work with no signal
- Booking form and gift card link need a connection
- An offline banner appears automatically when the connection drops
- "Add to Home Screen" gives a standalone app with three shortcuts

Bump `VERSION` in `sw.js` whenever you change content, or returning visitors
will keep seeing the cached version.

## Build passes

- **Pass 1 (this one)** — architecture, all copy, working menu engine, all
  sections, PWA baseline, responsive down to 320px.
- **Pass 2 (this one)** — scroll-driven hero parallax, cross-faded menu
  categories via the View Transitions API, expandable sauna bento tiles, an
  interactive reclining chair diagram, sauna heat comparison and treatment
  pairings, photography slots, gift card pointer tilt.
- **Pass 3** — accessibility audit, performance, structured data for local
  SEO, offline hardening, final polish.
