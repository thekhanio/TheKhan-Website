/**
 * ClientTrustStrip — static, full-color, no hover.
 *
 * Logos render in their real brand colors at full opacity so the
 * row holds visual weight against the marquee directly above.
 * Wordmark logos are sized ~20% larger than icon logos to
 * compensate for thinner visual mass — standard logo-strip
 * normalization. No captions, no animation, no hover effect.
 */

interface ClientLogo {
  name: string;
  src: string;
  /**
   * "wordmark" logos are typographic (text-only) and need a size
   * boost (~22%) to read at the same visual weight as icon logos.
   */
  kind: "icon" | "wordmark";
}

const CLIENTS: ClientLogo[] = [
  { name: "Premier Partners", src: "/portfolio/premier-partners-logo.png", kind: "icon" },
  { name: "MarioScape", src: "/portfolio/marioscape-logo.png", kind: "wordmark" },
  { name: "Nour's Barbershop", src: "/portfolio/nours-logo.png", kind: "icon" },
  { name: "Shifa Home Care", src: "/portfolio/shifa-logo.png", kind: "icon" },
  { name: "WAF Chicago", src: "/portfolio/waf-logo.png", kind: "icon" },
];

export function ClientTrustStrip({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow eyebrow-accent mb-10 md:mb-12">Businesses that trust me</p>
      <ul
        className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row md:flex-wrap md:items-center md:justify-between gap-x-12 md:gap-x-14 gap-y-10 md:gap-y-0"
        aria-label="Clients I work with"
      >
        {CLIENTS.map((c) => {
          const heightClass =
            c.kind === "wordmark"
              ? "h-28 md:h-32"
              : "h-20 md:h-24";
          return (
            <li
              key={c.name}
              className="trust-logo flex items-center justify-center"
              aria-label={c.name}
            >
              <img
                src={c.src}
                alt={c.name}
                className={`trust-logo-img ${heightClass} w-auto object-contain`}
                loading="lazy"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
