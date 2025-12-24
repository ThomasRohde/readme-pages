# Copilot Instructions: readme-pages

AI agents should use this guide to understand the codebase architecture, development workflow, and project-specific conventions.

> Managed by the `klondike` CLI tool - run `klondike` for available commands.

## Quick Context: What Is This Project?

**readme-pages** is an **Astro + Tailwind static site** for publishing Markdown content to GitHub Pages under `/readme/` base path.
- Deployment target: `https://thomasrohde.github.io/readme/`
- Built with: Astro 5.x, Tailwind CSS 4.x, TypeScript
- Content managed via Astro Content Collections (Markdown front matter + collections)
- No server-side runtime or database

See [PRD.md](../../PRD.md) for full requirements and architecture context.

## Core Architecture: Content Collections & Layouts

### Content Structure
Content lives in `src/content/`:
- **`pages/`**: Evergreen docs (about, projects). Schema: `title` (required), `description`, `order` (optional)
- **`notes/`**: Dated entries. Schema: `title` (required), `date` (required), `description`, `tags` (optional), `draft` (optional)

File: [src/content/config.ts](../../src/content/config.ts)

### Page Routing
- **Home**: `src/pages/index.astro` → displays 3 latest notes + link to notes index
- **Notes index**: `src/pages/notes/index.astro` → lists all published notes (newest first)
- **Article pages**: `src/pages/[...slug].astro` (pages) and `src/pages/notes/[...slug].astro` (notes) → render markdown with ArticleLayout

Key pattern: Use `getCollection()` to fetch and filter (e.g., `!data.draft` for notes). Always `.sort()` by date for notes.

### Layout Hierarchy
- **BaseLayout** [src/layouts/BaseLayout.astro](../../src/layouts/BaseLayout.astro): Root template with header, sidebar, footer, dark/light mode toggle
  - Theme persists in localStorage; inline `<script is:inline>` prevents flash-of-wrong-theme
  - Uses Material Symbols for icons (`<span class="material-symbols-outlined">`)
  - Base styles imported: [src/styles/global.css](../../src/styles/global.css)
- **ArticleLayout**: Builds on BaseLayout, adds table-of-contents (ToC) from headings

## Tailwind & Styling Conventions

