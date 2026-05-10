import { chromium } from "playwright";
import path from "node:path";

const OUT = path.resolve(import.meta.dir, "..", "docs", "screenshots-homepage-tweaks-2026-05-10");
const BASE = "http://127.0.0.1:5173";

const browser = await chromium.launch({ channel: "chromium-headless-shell" });

async function shoot(opts: {
  file: string;
  viewport: { width: number; height: number };
  fullPage?: boolean;
  scrollToHeading?: string;
  clip?: { x: number; y: number; width: number; height: number };
}) {
  const ctx = await browser.newContext({
    viewport: opts.viewport,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 20_000 });
  await page.waitForTimeout(1500);
  if (opts.scrollToHeading) {
    await page.evaluate((heading: string) => {
      // Scroll so the eyebrow above the matching <h2> is visible
      const h = Array.from(document.querySelectorAll("h2")).find((el) =>
        el.textContent?.toLowerCase().includes(heading.toLowerCase()),
      );
      if (h) {
        const section = h.closest("section");
        const r = (section ?? h).getBoundingClientRect();
        window.scrollTo({ top: r.top + window.pageYOffset - 200, behavior: "instant" });
      }
    }, opts.scrollToHeading);
    await page.waitForTimeout(800);
  }
  const shotOpts: any = {
    path: path.join(OUT, opts.file),
    fullPage: !!opts.fullPage,
  };
  if (opts.clip) shotOpts.clip = opts.clip;
  await page.screenshot(shotOpts);
  console.log(`  ✓ ${opts.file}`);
  await ctx.close();
}

await shoot({
  file: "01-whats-different-desktop.png",
  viewport: { width: 1440, height: 900 },
  scrollToHeading: "doesn",
});
await shoot({
  file: "02-3-buttons-desktop.png",
  viewport: { width: 1440, height: 900 },
});
await shoot({
  file: "03-3-buttons-mobile.png",
  viewport: { width: 390, height: 844 },
});
await shoot({
  file: "04-homepage-fullpage-desktop.png",
  viewport: { width: 1440, height: 900 },
  fullPage: true,
});

await browser.close();
console.log("done.");
