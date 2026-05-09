interface AnimatedUnderlineProps {
  className?: string;
  vertical?: boolean;
}

/**
 * AnimatedUnderline — neutralized. Was a perpetually-animating gradient
 * sweep. Now a static hairline rule (vertical or horizontal). Same API.
 */
export function AnimatedUnderline({ className = "", vertical = false }: AnimatedUnderlineProps) {
  if (vertical) {
    return <div data-decoration="true" className={`w-px bg-line-strong ${className}`} />;
  }
  return <div data-decoration="true" className={`h-px bg-line-strong ${className}`} />;
}
