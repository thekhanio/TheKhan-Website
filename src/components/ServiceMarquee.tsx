/**
 * ServiceMarquee — horizontal scrolling text strip.
 *
 * Two lines: solid Anton on top, outlined ghost below. Each line is one
 * .marquee-track containing two identical children blocks; the track
 * animates translateX(0) → translateX(-50%) so the second copy slides
 * exactly into the first copy's start position. Seamless infinite loop.
 */

const SERVICES = [
  "Websites",
  "SEO",
  "Landing Pages",
  "Google Business Profile",
  "Google Search Ads",
  "Google LSA",
  "AI Search",
  "Tracking",
];

const SEPARATOR = "—";

function ServiceList({ ghost = false }: { ghost?: boolean }) {
  return (
    <span className="flex items-center">
      {SERVICES.map((svc, i) => (
        <span key={i} className={`marquee-text ${ghost ? "marquee-text-ghost" : ""}`}>
          {svc}
          <span className="opacity-40 px-2">{SEPARATOR}</span>
        </span>
      ))}
    </span>
  );
}

function MarqueeRow({ ghost = false }: { ghost?: boolean }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {/* Two identical copies; -50% translate = one full copy width */}
        <ServiceList ghost={ghost} />
        <ServiceList ghost={ghost} />
      </div>
    </div>
  );
}

export function ServiceMarquee({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <MarqueeRow />
      <MarqueeRow ghost />
    </div>
  );
}
