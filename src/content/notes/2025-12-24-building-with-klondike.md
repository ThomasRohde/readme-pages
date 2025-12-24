
---
title: "Building a Complete Website in One Day with Klondike"
date: 2025-12-24
description: "How I used klondike—a CLI tool for managing AI agent workflows—to build a full-featured Astro static site with 47 features across 14 coding sessions."
tags: ["klondike", "ai-agents", "astro", "productivity", "workflow"]
---

What you're reading right now was built in a single day. Not by me alone, but by an AI coding agent guided by **klondike**—a CLI tool I created specifically for managing long-running AI development sessions.

This site includes 47 verified features: content collections, dark mode, full-text search, RSS feeds, code syntax highlighting, breadcrumb navigation, responsive design, image optimization, print styles, and more. All built from scratch in 14 consecutive coding sessions.

Let me show you how.

## The Problem with AI Coding Agents

AI coding assistants like GitHub Copilot and Claude are incredibly powerful, but they have a fundamental limitation: **context window resets**. Every time you start a new conversation, the agent forgets everything—the project structure, decisions made, features completed, and what needs to happen next.

For a quick one-shot task, that's fine. But for building a real project over multiple sessions? It's painful. You spend the first 10 minutes of each session re-explaining what you're building.

## Enter Klondike

Klondike bridges context windows. It maintains a structured record of:

- **Features**: What needs to be built, their priority, and verification status
- **Sessions**: What was accomplished, blockers encountered, and recommended next steps
- **Progress**: A running log that any agent can read to understand project state

The name comes from the card game—methodical progress through a structured deck of work.

## How This Site Was Built

### Session 1: Project Initialization

The first session was about setup. Klondike created the project structure and I defined the initial features:

```bash
klondike init --name readme-pages --prd ./PRD.md
klondike feature add "Initialize Astro project with TypeScript" -c bootstrap -p 1
klondike feature add "Add Tailwind CSS integration" -c bootstrap -p 1
klondike feature add "Configure base path for GitHub Pages" -c bootstrap -p 1
# ... and so on for 47 features
```

Each feature got a unique ID (F001, F002, etc.), a category, priority level, and acceptance criteria.

### Sessions 2-4: Core Infrastructure

These sessions built the foundation:

- **F001-F006**: Astro scaffolding, layouts, routing
- **F007-F010**: Content collections for pages and notes
- **F024-F032**: Design integration from Stitch prototype

At the end of each session, the agent ran:

```bash
klondike session end \
  --summary "Implemented 23 features across bootstrap, content, navigation" \
  --next "P2 features: dark/light mode toggle, typography, mobile sidebar"
```

This created a handoff note for the next session.

### Sessions 5-10: Polish Features

With the core working, we moved to P2 and P3 features:

- **F014**: Dark/light mode toggle with theme persistence
- **F015**: Responsive typography with Tailwind prose
- **F033**: Copy button for code blocks
- **F034**: Breadcrumb navigation
- **F036**: Callout/admonition components
- **F041**: Reading time estimates

### Sessions 11-14: Advanced Features

The final push to 100%:

- **F020**: Full-text search with Pagefind
- **F022**: Tag index pages
- **F042**: Related notes suggestions
- **F043**: Print-friendly styles
- **F023**: RSS feed generation

## The Klondike Workflow

Every session followed the same pattern:

```bash
# 1. Start session
klondike status                                  # See where we are
klondike session start --focus "F020 - Search"   # Begin work

# 2. Work on the feature
klondike feature start F020                      # Mark in-progress

# 3. Implement, test, commit
npm run build                                    # Verify it works
git add -A && git commit -m "feat(search): add Pagefind integration"

# 4. Verify and end
klondike feature verify F020 --evidence "Search works in browser"
klondike session end --summary "..." --next "..."
```

The key insight: **klondike enforces a discipline** that makes AI agents effective. No feature is "done" until it's verified. No session ends without a handoff. Every commit happens after a successful build.

## Why This Works

1. **Structured artifacts over memory**: Instead of relying on the agent to remember, klondike maintains JSON files that track state. Any agent can read them.

2. **One feature at a time**: The workflow forces focus. You can't mark five features "in progress"—you work on one, verify it, then move on.

3. **Evidence-based verification**: `klondike feature verify` requires evidence. This prevents "trust me, it works" declarations. The agent must actually test.

4. **Session handoffs**: The `--next` flag in `session end` creates explicit continuity. The next session knows exactly where to pick up.

## The Numbers

- **47 features** defined and verified
- **14 sessions** from init to 100% completion
- **~1 day** wall-clock time
- **0 broken builds** committed (klondike enforces pre-commit checks)

## Using Klondike Yourself

Klondike is a Python CLI tool designed for any project using AI coding agents. The core workflow:

```bash
# Initialize a project
klondike init --name my-project

# Add features
klondike feature add "User authentication" \
  --category core \
  --priority 1 \
  --notes "Use JWT tokens, validate email format"

# Start a session
klondike session start --focus "F001 - Authentication"

# Work...

# End session
klondike session end --summary "..." --next "..."
```

The tool works with both GitHub Copilot (reads `.github/copilot-instructions.md`) and Claude Code (reads `CLAUDE.md`).

## Lessons Learned

1. **Front-load feature definition**: Spending time upfront to define all features pays off. The agent knows exactly what to build.

2. **Prioritization matters**: P1 features formed the MVP. P2 added polish. P3-P5 were nice-to-haves. This ordering meant the site was usable after session 4.

3. **Notes are critical**: When adding features, the `--notes` flag provides implementation hints that help future sessions. "Use bcrypt for passwords" saves 10 minutes of rediscovery.

4. **Git is your safety net**: Every session ended with committed code. If a session goes sideways, you can always roll back.

## What's Next

This site is now deployed at [thomasrohde.github.io/readme](https://thomasrohde.github.io/readme/). Adding new content is as simple as creating a Markdown file and pushing to main.

The klondike workflow isn't just for new projects—it can manage feature additions, refactoring, and maintenance on existing codebases. As long as you can define what "done" looks like, klondike can track progress toward it.

If you're using AI coding agents for anything beyond quick one-shots, give structured workflow management a try. The upfront investment in defining features pays off exponentially across sessions.
