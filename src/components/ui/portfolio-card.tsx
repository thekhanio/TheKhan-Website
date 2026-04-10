import { useRef, useState, useEffect } from "react";
import { m, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { IconExternalLink } from "@tabler/icons-react";

interface PortfolioCardProps {
  title: string;
  url: string;
  details: string;
  result?: string;
  image: string;
  index: number;
}

function AnimatedBorderWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useAnimationFrame((time) => {
    if (!mounted) return;
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / 4000;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <div className="relative p-[2px] rounded-xl overflow-hidden">
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute h-full w-full"
          width="100%"
          height="100%"
        >
          <rect
            fill="none"
            width="100%"
            height="100%"
            rx="12"
            ry="12"
            ref={pathRef}
          />
        </svg>
        {mounted && (
          <m.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "inline-block",
              transform,
            }}
          >
            <div className="h-10 w-10 bg-[radial-gradient(#06b6d4_40%,transparent_70%)] opacity-90" />
          </m.div>
        )}
      </div>

      {/* Static gradient border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#2563eb]/30 via-[#06b6d4]/30 to-[#2563eb]/30" />

      {/* Content */}
      <div className="relative rounded-xl overflow-hidden bg-[#111111]">
        {children}
      </div>
    </div>
  );
}

export function PortfolioCard({
  title,
  url,
  details,
  result,
  image,
}: PortfolioCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block cursor-pointer clickable-hover"
    >
      <div className="mb-5">
        <AnimatedBorderWrapper>
          <div className="aspect-[4/3] relative">
            <img
              src={image}
              alt={`${title} Website Screenshot`}
              width={600}
              height={338}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'top' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/0 to-[#06b6d4]/0 group-hover:from-[#2563eb]/20 group-hover:to-[#06b6d4]/20 transition-all duration-500 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 backdrop-blur-sm">
                <IconExternalLink className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </AnimatedBorderWrapper>
      </div>

      <h3
        className="text-lg font-semibold text-white mb-1 group-hover:text-[#06b6d4] transition-colors duration-300"
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        {title}
      </h3>
      <p className="text-[#06b6d4] text-sm mb-2">{details}</p>
      {result && (
        <p className="text-gradient text-sm font-semibold">{result}</p>
      )}
    </a>
  );
}
