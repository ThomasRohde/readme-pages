# Instruction: Apply `./stitch` Export to the Astro Project (Coding Agent)

Goal: Take a Stitch-exported web UI located in `./stitch` and integrate it into the Astro site so that:
- Stitch layout becomes the Astro layouts/components.
- Tailwind classes remain intact.
- No Tailwind CDN usage remains in production build.
- Assets (images, fonts) are copied into `public/`.

Assumptions:
- `./stitch` contains exported HTML/CSS/assets (typical Stitch export).
- Export may include a top-level `index.html` plus an `assets/` folder.
- Export likely includes Tailwind classes and may reference Tailwind via CDN.

## 1) Inspect the Stitch export

1. Identify the main pages in `./stitch` (commonly):
   - `index.html` (home)
   - `article.html` (content page)
   - `notes.html` or `listing.html` (index/list)
   - optional components/partials

2. Identify assets folder(s):
   - images (png/jpg/svg/webp)
   - fonts
   - icons (svg)

3. Identify external dependencies:
   - Tailwind CDN `<script src="https://cdn.tailwindcss.com">`
   - Google Fonts `<link href="...">`
   - any inline styles or custom CSS file(s)

## 2) Copy assets into Astro

1. Create target folders:
   - `public/assets/` for images/icons
   - `src/styles/` for any custom CSS that must remain (prefer minimal)

2. Copy:
   - `./stitch/assets/**` → `public/assets/**`
   - If Stitch references `./assets/...`, preserve a similar structure so paths remain stable.

3. Update paths:
   - In Astro, assets in `public/` are referenced as `/assets/...`
   - Ensure any Stitch HTML that used relative paths is updated accordingly.

## 3) Convert Stitch HTML to Astro layouts/components

### 3.1 Create layout shells

Create/replace these Astro files:

- `src/layouts/BaseLayout.astro`
  - Contains: `<html>`, `<head>`, `<body>`, global header/footer
  - Slot for page content

- `src/layouts/ArticleLayout.astro`
  - Uses BaseLayout
  - Adds: sidebar + main content + ToC region

Approach:
- Take the Stitch HTML `<body>` structure and paste into BaseLayout.
- Replace the Stitch page-specific content area with `<slot />`.
- Extract repeated parts (header, footer, sidebar) into components.

### 3.2 Extract components

Create:
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/Sidebar.astro`
- `src/components/Toc.astro`
- `src/components/Card.astro` (for note listing)

Process:
1. Copy the corresponding Stitch markup blocks verbatim.
2. Replace hard-coded text with props where needed (site title, nav items).
3. Keep Tailwind class strings unchanged unless required.

## 4) Remove Tailwind CDN and wire Tailwind properly

If Stitch export uses Tailwind CDN:
- Remove any `<script src="https://cdn.tailwindcss.com">` from layout.
- Ensure Tailwind is installed and configured in the Astro project.

Implementation expectations:
- Tailwind should compile your Stitch classes during build.
- Add/confirm `src/styles/global.css` includes Tailwind directives.

Example (global.css):
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Ensure `global.css` is imported once in BaseLayout.

## 5) Fonts and icons

If Stitch uses Google Fonts:
- Preferred: keep `<link rel="preconnect">` and `<link href="...">` in `<head>` of BaseLayout.
- Alternatively: self-host fonts in `public/assets/fonts/` (optional, MVP+).

If Stitch uses an icon library:
- Prefer inline SVGs for simplicity.
- If external script is used, replace with local SVGs.

## 6) Wire pages to layouts

Implement routes:
- `src/pages/index.astro` uses BaseLayout with home content.
- `src/pages/notes/index.astro` lists notes (Card component).
- Markdown content pages use ArticleLayout.

Agent instructions:
1. Start with hardcoded content to verify layout first.
2. Then swap in real content from collections.

## 7) Ensure project Pages base path works

Because site is deployed under `/readme/`:
- Asset URLs must be base-path aware.
- Prefer Astro’s built-in base handling rather than manual concatenation.

Checklist:
- Home loads CSS and images when opened at `/readme/`.
- All internal links include the base path at runtime.

## 8) Responsiveness & behavior

Stitch export is typically static; implement minimal interaction as needed:

- Mobile sidebar:
  - Add a toggle button in header.
  - Use a small client-side script or Astro islands only if required.
  - Keep JS minimal.

- ToC:
  - Generate ToC from headings (server-side) and render list (no JS needed).

## 9) Validation checklist (definition of “applied successfully”)

- The site visually matches Stitch export on:
  - desktop width (~1280px)
  - mobile width (~390px)
- No Tailwind CDN remains.
- Images/icons render from `public/assets`.
- Lighthouse/DevTools shows no blocked network requests.
- `npm run build` produces a working `dist/` and deployed site renders identically.

## 10) Common pitfalls

- Paths: Stitch relative paths break after moving assets.
- Tailwind purge/content config missing:
  - Ensure Tailwind scans `src/**/*.{astro,js,ts,jsx,tsx,md,mdx}`.
- Over-extraction:
  - Don’t componentize everything; keep it simple.
