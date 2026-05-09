import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   Editorial primitives — TheKhan v4.
   Sizes pulled back from v3. Anton on H1, General Sans on H2.
   ============================================================ */

export function Eyebrow({
  children,
  accent = false,
  className = "",
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow", accent && "eyebrow-accent", className)}>
      {children}
    </p>
  );
}

/**
 * DisplayH1 — Anton, max ~80px desktop / 48px mobile.
 */
export function DisplayH1({
  children,
  className = "",
  ghost = false,
}: {
  children: ReactNode;
  className?: string;
  ghost?: boolean;
}) {
  return (
    <h1
      className={cn(
        "display-h1",
        ghost ? "display-ghost" : "text-ink",
        "text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem]",
        className
      )}
    >
      {children}
    </h1>
  );
}

/**
 * DisplayH2 — General Sans, max ~48px desktop / 32px mobile.
 */
export function DisplayH2({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "display-h2 text-ink",
        "text-[2rem] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[3rem]",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function MonoNum({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("font-mono tabular-nums", className)}>{children}</span>
  );
}

/* ------------------------------------------------------------
   StatCallouts — max ~96px. Confident, not zoomed-in.
   ------------------------------------------------------------ */

export interface Stat {
  num: string;
  unit?: string;
  label: string;
}

export function StatCallouts({
  stats,
  className = "",
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3",
        className
      )}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className={cn(
            "flex flex-col items-start py-10 md:py-0",
            i > 0 && "border-t border-line-strong md:border-t-0 md:border-l md:pl-10 lg:pl-12",
            i < stats.length - 1 && "md:pr-10 lg:pr-12"
          )}
        >
          <p className="display-stat leading-none text-[4.5rem] sm:text-[5rem] md:text-[5.5rem] lg:text-[6rem]">
            {stat.num}
            {stat.unit && (
              <span className="text-accent">{stat.unit}</span>
            )}
          </p>
          <p className="mt-4 md:mt-5 text-sm md:text-base leading-snug max-w-[20rem] opacity-80">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   SectionHeader
   ------------------------------------------------------------ */

export function SectionHeader({
  eyebrow,
  title,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && <Eyebrow accent className="mb-5">{eyebrow}</Eyebrow>}
      <DisplayH2>{title}</DisplayH2>
    </div>
  );
}

/* ------------------------------------------------------------
   NumberedItem
   ------------------------------------------------------------ */

export function NumberedItem({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10 gap-y-3 py-8 md:py-10 border-t border-line">
      <p className="font-mono text-sm text-accent tracking-widest">{num}</p>
      <h3 className="display-h2 text-2xl md:text-3xl">{title}</h3>
      <div className="col-start-2 leading-relaxed opacity-80">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------
   PullQuote
   ------------------------------------------------------------ */

export function PullQuote({
  children,
  attribution,
  className = "",
}: {
  children: ReactNode;
  attribution?: string;
  className?: string;
}) {
  return (
    <figure className={cn("max-w-4xl", className)}>
      <blockquote className="display-h2 text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tight">
        <span className="text-accent">&ldquo;</span>
        {children}
        <span className="text-accent">&rdquo;</span>
      </blockquote>
      {attribution && (
        <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest opacity-60">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
