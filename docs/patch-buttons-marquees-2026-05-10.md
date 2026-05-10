# Patch — Button Flexbox Fix + ALL CAPS + Marquee Reorders (2026-05-10)

**Source:** Discussion-session bundled fixes
**Goal:** Fix the persistent space-stripping bug on homepage grow buttons (Flexbox root cause), add ALL CAPS to button 1's "WEBSITE", reorder /home-services top row, reorder /local-services both rows + drop "Lawyers."
**Last updated:** 2026-05-10

---

## CRITICAL — Production Safety Rule

- Localhost first
- CRITICAL: visually confirm spaces around HOME SERVICE / LOCAL SERVICE in localhost BEFORE deploying. The previous 3 deploys all "passed" verification but the spaces were still broken in production. If localhost spaces are correct, deploy. If not, investigate further.

---

## Fix 1 — Definitive Flexbox bypass on homepage grow buttons

**File:** `src/pages/HomePage.tsx` (around lines 121, 124)

**Root cause confirmed:** `btn-outline-accent` is `display: inline-flex` (src/index.css line 2). Inline-flex treats child text + elements as flex items, and Flexbox strips boundary whitespace between flex items. THREE prior fixes failed because text and span remained separate flex items.

**Fix:** wrap ALL button content in a SINGLE outer span. The flex container's only child becomes that wrapper; inside the wrapper, text + audience span flow as normal inline content (no flex applies, whitespace preserved).

**Button 2:**
```tsx
<Link to="/home-services" className="btn-outline-accent text-ink-muted">
  <span>I want to grow my <span className="text-accent-light font-semibold uppercase tracking-wide">home service</span> business &rarr;</span>
</Link>
```

**Button 3:**
```tsx
<Link to="/local-services" className="btn-outline-accent text-ink-muted">
  <span>I want to grow my <span className="text-accent-light font-semibold uppercase tracking-wide">local service</span> business &rarr;</span>
</Link>
```

Note: `local service` is SINGULAR (matches "home service" for parallel structure), even though the page URL is `/local-services` plural.

---

## Fix 2 — ALL CAPS on "WEBSITE" in button 1

**File:** `src/pages/HomePage.tsx` (the primary green button, near lines 119-120)

**Wrap "website" in a span with `uppercase tracking-wide`:**
```tsx
<Link to="/websites" className="btn-primary">
  I need a <span className="uppercase tracking-wide">website</span> &rarr;
</Link>
```

NO color or weight change — `website` stays the same cream color and weight as the rest of the button text, just rendered uppercase.

Why: visual rhythm across the trio. Each of the 3 buttons now has one focal word in caps:
- Button 1: WEBSITE (the deliverable)
- Button 2: HOME SERVICE (the audience)
- Button 3: LOCAL SERVICE (the audience)

Visitor scans the trio, picks up three caps-emphasized words instantly.

**NOTE:** since button 1 is `btn-primary` (filled green, NOT inline-flex), it shouldn't have the same whitespace-stripping issue as the outlined buttons. But if the build session encounters any space-stripping in button 1, apply the same wrapper-span pattern as a safety net.

---

## Fix 3 — /home-services top row marquee reorder

**File:** `src/pages/HomeServicesPage.tsx` (the 2-row TextMarquee section)

**Current top row (10 items):**
> Power Washing · Window Washing · Gutter Cleaning · Landscaping · Snow Removal · Cleaning · Janitorial · Lighting Installation · Junk Removal · Painting

**New top row (10 items — Cleaning, Janitorial promoted to slots 1-2, Power Washing to slot 3):**
> Cleaning · Janitorial · Power Washing · Window Washing · Gutter Cleaning · Landscaping · Snow Removal · Lighting Installation · Junk Removal · Painting

**Bottom row UNCHANGED (9 items):**
> Roofing · HVAC · Plumbing · Electrical · Concrete · Paving · Paver Restoration · Renovation · Demolition

Rationale: marquee first-impression matters. Visitor sees the first few items in the animation cycle before they either commit or scroll past. Cleaning/janitorial are common entry-points; promoting them to slots 1-2 increases first-scan self-identification.

---

## Fix 4 — /local-services row 1 marquee reorder

**File:** `src/pages/LocalServicesPage.tsx` (the 2-row TextMarquee section)

**Current row 1 (8 items):**
> Healthcare · Dental · Real Estate · Financial Planning · Tax Services · Beauty & Wellness · Pet Services · Personal Services

**New row 1 (8 items — broad-appeal categories first, specialized professional services last):**
> Real Estate · Personal Services · Beauty & Wellness · Pet Services · Healthcare · Dental · Financial Planning · Tax Services

Rationale: same first-impression logic. Real Estate, Personal Services, Beauty & Wellness, Pet Services are broader-appeal verticals — more visitors self-identify there. Healthcare/Dental/Financial Planning/Tax Services are more specialized — appropriate later in the scroll.

---

## Fix 5 — /local-services row 2 marquee reorder + DROP "Lawyers"

**File:** `src/pages/LocalServicesPage.tsx` (the 2-row TextMarquee section, row 2)

