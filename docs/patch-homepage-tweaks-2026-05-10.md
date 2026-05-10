# Homepage Tweaks Patch — 2026-05-10

**Source:** Discussion-session review of homepage post-deploy
**Status:** 2 fixes. Both on homepage only.
**Last updated:** 2026-05-10

---

## CRITICAL — Production Safety Rule

- Localhost first (`bun run dev` → `http://127.0.0.1:5173`)
- Do NOT deploy until Omair confirms after seeing screenshots

---

## Fix 1 — "What's Different" section reframe (homepage only)

**File:** `src/pages/HomePage.tsx`

Find the "What's Different" / "Code beats a template" section (the one with the architect blueprint grid backdrop, mid-page after the trust strip).

**Current state (approximate):**
- Headline: "Code beats a template. Every time."
- Bullets: fast / built to rank / yours from day one / take the files anywhere / month-to-month, 72-hour notice / no annual contract / no platform locks

**Replace with:**

**New headline (two lines):**
> Line 1: A site that doesn't just look good — it brings in real business.
> Line 2: That's why I write the code from scratch, not stamp it from a template.

**Visual treatment:**
- Line 1 = primary headline, Anton, large size, cream — same display H2 style as the section currently uses
- Line 2 = supporting subhead, Manrope or smaller display, muted/sage accent — reads as the WHY behind the headline

**New bullets (4, replace ALL existing bullets — keep all-outcomes):**

```
• Built to load fast, rank on Google, and bring in calls
• Yours from day one — files, domain, logins, all under your name
• No platform locks — move it anywhere, anytime
• Month-to-month — cancel any month with 72 hours notice
```

**Why this change:**
- Original headline ("Code beats a template") was method-talk → violates voice rule "clients don't care about code, lead with outcomes"
- New version puts OUTCOME first ("brings in real business"), then code message survives as the WHY in line 2
- Brand pillar ("Code will always outperform a template") still on the page, just reframed
- Bullets all map to outcomes or ownership — no method-talk in any bullet
- "A site that doesn't just look good" implicitly disses templates without naming them — clean editorial, not defensive comparison

**Section position UNCHANGED.** Still sits between the Trust Strip and the Editorial Gallery.

**Section background UNCHANGED.** Still uses the architect blueprint grid backdrop.

**Animations UNCHANGED.** Existing fade-in-on-scroll on the headline, etc., stay as-is.

---

## Fix 2 — Homepage 3-button hero parallelism

**File:** `src/pages/HomePage.tsx` (hero section, around line 119-123)

**Current state (3 buttons, mismatched parallel structure):**

```
[I need a website →]   [Grow my contracting business →]   [Grow my local services business →]
```

**Problem:** First button starts with "I", second + third start with imperative verb "Grow." Parallelism fails. Visitor's eye trips on it.

**Replace with (all "I" voice, parallel structure):**

```
[I need a website →]   [I want to grow my contracting business →]   [I want to grow my local services business →]
```

**Implementation:**
- Same primary green `btn-primary` for "I need a website →"
- Same outlined `btn-outline-accent` for both "I want to grow..." buttons
- Same flex-row on desktop / stack on mobile behavior (already working)
- Routes unchanged: /websites, /contractors, /local-services

**Why this change:**
- Maintains your locked sitewide "I" voice
- Strongest parallel structure — all three buttons start "I [verb]"
- Reads as a visitor declaring intent ("I need a website" / "I want to grow...") = self-segmentation through their own statement
- Buttons may need slightly tighter padding or smaller font to fit on one row at desktop width — builder's call. If they wrap to 2 rows on desktop, that's also fine — flex-wrap handles it.

---

## Acceptance criteria

- [ ] Homepage "What's Different" section now leads with outcome line: "A site that doesn't just look good — it brings in real business."
- [ ] Subline: "That's why I write the code from scratch, not stamp it from a template."
- [ ] 4 bullets, all outcomes/ownership, no method-talk in any bullet
- [ ] Homepage hero has 3 buttons reading: "I need a website →" / "I want to grow my contracting business →" / "I want to grow my local services business →"
- [ ] Buttons fit cleanly on desktop (one row OR clean two-row wrap, no awkward overflow)
- [ ] Mobile stacks vertically in same order as before
- [ ] No regression on other homepage sections
- [ ] tsc -b clean

---

## Screenshots

Save to `~/Projects/sites/thekhan/docs/screenshots-homepage-tweaks-2026-05-10/`:
- 01-whats-different-desktop.png — close-up of the new headline + bullets
- 02-3-buttons-desktop.png — close-up of the 3 hero buttons (verify parallel structure visible)
- 03-3-buttons-mobile.png — mobile stacking
- 04-homepage-fullpage-desktop.png — verify nothing else regressed

---

## Deploy steps (after Omair confirms screenshots)

1. `bun run build`
2. `wrangler deploy`
3. `git add` specific files only:
   - `src/pages/HomePage.tsx`
   - `docs/patch-homepage-tweaks-2026-05-10.md`
   - `docs/screenshots-homepage-tweaks-2026-05-10/*`
4. `git commit` with HEREDOC:

```
Homepage: outcome-led "What's Different" reframe + parallel 3-button hero

- "What's Different" section: replace "Code beats a template" headline
  with outcome-first lead — "A site that doesn't just look good — it
  brings in real business." Code-vs-template message survives as the
  WHY in the supporting subline. Bullets simplified to 4 outcome/
  ownership beats (no method-talk).
- 3-button hero on homepage now reads "I need a website" / "I want to
  grow my contracting business" / "I want to grow my local services
  business" — parallel "I" voice, fixes the imperative-vs-statement
  mismatch.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

5. `git push origin main`
6. Verify live: curl homepage, confirm new headline + button text in HTML

---

**End of brief.**
