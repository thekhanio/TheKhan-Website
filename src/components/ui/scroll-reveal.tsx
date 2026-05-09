import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    direction?: "left" | "right" | "up" | "down";
}

/**
 * ScrollReveal — targeted reveal animation.
 *
 * Hidden initial state if element is below the fold; revealed via
 * IntersectionObserver. Hard 1500ms fallback ensures content shows
 * even if the observer never fires (keeps screenshots and SEO safe).
 *
 * Use sparingly (hero, stats, pull quotes, key reveals).
 */
export function ScrollReveal({ children, delay = 0, direction = "up" }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState<"idle" | "hidden" | "revealed">("idle");

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let cancelled = false;
        let observer: IntersectionObserver | null = null;
        let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
        let revealTimer: ReturnType<typeof setTimeout> | null = null;

        const raf = requestAnimationFrame(() => {
            if (cancelled) return;
            const rect = el.getBoundingClientRect();
            const isBelowFold = rect.top > window.innerHeight + 20;
            if (!isBelowFold) return;

            setPhase("hidden");

            const reveal = () => {
                if (cancelled) return;
                revealTimer = setTimeout(() => setPhase("revealed"), delay * 1000);
            };

            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        reveal();
                        observer?.disconnect();
                    }
                },
                { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
            );
            observer.observe(el);

            fallbackTimer = setTimeout(() => {
                if (cancelled) return;
                reveal();
                observer?.disconnect();
            }, 1500 + delay * 1000);
        });

        return () => {
            cancelled = true;
            cancelAnimationFrame(raf);
            if (observer) observer.disconnect();
            if (fallbackTimer) clearTimeout(fallbackTimer);
            if (revealTimer) clearTimeout(revealTimer);
        };
    }, [delay]);

    const offset = () => {
        switch (direction) {
            case "left": return "translateX(-20px)";
            case "right": return "translateX(20px)";
            case "down": return "translateY(-16px)";
            case "up":
            default: return "translateY(20px)";
        }
    };

    const isHidden = phase === "hidden";

    return (
        <div
            ref={ref}
            style={{
                opacity: isHidden ? 0 : 1,
                transform: isHidden ? offset() : "none",
                /* v13: slow to 1200ms with smoother cubic easing — should
                   read as a deliberate reveal, not abrupt. */
                transition: phase === "idle" ? undefined : "opacity 1.2s cubic-bezier(0.22, 0.61, 0.36, 1), transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
        >
            {children}
        </div>
    );
}
