import ReportPage, { type ReportConfig } from "./ReportPage";

const marioReport: ReportConfig = {
  client: { name: "MarioScape", businessName: "MarioScape" },
  currentMonth: {
    month: "April 2026",
    headline: "21 leads · profile migration complete · #1 for brand search",

    headlineMetrics: [
      { value: "21", label: "customer leads", sublabel: "first full branded month" },
      { value: "4", label: "new five-star reviews" },
      { value: "5.0", label: "average Google rating" },
      { value: "#1", label: "rank for 'marioscape' search" },
    ],

    gbpProfiles: [
      { name: "MarioScape", views: 1840, calls: 12, directions: 14, websiteClicks: 0, newReviews: 4 },
    ],

    reviews: {
      total: 4,
      fiveStar: 4,
      note: "All from spring lawn-cut clients. Profile migration from Clean & Green completed in week 4 — 38+ existing reviews preserved.",
    },

    seoWins: [
      { query: "marioscape", rank: "#1", detail: "Brand search rank — established within first month" },
      { query: "landscaper deerfield", rank: "#6", detail: "New entry — service page launched April 2" },
      { query: "lawn care bannockburn", rank: "#9", detail: "First-page entry within 3 weeks" },
      { query: "gutter cleaning evanston", rank: "#14", detail: "Service page indexed, climbing" },
    ],

    deliverables: [
      {
        title: "marioscape.com launched",
        status: "done",
        detail: "Multi-page site — one page per service. Hand-coded, mobile-first, loads in under 2 seconds.",
      },
      {
        title: "Google Business Profile migrated from Clean & Green",
        status: "done",
        detail: "Same 38+ reviews preserved, name and category updated, service area refined.",
      },
      {
        title: "info@marioscape.com routing live",
        status: "done",
        detail: "Professional email under your account, mail flowing to your existing inbox.",
      },
      {
        title: "Search-friendly markup on every service page",
        status: "done",
        detail: "Google can now read each service and city page properly — landscaping, lawn care, gutter cleaning, snow removal.",
      },
    ],

    whatsNext: [
      "Bing Places submission and verification",
      "Reach out to past snow-removal clients for reviews — push past 50 before next season",
      "Add a gallery section pulling from your Drive folder",
      "May 1 sit-down — review numbers together, decide on ongoing scope",
    ],
  },
  priorMonths: [],
};

export default function MarioReportPage() {
  return <ReportPage config={marioReport} />;
}
