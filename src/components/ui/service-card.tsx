import { cn } from "@/lib/utils";
import { useState } from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  price: string;
  bullets: string[];
  note?: string;
  index: number;
  unavailable?: boolean;
}

export function ServiceCard({
  icon,
  title,
  subtitle,
  price,
  bullets,
  note,
  unavailable = false,
}: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div
        className="group relative h-full cursor-pointer clickable-hover transition-transform duration-200 ease-out active:scale-[0.98]"
        style={{ perspective: "1000px", minHeight: "400px" }}
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
            className={cn(
              "absolute inset-0 rounded-2xl overflow-hidden",
              unavailable && "opacity-80"
            )}
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Hover glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#2563eb]/0 to-[#06b6d4]/0 group-hover:from-[#2563eb]/10 group-hover:to-[#06b6d4]/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

            {/* Card border */}
            <div className="absolute inset-0 rounded-2xl border border-white/[0.06] group-hover:border-[#2563eb]/30 transition-colors duration-300" />

            {/* Background */}
            <div className="absolute inset-[1px] rounded-2xl bg-[#111111]" />

            {/* Diagonal ribbon for unavailable services */}
            {unavailable && (
              <div className="absolute top-4 -right-10 z-30 w-40 py-1.5 text-center text-xs font-semibold text-white bg-gradient-to-r from-[#ef4444] to-[#dc2626] transform rotate-45 shadow-lg">
                At Capacity
              </div>
            )}

            {/* Front Content */}
            <div className="relative z-10 p-7 flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#2563eb]/10 to-[#06b6d4]/10 border border-[#2563eb]/20 flex items-center justify-center mb-6 group-hover:border-[#06b6d4]/40 transition-all duration-300">
                <div className="text-[#06b6d4] scale-125">{icon}</div>
              </div>
              <h3
                className="text-xl font-semibold text-white mb-2"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                {title}
              </h3>
              {subtitle && (
                <p className="text-[#a3a3a3] text-sm mb-4">{subtitle}</p>
              )}
              <p className="text-[#06b6d4] text-2xl font-semibold mb-6">{price}</p>
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
            <div className="relative z-10 p-7 flex flex-col h-full">
              <h3
                className="text-lg font-semibold text-white mb-1 text-center"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                {title}
              </h3>
              <p className="text-[#06b6d4] text-base font-semibold mb-6 text-center">{price}</p>

              {/* Bullet points */}
              <ul className="space-y-3 mb-4 flex-grow">
                {bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#d4d4d4] text-sm">
                    <span className="text-[#06b6d4] mt-1">&bull;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {note && (
                <p className="text-[#a3a3a3] text-xs italic mt-auto">{note}</p>
              )}

              {/* Waitlist note for unavailable services */}
              {unavailable && (
                <div className="mt-4 p-3 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-lg">
                  <p className="text-[#fca5a5] text-xs text-center leading-relaxed">
                    Join our waitlist - reach out to get notified when spots open
                  </p>
                </div>
              )}

              <p className="text-[#a3a3a3] text-sm italic text-center mt-4">Click to flip back</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
