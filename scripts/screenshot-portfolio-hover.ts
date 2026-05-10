import { chromium } from "playwright";
import path from "node:path";

const OUT = path.resolve(
  import.meta.dir,
  "..",
  "docs",
  "screenshots-portfolio-hover-2026-05-10",
  "01-logo-hover-desktop.png"
);
const BASE = "http://127.0.0.1:5173";

const browser = await chromium.launch({ channel: "chromium-headless-shell" });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(BASE + "/portfolio", { waitUntil: "networkidle", timeout: 20_000 });
await page.waitForTimeout(1500);

// Pause the marquee animation first (the parent .logo-marquee:hover already does
// this in CSS, but we need a stable target for hover). Then hover a centered logo.
await page.evaluate(() => {
  const track = document.querySelector(".logo-marquee-track") as HTMLElement | null;
  if (track) {
    track.style.animationPlayState = "paused";
    // Park it at a known offset so a fixed cell index lands inside the viewport
    track.style.transform = "translate3d(-15%, 0, 0)";
  }
});

await page.waitForTimeout(300);

// Hover the 3rd cell (a centered marquee logo at the parked offset)
const cells = page.locator(".logo-marquee-cell");
const target = cells.nth(2);
await target.scrollIntoViewIfNeeded();
const box = await target.boundingBox();
if (box) {
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
}

// Let the 200ms ease-out hover-in transition land
await page.waitForTimeout(450);

// Frame the marquee strip in the screenshot
const marquee = page.locator(".logo-marquee").first();
const marqueeBox = await marquee.boundingBox();
if (marqueeBox) {
  await page.screenshot({
    path: OUT,
    clip: {
      x: 0,
      y: Math.max(0, marqueeBox.y - 30),
      width: 1440,
      height: marqueeBox.height + 60,
    },
  });
} else {
  await page.screenshot({ path: OUT });
}

console.log(`  ✓ ${OUT}`);
await browser.close();
