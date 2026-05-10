# OG Image Generation Patch — 2026-05-10

**Goal:** Generate 5 branded per-page OG images (1200×630) and replace the existing placeholders in `/public/`.
**Constraint:** TK logo MUST be the actual existing file (no AI hallucination, no edits to the logo design).

---

## CRITICAL — Production Safety Rule

**This task is local-asset generation only.** No `wrangler deploy` until Omair explicitly approves AFTER reviewing the generated images.

- Generate images locally
- Save to `/public/`
- Verify they render correctly via local dev server
- DO NOT deploy until told

---

## Tooling

**Recommended: Satori** (Vercel's OG image library — built for this exact purpose).

Install: `bun add satori @resvg/resvg-js`

Why Satori: renders JSX → SVG → PNG. Works natively with React/JSX patterns. Brand fonts loaded via base64. Logo composited via `<img>` tag pointing at the actual file.

Alternative: Sharp + canvas-based composition. Use whichever the build session is most comfortable with — output spec is the same.

---

## Output spec

**5 PNG files** (replace existing .jpg files):
- `public/og-image.png` (homepage)
- `public/websites-og.png`
- `public/contractors-og.png`
- `public/portfolio-og.png`
- `public/about-og.png`

**Each file:**
- **Dimensions:** 1200×630 px (Open Graph standard)
- **Format:** PNG (Satori native output)
- **Color profile:** sRGB
- **Target file size:** under 300KB each

**After generating PNGs, update references in:**
- `src/components/SEO.tsx` line 23: `DEFAULT_OG_IMAGE = "https://thekhan.io/og-image.png"` (was .jpg)
- `src/pages/AboutPage.tsx` line 83: change to `.png`
- `src/pages/ContractorsPage.tsx` line 187: change to `.png`
- `src/pages/HomePage.tsx` line 32 (schema reference): change to `.png`
- `src/pages/WebsitesPage.tsx` and `src/pages/PortfolioPage.tsx` — verify their `OG_IMAGE` constants and update to `.png`
- `worker/index.js` — grep for any og:image references and update to `.png` too (REMEMBER the Worker/React desync rule — both layers!)

Optional: keep the old .jpg files in `public/` for a few days as fallback, OR delete them. Recommend keep + add to .gitignore later.

---

## Design template (same composition for all 5)

**Background:** warm dark grey `#1F1B17` (matches site `section-base`)

**Subtle background atmospherics:** very faint sage glow in the upper-right corner — radial gradient, ~5% opacity. This mirrors the on-site gradient drift but as a static still. Keep extremely subtle — should NOT compete with type.

**Layout (1200×630, padding 80px all sides):**

```
┌───────────────────────────────────────────────────────────┐
│  [TK | THE KHAN logo]                                     │  ← top-left
│  height ~64px, white version                              │
│                                                           │
│                                                           │
│                                                           │
│  [HEADLINE LINE 1]                                        │  ← Anton, ~96-110px,
│  [HEADLINE LINE 2 — sage accent]                          │     line-height 0.95,
│                                                           │     cream / sage
│                                                           │
│  [Subhead in Manrope]                                     │  ← Manrope 400, ~28px,
│  ~28px, max 2 lines, ink-muted                            │     muted cream
│                                                           │
│                                                           │
│  thekhan.io  ·  DEERFIELD, IL                             │  ← bottom-left,
└───────────────────────────────────────────────────────────┘     JetBrains Mono
                                                                  small caps, ~14px,
                                                                  sage accent
```

**Type stack:**
- **Anton** (headlines) — load from Google Fonts (woff2) into Satori
- **Manrope 400** (body subhead) — same
- **JetBrains Mono 500** (footer location strip) — same

**Color palette:**
- Background: `#1F1B17`
- Headline cream: `#F5F1EB`
- Headline sage accent: `#9BC4A8`
- Subhead muted: `#C7C3BC` (slightly muted cream for readability without being washed out)
- Footer location: `#9BC4A8` (sage)

**Logo source:** `/public/portfolio/logo-white.png` — load via Satori's `<img src="data:..." />` (base64-encoded).

---

## Per-page content

### 1. Homepage — `og-image.png`

**Headline line 1:** `Websites that rank.`
**Headline line 2 (sage):** `Marketing that pays off.`
**Subhead:** `I build websites and run the marketing that brings in real business.`

### 2. /websites — `websites-og.png`

**Headline line 1:** `A site you own.`
**Headline line 2 (sage):** `Built to rank.`
**Subhead:** `Custom websites in about 30 days. You own everything.`

### 3. /contractors — `contractors-og.png`

**Headline line 1:** `You do the work.`
**Headline line 2 (sage):** `I make sure people find you.`
**Subhead:** `Contractor marketing that makes your phone ring.`

### 4. /portfolio — `portfolio-og.png`

**Headline line 1:** `Who I've built for.`
**Headline line 2 (sage):** `11 sites, all live.`
**Subhead:** `Click any of them to see for yourself.`

### 5. /about — `about-og.png`

**Headline line 1:** `Every business has two jobs.`
**Headline line 2 (sage):** `The second one is all I do now.`
**Subhead:** `Solo, based in Deerfield, IL.`

(Slight headline tweak vs the current /about hero which uses three-line breakout — for OG image readability, condense to two lines.)

**Footer line on every image:** `thekhan.io  ·  DEERFIELD, IL`

---

## Acceptance criteria

- [ ] 5 PNG files exist in `public/`, dimensions 1200×630, under 300KB each
- [ ] All 5 use the actual TK logo file (no AI-generated logo)
- [ ] Brand colors + fonts identical to live site
- [ ] Each headline matches its page's H1 messaging
- [ ] Subtle sage glow in upper-right of each image (not overwhelming)
- [ ] References in `src/components/SEO.tsx` + each page's OG image constant updated to `.png`
- [ ] `worker/index.js` references also updated to `.png` (Worker/React desync rule)
- [ ] tsc -b clean
- [ ] Verify locally: `bun run dev`, view-source on each page, check `<meta property="og:image">` resolves to the new PNG
- [ ] Optional: paste the new image URLs into LinkedIn Post Inspector or Twitter Card Validator (post-deploy) for final preview check

---

## Screenshots / artifacts

Save the 5 generated OG images as previews in `~/Projects/sites/thekhan/docs/og-images-preview-2026-05-10/`:
- 01-home-og.png
- 02-websites-og.png
- 03-contractors-og.png
- 04-portfolio-og.png
- 05-about-og.png

(These are copies of the actual `/public/*.png` files, just for review convenience.)

When done, report back with:
1. All 5 images generated + verified at 1200×630
2. References updated in SEO.tsx + each page + worker/index.js
3. tsc -b status
4. Any judgment calls (e.g., subtle sage glow intensity, logo size on the canvas, font fallback if Anton has rendering issues in Satori)

---

**End of brief.**
