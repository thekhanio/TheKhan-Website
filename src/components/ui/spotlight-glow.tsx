import type { ReactNode } from "react";

/**
 * SpotlightGlow — neutralized. Was a mouse-tracked radial-gradient hover
 * card (Aceternity pattern). Now renders as a flat editorial card with a
 * hairline border. Same API so legacy private pages keep compiling.
 */
export function SpotlightGlow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  return (
    <div className={`ed-card ${className}`}>
      {children}
    </div>
  );
}
