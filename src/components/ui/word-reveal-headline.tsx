import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Line {
  text: string;
  muted?: boolean;
}

interface WordRevealHeadlineProps {
  lines: Line[];
  className?: string;
  /** Per-word stagger in ms. */
  staggerMs?: number;
  /** Delay before the first word starts after entering view, in ms. */
  initialDelayMs?: number;
  /** ARIA label for the full headline (concatenated lines). */
  ariaLabel?: string;
  /** Optional wrapper render — e.g. element type. Defaults to h2. */
  as?: "h1" | "h2" | "h3";
  children?: ReactNode;
}

/**
 * WordRevealHeadline — slide-up + fade-in per word, staggered.
 *
 * Single-purpose component used on the homepage "Code beats a
 * template" H2 only. Reuses the visual vocabulary of the existing
 * reveal-up family (translateY + fade-in) but applies it per-word.
 *
 * - Triggers once when ~30% of the element enters the viewport.
 * - Falls back to revealed after 1500ms in case IO never fires
 *   (matches ScrollReveal's safety pattern).
 * - Honors prefers-reduced-motion: words show immediately.
 */
export function WordRevealHeadline({
  lines,
  className,
  staggerMs = 100,
  initialDelayMs = 0,
  ariaLabel,
  as = "h2",
}: WordRevealHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setRevealed(true);
        return;
      }
    }

    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let fallback: ReturnType<typeof setTimeout> | null = null;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!cancelled) setRevealed(true);
          observer?.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    fallback = setTimeout(() => {
      if (!cancelled) setRevealed(true);
      observer?.disconnect();
    }, 1500);

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (fallback) clearTimeout(fallback);
    };
  }, []);

  let wordIndex = 0;
  const Tag = as;
  const fullText = ariaLabel ?? lines.map((l) => l.text).join(" ");

  return (
    <Tag
      ref={ref}
      aria-label={fullText}
      className={cn("word-reveal-host", revealed && "is-revealed", className)}
    >
      {lines.map((line, lineIdx) => {
        const words = line.text.split(/\s+/).filter(Boolean);
        return (
          <span
            key={lineIdx}
            className={cn("block", line.muted && "text-ink-quiet")}
            aria-hidden="true"
          >
            {words.map((w, i) => {
              const delay = initialDelayMs + wordIndex * staggerMs;
              wordIndex += 1;
              return (
                <span
                  key={`${lineIdx}-${i}`}
                  className="word-reveal-word"
                  style={{ ["--word-delay" as string]: `${delay}ms` }}
                >
                  {w}
                  {i < words.length - 1 ? " " : ""}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
