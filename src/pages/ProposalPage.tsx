// Reusable proposal page. One component, data-driven.
//
// HOW TO ADD A NEW PROSPECT (~15 min):
//   1. Create src/data/proposals/[name].ts — fill in the ProposalData shape from types.ts
//   2. Add one <Route /> line in src/App.tsx pointing to <ProposalPage data={...} />
//   3. Add the route to NOINDEX_ROUTES in worker/index.js
//   4. bun run build → wrangler deploy → git push
//
// The data shape supports: single-price OR two-path pricing, optional demo links,
// optional custom blocks. Sections render only when data is provided.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Logo } from "@/components/Logo";
import {
  IconArrowLeft,
  IconCheck,
  IconExternalLink,
} from "@tabler/icons-react";
import type { ProposalData, ProposalPricingPath } from "@/data/proposals/types";

type Props = { data: ProposalData };

const NAV_SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "plan", label: "Plan" },
  { id: "proof", label: "Proof" },
  { id: "pricing", label: "Pricing" },
  { id: "next", label: "Next" },
] as const;

export default function ProposalPage({ data }: Props) {
  const reduce = useReducedMotion();
  const [activeAnchor, setActiveAnchor] = useState<string>("problem");

  // Track which section is in view for the nav indicator
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveAnchor(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    NAV_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const hasProof = data.proof && data.proof.length > 0;

  return (
    <>
      <SEO
        title={data.meta.seoTitle || `Proposal for ${data.meta.businessName} — TheKhan`}
        description={`Custom proposal for ${data.meta.businessName} from TheKhan.`}
        canonical="https://thekhan.io/"
        noindex
      />

      <div className="relative min-h-screen bg-bg text-ink overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 gradient-drift opacity-70" />

        {/* Top nav with anchor links */}
        <nav className="relative z-30 sticky top-0 backdrop-blur-xl bg-bg/85 border-b border-line">
          <div className="max-w-5xl mx-auto px-6 py-4 h-18 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm text-ink-quiet hover:text-ink transition-colors shrink-0">
              <IconArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <Link to="/" aria-label="TheKhan home" className="shrink-0">
              <Logo variant="white" size="sm" type="full" />
            </Link>
            {/* Anchor jump links — only on md+ so mobile stays clean */}
            <div className="hidden md:flex items-center gap-5 text-xs uppercase tracking-[0.15em] font-mono">
              {NAV_SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`transition-colors duration-200 ${
                    activeAnchor === s.id ? "text-accent-light" : "text-ink-quiet hover:text-ink"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
            <a
              href="#pricing"
              className="md:hidden text-xs font-mono uppercase tracking-[0.15em] text-accent-light px-2.5 py-1 border border-accent-light/40"
            >
              Pricing ↓
            </a>
          </div>
        </nav>

        <main className="relative z-10">
          {/* Section 1 — Header (deck title-card treatment) */}
          <header className="pt-28 md:pt-44 pb-24 md:pb-32 px-6 text-center max-w-5xl mx-auto">
            <FadeIn reduce={!!reduce}>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent-light mb-7">
                {data.meta.clientName} · {data.meta.dateSent}
              </p>
              <h1 className="display-h1 text-5xl md:text-7xl lg:text-8xl tracking-[-0.015em] leading-[1.02] mb-8 text-ink">
                Proposal for<br />
                <span className="text-accent-light">{data.meta.businessName}</span>
              </h1>
              <div className="w-12 h-px bg-accent-light/40 mx-auto mb-7" aria-hidden />
              <p className="text-ink-muted text-base md:text-lg tracking-[0.02em]">
                Prepared by Omair Khan, TheKhan
              </p>
            </FadeIn>
          </header>

          {/* Optional — Demos */}
          {data.demos && data.demos.length > 0 && (
            <Section id="demos" reduce={!!reduce}>
              <SectionHeading num="00" label="Two demos to look at">
                Two demos to look at
              </SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                {data.demos.map((demo, i) => (
                  <a
                    key={i}
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ed-card group block lift"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-quiet mb-2">
                      {demo.label}
                    </p>
                    {demo.description && (
                      <p className="text-ink-muted text-sm md:text-base leading-relaxed mb-4">
                        {demo.description}
                      </p>
                    )}
                    <p className="inline-flex items-center gap-1.5 text-accent-light text-sm">
                      View {demo.label} <IconExternalLink className="w-3.5 h-3.5" />
                    </p>
                  </a>
                ))}
              </div>
            </Section>
          )}

          {/* Section 2 — Where You Are (deck-style: pull-quote lead + body) */}
          <Section id="problem" reduce={!!reduce} deck>
            <SectionHeading num="01" label="Where you are">
              Where you are
            </SectionHeading>
            <div className="max-w-3xl">
              {data.whereYouAre.paragraphs.map((p, i) =>
                i === 0 ? (
                  <p
                    key={i}
                    className="text-ink text-2xl md:text-3xl leading-[1.35] tracking-[-0.005em] mb-8"
                  >
                    {p}
                  </p>
                ) : (
                  <p
                    key={i}
                    className="text-ink-muted text-lg md:text-xl leading-relaxed mb-5 last:mb-0"
                  >
                    {p}
                  </p>
                )
              )}
            </div>
          </Section>

          {/* Section 3 — Where You're Headed (deck-style: big numbered slide-moments) */}
          <Section id="vision" reduce={!!reduce} deck>
            <SectionHeading num="02" label="Where you're headed">
              Where you&apos;re headed
            </SectionHeading>
            <div className="space-y-10 md:space-y-14 max-w-4xl">
              {data.whereYouHeaded.map((item, i) => (
                <m.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 items-start"
                >
                  <span className="font-[family-name:var(--font-display)] text-5xl md:text-7xl tracking-[-0.02em] text-accent-light/60 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ink text-xl md:text-2xl leading-[1.4] tracking-[-0.005em] pt-1 md:pt-3">
                    {item.line}
                  </p>
                </m.div>
              ))}
            </div>
          </Section>

          {/* Section 4 — What I'll Do (deck-style: more breathing room) */}
          <Section id="plan" reduce={!!reduce} deck>
            <SectionHeading num="03" label="What I'll do">
              What I&apos;ll do
            </SectionHeading>
            <div className="space-y-7 md:space-y-8 max-w-3xl">
              {data.whatIllDo.map((item, i) => (
                <m.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-[auto_1fr] gap-4 md:gap-5 items-start"
                >
                  <div className="mt-1.5">
                    <IconCheck className="w-5 h-5 text-accent-light" stroke={2} />
                  </div>
                  <div>
                    <p className="text-ink font-semibold text-lg md:text-xl mb-1.5 tracking-[-0.005em]">{item.title}</p>
                    <p className="text-ink-muted text-base md:text-lg leading-relaxed">{item.why}</p>
                  </div>
                </m.div>
              ))}
            </div>
          </Section>

          {/* Section 5 — Proof (deck-style: bigger client name + win treatment) */}
          {hasProof && (
            <Section id="proof" reduce={!!reduce} deck>
              <SectionHeading num="04" label="Work that's out there">
                Work that&apos;s out there
              </SectionHeading>
              <p className="text-ink-muted text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
                A handful of recent wins for the clients I work with.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
                {data.proof.map((item, i) => (
                  <m.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="ed-card lift"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-light mb-3">
                      {item.client}
                    </p>
                    <p className="text-ink text-lg md:text-xl leading-[1.4] tracking-[-0.005em]">{item.win}</p>
                    {item.screenshot && (
                      <img
                        src={item.screenshot}
                        alt=""
                        className="mt-5 w-full h-auto border border-line"
                        loading="lazy"
                      />
                    )}
                  </m.div>
                ))}
              </div>
            </Section>
          )}

          {/* Optional — Custom blocks */}
          {data.customBlocks && data.customBlocks.length > 0 && (
            <Section id="custom" reduce={!!reduce}>
              {data.customBlocks.map((block, i) => (
                <div key={i} className="mb-12 last:mb-0 max-w-3xl">
                  <h2 className="display-h2 text-2xl md:text-3xl tracking-[-0.005em] mb-6 text-ink">
                    {block.heading}
                  </h2>
                  <div className="text-ink-muted text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                    {block.body}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* Section 6 — Pricing */}
          <Section id="pricing" reduce={!!reduce}>
            <SectionHeading num={hasProof ? "05" : "04"} label="What it costs">
              What it costs
            </SectionHeading>
            <p className="text-ink-muted text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              Here&apos;s what we talked about, in writing.
            </p>
            {data.pricing.variant === "single" ? (
              <SinglePrice
                price={data.pricing.price}
                priceNote={data.pricing.priceNote}
                explanation={data.pricing.explanation}
              />
            ) : (
              <TwoPathPricing pathA={data.pricing.pathA} pathB={data.pricing.pathB} reduce={!!reduce} />
            )}
          </Section>

          {/* Section 7 — What Happens Next */}
          <Section id="next" reduce={!!reduce}>
            <SectionHeading num={hasProof ? "06" : "05"} label="What happens next">
              What happens next
            </SectionHeading>
            <div className="space-y-6 max-w-3xl mb-12">
              {data.nextSteps.timeline.map((item, i) => (
                <m.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.32, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-5 items-start"
                >
                  <div className="shrink-0">
                    <div className="w-9 h-9 rounded-full bg-accent-soft border border-accent-light/40 flex items-center justify-center">
                      <span className="text-accent-light font-semibold text-sm">{i + 1}</span>
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <p className="text-ink font-semibold text-base md:text-lg mb-1">{item.step}</p>
                    {item.detail && (
                      <p className="text-ink-muted text-sm md:text-base leading-relaxed">{item.detail}</p>
                    )}
                  </div>
                </m.div>
              ))}
            </div>

            {data.nextSteps.closer && (
              <div className="ed-card max-w-3xl mb-12">
                <p className="text-ink text-base md:text-lg leading-relaxed">{data.nextSteps.closer}</p>
              </div>
            )}

            {/* Final CTA */}
            <m.div
              initial={reduce ? false : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="max-w-3xl"
            >
              <p className="display-h2 text-2xl md:text-3xl tracking-[-0.005em] mb-6 text-ink">
                {data.nextSteps.cta}
              </p>
              <div className="space-y-3 text-ink text-base md:text-lg">
                <p>
                  <span className="text-accent-light font-semibold mr-2">Text or call:</span>
                  <a href="tel:8472208550" className="hover:text-accent-light transition-colors">(847) 220-8550</a>
                </p>
                <p>
                  <span className="text-accent-light font-semibold mr-2">Email:</span>
                  <a href="mailto:omair@thekhan.io" className="hover:text-accent-light transition-colors">Omair@TheKhan.io</a>
                </p>
                <p className="text-ink-muted text-sm md:text-base pt-1">
                  Or just reply to the email this came in on.
                </p>
              </div>
            </m.div>
          </Section>
        </main>

        <footer className="relative z-10 border-t border-line mt-16">
          <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-4">
            <img src="/favicon-dark.svg" alt="" width={36} height={36} className="opacity-70" />
            <p className="text-xs text-ink-quiet">
              &copy; {new Date().getFullYear()} TheKhan. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

// ============================================================
// Building blocks
// ============================================================

function Section({
  id,
  reduce,
  deck,
  children,
}: {
  id: string;
  reduce: boolean;
  deck?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative px-6 max-w-5xl mx-auto scroll-mt-24 ${
        deck ? "py-24 md:py-36" : "py-16 md:py-20"
      }`}
    >
      <AnimatePresence>
        <m.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </section>
  );
}

function SectionHeading({ num, label, children }: { num: string; label: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent-light mb-4" aria-label={label}>
        {num}
      </p>
      <h2 className="display-h2 text-4xl md:text-5xl lg:text-6xl tracking-[-0.015em] leading-[1.05] text-ink">
        {children}
      </h2>
    </div>
  );
}

function FadeIn({ reduce, children }: { reduce: boolean; children: React.ReactNode }) {
  return (
    <m.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

function SinglePrice({
  price,
  priceNote,
  explanation,
}: {
  price: string;
  priceNote?: string;
  explanation: string;
}) {
  return (
    <div className="ed-card max-w-2xl">
      <p className="display-h1 text-5xl md:text-6xl tracking-[-0.005em] text-accent-light mb-1">
        {price}
      </p>
      {priceNote && <p className="text-ink-quiet text-sm font-mono uppercase tracking-[0.15em] mb-6">{priceNote}</p>}
      <p className="text-ink text-base md:text-lg leading-relaxed">{explanation}</p>
    </div>
  );
}

function TwoPathPricing({
  pathA,
  pathB,
  reduce,
}: {
  pathA: ProposalPricingPath;
  pathB: ProposalPricingPath;
  reduce: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <PathCard path={pathA} reduce={reduce} />
      <PathCard path={pathB} reduce={reduce} />
    </div>
  );
}

function PathCard({ path, reduce }: { path: ProposalPricingPath; reduce: boolean }) {
  return (
    <div className="relative">
      {path.recommended && (
        <div className="absolute -top-3 left-6 z-10">
          <span className="bg-accent text-ink text-[10px] font-bold px-3 py-1.5 uppercase tracking-[0.18em] border border-accent-light/40">
            Recommended
          </span>
        </div>
      )}
      <m.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.4 }}
        className={`ed-card h-full flex flex-col ${path.recommended ? "border-accent-light/60" : ""}`}
      >
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-quiet mb-2">
          {path.name}
        </p>
        <p className="display-h2 text-3xl md:text-4xl tracking-[-0.005em] text-accent-light mb-1">
          {path.price}
        </p>
        {path.priceNote && (
          <p className="text-ink-quiet text-xs font-mono uppercase tracking-[0.12em] mb-5">
            {path.priceNote}
          </p>
        )}
        {path.blurb && (
          <p className="text-ink text-base md:text-lg leading-relaxed mb-5">{path.blurb}</p>
        )}
        <ul className="space-y-2.5 mb-5 flex-1">
          {path.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-ink text-sm md:text-base leading-relaxed">
              <IconCheck className="w-5 h-5 text-accent-light mt-0.5 shrink-0" stroke={2} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        {path.footer && (
          <p className="text-ink-muted text-sm md:text-base leading-relaxed pt-4 border-t border-line">
            {path.footer}
          </p>
        )}
      </m.div>
    </div>
  );
}
