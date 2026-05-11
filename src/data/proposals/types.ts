// Per-prospect proposal data shape. Drop a new file in this folder + add one
// <Route /> line in App.tsx for each new prospect. ~15 min to spin up.

export type ProposalPricingPath = {
  name: string;
  price: string;
  priceNote?: string;
  blurb?: string;
  bullets: string[];
  recommended?: boolean;
  footer?: string;
};

export type ProposalData = {
  meta: {
    clientName: string;        // first name for opener — "Calvin"
    businessName: string;      // full business name — "Crystal Clear"
    dateSent: string;          // "May 8, 2026"
    seoTitle?: string;
  };

  // Section 2 — Where You Are. Problem framing, deck-style. 3-5 short paragraphs.
  whereYouAre: {
    paragraphs: string[];
  };

  // Section 3 — Where You're Headed. 3 sensory future-state bullets.
  whereYouHeaded: Array<{ line: string }>;

  // Section 4 — What I'll Do. 6-8 deliverables, title + why-it-matters one-liner.
  // WHY not HOW per `feedback-client-language-not-code.md`.
  whatIllDo: Array<{ title: string; why: string }>;

  // Section 5 — Proof. 3-4 named wins. Outcomes only, no method.
  // If empty array, section renders nothing.
  proof: Array<{
    client: string;
    win: string;
    screenshot?: string;       // optional /portfolio/* path
  }>;

  // Section 6 — Pricing. Variant determines layout.
  pricing:
    | {
        variant: "single";
        price: string;
        priceNote?: string;
        explanation: string;
      }
    | {
        variant: "two-path";
        pathA: ProposalPricingPath;
        pathB: ProposalPricingPath;
      };

  // Section 7 — What Happens Next. 5-step timeline + scarcity closer + CTA.
  nextSteps: {
    timeline: Array<{ step: string; detail?: string }>;
    closer?: string;
    cta: string;               // "Reply yes and I'll send the agreement."
  };

  // ---- Optional sections (render only if present) ----

  // Demo links (Calvin pattern — when you've built prebuilt demos to show)
  demos?: Array<{
    label: string;             // "Demo A"
    url: string;
    description?: string;
  }>;

  // Free-form custom blocks (prospect-specific framing that doesn't fit elsewhere)
  customBlocks?: Array<{
    heading: string;
    body: string;              // supports basic markdown — paragraphs, bullets
  }>;
};
