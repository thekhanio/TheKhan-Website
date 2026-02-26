import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "white" | "black";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  type?: "full" | "short";
}

export function Logo({ variant = "white", className, size = "md", type = "full" }: LogoProps) {
  // Width-based sizing
  const sizeStyles = {
    full: {
      sm: { width: 160, height: 60 },   // Header - compact
      md: { width: 134, height: 51 },   // Footer
      lg: { width: 182, height: 68 },   // Hero (20% smaller)
      xl: { width: 400, height: 150 },  // Extra large
    },
    short: {
      sm: { width: 250, height: 250 },  // Header
      md: { width: 70, height: 70 },    // Medium
      lg: { width: 140, height: 140 },  // Hero
      xl: { width: 150, height: 150 },  // Extra large
    }
  };

  const dimensions = sizeStyles[type][size];

  let imageSrc: string;
  if (type === "short") {
    imageSrc = "/portfolio/logo-short-white.png";
  } else {
    imageSrc = variant === "white" ? "/portfolio/logo-white.png" : "/portfolio/logo-black.png";
  }

  return (
    <div className={cn("relative", className)}>
      <img
        src={imageSrc}
        alt="TheKhan"
        width={dimensions.width}
        height={dimensions.height}
        style={{ width: `${dimensions.width}px`, height: 'auto' }}
      />
    </div>
  );
}
