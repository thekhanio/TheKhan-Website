import { Fragment } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Logo } from "@/components/Logo";
import {
  IconArrowLeft,
  IconCircleCheck,
  IconCircleDashed,
  IconRotateClockwise2,
  IconSparkles,
} from "@tabler/icons-react";

// ---------- Types ----------

export interface HeadlineMetric {
  value: string;       // "44" or "$61" or "9,129"
  label: string;       // "customer leads"
  sublabel?: string;   // "first paid month"
}

export interface MathBreakdownRow {
  /** Visible operator on the left (e.g. "+", "-", ""). Empty for first row. */
  operator?: string;
  value: number;
  label: string;
  /** Color tone for the operator + value:
   *  - "negative" — red (excluded / not customers)
   *  - "warning" — yellow (dedupe — not bad, just collapsed)
   *  - "positive" — green (free additions, e.g. forwarded leads)
   *  - "muted" — dim gray on the operator only, value stays white
   *    (use for the starting/baseline row that has no qualitative meaning)
   *  - "default" — brand cyan (or omit) */
  tone?: "default" | "negative" | "warning" | "positive" | "muted";
}

export interface MathBreakdown {
  rows: MathBreakdownRow[];
  total: { value: number; label: string };
}

export interface LeadTransparency {
  intro?: string;
  /** Preferred: structured math chain — renders aligned operator | value | label. */
  math?: MathBreakdown;
  /** Fallback 1: free-form body + conclusion paragraphs. */
  body?: string;
  conclusion?: string;
  /** Fallback 2: auto-generated "Contact forms received X..." line + bullet
   *  list of exclusions. All three styles support `intro` above. */
  totalSubmissions?: number;
  customerLeads?: number;
  exclusions?: string[];
  closing?: string;
}

export interface LeadSource {
  label: string;
  detail?: string;
  count: number;
  type?: "paid" | "organic" | "forwarded" | "other";
}

export interface GBPProfileRow {
  name: string;
  views: number;
  calls: number;
  /** Numeric value, or a string like "no data yet" when GBP hasn't surfaced
   *  the metric for the profile. Strings render muted/italic and are
   *  excluded from the totals row. */
  directions: number | string;
  websiteClicks: number;
  newReviews: number;
  note?: string;
}

export interface WebsiteTraffic {
  paid: number;
  organic: number;
  totalSessions?: number;
  paidPercent?: string;
  organicPercent?: string;
  intro?: string;
  closing?: string;
}

export interface SEOWin {
  query: string;
  rank: string;
  site?: string;
  detail?: string;
}

export interface SEOIntro {
  caption: string;
}

export interface AIOverviewCitation {
  query: string;
  detail: string;
}

export interface AdCampaign {
  name: string;
  spend: string;
  leads: number | string;
  cpl: string;
  status?: "active" | "paused";
  detail?: string;
  note?: string;
}

export interface DeliverableItem {
  title: string;
  status: "done" | "in-progress" | "partial";
  detail?: string;
}

export interface BonusItem {
  title: string;
  detail: string;
  highlight?: string;
}

export interface ReviewSummary {
  total: number;
  fiveStar?: number;
  breakdown?: string[];
  note?: string;
}

export interface NextStepItem {
  /** Optional bold lead-in. When present, item renders as a card.
   *  When absent, item renders as a plain bullet. */
  title?: string;
  detail: string;
}

export interface NextStepsGroup {
  heading: string;
  intro?: string;
  items?: NextStepItem[];
}

export interface OutlookGoal {
  highlight: string;
  detail: string;
}

export interface OutlookSection {
  intro: string;
  goalsIntro?: string;
  goals?: OutlookGoal[];
  closing?: string;
}

export interface MonthReport {
  month: string;
  headline: string;

  headlineMetrics?: HeadlineMetric[];
  leadTransparency?: LeadTransparency;
  leadSources?: LeadSource[];
  leadSourcesNote?: string;
  gbpProfiles?: GBPProfileRow[];
  reviews?: ReviewSummary;
  websiteTraffic?: WebsiteTraffic;
  seoIntro?: string;
  seoWins?: SEOWin[];
  aiOverview?: AIOverviewCitation[];
  adsCampaigns?: AdCampaign[];
  deliverables?: DeliverableItem[];
  bonuses?: BonusItem[];
  whatsNext?: string[];
  /** Richer alternative to whatsNext — supports sub-groups, intros,
   *  and items that auto-layout as cards (with title) or bullets (without). */
  nextSteps?: NextStepsGroup[];
  /** Long-term strategic outlook section, rendered after nextSteps. */
  outlook?: OutlookSection;
}

