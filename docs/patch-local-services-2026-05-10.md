# Patch — /local-services Page + Homepage Routing (2026-05-10)

**Source:** Discussion-session decisions, full framework locked
**Goal:** Build new `/local-services` page (parallel to `/contractors`) + update homepage to route 3 audiences + update nav across all pages.
**Last updated:** 2026-05-10

---

## CRITICAL — Production Safety Rule

**NEVER deploy to thekhan.io without explicit "deploy" approval from Omair.**

- Localhost only (`bun run dev` → `http://127.0.0.1:5173`)
- Do NOT run `wrangler deploy` or `bun run deploy`
- Take screenshots after each major task

---

## Approach

1. **Clone `ContractorsPage.tsx` → `LocalServicesPage.tsx`** as the structural template — same sections, same components, same layout
2. **Replace audience-specific copy** per the spec below (eyebrow, H1, subhead, marquee, pain points, polarizer)
3. **Carry over** verbatim: TLDR, Pricing, How It Works, Terms, What I Actually Do, Contact, motion, animations, CTA
4. **Update homepage hero** from 2 CTAs to 3 (build vs grow contracting vs grow local services)
5. **Update nav** sitewide to add "For Local Services"
6. **Update Worker** for new route meta + schema (REMEMBER the Worker/React desync rule)
7. **Update sitemap + robots** for the new public page
8. **Generate OG image** for /local-services using the existing Satori script

---

## TASK 1 — Create `src/pages/LocalServicesPage.tsx`

**Method:** Clone `src/pages/ContractorsPage.tsx` and replace the audience-specific content. Keep all structural elements, components, motion, sections, and styling identical.

### 1a. Hero changes

**Eyebrow:**
- Was: `FOR CONTRACTORS`
- New: `FOR LOCAL SERVICES`

**H1 (KEEP IDENTICAL):**
> YOU DO THE WORK.
> I MAKE SURE PEOPLE FIND YOU.

**Subhead:**
- Was: `Contractor marketing that makes your phone ring.`
- New: `Local services marketing that brings in real business.`

**CTAs (keep same buttons):**
- "See if we're a fit →" → `#fit`
- "See pricing →" → `#pricing`

**Micro-strips inside hero (3 lines, keep same styling, replace contractor-specific lines):**

Was:
1. `— I work with a handful of contractors at a time. —`
2. `— Before TheKhan, I built my own home service company to 84 clients. Closed it in March — the phone still rings from the SEO work I did, and those calls now go to the contractors I work with. —`
3. `— Serving contractors across Chicagoland — Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Wilmette, Evanston, Skokie, Arlington Heights, Naperville, Oak Park, and the rest of the Chicago metro. Remote clients welcome anywhere in the US. —`

New:
1. `— I work with a handful of local service businesses at a time. —`
2. `— Before TheKhan, I built my own home service company to 84 clients. Closed it in March — the phone still rings from the SEO work I did, and those calls now go to the businesses I work with. —`
3. `— Serving local service businesses across Chicagoland — Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Wilmette, Evanston, Skokie, Arlington Heights, Naperville, Oak Park, and the rest of the Chicago metro. Remote clients welcome anywhere in the US. —`

(Keep the `<CountUp to={84} ... />` element on line 2.)

### 1b. TLDR strip (KEEP IDENTICAL to /contractors)

```
THE SHORT VERSION
• Site, SEO, ads, reviews, reports — I run all of it
• 3 tiers: $600, $1,260, or $2,200/mo
• Month-to-month — cancel any month with 72 hours notice

Skip to: Pricing · How it works · Am I a fit?
```

### 1c. Text marquee (REPLACE — 8 category-level items, all LSA-eligible verticals)

**Style:** Same as /contractors marquee — single line, slower scroll, all SOLID text. Same component (`<TextMarquee>`), just different items.

**Items (8 categories, in this order — heaviest/most-recognized first, specialty at end):**
> Healthcare · Dental · Real Estate · Financial Planning · Tax Services · Beauty & Wellness · Pet Services · Personal Services

### 1d. Pain points (REPLACE — 4 universal local services pains)

**Section header:** `Sound familiar?` (same as /contractors)

**4 pain blocks:**

**Block 1:**
- Title: `People in your area are searching for what you do. They're not finding you.`
- Body: `When someone Googles your service, they see three other businesses first — never yours. You're losing the click before they even know you're there.`

**Block 2:**
- Title: `Your website looks the part. Nobody's reaching out.`
- Body: `Maybe you spent good money on it. Maybe a friend built it. Either way, it's online — but the calls, bookings, and form fills aren't coming. Your site isn't doing the work.`