### Configuration
File: [tailwind.config.mjs](../../tailwind.config.mjs)
- Dark mode via `darkMode: 'class'` (user toggles `.dark` on `<html>`)
- Extended colors: `primary` (#137fec), `background-light/dark`, `surface-dark`, `border-dark`
- Font families: `font-display` (Inter), `font-mono` (JetBrains Mono)
- Custom border radius (0.25rem default, not 0.375rem)

### Responsive Approach
- Mobile-first (no forced desktop breakpoints)
- Sidebar collapses on small screens; use `hidden lg:block` patterns
- Prose/content: max-w-4xl container with padding adjustments per breakpoint

### Dark Mode Convention
```astro
<!-- Always use the pattern: light class + dark:darkclass -->
<div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" />
```

## Build & Dev Workflow

### Key Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on http://localhost:4321 |
| `npm run build` | Compile TypeScript & build static dist/ (includes `astro check`) |
| `npm run preview` | Serve dist/ locally for testing (runs after build) |
| `npm run astro` | Run astro CLI directly |

### Pre-Commit Verification (MANDATORY)

```powershell
# 1. Build and check TypeScript:
npm run build

# 2. No test suite exists yet; verification is manual/browser-based
```

**CRITICAL**: `npm run build` **MUST** succeed before committing. It includes TypeScript type checking via `astro check`.

### Development Tips
- **Dev Server Must Run in Background**: Always start dev server with `npm run dev 2>&1 &` or via `Start-Job` (PowerShell). Never run blocking foreground commands that prevent subsequent shell operations. The `init.ps1` script handles this correctly using `Start-Job`.
- When editing Markdown content: dev server auto-reloads, but sometimes requires hard refresh
- When adding new routes: ensure `src/pages/` structure matches desired URL
- Base path (`/readme-pages`) is configured in [astro.config.mjs](../../astro.config.mjs) and handled automatically by Astro for asset/link references
- **Health Check Base Path**: When running health checks or previews, include the configured base path in URLs: `http://localhost:4321/readme-pages/` not `http://localhost:4321/`

## Content Publishing Workflow

To add/edit content:

1. **Add Markdown file**: Create `src/content/notes/YYYY-MM-DD-slug.md` or `src/content/pages/slug.md`
2. **Front matter**: Include required fields:
   ```markdown
   ---
   title: "Article Title"
   date: 2025-12-24           # notes only
   description: "Optional summary"
   tags: ["tag1", "tag2"]     # notes only
   draft: false               # optional, defaults to false
   ---
   ```
3. **Commit & push**: Dev server auto-renders at `/notes/YYYY-MM-DD-slug/` or `/pages/slug/`
4. **Verify**: Check sidebar navigation includes new content; click links to verify working

## Agent Behavior Rules (Klondike Workflow)

This repository uses a **multi-context-window agent workflow**. Each agent session starts fresh, so structured artifacts bridge context windows.

### Starting a Session
1. Run `Get-Location` to confirm working directory
2. Run `klondike status` to see project overview and recent work
3. Run `klondike validate` to check artifact integrity
4. Check `git log --oneline -10` for recent commits
5. Run `klondike session start --focus "F00X - description"` to begin
6. Run `init.ps1` to start dev server (see [init.ps1](../../init.ps1))
7. Verify browser shows `http://localhost:4321` with no errors

### During a Session
- Work on **ONE feature at a time** - use `klondike feature start F00X` to track
- Make atomic, reviewable commits after each meaningful change
- **Test incrementally**: verify each change in browser or via `npm run build`
- If blocked, use `klondike feature block F00X --reason "..."` and move to next task

### Ending a Session
1. Run `npm run build` and verify no errors
2. Commit all changes with clear messages (conventional format: `feat(sidebar): add collapsible nav`)
3. For verified features, run `klondike feature verify F00X --evidence "..."`
4. Run `klondike session end --summary "..." --next "..."`
5. Leave repository in **clean, mergeable state**

### Prohibited Behaviors
- ❌ Committing without running `npm run build` first
- ❌ Manually editing `.klondike/features.json` (use CLI commands)
- ❌ Leaving broken TypeScript or build errors
- ❌ Declaring feature complete without browser smoke test

## File Organization & Patterns

### Components ([src/components/](../../src/components/))
- **Card.astro**: Note/page summary card (used on home and notes index)
- **Header.astro**: Top navigation, site title, theme toggle
- **Sidebar.astro**: Folder-driven nav tree (reflects `src/content/` structure)
- **Footer.astro**: Copyright, links
- **Toc.astro**: Table of contents (renders heading list with anchor links)
- **ThemeToggle.astro**: Light/dark mode button

Pattern: Props for content, Tailwind classes for styling. No client-side JS except theme toggle.

### When to Add Components
- Reusable across multiple pages (like Card)
- Encapsulates styling + markup tightly coupled (like Toc)
- Simplifies a layout file (like Header)

**Avoid**: Single-use components; keep layouts simple and readable.

## Deployment & Base Path Handling

### Base Path `/readme/`
- Configured in [astro.config.mjs](../../astro.config.mjs): `base: '/readme/'`
- Astro **automatically** prepends base path to asset imports and `getCollection()` data
- Internal links must be relative or use `import.meta.env.BASE_URL`

Example (see [src/pages/index.astro](../../src/pages/index.astro)):
```astro
const baseUrl = import.meta.env.BASE_URL;
<a href={`${baseUrl}/notes/`}>View all notes</a>
```

### GitHub Pages Deployment
- Workflow: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- On push to `main`, GitHub Actions build → deploy to GitHub Pages
- Site live at `https://thomasrohde.github.io/readme/`

### Link Checking
- Workflow: [.github/workflows/link-check.yml](.github/workflows/link-check.yml)
- Runs on PRs and pushes to catch broken links early
- Uses [lychee](https://lychee.cli.rs/) link checker
- Configuration: [.lycheeignore](../../.lycheeignore)
- Fails build on broken **internal** links
- Ignores common false positives (localhost, social media, etc.)
- Reports results in GitHub Actions job summary

**To add link exceptions**: Edit `.lycheeignore` file with patterns to skip

## Required Artifacts & Klondike Rules

### 1. Progress File (`agent-progress.md`)
- **Location**: Project root (auto-generated from `.klondike/agent-progress.json`)
- **Update frequency**: Automatically updated by `klondike session end`
- **Do not edit manually** — changes will be overwritten

### 2. Feature Registry (`.klondike/features.json`)
- **Managed by**: `klondike feature` commands only
- **Commands**:
  - `klondike feature list` — List all features
  - `klondike feature show F00X` — Show feature details
  - `klondike feature start F00X` — Mark in-progress
  - `klondike feature verify F00X --evidence "..."` — Mark verified
  - `klondike feature block F00X --reason "..."` — Mark blocked

**Forbidden**: Manually editing this file or reading it directly (use CLI commands)

### 3. Init Script (`init.ps1`)
- **Purpose**: Reproducible environment startup
- **What it does**:
  - Checks Node.js installed
  - Kills stale dev servers on port 4321
  - Installs dependencies
  - Starts dev server in background
  - Polls localhost:4321 until ready (max 30 sec)
  - Runs health check (HTTP GET to server)

**Note**: On Windows PowerShell, dev server runs as background job. To stop: `Stop-Job -Id <ID>`

---

## Git Practices

### Commit Messages (Conventional Format)
```
feat(component): short description

Longer explanation if needed.

Closes #123
```

**Types**: `feat`, `fix`, `refactor`, `docs`, `style`, `chore`

### When to Commit
- After implementing one feature/fix
- Before starting risky changes
- End of session (always)

### Example Session Flow
```bash
klondike session start --focus "F014 - dark mode toggle"
# ... implement dark mode ...
npm run build          # Verify no errors
git add -A && git commit -m "feat(theme): implement dark/light mode toggle"
klondike feature verify F014 --evidence "Dark mode toggle added to Header, works in browser"
klondike session end --summary "F014 complete" --next "Continue with F015 typography"
```

---

## Debugging Common Issues

### Dev server won't start
- Check port 4321 is free: `Get-NetTCPConnection -LocalPort 4321`
- Run `npm run dev` manually to see error
- Check `npm install` completed successfully

### TypeScript errors on build
- Run `npm run astro` to see full error details
- Check for missing imports in `.astro` files
- Verify front matter schema matches [src/content/config.ts](../../src/content/config.ts)

### Styles not applying
- Verify Tailwind class in [tailwind.config.mjs](../../tailwind.config.mjs) `content` array (should scan `src/**/*.astro`)
- Check dark mode class: use `dark:class-name` not `dark:class-name:` (colon at end is wrong)
- Clear browser cache (hard refresh Ctrl+Shift+R)

### Links broken after deployment
- Ensure all links use `${baseUrl}` prefix or relative paths
- Check [astro.config.mjs](../../astro.config.mjs) `base: '/readme/'` is set
- Test locally with `npm run build && npm run preview`

---

## Session End Checklist

Before committing and ending session:
- [ ] `npm run build` returns exit code 0
- [ ] No TypeScript errors in terminal
- [ ] Tested in browser (http://localhost:4321)
- [ ] All changes committed with descriptive messages
- [ ] No uncommitted changes (`git status` is clean)
- [ ] Ran `klondike session end --summary "..." --next "..."`