export interface ClientLogo {
  src: string;        // screen variant — designed for dark bg
  printSrc?: string;  // optional print variant — transparent bg, recolored to black
  alt: string;
  /** Tailwind max-height utility for screen, e.g. "max-h-20 md:max-h-28" */
  maxHeightClass?: string;
}

export interface ReportConfig {
  client: { name: string; businessName?: string };
  clientLogo?: ClientLogo;
  currentMonth: MonthReport;
  priorMonths: MonthReport[];
}

// ---------- Building blocks ----------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="report-section-label text-xs md:text-sm uppercase tracking-[0.25em] text-[#06b6d4] font-[family-name:var(--font-manrope)] font-semibold mb-5">
      {children}
    </h3>
  );
}

function MetricCard({ value, label, sublabel }: HeadlineMetric) {
  return (
    <div className="report-metric rounded-lg border border-white/10 bg-[#0f0f0f] p-5 md:p-6">
      <div className="text-3xl md:text-4xl font-semibold text-[#06b6d4] tabular-nums leading-tight">
        {value}
      </div>
      <div className="mt-2 text-sm text-white font-[family-name:var(--font-manrope)] leading-snug">
        {label}
      </div>
      {sublabel && (
        <div className="mt-1 text-xs text-[#9ca3af] font-[family-name:var(--font-manrope)]">
          {sublabel}
        </div>
      )}
    </div>
  );
}

function statusIcon(status: DeliverableItem["status"]) {
  switch (status) {
    case "done":
      return <IconCircleCheck className="w-5 h-5 text-[#06b6d4] shrink-0 mt-0.5" />;
    case "in-progress":
      return <IconRotateClockwise2 className="w-5 h-5 text-[#facc15] shrink-0 mt-0.5" />;
    case "partial":
      return <IconCircleDashed className="w-5 h-5 text-[#a3a3a3] shrink-0 mt-0.5" />;
  }
}

function statusLabel(status: DeliverableItem["status"]) {
  return { done: "Done", "in-progress": "In progress", partial: "Partial" }[status];
}

// ---------- Section renderers ----------

function HeadlineStripSection({ items }: { items: HeadlineMetric[] }) {
  return (
    <section className="report-subsection report-headline-strip mb-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>
    </section>
  );
}

