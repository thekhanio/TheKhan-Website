/**
 * One-shot screenshot script for the /local-services build round.
 * Uses Playwright's chromium-headless-shell.
 */

import { chromium } from "playwright";
import path from "node:path";

const OUT = path.resolve(import.meta.dir, "..", "docs", "screenshots-local-services-2026-05-10");
const BASE = "http://127.0.0.1:5173";

const SHOTS = [
  { url: "/local-services", file: "01-local-services-desktop.png", viewport: { width: 1440, height: 900 }, fullPage: true },
  { url: "/local-services", file: "02-local-services-mobile.png", viewport: { width: 390, height: 844 }, fullPage: true },
  { url: "/local-services", file: "03-local-services-hero-desktop.png", viewport: { width: 1440, height: 900 }, fullPage: false },
  { url: "/", file: "04-homepage-3-buttons-desktop.png", viewport: { width: 1440, height: 900 }, fullPage: false },
  { url: "/", file: "05-homepage-3-buttons-mobile.png", viewport: { width: 390, height: 844 }, fullPage: false },
  { url: "/", file: "06-nav-with-local-services.png", viewport: { width: 1440, height: 900 }, fullPage: false, clip: { x: 0, y: 0, width: 1440, height: 130 } },
] as const;

const browser = await chromium.launch({ channel: "chromium-headless-shell" });

for (const shot of SHOTS) {
  const ctx = await browser.newContext({
    viewport: shot.viewport,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(BASE + shot.url, { waitUntil: "networkidle", timeout: 20_000 });
  // Wait for fonts + animations to settle
  await page.waitForTimeout(1800);
  const opts: any = { path: path.join(OUT, shot.file), fullPage: shot.fullPage };
  if ("clip" in shot && shot.clip) opts.clip = shot.clip;
  await page.screenshot(opts);
  console.log(`  ✓ ${shot.file}`);
  await ctx.close();
}

await browser.close();
console.log("done.");
