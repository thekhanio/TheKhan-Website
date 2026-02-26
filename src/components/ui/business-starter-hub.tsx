import React, { useRef, useState, useEffect } from "react";
import {
    IconWorld,
    IconMapPin,
    IconBrandInstagram,
    IconPalette,
    IconLink,
    IconSparkles,
    IconMailForward
} from "@tabler/icons-react";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

const services = [
    {
        icon: IconWorld,
        label: "Landing Page",
        description: "Professional single-page website to showcase your business"
    },
    {
        icon: IconMapPin,
        label: "GBP Setup",
        description: "Get found on Google Maps & Search with a fully optimized profile"
    },
    {
        icon: IconBrandInstagram,
        label: "Social Media Setup",
        description: "Facebook, Instagram & LinkedIn profiles set up with your branding"
    },
    {
        icon: IconPalette,
        label: "Logo Design",
        description: "Simple, clean logo design with 2 concepts and 2 revision rounds"
    },
    {
        icon: IconLink,
        label: "Domain Setup",
        description: "Your own .com domain registered and configured"
    },
    {
        icon: IconMailForward,
        label: "Professional Email Setup",
        description: "Professional email like you@yourbusiness.com"
    },
];

export function BusinessStarterHub() {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [mounted]);

    useEffect(() => {
        const handleClickOutside = () => setActiveTooltip(null);
        if (activeTooltip !== null) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [activeTooltip]);

    const handleIconClick = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setActiveTooltip(activeTooltip === index ? null : index);
    };

    return (
        <div ref={ref} className="relative flex flex-col items-center py-16">
            {/* Service badges at top */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {services.map((service, index) => (
                    <div
                        key={service.label}
                        className="relative group cursor-pointer"
                        onClick={(e) => handleIconClick(e, index)}
                        style={{
                            opacity: mounted ? (isVisible ? 1 : 0) : 1,
                            transform: mounted ? (isVisible ? 'translateY(0)' : 'translateY(-30px)') : 'none',
                            transition: `all 0.5s ease-out ${index * 0.1}s`,
                        }}
                    >
                        <div className="clickable-hover flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-white/[0.08] hover:border-[#06b6d4]/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:border-[#06b6d4] active:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-200">
                            <service.icon className="w-4 h-4 text-[#06b6d4]" />
                            <span className="text-sm text-white">{service.label}</span>
                        </div>

                        {/* Tooltip - appears ABOVE */}
                        {activeTooltip === index && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                <div className="bg-[#111111] border border-white/[0.1] rounded-xl p-4 shadow-2xl">
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#111111] border-r border-b border-white/[0.1] rotate-45" />
                                    <p className="text-[#d4d4d4] text-sm leading-relaxed relative z-10">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Connecting lines - SVG */}
            <svg
                className="w-full max-w-md h-24"
                viewBox="0 0 400 100"
                fill="none"
                style={{
                    opacity: mounted ? (isVisible ? 1 : 0) : 1,
                    transition: 'opacity 1s ease-out 0.5s',
                }}
            >
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <path
                        key={i}
                        d={`M ${60 + i * 56} 0 Q ${60 + i * 56} 50, 200 80`}
                        stroke="url(#line-gradient)"
                        strokeWidth="1.5"
                        fill="none"
                    />
                ))}
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Main hub box */}
            <div
                className="group relative w-full max-w-lg p-8 md:p-10 pt-12 rounded-2xl border border-white/[0.08] bg-[#111111] hover:border-white/[0.15] hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)]"
                style={{
                    opacity: mounted ? (isVisible ? 1 : 0) : 1,
                    transform: mounted ? (isVisible ? 'scale(1)' : 'scale(0.9)') : 'none',
                    transition: 'all 0.6s ease-out 0.8s',
                }}
            >
                {/* Top highlight line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#06b6d4]/60 to-transparent" />

                {/* Title badge */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] text-[#06b6d4] text-sm rounded-full border border-[#06b6d4]/30 group-hover:animate-[badge-pulse_0.6s_ease-in-out]">
                        <IconSparkles className="w-4 h-4" />
                        Best Value
                    </div>
                </div>

                <div className="text-center pt-2">
                    <h3
                        className="text-2xl md:text-3xl font-semibold text-white mb-1"
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                        Business Starter Package
                    </h3>
                    <p className="text-sm text-[#a3a3a3] mb-6">(Your Online Presence)</p>

                    <p className="text-[#d4d4d4] mb-8">
                        Everything you need to start building your online presence.
                    </p>

                    {/* Price */}
                    <div className="flex flex-col items-center justify-center mb-8">
                        <span className="text-4xl md:text-5xl font-bold text-gradient">$749</span>
                        <p className="text-[#a3a3a3] text-sm mt-2">$894 value &middot; Save $145</p>
                    </div>

                    {/* Button */}
                    <div className="flex justify-center">
                        <MovingBorderButton
                            as="a"
                            href="#contact"
                            borderRadius="9999px"
                            containerClassName="h-14 w-44 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-200 ease-out active:scale-[0.98]"
                            className="text-base px-8 tracking-wide"
                            duration={3000}
                        >
                            Get Started
                        </MovingBorderButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
