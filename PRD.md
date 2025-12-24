# PRD: Astro + Tailwind Markdown Publishing Site (GitHub Pages)

Owner: Thomas Klok Rohde  
Repo target: `ThomasRohde/readme`  
Deploy target: `https://thomasrohde.github.io/readme/` (project Pages)

## 1) Problem statement

Thomas wants an **extremely low-friction** workflow to publish mostly Markdown content to GitHub Pages. The UI should be beautiful, but the #1 success metric is: **add/edit a Markdown file → push/merge → live site**.

## 2) Goals

1. **Fast publishing workflow**
   - Add a `.md` file under content folder and push to `main` (or merge PR) to publish.
   - Works with GitHub web editor / mobile editing.

2. **Great reading experience**
   - Clean typography, code blocks, callouts, images, tables.
   - Responsive. Dark/light mode.

3. **Docs-style navigation**
   - Left sidebar (sections), optional right-side table-of-contents (ToC) on article pages.
   - Index page with “latest” + section navigation.

4. **Static deployment**
   - Output is static files only.
   - Deploy via GitHub Actions to GitHub Pages with project base path `/readme/`.

5. **Stitch-friendly**
   - `./stitch` export can be applied with minimal translation.
   - Tailwind-first styling; avoid bespoke CSS where possible.

## 3) Non-goals

- No server-side runtime, no database.
- No user accounts, comments, or real-time features.
- No complex CMS; Git is the CMS.
- No multi-language requirement (can be added later).

## 4) Target users

- Primary: Thomas publishing personal notes/docs.
- Secondary: Visitors reading docs/notes on desktop/mobile.

## 5) Success metrics

- Publish new page in < 60 seconds (create file + commit in GitHub UI + merge).
- Lighthouse: Good readability and performance (best effort; no hard numeric gates in MVP).
- Zero broken internal links on main branch (add link check).

## 6) Information architecture

### Content types

- **Pages**: evergreen docs, e.g. “About”, “Projects”, “Setup”.
- **Notes**: dated entries, optionally tagged.

### URL scheme (MVP)

- Home: `/readme/`
- Pages: `/readme/<slug>/`
- Notes: `/readme/notes/<yyyy-mm-dd>-<slug>/` (or folder-based)

### Navigation

- Sidebar derived from folder structure (preferred) or explicit nav config.
- Notes index lists newest first.

## 7) Tech stack

- Astro (static site)
- Tailwind CSS
- Markdown (MD) + optional MDX later
- Shiki (syntax highlighting) or Astro’s built-in integration depending on implementation choice
- GitHub Actions for build/deploy to GitHub Pages

## 8) Functional requirements

### FR1: Markdown rendering
- Render Markdown with:
  - headings, lists, tables, blockquotes
  - code fences with syntax highlighting
  - images, links (relative + absolute)
- Generated headings must have stable IDs for ToC.

### FR2: Site layout
- Shared layout:
  - Top bar with site title + optional search slot
  - Left sidebar nav (collapsible on mobile)
  - Main content area
  - Footer
- Article layout adds ToC (right rail) when headings exist.

### FR3: Content collections
- Use a content approach that supports metadata (front matter) and listing:
  - title (required)
  - date (optional for pages; required for notes)
  - tags (optional)
  - summary/description (optional)
- Generate:
  - home page (latest notes + featured links)
  - notes index page
  - tag index page (optional MVP+)

### FR4: Search (MVP+)
- Add client-side static search (e.g. Pagefind) after MVP baseline is stable.
- Must not require server.

### FR5: GitHub Pages deployment
- On push to `main`, build and deploy.
- Must work as **project Pages** under `/readme/`.
- Must set base path accordingly so assets and links work.

## 9) Non-functional requirements

- Performance: static assets optimized; no huge JS bundles.
- Accessibility: semantic HTML; focus states; keyboard nav for sidebar.
- Maintainability: components organized; minimal custom CSS.
- Deterministic build: pinned tool versions if needed.

## 10) Repo structure (proposed)

```
readme/
  astro.config.mjs
  package.json
  tailwind.config.mjs
  src/
    layouts/
      BaseLayout.astro
      ArticleLayout.astro
    components/
      Header.astro
      Sidebar.astro
      Footer.astro
      Toc.astro
      Card.astro
    pages/
      index.astro
      notes/
        index.astro
      tags/
        [tag].astro        (MVP+)
    content/
      pages/
        about.md
      notes/
        2025-12-24-my-note.md
    styles/
      global.css
  public/
    assets/
  .github/
    workflows/
      pages.yml
```

## 11) Implementation plan (agent tasks)

### Phase 0 — Bootstrap
1. Initialize Astro project.
2. Add Tailwind integration.
3. Add base path configuration for project Pages (`/readme/`).
4. Create minimal layouts and routes:
   - `/` home
   - `/notes/` index
   - `/pages/<slug>/` or direct route mapping

Acceptance:
- `npm run build` produces a static `dist/` folder
- Local `npm run dev` works.

### Phase 1 — Content + navigation
1. Implement content collections for pages and notes.
2. Generate sidebar from folder or collection metadata.
3. Add ToC component based on headings.

Acceptance:
- Adding a new `.md` under notes appears in notes list automatically.
- Article pages show ToC when headings exist.

### Phase 2 — Styling + Stitch integration
1. Integrate Stitch-exported UI into layouts/components (see separate instruction file).
2. Ensure responsive sidebar + typography.

Acceptance:
- UI matches Stitch design closely.
- Dark/light mode works.

### Phase 3 — Deploy
1. Add GitHub Actions workflow for Pages.
2. Configure repo Settings → Pages → Source = GitHub Actions.

Acceptance:
- Push to `main` publishes site at `/readme/`.

### Phase 4 (MVP+) — Search + QA
1. Add Pagefind (or similar) static search.
2. Add link checking and Markdown lint (CI).
3. Add RSS feed for notes (optional).

Acceptance:
- Search returns results for titles and content.
- CI fails on broken internal links.

## 12) Acceptance criteria (MVP)

- Can publish a new note by adding a markdown file and pushing to `main`.
- Site renders correctly at `https://thomasrohde.github.io/readme/`:
  - navigation works
  - assets load (base path correct)
- Home lists latest notes.
- Notes index shows all notes newest-first.
- Article pages have ToC (when headings exist).
- Mobile sidebar is usable.

## 13) Testing plan

- Unit-ish:
  - Validate front matter schema (title/date) at build time.
- E2E smoke (CI):
  - Build site
  - Run link checker on `dist/`
- Manual checklist:
  - iPhone-sized viewport nav
  - dark mode
  - code block rendering
  - relative image links

## 14) Risks & mitigations

- Base path issues on project Pages.
  - Mitigate: set Astro base path config; test in CI with `--base` behavior.
- Stitch export uses Tailwind CDN patterns.
  - Mitigate: replace CDN with local Tailwind build; keep classes unchanged.
- Sidebar/ToC complexity creep.
  - Mitigate: MVP uses simple collection-driven nav first.

## 15) Definition of done

- All MVP acceptance criteria met
- `README.md` includes “How to publish” in 5 lines
- Actions deploy succeeds from clean checkout