**Current row 2 (12 items — includes Lawyers):**
> Dentists · Lawyers · Real Estate Agents · Salons · Barbers · Chiropractors · Personal Trainers · Vets · Tutors · Pet Groomers · Locksmiths · Movers

**New row 2 (11 items — Lawyers REMOVED, reordered to lead with Real Estate Agents matching row 1's start):**
> Real Estate Agents · Personal Trainers · Barbers · Salons · Pet Groomers · Movers · Locksmiths · Tutors · Dentists · Chiropractors · Vets

**Specifics:**
- DROP "Lawyers" entirely — earlier decision to skip legal as a vertical (regulatory complexity, ABA advertising rules). Catches an inconsistency that slipped through.
- Lead with Real Estate Agents to brief-parallel row 1's "Real Estate" lead-in
- Barbers BEFORE Salons (Omair preference — also matches the Nour's Barbershop real-client signal)
- Movers BEFORE Locksmiths (Omair preference)

Rationale: rows desync within 5 seconds at different speeds (110s row 1, 130s row 2), but for the first brief moment of overlap, visitor sees "REAL ESTATE" above "REAL ESTATE AGENTS" — clean visual parallel that reinforces the page is for real estate audiences (among others).

---

## Acceptance criteria

- [ ] Homepage grow buttons render with VISIBLE SPACES around "HOME SERVICE" and "LOCAL SERVICE" — verify in localhost browser AND production
- [ ] Button 1 "I need a WEBSITE →" renders with "WEBSITE" in uppercase
- [ ] Hover state on grow buttons: sage background, all text (muted parts + uppercase audience word) flips to dark, fully visible
- [ ] /home-services top row starts with Cleaning · Janitorial · Power Washing
- [ ] /home-services bottom row unchanged
- [ ] /local-services row 1 starts with Real Estate · Personal Services · Beauty & Wellness · Pet Services
- [ ] /local-services row 2 starts with Real Estate Agents · Personal Trainers · Barbers · Salons (note: Barbers BEFORE Salons)
- [ ] /local-services row 2 includes Movers BEFORE Locksmiths
- [ ] /local-services row 2 has NO "Lawyers"
- [ ] tsc -b clean
- [ ] Source structure: each grow button has ONE outer wrapper span containing all text + inner audience span (single flex item pattern)

---

## Critical pre-deploy verification

**Before running wrangler deploy:**
1. Run `bun run dev` and navigate to localhost
2. **Visually inspect both grow buttons** — confirm spaces are visible: "I want to grow my [SPACE] HOME SERVICE [SPACE] business →"
3. Hover both grow buttons — confirm all text remains visible against sage background
4. Verify button 1 "I need a WEBSITE →" renders uppercase
5. Visit /home-services and confirm top row starts with Cleaning
6. Visit /local-services and confirm row 1 starts with Real Estate and row 2 starts with Real Estate Agents (no Lawyers)

**ONLY DEPLOY IF SPACES ARE VISIBLE IN LOCALHOST.** If spaces still missing, that's a deeper CSS issue — investigate the actual computed styles on the wrapper span (might need to add `white-space: normal` or explicit display setting).

---

## Deploy steps (after localhost verified)

1. `bun run build`
2. `wrangler deploy`
3. `git add` specific files:
   - `src/pages/HomePage.tsx`
   - `src/pages/HomeServicesPage.tsx`
   - `src/pages/LocalServicesPage.tsx`
   - `docs/patch-buttons-marquees-2026-05-10.md`
4. `git commit` with HEREDOC:

```
Homepage buttons: definitive Flexbox space fix + ALL CAPS on button 1; marquee reorders on /home-services + /local-services

Button fix: wrap all content inside each grow button in a single outer span
so the inline-flex container has only one flex item. Text + audience span
flow as normal inline content inside the wrapper — Flexbox can't strip
whitespace because there are no flex-item boundaries to strip at. Fourth
attempt; this one is structurally correct against the spec.

Button 1: wrap "website" in uppercase tracking-wide span for visual rhythm
across all three hero buttons (each now has one focal word in caps).

/home-services top row: promote Cleaning + Janitorial + Power Washing to
slots 1-3 for first-scan self-identification.

/local-services row 1: lead with Real Estate, Personal Services, Beauty &
Wellness, Pet Services (broader-appeal categories first).

/local-services row 2: drop Lawyers (legal vertical was dropped earlier in
the bucket framework — this catches a leftover), reorder to lead with Real
Estate Agents matching row 1's start. Barbers before Salons, Movers before
Locksmiths per Omair preference.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

5. `git push origin main`
6. Verify live:
   - Hard refresh https://thekhan.io/ — confirm "I want to grow my HOME SERVICE business →" with VISIBLE SPACES on both grow buttons
   - Confirm "I need a WEBSITE →" uppercase on button 1
   - Visit /home-services — confirm top row leads with Cleaning · Janitorial · Power Washing
   - Visit /local-services — confirm row 1 leads with Real Estate, row 2 leads with Real Estate Agents (no Lawyers)

Report back: localhost space-check confirmed, all 5 fixes verified, wrangler version ID, git commit hash, live verification.

---

**End of brief.**
