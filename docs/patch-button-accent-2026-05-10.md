# Patch — Sage Accent on Homepage Audience Words (2026-05-10)

**Source:** Discussion-session UX review
**Goal:** Color "home service" and "local services" in sage on the two "grow" buttons on the homepage hero so visitor self-segments faster.

---

## CRITICAL — Production Safety Rule

- Localhost first
- Skip screenshots — pure inline color change. Make it, verify visually in browser, deploy.

---

## Fix — Sage accent on audience words in 3-button hero

**File:** `src/pages/HomePage.tsx` (3-button hero, around lines 121-122)

**Current button text:**
```tsx
<Link to="/home-services" className="btn-outline-accent">
  I want to grow my home service business →
</Link>

<Link to="/local-services" className="btn-outline-accent">
  I want to grow my local services business →
</Link>
```

**New button text — wrap audience words in sage span:**
```tsx
<Link to="/home-services" className="btn-outline-accent">
  I want to grow my <span className="text-accent-light">home service</span> business →
</Link>

<Link to="/local-services" className="btn-outline-accent">
  I want to grow my <span className="text-accent-light">local services</span> business →
</Link>
```

**Use whatever sage class is already in the codebase for accent text** — likely `text-accent-light` (matches the H1 sage line on /websites, /contractors, /local-services). If a different class fits cleaner (e.g., `text-accent` if it gives a closer match to the button outline color), use that.

**Primary button "I need a website →" unchanged** — stays filled green primary. Only the two outlined "grow" buttons get the word accent.

---

## Acceptance criteria

- [ ] Homepage hero button 2 reads with "home service" in sage (matches button outline color)
- [ ] Homepage hero button 3 reads with "local services" in sage (matches button outline color)
- [ ] Primary green button "I need a website →" unchanged
- [ ] Mobile rendering preserved — sage word visible on stacked mobile layout
- [ ] tsc -b clean
- [ ] Hover state still works — sage word should respond to button hover (existing button hover behavior)

---

## Deploy steps

1. `bun run build`
2. `wrangler deploy`
3. `git add src/pages/HomePage.tsx docs/patch-button-accent-2026-05-10.md`
4. `git commit` with HEREDOC:

```
Sage accent on homepage audience words for faster self-segmentation

The two outlined "Grow my [audience] business" buttons read nearly
identical at a glance. Color the audience words (home service, local
services) in sage so the visitor's eye lands on the differentiating
word in under a second.

- Matches button outline color (sage) for visual cohesion
- Doesn't add a new button style — just word-level color emphasis
- Premium editorial pattern (NYT/Vogue color-emphasize key words)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

5. `git push origin main`
6. Verify live: View https://thekhan.io/ and confirm the two "grow" buttons render with sage-accented audience words.

---

**End of brief.**