**Block 3:**
- Title: `You pay for ads. You can't tell if they work.`
- Body: `Whether you run them yourself or pay someone, there's a monthly report full of numbers nobody explains. You can't tell if the new client came from the ad, the listing, or a word-of-mouth referral. You just know it's expensive.`

**Block 4:**
- Title: `Your competitor keeps showing up first.`
- Body: `Same area. Same service. Similar reviews. But they're at the top of the map and you're on page two. They're getting the customers you should be getting.`

### 1e. Pricing section (KEEP IDENTICAL to /contractors)

Same 3 tier cards (Foundation $600 / Engine $1,260 / Partnership $2,200), same setup block, same add-ons block. No copy changes.

### 1f. How It Works (KEEP IDENTICAL to /contractors)

Same MY SIDE / YOUR SIDE 2-column layout. Universal copy already.

### 1g. The Terms (KEEP IDENTICAL to /contractors)

Same inset card, same copy.

### 1h. What I Actually Do (KEEP IDENTICAL to /contractors)

Same SEO/AEO/GEO/Local SEO/Technical/On-page/Off-page definitions block. Already universal.

### 1i. Polarizer "Think we're a fit?" (REPLACE — 4 BFY identical + 5 NAF modified + 1 NEW)

**Section header:** `Think we're a fit?` (same)

**Built For You If (KEEP IDENTICAL — 4 items):**
1. You're good at the work but slow months still scare you.
2. This is your full-time business — not a side gig.
3. You're tired of reports full of numbers nobody explains — and someone telling you "it's working."
4. You can wait 3 to 6 months for SEO to compound — once you're ranking, it takes less work to hold than it did to earn. (My old company closed in March. The phone still rings.)

**Not A Fit If (6 items — items 2-5 modified, item 6 NEW):**
1. Your budget is under $600/mo.
2. You want me to promise you a specific number of leads or new clients. *(modified)*
3. You're starting from zero — no past customers, no online presence — and need new clients this week. *(modified)*
4. You expect SEO to be driving calls and bookings inside 30 days. Google just doesn't work that way — trust takes 3 to 6 months to build. Wish it were faster. *(modified)*
5. You're running ads and want them at full capacity day one. Ads take 30 to 60 days of real data to optimize — you'll get calls and inquiries in the meantime, just not the full volume yet. *(modified)*
6. **You're a franchise location with corporate-mandated marketing. I work with independents — not franchises bound by HQ's rules.** *(NEW)*

### 1j. Contact section (KEEP IDENTICAL to /contractors)

Same form, same form fields, same contact info, same final CTA "Tell me about your business →" with `cta-orbit`.

### 1k. Motion (KEEP IDENTICAL to /contractors)

- Hero gradient drift
- Hero ClipReveal H1 wipe (1600ms, same easing)
- One-shot count-up on "84 clients" line
- ScrollReveal on sections
- cta-orbit on final CTA

### 1l. SEO meta + schema

**Page title:** `Marketing for Local Services Businesses | TheKhan`
**Meta description:** `Local services marketing that brings in real business. Healthcare, dental, real estate, financial, beauty & wellness, pet services. Month-to-month, no contracts.`
**Canonical:** `https://thekhan.io/local-services`
**OG image:** `https://thekhan.io/local-services-og.png` (will be generated in Task 7)
**Schema:** Same set as /contractors — BreadcrumbList, Service, FAQPage. Adapt the FAQPage to mention local services audience instead of contractors. Adapt the Service schema's `areaServed` and description.

---

## TASK 2 — Update homepage hero (3-button routing)

**File:** `src/pages/HomePage.tsx`

**Current hero buttons:**
```
[I need a website →]    [I want to grow my business →]
        ↓                          ↓
    /websites                 /contractors
```

**New hero buttons (3-door):**
```
[I need a website →]    [Grow my contracting business →]    [Grow my local services business →]
        ↓                              ↓                                    ↓
    /websites                     /contractors                         /local-services
```

**Visual hierarchy:**
- "I need a website →" stays the **primary** filled green button (largest visual weight)
- The two "Grow my X business →" buttons are **secondary** outlined buttons (visually equal to each other, slightly smaller than the primary)
- All three sit on one row on desktop, stack vertically on mobile in this exact order

**Keep:** the existing tertiary "See what I've built →" link below the buttons (links to /portfolio).

---

## TASK 3 — Update nav (sitewide)

**File:** `src/components/Layout.tsx` (or wherever the nav links live)

**Current nav order:**
> Home · Websites · For Contractors · Portfolio · About

**New nav order:**
> Home · Websites · For Contractors · For Local Services · Portfolio · About

Add "For Local Services" between "For Contractors" and "Portfolio". Same styling as other nav items.

**Mobile nav menu:** add the same item in the same position.

---

## TASK 4 — Add route in App.tsx

