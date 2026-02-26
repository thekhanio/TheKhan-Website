# TheKhan Website

## What This Is
Marketing website for TheKhan — websites, AI & marketing for growing businesses.

## Live Site
- **URL:** https://thekhan.io
- **GitHub:** https://github.com/thekhanio/TheKhan-Website.git

## Tech Stack
- React 19 + TypeScript
- Vite 6 (build tool)
- Tailwind CSS 4 (via @tailwindcss/vite)
- Framer Motion (animations)
- Tabler Icons
- react-helmet-async (SEO meta)
- Cloudflare Workers (hosting)

## Key Commands
```bash
bun run dev        # Dev server (localhost:5173)
bun run build      # tsc -b && vite build
wrangler deploy    # Deploy to Cloudflare
```

## File Structure
```
src/
├── main.tsx               # Entry point
├── App.tsx                # Routes: / and /questionnaire
├── index.css              # Global CSS + theme variables + animations
├── components/
│   ├── Logo.tsx           # Responsive logo
│   ├── ContactForm.tsx    # Contact form
│   └── ui/                # 11 custom UI components
├── pages/
│   ├── HomePage.tsx       # Main landing page
│   └── QuestionnairePage.tsx  # Service questionnaire
└── lib/utils.ts           # cn() helper
public/
├── portfolio/             # Logos + portfolio images
├── sitemap.xml, robots.txt, og-image.jpg
```

## Color Scheme (CSS vars in index.css)
- Background: `#0a0a0a` → `#1a1a1a` (dark gradient)
- Accent blue: `#2563eb`
- Accent cyan: `#06b6d4`
- Card bg: `#111111`
- Text: white / `#d4d4d4` / `#a3a3a3`

## Fonts
- **Headings:** Cinzel (400–700)
- **Body:** Manrope (300–700)

## Tracking
- GA4: `G-CF1CCVLVRB`

## Path Aliases
- `@/*` → `./src/*`

## Critical Warnings
- Tailwind 4 maps `--color-{name}` vars to utility classes. Never rename CSS vars without updating all utility class references.
