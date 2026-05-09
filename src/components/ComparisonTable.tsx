import { IconCheck, IconX, IconMinus } from "@tabler/icons-react";

/**
 * Comparison table — TheKhan vs three named contractor-marketing
 * competitors. Real public data only (verified 2026-05-08).
 *
 * Sources:
 *  - TheKhan: own pricing page (Spring 2026 launch pricing)
 *  - TopLine Pro: toplinepro.com (Webflow-built, monthly retainer
 *    with annual contracts; site is locked to their platform)
 *  - Hibu: hibu.com (proprietary CMS, 12-month contracts standard)
 *  - Hook Agency: hookagency.com (WordPress, 6-month agreements,
 *    no native code ownership transfer)
 */

type Cell = string | { yes: true } | { no: true } | { neutral: string };

interface Row {
  label: string;
  cells: [Cell, Cell, Cell, Cell]; // [TheKhan, TopLine Pro, Hibu, Hook]
}

const ROWS: Row[] = [
  {
    label: "Build cost",
    cells: [
      "$750–$1,800",
      { neutral: "Bundled into retainer" },
      { neutral: "Bundled into retainer" },
      "$10K–$50K+",
    ],
  },
  {
    label: "Monthly retainer",
    cells: [
      "$599–$2,200",
      { neutral: "$300–$1,000+" },
      { neutral: "Custom quote" },
      { neutral: "$3K–$10K+" },
    ],
  },
  {
    label: "Contract length",
    cells: [
      "Month-to-month, 72-hr cancel",
      { neutral: "Annual" },
      { neutral: "12 months" },
      { neutral: "6 months" },
    ],
  },
  {
    label: "You own the code",
    cells: [{ yes: true }, { no: true }, { no: true }, { no: true }],
  },
  {
    label: "You own the domain + accounts",
    cells: [{ yes: true }, { no: true }, { no: true }, { yes: true }],
  },
  {
    label: "Built from scratch (no template)",
    cells: [{ yes: true }, { no: true }, { no: true }, { no: true }],
  },
  {
    label: "Direct contact with founder",
    cells: [{ yes: true }, { no: true }, { no: true }, { neutral: "Account manager" }],
  },
];

const COLUMNS = ["TheKhan", "TopLine Pro", "Hibu", "Hook Agency"];

function CellContent({ cell }: { cell: Cell }) {
  if (typeof cell === "string") {
    return <span className="font-mono text-sm md:text-base">{cell}</span>;
  }
  if ("yes" in cell) {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-sm">
        <IconCheck className="w-4 h-4 text-accent" />
        <span>Yes</span>
      </span>
    );
  }
  if ("no" in cell) {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-sm opacity-60">
        <IconX className="w-4 h-4" />
        <span>No</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm opacity-80">
      <IconMinus className="w-4 h-4 opacity-60" />
      <span>{cell.neutral}</span>
    </span>
  );
}

export function ComparisonTable() {
  return (
    <div className="border border-line">
      {/* Header row */}
      <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] border-b border-line-strong">
        <div className="px-5 py-5 md:px-7 md:py-6">
          <p className="eyebrow">Compared to</p>
        </div>
        {COLUMNS.map((col, i) => (
          <div
            key={col}
            className={`px-5 py-5 md:px-7 md:py-6 ${i === 0 ? "bg-accent-soft border-l border-accent-line" : "border-l border-line"}`}
          >
            <p className={`font-display text-lg md:text-2xl tracking-wider uppercase leading-none ${i === 0 ? "text-accent" : ""}`}>
              {col}
            </p>
          </div>
        ))}
      </div>

      {/* Body rows */}
      {ROWS.map((row, rIdx) => (
        <div
          key={row.label}
          className={`grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] ${rIdx < ROWS.length - 1 ? "border-b border-line" : ""}`}
        >
          <div className="px-5 py-5 md:px-7 md:py-6 text-sm md:text-base font-medium opacity-90">
            {row.label}
          </div>
          {row.cells.map((cell, cIdx) => (
            <div
              key={cIdx}
              className={`px-5 py-5 md:px-7 md:py-6 ${cIdx === 0 ? "bg-accent-soft border-l border-accent-line" : "border-l border-line"}`}
            >
              <CellContent cell={cell} />
            </div>
          ))}
        </div>
      ))}

      {/* Footer disclaimer */}
      <div className="px-5 py-4 md:px-7 md:py-5 border-t border-line-strong">
        <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">
          Verified 2026-05-08 from each company&apos;s public pricing pages and standard agreements.
          Competitor terms vary by package.
        </p>
      </div>
    </div>
  );
}
