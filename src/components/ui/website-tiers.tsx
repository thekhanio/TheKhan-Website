import { IconWorld } from "@tabler/icons-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useState } from "react";

interface WebsiteTier {
  title: string;
  price: string;
  bullets: string[];
  hasButton?: boolean;
}

interface WebsiteTiersProps {
  tiers: WebsiteTier[];
}

function WebsiteTierCard({ tier }: { tier: WebsiteTier; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  // Static card for Custom Builds (has button)
  if (tier.hasButton) {
    return (
      <div
        className="relative h-full"
        style={{ minHeight: "300px" }}
      >
        <div className="rounded-2xl overflow-hidden h-full">
          {/* Card border */}
          <div className="absolute inset-0 rounded-2xl border border-white/[0.06]" />

          {/* Background */}
          <div className="absolute inset-[1px] rounded-2xl bg-[#111111]" />

          {/* Static Content */}
          <div className="relative z-10 p-6 flex flex-col h-full">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#2563eb]/10 to-[#06b6d4]/10 border border-[#2563eb]/20 flex items-center justify-center mb-6 mx-auto">
              <IconWorld className="w-8 h-8 text-[#06b6d4]" />
            </div>
            <h4
              className="text-xl font-semibold text-white mb-6 text-center"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              {tier.title}
            </h4>

            {/* Bullet points */}
            <ul className="space-y-3 mb-4">
              {tier.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-[#d4d4d4] text-sm">
                  <span className="text-[#06b6d4] mt-0.5">&bull;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Push to bottom */}
            <div className="flex-grow"></div>

            {/* Let's Talk button */}
            <div className="flex justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center h-11 px-8 text-sm font-medium text-white rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] clickable-hover transition-all duration-200 ease-out active:scale-[0.98] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Flipping cards for regular tiers
  return (
    <div
      className="group relative h-full cursor-pointer clickable-hover transition-transform duration-200 ease-out active:scale-[0.98]"
      style={{ perspective: "1000px", minHeight: "300px" }}
      onClick={handleClick}
    >
      {/* Flip container */}
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Hover glow */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#2563eb]/0 to-[#06b6d4]/0 group-hover:from-[#2563eb]/10 group-hover:to-[#06b6d4]/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Card border */}
          <div className="absolute inset-0 rounded-2xl border border-white/[0.06] group-hover:border-[#2563eb]/30 transition-colors duration-300" />

          {/* Background */}
          <div className="absolute inset-[1px] rounded-2xl bg-[#111111]" />

          {/* Front Content */}
          <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#2563eb]/10 to-[#06b6d4]/10 border border-[#2563eb]/20 flex items-center justify-center mb-6 group-hover:border-[#06b6d4]/40 transition-all duration-300">
              <IconWorld className="w-8 h-8 text-[#06b6d4]" />
            </div>
            <h4
              className="text-xl font-semibold text-white mb-2"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              {tier.title}
            </h4>
            <p className="text-[#06b6d4] text-2xl font-bold mb-6">{tier.price}</p>
            <p className="text-[#a3a3a3] text-sm italic">Click for details</p>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Hover glow */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#2563eb]/0 to-[#06b6d4]/0 group-hover:from-[#2563eb]/10 group-hover:to-[#06b6d4]/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Card border */}
          <div className="absolute inset-0 rounded-2xl border border-white/[0.06] group-hover:border-[#2563eb]/30 transition-colors duration-300" />

          {/* Background */}
          <div className="absolute inset-[1px] rounded-2xl bg-[#111111]" />

          {/* Back Content */}
          <div className="relative z-10 p-6 flex flex-col h-full">
            <h4
              className="text-lg font-semibold text-white mb-2 text-center"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              {tier.title}
            </h4>
            <p className="text-[#06b6d4] text-base font-bold mb-6 text-center">{tier.price}</p>

            {/* Bullet points */}
            <ul className="space-y-3 mb-4">
              {tier.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-[#d4d4d4] text-sm">
                  <span className="text-[#06b6d4] mt-0.5">&bull;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Push to bottom */}
            <div className="flex-grow"></div>

            <p className="text-[#a3a3a3] text-sm italic text-center">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WebsiteTiers({ tiers }: WebsiteTiersProps) {
  return (
    <div className="mb-12">
      {/* Tiers Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier, index) => (
          <ScrollReveal key={tier.title} delay={index * 0.1}>
            <WebsiteTierCard tier={tier} index={index} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
