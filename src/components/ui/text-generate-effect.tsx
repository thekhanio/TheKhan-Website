import { useEffect, useState } from "react";
import { m, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const [mounted, setMounted] = useState(false);
  const wordsArray = words.split(" ");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(0.2),
        }
      );
    }
  }, [mounted, animate, filter, duration]);

  if (!mounted) {
    return (
      <div className={cn("font-bold", className)}>
        <div className="mt-4">
          <div className="text-neutral-400 text-2xl leading-snug tracking-wide">
            {words}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-neutral-400 text-2xl leading-snug tracking-wide">
          <m.div ref={scope}>
            {wordsArray.map((word, idx) => (
              <m.span
                key={`${word}-${idx}`}
                className="opacity-0"
                style={{
                  filter: filter ? "blur(10px)" : "none",
                }}
              >
                {word}{" "}
              </m.span>
            ))}
          </m.div>
        </div>
      </div>
    </div>
  );
};
