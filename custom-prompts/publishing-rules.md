# Publishing Rules for readme-pages (Astro)

This document is meant to be added as “Knowledge” to a Custom GPT, so the GPT can reliably create publish-ready articles for the site and avoid breaking the build.

## Repo structure (content locations)

The site is an Astro project. Content is stored in the repository under:

- `src/content/notes/` (time-stamped notes / essays)
- `src/content/recipes/` (cooking recipes with structured metadata)
- `src/content/pages/` (site pages, e.g., About)

## What the GPT must produce

When you ask the GPT to create a new article, the GPT must return:

1) A **recommended filename** (relative path)  
2) The **full Markdown (or MDX) file content**, including YAML frontmatter  
3) **A downloadable file attachment** containing the content (preferred)

### Downloadable file attachment (preferred)

To generate a real downloadable `.md` / `.mdx` file, the GPT must have **Code Interpreter & Data Analysis** enabled in the GPT’s Capabilities.

Rules:

- Default to `.md`
- Use `.mdx` only if the content truly needs MDX features (components, JSX)
- The downloadable file name must match the recommended filename’s base name, e.g.:
  - Recommended: `src/content/notes/2025-12-26-my-note.md`
  - Downloaded file: `2025-12-26-my-note.md`
- If multiple files are produced, attach one file per output

## Filenames

Default pattern for a note:

- `src/content/notes/YYYY-MM-DD-slug.md`

Pattern for a recipe:

- `src/content/recipes/YYYY-MM-DD-slug.md`

Where:

- `YYYY-MM-DD` is the publish date (Europe/Copenhagen time)
- `slug` is lowercase, words separated by hyphens
- no spaces, no underscores
- avoid dots in slugs (to prevent URLs like `.../something.md/`)

If the user explicitly asks to publish a “page” (not a dated note), use:

- `src/content/pages/slug.md`

## YAML frontmatter

Always include valid YAML frontmatter at the top of the file.

Required:

- `title` (string)
- `date` (YYYY-MM-DD)

Recommended:

- `description` (1–2 sentences; used in lists/preview cards if the site supports it)
- `tags` (array of strings; see tag rules below)

Optional:

- `draft: true` only when the user says it’s a work in progress

Example:

```yaml
---
title: "My Article Title"
date: 2025-12-26
description: "One or two sentences describing what the reader will learn."
tags: ["ai", "enterprise-architecture"]
---
```

Recipe frontmatter (additional fields):

```yaml
---
title: "Chocolate Chip Cookies"
date: 2025-12-26
description: "Classic chewy cookies with crispy edges."
tags: ["dessert", "baking", "cookies"]
prepTime: "15 minutes"
cookTime: "12 minutes"
servings: 24
difficulty: "easy"
---
```

Recipe-specific fields:

- `prepTime` (string, e.g., "15 minutes")
- `cookTime` (string, e.g., "30 minutes")
- `servings` (integer, e.g., 4)
- `difficulty` ("easy" | "medium" | "hard")

## Title only in frontmatter (no duplicate title heading)

- Do NOT repeat the title as a `# ...` heading in the body.
- The body must start immediately with content (typically a short intro paragraph).
- Use `##` for the first section heading.

## Tag rules

Tags must be:

- lowercase
- hyphen-separated (kebab-case)
- short and consistent

Pick 2–6 tags. Prefer existing tags unless a new one is clearly needed.

## Content conventions

- Start with a short intro paragraph (no H1).
- Use H2/H3 for structure (`##`, `###`)
- Prefer short paragraphs and bullet lists
- For “how-to” posts, include a short “Checklist” or “Steps” section
- Use fenced code blocks with language identifiers (` ```ps1 `, ` ```bash `, ` ```ts `, etc.)
- Include a “Sources” section when making factual claims that would benefit from attribution

## Publish workflow (what actually happens)

A publish-ready change is:

1) Create or update the Markdown file(s) under `src/content/notes/` or `src/content/pages/`
2) `git add`, `git commit`, `git push` to `master`
3) GitHub Actions deploys to GitHub Pages

The GPT should not invent CI details; it should focus on producing correct content files.

## Common failure modes to avoid

- Missing `---` frontmatter delimiters
- Invalid YAML (tabs, unescaped quotes, trailing `:` mistakes)
- Using tags with spaces or uppercase
- Using a slug with `.md` inside it
- Repeating the title in the body as `# Title`
