import { useRef, useState, useEffect } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "left" | "right" | "up" | "down";
}

export function ScrollReveal({ children, delay = 0, direction = "left" }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay * 1000);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "-50px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay, mounted]);

    const getTransform = () => {
        if (isVisible) return "translate(0, 0)";
        switch (direction) {
            case "left": return "translateX(-60px)";
            case "right": return "translateX(60px)";
            case "up": return "translateY(40px)";
            case "down": return "translateY(-40px)";
            default: return "translateX(-60px)";
        }
    };

    return (
        <div
            ref={ref}
            style={{
                opacity: mounted ? (isVisible ? 1 : 0) : 1,
                transform: mounted ? getTransform() : "none",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
        >
            {children}
        </div>
    );
}
