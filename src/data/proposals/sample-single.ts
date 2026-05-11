import type { ProposalData } from "./types";

// Template: single-price proposal.
// Use this when you're offering one path only — build-only, or a single retainer rate.
// Copy this file to src/data/proposals/[name].ts, fill in the [bracketed] placeholders,
// customize the narrative, then route it in App.tsx.

export const sampleSingleProposal: ProposalData = {
  meta: {
    clientName: "[Client First Name]",
    businessName: "[Business Name]",
    dateSent: "[Date]",
    seoTitle: "Proposal for [Business Name] — TheKhan",
  },

  whereYouAre: {
    paragraphs: [
      "[Open with the one-line summary of where they are. What's broken, what they're missing, what's costing them. Two sentences max for the lead.]",
      "[Second paragraph: zoom into the specific thing. The detail that makes them nod. Mention a real moment — a missed call, a Google search, a referral that didn't close.]",
      "[Third paragraph: research-backed framing in contractor English. 'Nearly 90% of buyers Google a vendor before they pick up the phone. Word of mouth still closes deals, but more of those deals run through a Google check first.']",
      "[Fourth paragraph: tie it back to them. Why this matters NOW for their business.]",
    ],
  },

  whereYouHeaded: [
    { line: "[Vision bullet 1 — a specific, sensory moment.]" },
    { line: "[Vision bullet 2 — another specific moment, tied to their day-to-day.]" },
    { line: "[Vision bullet 3 — the closing-the-loop win.]" },
  ],

  whatIllDo: [
    { title: "[Deliverable 1 title]", why: "[One sentence explaining WHY it matters — outcome-focused, not how it works.]" },
    { title: "[Deliverable 2 title]", why: "[Why it matters.]" },
    { title: "[Deliverable 3 title]", why: "[Why it matters.]" },
    { title: "[Deliverable 4 title]", why: "[Why it matters.]" },
    { title: "[Deliverable 5 title]", why: "[Why it matters.]" },
    { title: "[Deliverable 6 title]", why: "[Why it matters.]" },
  ],

  proof: [
    { client: "Premier Partners", win: "Now ranks #1 on Google for 'power washing volo' — cited in Google's AI Overview for the same query." },
    { client: "MarioScape", win: "Launched the new brand with 40+ five-star reviews migrated cleanly from the old company — most businesses take years to build that." },
    { client: "Premier Partners", win: "Five hand-coded sites running, Paver Restoration ads bringing in tracked leads with GA4 + call attribution." },
    { client: "Shifa Home Care", win: "Built the family business website at zero cost — pro bono work for the people I came up around." },
  ],

  pricing: {
    variant: "single",
    price: "[$750]",
    priceNote: "[One-time / per month / starting fee]",
    explanation: "[One paragraph explaining what's included for this price, when it's due, and what they get. Plain English. No catches, no asterisks.]",
  },

  nextSteps: {
    timeline: [
      { step: "You reply yes", detail: "I send the agreement same day." },
      { step: "Sign + payment", detail: "[Full amount / first month] due at signing." },
      { step: "Quick onboarding form", detail: "About 20–30 minutes online — covers everything I need to get started." },
      { step: "Site live within [2–3 weeks]" },
      { step: "[Final step — handoff or first report]", detail: "[What that looks like for them.]" },
    ],
    closer: "I take on a handful of clients at a time to make sure each business gets my full attention.",
    cta: "[Pick one — Reply yes and I'll send the agreement.  OR  Agreement is attached in the email this came with.]",
  },
};
