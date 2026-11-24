# Sysnetic — website v2

Marketing site for [Sysnetic](https://thesysnetic.com), rebuilt from the ground up with a scroll-driven WebGL experience.

## Stack

- **Next.js 16** (App Router, static export → `out/`) + **React 19** + **TypeScript**
- **Three.js** via **React Three Fiber** / drei / postprocessing (bloom)
- **GSAP** (ScrollTrigger, SplitText) + **Lenis** smooth scrolling
- **Tailwind CSS v4**

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

Don't run `next build` while `next dev` is running: they share `.next/` and the dev cache gets corrupted.

## Where things live

| Path | What |
| --- | --- |
| `lib/content.ts` | **All copy**: services, projects, values, tech stack, contact details |
| `app/` | Routes: home, `/services/[slug]`, `/work/[slug]`, `/company`, `/contact`, legal, sitemap, robots |
| `components/sections/` | Home page sections (hero, services scroller, work stack, process, tech stack…) |
| `components/three/` | WebGL scene: morphing particle system + extruded 3D logo |
| `components/layout/` | Header, footer, smooth scroll, cursor, preloader, page animations |
| `netlify.toml` | Build settings, 301s from the old `*.html` URLs, caching & security headers |
| `public/__forms.html` | Netlify Forms registration for the contact form |

## How the 3D works

One fixed `<Canvas>` (`components/three/Experience.tsx`) sits behind every page. It holds about 16k particles (7k on mobile/low-end) that morph between five shapes: **galaxy, logo, sphere, wave, helix**.

- `SceneSection` switches the shape as a section scrolls into view (home page).
- `SceneController` sets a fixed shape for a whole page.
- Both call `setScene()` from `lib/scene.ts`.
- The solid 3D logo only appears in the home hero (`logo` flag).

Markup opts into scroll animations with data attributes (see `components/layout/PageAnimations.tsx`): `data-split`, `data-reveal`, `data-words`, `data-parallax`.

Accessibility: `prefers-reduced-motion` disables smooth scroll, split-text and the custom cursor. All content is server-rendered HTML.

## SEO

- Static HTML for every page; per-page title, description, canonical and Open Graph (`lib/seo.ts`).
- JSON-LD: Organization, BreadcrumbList, Service + FAQPage (service pages), CreativeWork (case studies), ContactPage.
- `sitemap.xml` and `robots.txt` generated at build time.
- 301 redirects from every legacy URL in `netlify.toml`.

## Deploying (Netlify)

`netlify.toml` holds the whole setup: build command, publish dir `out/`, 301s from the legacy `*.html` URLs, and security/cache headers. Pushing to `main` deploys.

**Contact form:** uses Netlify Forms. The form is registered by the static `public/__forms.html` and the React form posts to it. In the Netlify dashboard:
1. Enable form detection (Forms → Enable form detection), then redeploy.
2. Add an email notification (Forms → Form notifications → Email) so enquiries reach info@thesysnetic.com.

To use another form service instead, set `NEXT_PUBLIC_CONTACT_ENDPOINT` to its URL.

## Images

The work section shows each client's logo on a white plate (`components/ui/LogoPlate.tsx`, `ProjectCard.tsx`). Logos live in `public/images/work/logos/` and are referenced from `lib/content.ts`.

`npm run optimize-images` regenerates the favicons from `assets-src/favicon.png`.
