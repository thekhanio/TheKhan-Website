import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: TurnstileRenderOpts) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

interface TurnstileRenderOpts {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "flexible" | "compact";
}

interface Props {
  onToken: (token: string) => void;
  onExpire?: () => void;
  theme?: "light" | "dark" | "auto";
}

const SITE_KEY = "0x4AAAAAADQqaU8xWK7Dya8N";

export function TurnstileWidget({ onToken, onExpire, theme = "dark" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let pollTimer: number | undefined;

    const mount = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        callback: (token) => onToken(token),
        "expired-callback": () => onExpire?.(),
        "error-callback": () => onExpire?.(),
        theme,
      });
    };

    if (window.turnstile) {
      mount();
    } else {
      pollTimer = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(pollTimer);
          mount();
        }
      }, 100);
    }

    return () => {
      cancelled = true;
      if (pollTimer) window.clearInterval(pollTimer);
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch { /* noop */ }
      }
    };
  }, [onToken, onExpire, theme]);

  return <div ref={containerRef} className="cf-turnstile" />;
}
