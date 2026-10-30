# Thomas Contracting & Scrap Removal – Website (demo)

React + TypeScript site for Thomas Contracting & Scrap Removal, Lansing, NY. Pages: Home, Services, 6 service detail pages, About, Service Areas, Request an Estimate, Contact (plus 404).

> **Stack note.** The build environment this was created in could not reach the npm registry, so it uses
> **esbuild** for bundling and a hand-written CSS design system (`src/styles/global.css`) instead of Vite + Tailwind,
> and a ~70-line built-in router instead of React Router. Output is the same: a static `dist/` folder.
> A Vite/Tailwind port is straightforward if preferred.

## Run locally
```bash
npm install
npm run build        # outputs dist/
npm run dev          # serves dist/ at http://localhost:4173 (run build first)
npm run typecheck    # tsc (not yet run in the original build environment)
```

## Deploy (GitHub → Netlify)
1. Push this folder to a GitHub repo.
2. In Netlify: **Add new site → Import from Git**. `netlify.toml` already sets build command `npm run build` and publish directory `dist`.
3. Optional env vars (Site settings → Environment):
   | Variable | Purpose |
   |---|---|
   | `SITE_URL` | Final domain (e.g. `https://example.com`). Enables canonical URLs, `sitemap.xml`, og:image. Netlify's own `URL` is used if unset. |
   | `ALLOW_INDEXING` | Set `true` at launch. **Default is `noindex` + `Disallow: /`** so the demo is not indexed. |
   No secrets are used anywhere.

## Go-live checklist (edit `src/config/site.ts`)
- `phone`: set to 607-280-6926 (digits only). Updates header, mobile call bar, hero, service pages, footer and contact page.
- `email`: optional.
- `formMode`: change `'demo'` → `'netlify'` to send real requests via Netlify Forms (the hidden form in `index.html` registers it; enable notifications under Netlify → Forms). Test one submission with a photo before launch; Netlify limits requests to ~8 MB.
- `showReviewFlags`: `false` to remove the "Draft • Zackary to confirm" tags on FAQ answers.
- Replace illustrative images with real photos: `public/img/` and `src/data/services.ts`, `src/data/content.ts` (`GALLERY`). Set `illustrative: false` for real ones.
- Real reviews: replace the placeholder in `Reviews` (`src/components/sections.tsx`) only with verified, attributable reviews.
- Add `ALLOW_INDEXING=true` and `SITE_URL`.

## Information still needed from Zackary
1. Business phone number (and email, if public)
2. Which services he actually offers (all six are provisional) and what materials he will/won't take
3. Residential vs commercial work; whether he needs to be on-site/homeowner present
5. How pricing/estimates work, typical scheduling lead time
6. Real project photos (ideally before/after), owner photo and a short personal note
7. Business address/hours (only if he wants them public), licensing/insurance status (only if he wants to state it), verified reviews
8. Final domain name

## Structure
```
src/config/site.ts      phone, email, form mode (single source of truth)
src/data/               services, FAQ, copy, gallery
src/components/         Layout (header/footer/sticky call bar), EstimateForm, sections, ui
src/pages/              Home.tsx, Pages.tsx (all other pages)
src/lib/                router.tsx, seo.ts (per-route titles/descriptions)
scripts/build.mjs       bundle + per-route HTML + sitemap/robots
public/brand, public/img  logos and optimized WebP images
```

## Honesty guardrails built in
Images are labelled illustrative; gallery and reviews are labelled placeholders; the form says nothing was sent in demo mode and in production only confirms after the server returns OK; no licences, insurance, history, ratings or response-time claims; LocalBusiness schema contains only name and Lansing, NY.

## Known limitations
- Fonts (Barlow Condensed, Inter) load from Google Fonts; they could not be loaded in the build sandbox, so layout was tested with fallback fonts (wider than the real ones). Lighthouse was not run.
- Logos are raster crops supplied in the brand package (not vector). The dark horizontal logo had its flat background made transparent so it sits cleanly on the charcoal footer; no recolouring.
- Only two source photos were provided, so the six service cards use different crops of them.