function LeadTransparencySection({ data }: { data: LeadTransparency }) {
  const useMath = !!data.math;
  const useFreeform = !data.math && !!data.body;
  return (
    <section className="report-subsection report-lead-transparency rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-6 md:p-8 mb-10">
      <SectionLabel>How April leads were counted</SectionLabel>
      {data.intro && (
        <p className="text-[#d4d4d4] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)] mb-6">
          {data.intro}
        </p>
      )}
      {useMath && data.math && (() => {
        const toneColor = (tone?: MathBreakdownRow["tone"]) => {
          switch (tone) {
            case "negative": return "#ef4444"; // red-500 — excluded / not customers
            case "warning":  return "#facc15"; // yellow-400 — dedupe (not bad, just collapsed)
            case "positive": return "#22c55e"; // green-500 — added / good
            case "muted":    return "#6b7280"; // gray-500 — neutral baseline marker
            default:         return "#06b6d4"; // brand cyan
          }
        };
        return (
          <div className="report-math-breakdown grid grid-cols-[1.5rem_3.5rem_1fr] md:grid-cols-[2rem_4rem_1fr] gap-x-4 items-baseline">
            {data.math.rows.map((row, i) => {
              const accent = toneColor(row.tone);
              // "muted" only colors the operator — value stays neutral white.
              // Other non-default tones color both the operator and the value
              // so the row reads as a coherent unit (red −6, green +5, etc.).
              const valueColored = !!row.tone && row.tone !== "default" && row.tone !== "muted";
              return (
                <Fragment key={i}>
                  <span
                    className="text-right text-xl md:text-2xl font-mono font-bold"
                    style={{ color: accent }}
                  >
                    {row.operator || ""}
                  </span>
                  <span
                    className="text-right text-2xl md:text-3xl font-mono tabular-nums font-semibold py-1"
                    style={{ color: valueColored ? accent : "#ffffff" }}
                  >
                    {row.value}
                  </span>
                  <span className="text-[#d4d4d4] text-sm md:text-base font-[family-name:var(--font-manrope)] py-1">
                    {row.label}
                  </span>
                </Fragment>
              );
            })}
            <div className="col-span-2 border-t-2 border-white/40 mt-2" />
            <div className="mt-2" />
            <span className="text-right text-[#06b6d4] text-2xl md:text-3xl font-mono font-bold mt-1">
              =
            </span>
            <span className="text-right text-[#06b6d4] text-4xl md:text-5xl font-mono tabular-nums font-bold mt-1">
              {data.math.total.value}
            </span>
            <span className="text-white text-base md:text-lg font-[family-name:var(--font-manrope)] font-semibold mt-2">
              {data.math.total.label}
            </span>
          </div>
        );
      })()}
      {useFreeform ? (
        <>
          <p className="text-[#d4d4d4] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)] mb-4">
            {data.body}
          </p>
          {data.conclusion && (
            <p className="text-white font-semibold text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)]">
              {data.conclusion}
            </p>
          )}
        </>
      ) : (
        <>
          {data.totalSubmissions !== undefined && data.customerLeads !== undefined && (
            <p className="text-[#d4d4d4] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)] mb-3">
              Contact forms received{" "}
              <span className="text-white font-semibold">{data.totalSubmissions}</span> submissions.
              After excluding {data.totalSubmissions - data.customerLeads} non-customer entries
              (listed below), real customer form leads:{" "}
              <span className="text-white font-semibold">{data.customerLeads}</span>.
            </p>
          )}
          {data.exclusions && data.exclusions.length > 0 && (
            <ul className="space-y-2 mb-4">
              {data.exclusions.map((line, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm md:text-base text-[#a3a3a3] font-[family-name:var(--font-manrope)]"
                >
                  <span className="mt-2 w-1 h-1 rounded-full bg-[#a3a3a3] shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          )}
          {data.closing && (
            <p className="text-[#d4d4d4] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)]">
              {data.closing}
            </p>
          )}
        </>
      )}
    </section>
  );
}

function LeadSourcesSection({ items, note }: { items: LeadSource[]; note?: string }) {
  const total = items.reduce((sum, x) => sum + x.count, 0);
  // Color-code paid vs non-paid sources so paid-vs-organic is scannable at a glance.
  const accentFor = (type?: LeadSource["type"]) =>
    type === "paid" ? "#2563eb" : "#06b6d4";
  return (
    <section className="report-subsection report-lead-sources rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-6 md:p-8 mb-10">
      <SectionLabel>Where leads came from</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {items.map((row, i) => {
          const accent = accentFor(row.type);
          return (
            <div
              key={i}
              className="report-lead-source-card relative rounded-lg border border-white/10 bg-[#0a0a0a] p-5 overflow-hidden flex flex-col"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: accent }}
              />
              <p className="text-sm md:text-base uppercase tracking-wider text-white font-semibold font-[family-name:var(--font-manrope)] mt-1">
                {row.label}
              </p>
              <p
                className="text-6xl md:text-7xl font-semibold tabular-nums leading-none my-3"
                style={{ color: accent }}
              >
                {row.count}
              </p>
              {row.detail && (
                <p className="text-xs text-[#a3a3a3] font-[family-name:var(--font-manrope)] leading-relaxed mt-auto">
                  {row.detail}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="report-lead-sources-total rounded-lg border border-white/[0.15] bg-white/[0.03] px-5 md:px-6 py-4 flex items-baseline justify-between gap-4 font-[family-name:var(--font-manrope)]">
        <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#9ca3af] font-semibold">
          Total — unique customer leads
        </span>
        <span className="text-3xl md:text-4xl font-bold text-white tabular-nums">
          {total}
        </span>
      </div>
      {note && (
        <p className="mt-4 text-sm md:text-base text-[#a3a3a3] italic leading-relaxed font-[family-name:var(--font-manrope)]">
          {note}
        </p>
      )}
    </section>
  );
}

function GBPProfilesSection({ rows }: { rows: GBPProfileRow[] }) {
  const totals = rows.reduce(
    (acc, r) => ({
      views: acc.views + r.views,
      calls: acc.calls + r.calls,
      directions:
        acc.directions + (typeof r.directions === "number" ? r.directions : 0),
      websiteClicks: acc.websiteClicks + r.websiteClicks,
      newReviews: acc.newReviews + r.newReviews,
    }),
    { views: 0, calls: 0, directions: 0, websiteClicks: 0, newReviews: 0 },
  );
  // Single-row tables don't need a totals row — it just duplicates the row.
  const showTotals = rows.length > 1;
  return (
    <section className="report-subsection rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-6 md:p-8 mb-10">
      <SectionLabel>Google Business Profiles</SectionLabel>
      <div className="overflow-x-auto rounded-md border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/[0.03] text-[#9ca3af] uppercase tracking-wider text-xs align-bottom">
              <th className="px-4 py-3 text-left font-medium">Profile</th>
              <th className="px-3 py-3 text-right font-medium">
                Views
                <span className="block normal-case tracking-normal text-[10px] text-[#6b7280] italic font-normal mt-1 max-w-[14ch] ml-auto">
                  showed up in search
                </span>
              </th>
              <th className="px-3 py-3 text-right font-medium">
                Calls
                <span className="block normal-case tracking-normal text-[10px] text-[#6b7280] italic font-normal mt-1 max-w-[14ch] ml-auto">
                  tapped to call
                </span>
              </th>
              <th className="px-3 py-3 text-right font-medium">
                Directions
                <span className="block normal-case tracking-normal text-[10px] text-[#6b7280] italic font-normal mt-1 max-w-[16ch] ml-auto">
                  tapped for directions
                </span>
              </th>
              <th className="px-3 py-3 text-right font-medium">
                Site clicks
                <span className="block normal-case tracking-normal text-[10px] text-[#6b7280] italic font-normal mt-1 max-w-[14ch] ml-auto">
                  tapped to website
                </span>
              </th>
              <th className="px-3 py-3 text-right font-medium">New reviews</th>
            </tr>
          </thead>
          <tbody className="font-[family-name:var(--font-manrope)]">
            {rows.map((r, i) => (
              <tr key={i} className={i > 0 ? "border-t border-white/[0.06]" : ""}>
                <td className="px-4 py-3">
                  <span className="text-[#d4d4d4]">{r.name}</span>
                  {r.note && (
                    <span className="block text-xs text-[#9ca3af] mt-0.5">{r.note}</span>
                  )}
                </td>
                <td className="px-3 py-3 text-white tabular-nums text-right">{r.views}</td>
                <td className="px-3 py-3 text-white tabular-nums text-right">{r.calls}</td>
                <td className="px-3 py-3 text-white tabular-nums text-right">
                  {typeof r.directions === "number" ? (
                    r.directions
                  ) : (
                    <span className="text-[#9ca3af] italic text-xs font-normal normal-case tracking-normal">
                      {r.directions}
                    </span>
                  )}
                </td>
                <td className="px-3 py-3 text-white tabular-nums text-right">{r.websiteClicks}</td>
                <td className="px-3 py-3 text-white tabular-nums text-right">{r.newReviews}</td>
              </tr>
            ))}
            {showTotals && (
              <tr className="border-t-2 border-white/[0.15] bg-white/[0.03]">
                <td className="px-4 py-3 text-white font-semibold uppercase tracking-wider text-xs">Total</td>
                <td className="px-3 py-3 text-white font-bold tabular-nums text-right">{totals.views}</td>
                <td className="px-3 py-3 text-white font-bold tabular-nums text-right">{totals.calls}</td>
                <td className="px-3 py-3 text-white font-bold tabular-nums text-right">{totals.directions}</td>
                <td className="px-3 py-3 text-white font-bold tabular-nums text-right">{totals.websiteClicks}</td>
                <td className="px-3 py-3 text-white font-bold tabular-nums text-right">{totals.newReviews}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ReviewsSection({ data }: { data: ReviewSummary }) {
  return (
    <section className="report-subsection rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-6 md:p-8 mb-10">
      <SectionLabel>New Google reviews</SectionLabel>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-4xl md:text-5xl font-semibold text-[#06b6d4] tabular-nums">{data.total}</span>
        <span className="text-[#d4d4d4] font-[family-name:var(--font-manrope)] text-base">
          new reviews this month
          {data.fiveStar !== undefined && (
            <>
              {" — "}
              <span className="text-white font-semibold">{data.fiveStar}</span> five-star
            </>
          )}
        </span>
      </div>
      {data.breakdown && data.breakdown.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm md:text-base text-[#a3a3a3] font-[family-name:var(--font-manrope)]">
          {data.breakdown.map((line, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 w-1 h-1 rounded-full bg-[#a3a3a3] shrink-0" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}
      {data.note && (
        <p className="mt-4 text-sm md:text-base text-[#a3a3a3] leading-relaxed font-[family-name:var(--font-manrope)]">
          {data.note}
        </p>
      )}
    </section>
  );
}

function WebsiteTrafficSection({ data }: { data: WebsiteTraffic }) {
  const total = data.totalSessions ?? data.paid + data.organic;
  return (
    <section className="report-subsection rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-6 md:p-8 mb-10">
      <SectionLabel>Website traffic</SectionLabel>
      {data.intro && (
        <p className="text-[#d4d4d4] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)] mb-4">
          {data.intro}
        </p>
      )}
      <div className="overflow-hidden rounded-md border border-white/10">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="bg-white/[0.03] text-[#9ca3af] uppercase tracking-wider text-xs">
              <th className="px-4 py-3 text-left font-medium">Where the visit came from</th>
              <th className="px-4 py-3 text-right font-medium">Sessions</th>
              <th className="px-4 py-3 text-right font-medium">Share</th>
            </tr>
          </thead>
          <tbody className="font-[family-name:var(--font-manrope)]">
            <tr>
              <td className="px-4 py-3 text-[#d4d4d4]">From Google ads (paid)</td>
              <td className="px-4 py-3 text-white font-semibold tabular-nums text-right">{data.paid}</td>
              <td className="px-4 py-3 text-[#d4d4d4] tabular-nums text-right">{data.paidPercent || ""}</td>
            </tr>
            <tr className="border-t border-white/[0.06]">
              <td className="px-4 py-3 text-[#d4d4d4]">Organic (Google search, direct, referrals)</td>
              <td className="px-4 py-3 text-white font-semibold tabular-nums text-right">{data.organic}</td>
              <td className="px-4 py-3 text-[#d4d4d4] tabular-nums text-right">{data.organicPercent || ""}</td>
            </tr>
            <tr className="border-t-2 border-white/[0.15] bg-white/[0.03]">
              <td className="px-4 py-3 text-white font-semibold uppercase tracking-wider text-xs">Total visits</td>
              <td className="px-4 py-3 text-white font-bold tabular-nums text-right">{total}</td>
              <td className="px-4 py-3" />
            </tr>
          </tbody>
        </table>
      </div>
      {data.closing && (
        <p className="mt-4 text-sm md:text-base text-[#d4d4d4] leading-relaxed font-[family-name:var(--font-manrope)]">
          {data.closing}
        </p>
      )}
    </section>
  );
}

function SEOWinsSection({ wins, aiOverview, intro }: { wins: SEOWin[]; aiOverview?: AIOverviewCitation[]; intro?: string }) {
  return (
    <section className="report-subsection rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-6 md:p-8 mb-10">
      <SectionLabel>Where you rank on Google</SectionLabel>

      {intro && (
        <p className="text-[#d4d4d4] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)] mb-6">
          {intro}
        </p>
      )}

      {aiOverview && aiOverview.length > 0 && (
        <div className="mb-6 space-y-3">
          {aiOverview.map((c, i) => (
            <div
              key={i}
              className="report-ai-overview rounded-lg border border-[#06b6d4]/30 bg-gradient-to-br from-[#06b6d4]/10 to-[#2563eb]/10 p-5 md:p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <IconSparkles className="w-4 h-4 text-[#06b6d4]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#06b6d4] font-semibold font-[family-name:var(--font-manrope)]">
                  Google AI Overview &middot; #1 cited
                </span>
              </div>
              <p className="text-white text-base md:text-lg font-semibold mb-1">"{c.query}"</p>
              <p className="text-[#d4d4d4] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)]">
                {c.detail}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {wins.map((w, i) => (
          <div
            key={i}
            className="report-seo-win rounded-md border border-white/10 bg-[#0f0f0f] p-4"
          >
            <p className="text-sm text-[#d4d4d4] font-[family-name:var(--font-manrope)] leading-snug">
              "{w.query}"
            </p>
            <div className="mt-2 flex items-baseline gap-3 flex-wrap">
              <span className="text-2xl md:text-3xl font-semibold text-[#06b6d4] tabular-nums">{w.rank}</span>
              {w.site && <span className="text-xs text-[#9ca3af] font-[family-name:var(--font-manrope)]">{w.site}</span>}
            </div>
            {w.detail && (
              <p className="mt-2 text-xs text-[#9ca3af] font-[family-name:var(--font-manrope)] leading-relaxed">
                {w.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function AdsCampaignsSection({ campaigns }: { campaigns: AdCampaign[] }) {
  if (campaigns.length === 0) return null;
  return (
    <section className="report-subsection rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-6 md:p-8 mb-10">
      <SectionLabel>Ads</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {campaigns.map((c, i) => (
          <div key={i} className="report-ad-box rounded-lg border border-white/10 bg-[#0a0a0a] p-5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <p className="text-xs uppercase tracking-wider text-[#9ca3af] font-semibold font-[family-name:var(--font-manrope)]">
                {c.name}
              </p>
              {c.status === "paused" && (
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#facc15]/30 text-[#facc15]">
                  Paused
                </span>
              )}
            </div>
            <div className="space-y-2 font-[family-name:var(--font-manrope)]">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs text-[#9ca3af]">Spend</span>
                <span className="text-base text-white font-semibold tabular-nums">{c.spend}</span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs text-[#9ca3af]">Leads</span>
                <span className="text-2xl text-[#06b6d4] font-semibold tabular-nums">{c.leads}</span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs text-[#9ca3af]">Cost per lead</span>
                <span className="text-base text-white font-semibold tabular-nums">{c.cpl}</span>
              </div>
            </div>
            {c.detail && (
              <p className="mt-3 text-xs text-[#a3a3a3] font-[family-name:var(--font-manrope)] leading-relaxed">
                {c.detail}
              </p>
            )}
            {c.note && (
              <p className="mt-2 text-xs text-[#9ca3af] italic font-[family-name:var(--font-manrope)] leading-relaxed">
                {c.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function DeliverablesSection({ items }: { items: DeliverableItem[] }) {
  return (
    <section className="report-subsection rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-6 md:p-8 mb-10">
      <SectionLabel>Deliverables</SectionLabel>
      <ul className="space-y-4">
        {items.map((d, i) => (
          <li key={i} className="report-deliverable flex gap-4 items-start">
            {statusIcon(d.status)}
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-white font-semibold text-base md:text-lg font-[family-name:var(--font-manrope)]">
                  {d.title}
                </p>
                <span className="text-[10px] uppercase tracking-wider text-[#9ca3af]">
                  {statusLabel(d.status)}
                </span>
              </div>
              {d.detail && (
                <p className="mt-1 text-sm md:text-base text-[#a3a3a3] leading-relaxed font-[family-name:var(--font-manrope)]">
                  {d.detail}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function BonusesSection({ items }: { items: BonusItem[] }) {
  return (
    <section className="report-subsection rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-6 md:p-8 mb-10">
      <SectionLabel>Bonuses</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((b, i) => (
          <div key={i} className="report-bonus-card rounded-lg border border-white/10 bg-[#0a0a0a] p-5">
            <p className="text-white font-semibold text-base md:text-lg font-[family-name:var(--font-manrope)] mb-2">
              {b.title}
            </p>
            {b.highlight && (
              <p className="text-2xl md:text-3xl font-semibold text-[#06b6d4] tabular-nums mb-2">
                {b.highlight}
              </p>
            )}
            <p className="text-sm md:text-base text-[#a3a3a3] leading-relaxed font-[family-name:var(--font-manrope)]">
              {b.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhatsNextSection({ items }: { items: string[] }) {
  return (
    <section className="report-subsection rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-6 md:p-8 mb-10">
      <SectionLabel>What's next</SectionLabel>
      <ul className="space-y-3 font-[family-name:var(--font-manrope)]">
        {items.map((line, i) => (
          <li key={i} className="flex items-start gap-3 text-[#d4d4d4]">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#06b6d4] shrink-0" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function NextStepsGroupBlock({ group }: { group: NextStepsGroup }) {
  // Auto-layout: items with a title render as cards; otherwise as bullets.
  const useCards = !!group.items?.some((i) => i.title);
  return (
    <div className="report-next-step-group mb-8 last:mb-0">
      <h4 className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-semibold text-white mb-3 tracking-tight">
        {group.heading}
      </h4>
      {group.intro && (
        <p className="text-[#d4d4d4] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)] mb-4">
          {group.intro}
        </p>
      )}
      {group.items && group.items.length > 0 && (
        useCards ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {group.items.map((item, i) => {
              // Center orphan card when item count is odd at md+ (2-col grid).
              // gap-3 = 0.75rem; half-gap = 0.375rem; orphan width = 50% − half-gap.
              const isOrphan =
                group.items!.length % 2 === 1 && i === group.items!.length - 1;
              return (
                <div
                  key={i}
                  className={
                    "report-next-step-card rounded-lg border border-white/10 bg-[#0a0a0a] p-5" +
                    (isOrphan
                      ? " md:col-span-2 md:justify-self-center md:w-[calc(50%-0.375rem)]"
                      : "")
                  }
                >
                  {item.title && (
                    <p className="text-white font-semibold text-base md:text-lg font-[family-name:var(--font-manrope)] mb-2">
                      {item.title}
                    </p>
                  )}
                  <p className="text-sm md:text-base text-[#a3a3a3] leading-relaxed font-[family-name:var(--font-manrope)]">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <ul className="space-y-3 font-[family-name:var(--font-manrope)]">
            {group.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#d4d4d4]">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#06b6d4] shrink-0" />
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

function NextStepsSection({ groups }: { groups: NextStepsGroup[] }) {
  return (
    <section className="report-subsection rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-6 md:p-8 mb-10">
      <SectionLabel>Next Steps — Building for the months ahead</SectionLabel>
      <div className="mt-2">
        {groups.map((g, i) => (
          <NextStepsGroupBlock key={i} group={g} />
        ))}
      </div>
    </section>
  );
}

function OutlookSectionBlock({ data }: { data: OutlookSection }) {
  return (
    <section className="report-subsection rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-6 md:p-8 mb-10">
      <SectionLabel>Where this is headed</SectionLabel>
      <p className="text-[#d4d4d4] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)] mb-5">
        {data.intro}
      </p>
      {data.goalsIntro && (
        <p className="text-white font-semibold text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)] mb-4">
          {data.goalsIntro}
        </p>
      )}
      {data.goals && data.goals.length > 0 && (
        <ul className="space-y-3 mb-5 font-[family-name:var(--font-manrope)]">
          {data.goals.map((g, i) => (
            <li key={i} className="flex items-start gap-3 text-[#d4d4d4]">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#06b6d4] shrink-0" />
              <span>
                <span className="text-white font-semibold">{g.highlight}</span>
                {" — "}
                {g.detail}
              </span>
            </li>
          ))}
        </ul>
      )}
      {data.closing && (
        <p className="text-[#d4d4d4] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)]">
          {data.closing}
        </p>
      )}
    </section>
  );
}

// ---------- Month renderer ----------

function MonthBody({ data }: { data: MonthReport }) {
  return (
    <div className="report-month-body mt-6">
      {data.headlineMetrics && data.headlineMetrics.length > 0 && (
        <HeadlineStripSection items={data.headlineMetrics} />
      )}
      {data.leadTransparency && <LeadTransparencySection data={data.leadTransparency} />}
      {data.leadSources && data.leadSources.length > 0 && <LeadSourcesSection items={data.leadSources} note={data.leadSourcesNote} />}
      {data.gbpProfiles && data.gbpProfiles.length > 0 && <GBPProfilesSection rows={data.gbpProfiles} />}
      {data.reviews && <ReviewsSection data={data.reviews} />}
      {data.websiteTraffic && <WebsiteTrafficSection data={data.websiteTraffic} />}
      {(data.seoWins?.length || data.aiOverview?.length) && (
        <SEOWinsSection wins={data.seoWins || []} aiOverview={data.aiOverview} intro={data.seoIntro} />
      )}
      {data.adsCampaigns && data.adsCampaigns.length > 0 && <AdsCampaignsSection campaigns={data.adsCampaigns} />}
      {data.deliverables && data.deliverables.length > 0 && <DeliverablesSection items={data.deliverables} />}
      {data.bonuses && data.bonuses.length > 0 && <BonusesSection items={data.bonuses} />}
      {data.nextSteps && data.nextSteps.length > 0 ? (
        <NextStepsSection groups={data.nextSteps} />
      ) : (
        data.whatsNext && data.whatsNext.length > 0 && <WhatsNextSection items={data.whatsNext} />
      )}
      {data.outlook && <OutlookSectionBlock data={data.outlook} />}
    </div>
  );
}

// ---------- Page ----------

export default function ReportPage({ config }: { config: ReportConfig }) {
  const { client, clientLogo, currentMonth, priorMonths } = config;
  const businessName = client.businessName || client.name;

  return (
    <>
      <SEO
        title={`Monthly Report — ${businessName} · TheKhan`}
        description={`Monthly performance report for ${businessName}.`}
        canonical="https://thekhan.io/"
        noindex
      />

      <div className="report-page min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white">
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-4 h-20 sm:h-18 flex items-center justify-center relative">
            <Link to="/" className="absolute left-6 flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors">
              <IconArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <Link to="/">
              <Logo variant="white" size="sm" type="full" />
            </Link>
          </div>
        </nav>

        <header className="report-header pt-12 md:pt-16 pb-10 px-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center gap-5">
            {clientLogo ? (
              <>
                <img
                  src={clientLogo.src}
                  alt={clientLogo.alt}
                  className={`report-client-logo report-client-logo-screen w-auto ${clientLogo.maxHeightClass || "max-h-20 md:max-h-28"}`}
                />
                {clientLogo.printSrc && (
                  <img
                    src={clientLogo.printSrc}
                    alt={clientLogo.alt}
                    className={`report-client-logo report-client-logo-print w-auto ${clientLogo.maxHeightClass || "max-h-20 md:max-h-28"}`}
                  />
                )}
                {/* Visually hidden h1 — logo conveys the brand visually, but
                    screen readers and SEO still need a heading. */}
                <h1 className="sr-only">{businessName} — Monthly Report — {currentMonth.month}</h1>
              </>
            ) : (
              <>
                <Logo variant="white" size="md" type="short" />
                <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  {businessName}
                </h1>
              </>
            )}
            <p className="text-xs uppercase tracking-[0.3em] text-[#06b6d4] font-[family-name:var(--font-manrope)] font-semibold">
              Monthly Report
            </p>
            <p className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-white tracking-tight">
              {currentMonth.month}
            </p>
          </div>
        </header>

        <hr className="report-divider max-w-4xl mx-auto border-white/[0.08] mb-10" />

        <section
          className="report-month report-month-current px-6 pb-16 max-w-4xl mx-auto"
          aria-label={`${currentMonth.month} report`}
        >
          <p className="text-[#a3a3a3] text-sm md:text-base font-[family-name:var(--font-manrope)] text-center mb-2">
            {currentMonth.headline}
          </p>
          <MonthBody data={currentMonth} />
        </section>

        {priorMonths.length > 0 && (
          <section className="report-archive px-6 pb-16 max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold tracking-tight text-white mb-6">
              Prior months
            </h2>
            <div className="space-y-3">
              {priorMonths.map((m, i) => (
                <details key={i} className="report-month report-month-prior group rounded-xl border border-white/[0.08] bg-[#0f0f0f] overflow-hidden">
                  <summary className="report-summary list-none cursor-pointer px-5 md:px-6 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors font-[family-name:var(--font-manrope)]">
                    <span className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <span className="text-white font-semibold text-base md:text-lg">{m.month}</span>
                      <span className="text-[#a3a3a3] text-sm md:text-base">{m.headline}</span>
                    </span>
                    <span className="text-[#06b6d4] text-sm transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
                  </summary>
                  <div className="px-5 md:px-6 pb-6 pt-2">
                    <MonthBody data={m} />
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        <footer className="report-footer px-6 pb-16 max-w-4xl mx-auto">
          <hr className="border-white/[0.08] mb-10" />
          <div className="flex flex-col items-center gap-4 text-center">
            <Logo variant="white" size="sm" type="short" />
            <p className="text-[#a3a3a3] text-sm font-[family-name:var(--font-manrope)]">
              Prepared by Omair Khan, TheKhan
            </p>
            <p className="text-[#a3a3a3] text-sm font-[family-name:var(--font-manrope)]">
              <a href="mailto:omair@thekhan.io" className="hover:text-white transition-colors">Omair@TheKhan.io</a>
              <span className="mx-3 text-white/20">|</span>
              <a href="tel:8472208550" className="hover:text-white transition-colors">(847) 220-8550</a>
            </p>
            <p className="text-[#606060] text-xs mt-2">&copy; {new Date().getFullYear()} TheKhan. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
