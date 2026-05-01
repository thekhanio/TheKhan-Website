import ReportPage, { type ReportConfig } from "./ReportPage";

const marioReport: ReportConfig = {
  client: { name: "MarioScape", businessName: "MarioScape" },
  clientLogo: {
    src: "/portfolio/marioscape-logo.png",
    alt: "MarioScape",
    maxHeightClass: "max-h-32 md:max-h-44",
  },
  currentMonth: {
    month: "April 2026",
    headline:
      "14 customer leads · $0 ad spend · 44 Google reviews preserved through GBP migration",

    headlineMetrics: [
      { value: "14", label: "customer leads", sublabel: "demonstration month" },
      { value: "$0", label: "ad spend", sublabel: "every lead earned, not bought" },
      { value: "44", label: "Google reviews", sublabel: "40 preserved + 4 new in April" },
      { value: "5.0", label: "real customer rating", sublabel: "across 41 real reviews" },
    ],

    leadTransparency: {
      intro:
        "April was a demonstration month — no billing. March 16–31 was the kickoff at $150 (foot-in-the-door, not full pricing). The ongoing partnership tier hasn't been set yet. Here's what came in across the demo period.",
      math: {
        rows: [
          { operator: "+", value: 5, label: "form submissions on marioscape.com", tone: "muted" },
          { operator: "−", value: 1, label: "internal test (excluded)", tone: "negative" },
          { operator: "+", value: 10, label: "forwarded leads from the Clean & Green channel", tone: "positive" },
        ],
        total: { value: 14, label: "real customer leads in April" },
      },
    },

    leadSources: [
      {
        label: "Google Search",
        detail: "Found you on Google, filled out the form on marioscape.com",
        count: 2,
        type: "organic",
      },
      {
        label: "Direct / Referral",
        detail: "Visited the site through other channels (typed URL, referred to you)",
        count: 2,
        type: "organic",
      },
      {
        label: "C&G channel",
        detail: "Inbound leads from Clean & Green forwarded directly to you. No referral fee, no markup.",
        count: 10,
        type: "forwarded",
      },
    ],
    leadSourcesNote:
      "All 14 leads delivered with $0 in ad spend. Foundation is doing the work.",

    gbpProfiles: [
      {
        name: "MarioScape",
        views: 278,
        calls: 3,
        directions: "no data yet",
        websiteClicks: 5,
        newReviews: 4,
        note: "newly renamed from Clean & Green — first month under the new brand",
      },
    ],

    reviews: {
      total: 4,
      fiveStar: 1,
      breakdown: [
        "1 real five-star review from Daniel Villa: \"Great company. Great work 👍🏼\"",
        "3 fake one-star reviews flagged and reported to Google (all 3 hit the same day with generic negative-template language — appears to be a coordinated attempt)",
      ],
      note: "The 40 baseline reviews preserved through the Clean & Green → MarioScape migration are stable — those are reviews you'd already earned over years, just now under your own brand. April added 1 real five-star and 3 fakes on top. Real customer rating across April: 5.0 stars. Once Google removes the 3 fakes (typical 5–14 day resolution), displayed rating returns to 5.0 across 41 real reviews.",
    },

    websiteTraffic: {
      paid: 0,
      organic: 123,
      totalSessions: 123,
      paidPercent: "0%",
      organicPercent: "100%",
      intro:
        "marioscape.com is brand-new and has no ads running. Every visit this month was earned organically.",
      closing:
        "70% of these visits came directly (people typing the URL after meeting you or being referred). 24% came from Google search. Even though Search Console wasn't verified until April 30, Google was already sending organic search traffic to the site — that data backfills in the May report.",
    },

    deliverables: [
      {
        title: "Google Business Profile migration",
        status: "done",
        detail:
          "The Clean & Green profile was renamed to MarioScape — all 40 of the five-star reviews you'd already earned carried over with it. The migration goal was 40+ reviews on launch — hit on day one, plus 4 new in April on top. Ownership transfer to your account happens at the May 1 sit-down.",
      },
      {
        title: "Tracking installed",
        status: "done",
        detail:
          "Google Analytics live on the site as of April 6. You can see how many visits the site is getting, where visitors are coming from (Google search, direct, social), and what they're doing on the site.",
      },
      {
        title: "Lead routing live — leads come straight to you",
        status: "done",
        detail:
          "Every form submission on marioscape.com routes to your inbox. You own the lead data directly. It's the technical version of the proposal's \"what you own\" promise.",
      },
      {
        title: "Bing Places",
        status: "in-progress",
        detail:
          "Submitted and awaiting Bing's publish step. Reaches the older homeowner audience your competitors miss — over a billion searches a month.",
      },
      {
        title: "Business email (info@marioscape.com)",
        status: "in-progress",
        detail:
          "Ready to launch. Pending your decision: keep marioscapellc@gmail.com running, or stand up info@marioscape.com on Google Workspace ($8/mo, your account). Either choice is fine — just need a yes or no.",
      },
      {
        title: "Website editing dashboard",
        status: "in-progress",
        detail:
          "Build started — change your photos, services, and gallery from your phone whenever you want. Launching alongside the ongoing partnership once the tier is set.",
      },
      {
        title: "Monthly reporting",
        status: "in-progress",
        detail: "This report is the first one. Same format every month going forward — same numbers, same sections, so you can track trend lines as the months stack.",
      },
    ],

    bonuses: [
      {
        title: "C&G lead channel feeding leads to you",
        highlight: "10 leads in April",
        detail:
          "Every inbound lead that comes through the legacy Clean & Green channel — phone calls, texts, emails — gets forwarded straight to you. No referral fee. No markup. 10 of April's 14 leads came through this channel.",
      },
      {
        title: "Leads delivered straight to your inbox",
        detail:
          "Every form submission on marioscape.com routes to your inbox. The lead pipeline belongs to you — aligns with the proposal's \"what you own\" promise. If you ever leave, you take it with you.",
      },
    ],

    nextSteps: [
      {
        heading: "May Operations",
        items: [
          { detail: "May 1 sit-down — walk through this report together and set the ongoing partnership scope" },
          { detail: "info@marioscape.com — keep Gmail or launch the professional email (your call)" },
          { detail: "Bing Places verification publish (already submitted)" },
          { detail: "Fake review escalation with Google — typical 5–14 day resolution. Once removed, displayed rating returns to 5.0." },
          { detail: "Search Console — first full month of organic search query data lands in the May report" },
        ],
      },
      {
        heading: "SEO Expansion (May–July rollout)",
        intro:
          "marioscape.com is live with a strong SEO foundation — schema markup, service-area coverage for 13 North Shore cities, sitemap, social-sharing tags, all in place. Next phase: build out service pages and city pages so Google can rank you for specific service+city searches.",
        items: [
          {
            title: "Service pages",
            detail:
              "One page per service — lawn care, landscaping, snow removal, gutter cleaning, mulch, spring/fall cleanups. Each page targets the service-specific search intent so \"gutter cleaning Wilmette\" finds your gutter page, not your homepage.",
          },
          {
            title: "City pages",
            detail:
              "One page per priority North Shore city — Wilmette, Winnetka, Highland Park, Deerfield, Glencoe, and the rest of the corridor. Captures \"landscaper [city]\" search intent. Pages take 3–6 months to fully rank, so the earlier they go live the better.",
          },
          {
            title: "Review push to 50+",
            detail:
              "Outreach to past snow-removal clients already started in April — fresh reviews already coming in. Continue pushing through May. Goal: cross 50 before next snow season. Review velocity is one of the strongest signals Google uses to rank a profile in map results.",
          },
          {
            title: "GBP photo refresh + posting cadence",
            detail:
              "Photo velocity and review velocity move map rankings more than posts do. Photo refresh and posting rhythm rolling out in May — fresh before/after shots, completed jobs, seasonal work.",
          },
        ],
      },
    ],

    outlook: {
      intro:
        "Right now, MarioScape is in foundation mode. The site is live with full SEO setup. The GBP migration preserved your 40 reviews under the new name. The C&G channel is delivering steady volume. The next three months are about turning that foundation into a real local-search presence across the North Shore.",
      goalsIntro: "By end of Q3, the goal is:",
      goals: [
        {
          highlight: "Service + city pages live and ranking",
          detail:
            "page 1 on Google for \"landscaper [city]\" and \"[service] [city]\" across the North Shore — one page doing the work of dozens of search queries",
        },
        {
          highlight: "50+ Google reviews",
          detail:
            "snowballing your map ranking — Google rewards profiles with steady review velocity, and you're already at 41 real reviews on day one",
        },
        {
          highlight: "Organic search becomes a primary lead source",
          detail:
            "alongside the C&G channel — together delivering steady weekly volume without paying for a single click",
        },
      ],
      closing:
        "No ad spend needed yet. The plan: drive demand through search dominance first, then layer in paid promotion only if there's a specific seasonal push or geographic gap worth covering.",
    },
  },
  priorMonths: [],
};

export default function MarioReportPage() {
  return <ReportPage config={marioReport} />;
}
