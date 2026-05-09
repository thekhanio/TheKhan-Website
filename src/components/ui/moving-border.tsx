import type { ReactNode, AnchorHTMLAttributes } from "react";

/**
 * MovingBorder — neutralized. Was an orbiting cyan dot CTA (Aceternity).
 * Now renders a flat primary button. Same Button API for legacy callers.
 */

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  borderRadius?: string;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: string;
};

export function Button({ children, className = "", href, ...rest }: ButtonProps) {
  return (
    <a {...rest} href={href} className={`btn-primary ${className}`}>
      {children}
    </a>
  );
}

export function MovingBorder({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