**File:** `src/App.tsx`

Add the new route alongside the existing /contractors route:

```tsx
import LocalServicesPage from "./pages/LocalServicesPage";
// ...
<Route path="/local-services" element={<LocalServicesPage />} />
```

---

## TASK 5 — Update Worker for /local-services route

**File:** `worker/index.js`

**REMEMBER the Worker/React desync rule** — anything affecting SEO meta tags must be updated in BOTH the React layer AND the Worker.

**Add to ROUTE_META:**

```js
"/local-services": {
  title: "Marketing for Local Services Businesses | TheKhan",
  description: "Local services marketing that brings in real business. Healthcare, dental, real estate, financial, beauty & wellness, pet services. Month-to-month, no contracts.",
  canonical: "https://thekhan.io/local-services",
  ogImage: "https://thekhan.io/local-services-og.png",
},
```

**Add to ROUTE_SCHEMAS** (or equivalent structure):

Mirror the /contractors entry:
- BreadcrumbList for /local-services
- Service schema for /local-services (different name + description, same provider)
- FAQPage with these questions (mirror /contractors structure but with local-services audience):
  - "How much does marketing for local services businesses cost?" → Three monthly tiers: Foundation ($600/mo), Engine ($1,260/mo — most common), and Partnership ($2,200/mo). Build + setup is a one-time $1,699...
  - "How long before I see more clients?" → Same answer as /contractors but s/calls/clients
  - "Do you work with [specific industries]?" → Healthcare, dental, real estate, financial, beauty & wellness, pet services, personal services — all LSA-eligible service businesses.
  - "What Chicago suburbs do you serve?" → Same as /contractors
  - One more relevant FAQ if appropriate

---

## TASK 6 — Update sitemap

**File:** `public/sitemap.xml`

Add a `<url>` entry for `https://thekhan.io/local-services` with the same `<changefreq>` and priority as `/contractors`.

Updated sitemap should now have **6 URLs:** `/`, `/websites`, `/contractors`, `/local-services`, `/portfolio`, `/about`.

---

## TASK 7 — Generate OG image for /local-services

**File:** `scripts/generate-og.ts` (existing Satori-based generator)

Add a 6th entry to the OG image array for /local-services:

```ts
{
  filename: "local-services-og.png",
  headlineLine1: "You do the work.",
  headlineLine2: "I make sure people find you.",
  subhead: "Local services marketing that brings in real business.",
}
```

(Note: this matches the H1 + subhead pattern from /contractors and /local-services. Same composition, same layout, same fonts, same colors.)

Run: `bun run scripts/generate-og.ts` (or whatever the existing command is) to regenerate. Verify `public/local-services-og.png` exists at 1200×630, under 100KB.

---

## TASK 8 — Verify

- [ ] `bun run dev` starts cleanly
- [ ] Navigate to `http://127.0.0.1:5173/local-services` — page renders
- [ ] All sections present: Hero / Marquee / Pain Grid / Pricing / How / Terms / What I Do / Polarizer / Contact
- [ ] Anchor links work: #pricing, #how-it-works, #fit, #contact
- [ ] H1 ClipReveal animation fires on page load
- [ ] Marquee scrolls with the 8 categories
- [ ] Hero gradient drift visible (matches /contractors intensity)
- [ ] Final CTA "Tell me about your business →" with cta-orbit
- [ ] Homepage now shows 3 buttons in the hero, all routing correctly
- [ ] Nav shows "For Local Services" between "For Contractors" and "Portfolio"
- [ ] Mobile renders cleanly (375px and 768px viewports)
- [ ] tsc -b clean
- [ ] No console errors
- [ ] view-source on /local-services shows new meta tags
- [ ] view-source on /local-services shows new OG image URL
- [ ] Sitemap includes the new URL

---

## Screenshots

Save to `~/Projects/sites/thekhan/docs/screenshots-local-services-2026-05-10/`:
- 01-local-services-desktop.png (full page, desktop)
- 02-local-services-mobile.png (full page, mobile)
- 03-local-services-hero-desktop.png (hero close-up showing eyebrow/H1/subhead/TLDR/marquee start)
- 04-homepage-3-buttons-desktop.png (homepage hero close-up showing the new 3-button layout)
- 05-homepage-3-buttons-mobile.png (mobile stacking)
- 06-nav-with-local-services.png (nav close-up showing new menu item)
- 07-local-services-og.png (the generated OG image)

---

## NOT in this brief (parked)

- Agreement files refresh (still listed in original docs)
- CMD tier sync to Foundation naming
- Worker /contractors FAQ schema sync caught + fixed earlier — verify nothing regressed
- Mobile QA at true 375px (chrome-devtools clamps higher)

---

**End of brief.**
