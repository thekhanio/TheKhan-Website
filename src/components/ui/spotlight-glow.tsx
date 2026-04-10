import React from "react";
import { m, useMotionValue, useMotionTemplate } from "framer-motion";

export function SpotlightGlow({ children, className = "", tilt = false }: { children: React.ReactNode; className?: string; tilt?: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    if (tilt) {
      const x = (clientX - left - width / 2) / (width / 2);
      const y = (clientY - top - height / 2) / (height / 2);
      rotateY.set(x * 4);
      rotateX.set(y * -4);
    }
  }

  function handleMouseLeave() {
    if (tilt) {
      rotateX.set(0);
      rotateY.set(0);
    }
  }

  return (
    <m.div
      className={`group relative rounded-2xl border border-white/[0.06] bg-[#111111] overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(37,99,235,0.08)] transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <m.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(37,99,235,0.15), rgba(6,182,212,0.08) 50%, transparent 80%)` }}
      />
      <m.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.04), transparent 60%)` }}
      />
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#2563eb]/30 transition-colors duration-500 pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </m.div>
  );
}
