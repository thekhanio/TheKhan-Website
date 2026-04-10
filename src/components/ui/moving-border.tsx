import React, { useRef, useState, useEffect } from "react";
import {
  m,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "9999px",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: unknown;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Component
      className={cn(
        "bg-transparent relative p-[2px] overflow-hidden group",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      {/* Animated border */}
      <div
        className="absolute inset-0"
        style={{ borderRadius: borderRadius }}
      >
        {mounted && (
          <MovingBorder duration={duration} rx="50%" ry="50%">
            <div
              className={cn(
                "h-8 w-8 bg-[radial-gradient(#06b6d4_40%,transparent_70%)] opacity-90",
                borderClassName
              )}
            />
          </MovingBorder>
        )}
      </div>

      {/* Static gradient border */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb]/30 via-[#06b6d4]/30 to-[#2563eb]/30"
        style={{ borderRadius: borderRadius }}
      />

      {/* Hover glow effect */}
      <div
        className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md bg-gradient-to-r from-[#2563eb]/30 via-[#06b6d4]/30 to-[#2563eb]/30"
        style={{ borderRadius: borderRadius }}
      />

      {/* Inner content */}
      <div
        className={cn(
          "relative bg-[#1e40af] backdrop-blur-xl text-white flex items-center justify-center w-full h-full antialiased font-medium tracking-wide",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} - 2px)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export function GradientButton({
  children,
  className,
  containerClassName,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  [key: string]: unknown;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      className={cn(
        "relative p-[2px] overflow-hidden rounded-full group",
        containerClassName
      )}
      {...props}
    >
      {/* Animated border */}
      <div className="absolute inset-0 rounded-full">
        {mounted && (
          <MovingBorder duration={3000} rx="50%" ry="50%">
            <div className="h-8 w-8 bg-[radial-gradient(#06b6d4_40%,transparent_70%)] opacity-90" />
          </MovingBorder>
        )}
      </div>

      {/* Gradient background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4]" />

      {/* Hover glow */}
      <div className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md bg-gradient-to-r from-[#2563eb]/50 to-[#06b6d4]/50" />

      {/* Content */}
      <div
        className={cn(
          "relative bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white flex items-center justify-center w-full h-full antialiased font-medium tracking-wide rounded-full",
          className
        )}
      >
        {children}
      </div>
    </button>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: unknown;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y ?? 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <m.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </m.div>
    </>
  );
};
