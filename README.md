# Cars Classic Autotrader

A responsive, editorial car-marketplace experience implemented from the supplied Figma reference. The application combines a warm vintage art direction with a performant interactive 3D hero, reusable React components, responsive page compositions, functional inventory controls, and an accessible enquiry flow.

**Live site:** [cars-classic-autotrader-3d.netlify.app](https://cars-classic-autotrader-3d.netlify.app/)

**GitHub:** [rasinenitharunchowdary-cmyk/cars-classic-autotrader](https://github.com/rasinenitharunchowdary-cmyk/cars-classic-autotrader)

## Included screens

- Home / collection landing page
- Searchable and sortable car inventory
- Dynamic vehicle detail pages for six classics
- About the dealership
- Contact and showroom information
- Services overview
- Shipping, warranty purchase, and financing detail pages
- Contact modal state with validation and success feedback
- Privacy policy, terms of use, and custom not-found page

## Experience highlights

- Interactive Three.js classic-car scene on capable desktop and tablet devices
- Lightweight transparent artwork fallback on mobile and for reduced-motion users
- Motion-powered page transitions, entrance reveals, hover states, and micro-interactions
- Responsive desktop, tablet, and mobile layouts from a 320 px minimum width
- Keyboard-friendly navigation, focus trapping, semantic landmarks, labelled controls, and reduced-motion support
- Local display fonts and original, unbranded vehicle artwork
- Lazy-loaded 3D bundle with capped device pixel ratio and offscreen rendering pause

## Technology

- React 19 and TypeScript 6
- Vite 8
- React Router 7
- Motion
- React Three Fiber, Drei, and Three.js
- Lucide icons
- Vitest and Testing Library
- Oxlint

## Run locally

Requirements: a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

The development server prints its local URL, normally `http://localhost:5173`.

## Verification

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Netlify deployment

The repository includes `netlify.toml` with the production build command, `dist` publish directory,
Node.js 22 runtime, and the history fallback required for direct React Router URLs.

## Project structure

```text
src/
  components/       Reusable marketplace, site-chrome, and 3D components
  context/          Contact-dialog state and hook
  data/             Typed vehicle, service, and FAQ content
  pages/            Route-level screen compositions
  test/             Browser API test setup
public/assets/
  fonts/             Local editorial display fonts
  images/            Original vehicle and service artwork
```

Image-generation details and asset provenance are documented in [ASSET_NOTES.md](./ASSET_NOTES.md).
The current upstream dependency-audit exception and its applicability analysis are documented in [SECURITY.md](./SECURITY.md).

## Integration note

This delivery is frontend-only. The enquiry form demonstrates complete client-side validation and success behavior; connect `handleSubmit` in `src/components/site/ContactModal.tsx` to the chosen CRM, email service, or API before production launch.
