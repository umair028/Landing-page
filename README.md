# Logo studio site

React + Vite + Tailwind CSS, with GSAP/ScrollTrigger, Lenis smooth scrolling, Framer Motion and Lucide icons.

## Getting started

Requires Node 20+ (see `.nvmrc`).

```bash
npm install
cp .env.example .env   # optional, see "Forms" below
npm run dev            # http://localhost:5173
```

## Scripts

| Command             | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with HMR            |
| `npm run build`     | Typecheck, then build for production (`dist`) |
| `npm run preview`   | Serve the production build locally            |
| `npm run typecheck` | Run the TypeScript compiler without emitting  |
| `npm run lint`      | Lint with ESLint (`lint:fix` to auto-fix)     |
| `npm run format`    | Format with Prettier (`format:check` in CI)   |

## Project structure

```
src/
  components/
    art/       SVG artwork, mockups and Canva image renderers
    home/      Home page sections (hero, work grid, studio chat)
    layout/    App shell: header, footer, cursor, scroll and reveal managers
    shared/    Sections and UI pieces reused across pages
  config/      Site-wide brand and contact settings
  data/        Static content: copy, pricing, portfolio, image catalogue
  hooks/       Reusable React hooks
  lib/         Framework-agnostic helpers (GSAP setup, scrolling, forms)
  pages/       Route-level components
```

## Conventions

- Import from `src` with the `@/` alias (`@/lib/cn`); use relative paths only for siblings.
- Formatting is owned by Prettier (with the Tailwind plugin, which also sorts class names). Don't hand-format.
- Animation code checks `prefersReducedMotion()` from `@/lib/gsap` and renders a static state when it returns true.
- Content and configuration live in `src/data` and `src/config`, not inside components.

## Rebranding

- **Name, phone, email, address, socials:** `src/config/site.ts`
- **Logo wordmark:** `src/components/art/BrandLogo.tsx`
- **Colours:** CSS variables in `src/index.css` (`--primary`, `--accent`, `--acid-yellow`)
- **Copy:** `src/data/content.ts` (FAQ, testimonials, services, process, reviews) and `src/data/pricing.ts`

## Artwork

All portfolio tiles, mockups and portraits are generated in code (`src/components/art/`), so the site has no image dependencies.
To use real work, swap the renderer in `src/components/art/PortfolioArt.tsx` for an `<img>` and point `src/data/portfolio.ts` at your files in `public/`.
An optional hero background video can be set with `site.heroVideo`.

## Forms

The contact form and the six-step brief (`/brief`) validate input on the client.
Set `VITE_FORM_ENDPOINT` in a `.env` file (Formspree, a serverless function, your CRM webhook…) to receive submissions as JSON.
Without it, submissions are logged to the console so the UI flow can still be tested.

## Animation map

| Effect                                                                              | Where                                 |
| ----------------------------------------------------------------------------------- | ------------------------------------- |
| Hero cards burst from centre, clip-reveal timer bar, marquee rise                   | `components/home/Hero.tsx`            |
| Pointer tilt + sheen on hero cards; cards collapse back on scroll                   | `components/home/Hero.tsx`            |
| Marquee loop that slows on hover                                                    | `components/home/Hero.tsx`            |
| 3D fold-away work grid with column parallax (mobile: cross-fade)                    | `components/home/WorkSection.tsx`     |
| Self-playing client chat                                                            | `components/home/StudioSection.tsx`   |
| Scroll-scrubbed reveals (`data-reveal`, `data-reveal-children`, `data-reveal-each`) | `components/layout/RevealManager.tsx` |
| Letter-roll nav hover, header drop-in, mobile menu                                  | `components/layout/Header.tsx`        |
| Difference-blend cursor (grows with label over portfolio tiles)                     | `components/layout/Cursor.tsx`        |
| Vertical logo lanes, CTA shine                                                      | `src/index.css`                       |
