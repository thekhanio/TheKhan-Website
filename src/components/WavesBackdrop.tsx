/**
 * WavesBackdrop — atmospheric pencil-line curves drifting in the hero.
 *
 * Three thin stroked paths only — no fills, no solid shapes. Reads
 * like a pencil schematic on tracing paper. Headline must dominate;
 * if you squint and don't immediately notice the waves, that's correct.
 */

interface WaveProps {
  d: string;
  dur: string;
  opacity: number;
}

const WAVES: WaveProps[] = [
  // Hand-authored single-stroke curves. Each path is 2200 wide; the
  // SVG holds two duplicated copies side-by-side and the layer is
  // translated -50% over .dur for a seamless infinite loop.
  {
    d: "M0,180 C260,140 440,240 700,200 C960,160 1140,250 1400,210 C1640,175 1820,235 2050,205 C2140,195 2180,205 2200,200",
    dur: "60s",
    opacity: 0.10,
  },
  {
    d: "M0,300 C220,270 460,340 720,310 C980,280 1180,350 1440,320 C1680,295 1860,340 2080,315 C2160,305 2190,310 2200,310",
    dur: "75s",
    opacity: 0.08,
  },
  {
    d: "M0,420 C240,390 500,460 760,430 C1020,400 1240,460 1500,440 C1720,420 1900,455 2110,440 C2180,435 2195,440 2200,440",
    dur: "55s",
    opacity: 0.12,
  },
];

function WaveLayer({ d, dur, opacity }: WaveProps) {
  return (
    <div
      className="absolute inset-0 wave-layer"
      style={{ animationDuration: dur }}
      aria-hidden="true"
    >
      <svg
        className="w-[200%] h-full block"
        viewBox="0 0 4400 600"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity={opacity} stroke="var(--accent-light)" strokeWidth="1.25" fill="none" strokeLinecap="round">
          <path d={d} />
          <path d={d} transform="translate(2200,0)" />
        </g>
      </svg>
    </div>
  );
}

export function WavesBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {WAVES.map((w, i) => (
        <WaveLayer key={i} {...w} />
      ))}
    </div>
  );
}
