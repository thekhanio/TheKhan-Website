import type { ProposalData } from "./types";

// Template: two-path proposal (Path A one-time + Path B retainer).
// Use this as the starting point when you're offering both a build-only option
// AND a website + marketing retainer. Copy this file to src/data/proposals/[name].ts,
// fill in the [bracketed] placeholders, customize the narrative, then route it in App.tsx.

export const sampleTwoPathProposal: ProposalData = {
  meta: {
    clientName: "[Client First Name]",
    businessName: "[Business Name]",
    dateSent: "[Date]",
    seoTitle: "Proposal for [Business Name] — TheKhan",
  },

  whereYouAre: {
    paragraphs: [
      "[Open with the one-line summary of where they are. What's broken, what they're missing, what's costing them. Two sentences max for the lead.]",
      "[Second paragraph: zoom into the specific thing. The detail that makes them nod. Mention a real moment — a missed call, a Google search, a referral that didn't close. Whatever you heard on the call.]",
      "[Third paragraph: research-backed framing in contractor English. Example: 'Nearly 90% of buyers Google a vendor before they pick up the phone. Word of mouth still closes deals, but more of those deals run through a Google check first.']",
      "[Fourth paragraph: tie it back to them. Why this matters NOW for their specific business. No urgency tricks — just honest framing.]",
    ],
  },

  whereYouHeaded: [
    { line: "[Vision bullet 1 — a specific, sensory moment. 'A homeowner Googles X and your name shows up first.' Make it feel like a movie scene, not a feature list.]" },
    { line: "[Vision bullet 2 — another specific moment. Tie to their day-to-day. 'Your phone buzzes with estimate requests while you're on a job.']" },
    { line: "[Vision bullet 3 — the win that closes the loop. The thing that signals 'we made it.' 'When someone Googles you after a referral, they don't bounce. They book.']" },
  ],

  whatIllDo: [
    { title: "[Deliverable 1 title]", why: "[One sentence explaining WHY it matters — outcome-focused, not how it works. 'Tells your story up front + Google reads it properly.']" },
    { title: "[Deliverable 2 title]", why: "[Why it matters — what changes for them.]" },
    { title: "[Deliverable 3 title]", why: "[Why it matters.]" },
    { title: "[Deliverable 4 title]", why: "[Why it matters.]" },
    { title: "[Deliverable 5 title]", why: "[Why it matters.]" },
    { title: "[Deliverable 6 title]", why: "[Why it matters.]" },
  ],

  // Proof — real wins, same for every prospect. Update over time as new wins land.
  proof: [
    { client: "Premier Partners", win: "Now ranks #1 on Google for 'power washing volo' — cited in Google's AI Overview for the same query." },
    { client: "MarioScape", win: "Launched the new brand with 40+ five-star reviews migrated cleanly from the old company — most businesses take years to build that." },
    { client: "Premier Partners", win: "Five hand-coded sites running, Paver Restoration ads bringing in tracked leads with GA4 + call attribution." },
    { client: "Shifa Home Care", win: "Built the family business website at zero cost — pro bono work for the people I came up around." },
  ],

  pricing: {
    variant: "two-path",
    pathA: {
      name: "Just the Website",
      price: "[$750]",
      priceNote: "One-time",
      blurb: "[One-sentence summary of what Path A delivers and how long it takes.]",
      bullets: [
        "[Path A deliverable 1]",
        "[Path A deliverable 2]",
        "[Path A deliverable 3]",
        "[Path A deliverable 4]",
      ],
      footer: "After delivery, it's yours. No ongoing cost.",
    },
    pathB: {
      name: "Website + Marketing",
      price: "[$900] first month",
      priceNote: "Then [$599]/month — month-to-month, cancel any month with 72 hours notice before next bill",
      blurb: "[One-sentence summary of what Path B delivers ongoing.]",
      bullets: [
        "[Path B bigger website scope]",
        "Everything in Path A, plus ongoing monthly work (SEO, GBP, listings, reviews, reporting)",
        "Self-editing dashboard included",
        "Month-to-month — 72-hour cancel before next billing date",
      ],
      recommended: true,
      footer: "[$900] covers your first month — full website build + setup. [$599] every month after — ongoing work to keep your site ranking.",
    },
  },

  nextSteps: {
    timeline: [
      { step: "You reply yes", detail: "I send the agreement same day." },
      { step: "Sign + Month 1 payment", detail: "Path A: full amount up front. Path B: first month's [$900]." },
      { step: "Quick onboarding form", detail: "About 20–30 minutes online — covers everything I need to get started." },
      { step: "Site live within [2–3 weeks (Path A) or 30–45 days (Path B)]" },
      { step: "Monthly report on the 1st", detail: "Path B only. What shipped, what's working, what we adjust." },
    ],
    closer: "I take on a handful of clients at a time to make sure each business gets my full attention.",
    cta: "[Pick one — Reply yes and I'll send the agreement.  OR  Agreement is attached in the email this came with.]",
  },
};
