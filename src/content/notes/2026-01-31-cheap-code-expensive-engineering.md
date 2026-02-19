---
title: "Cheap Code, Expensive Engineering"
date: 2026-01-31
description: "AI can make producing code feel abundant, while pushing more cost into architecture, integration, review, and verification. The winners will be the orgs that can safely absorb higher change volume."
tags: ["ai", "ai-agents", "ai-tools", "enterprise-architecture", "productivity"]
---

Everyone keeps saying “AI will make developers cheaper.” I think the opposite outcome is just as plausible: AI will make *code* cheaper, while making *engineering* more expensive. It stops sounding contradictory once you separate the artifact from the discipline.

## Separate code from engineering

For decades we’ve bundled two very different activities:

- **Code** is the artifact: the text (and config) that changes a system.
- **Engineering** is the discipline: deciding what to build, integrating it into a living system, and proving it’s correct *enough* to trust.

AI is very good at producing plausible artifacts quickly. That’s not the same as producing trustworthy, operable change.

## Jevons rebound for software

If the marginal cost of producing code trends toward zero, rebound dynamics kick in: people don’t just do the same amount for less money — they do *more of it*. Often a lot more.

Cheaper code doesn’t primarily reduce demand. It expands it:

- more features get attempted
- more internal tools get built
- more “small automations” become “quick wins”
- more teams decide they can ship without waiting on a scarce specialist

The software surface area grows rapidly, and it rarely comes with proportional increases in clarity, test coverage, or operational maturity.

## Where the cost moves

When code gets cheap, cost doesn’t vanish. It moves upstream and downstream into engineering work that does **not** disappear just because the code is easy to produce:

- agreeing on what “done” means (requirements, constraints, acceptance criteria)
- keeping architectures coherent as change volume increases
- integrating changes safely (interfaces, data contracts, release coordination)
- verifying correctness (tests, edge cases, performance)
- managing risk (security, privacy, compliance)
- maintaining the growing codebase over time (ownership, refactoring, dependency drift)

This is where experienced engineers get pulled in — not because they “type faster with agents,” but because they become the constraint that keeps the system from collapsing under its own change rate.

## The bottleneck shifts to review and verification

A common misconception is that the main value of AI is speeding up the people who already know what they’re doing. In practice, AI often removes syntax and recall friction on well-scoped tasks — the kind of work juniors do a lot of.

Even if the *individual* speedups show up more strongly for juniors, the *system-level* effect can still raise the cost of engineering.

Why? Throughput creates load.

If AI-assisted coding increases the volume of changes flowing into a codebase, someone has to:

- review it
- reconcile it with standards and long-term design
- validate it against real-world constraints the model doesn’t know
- deal with rework when the “looks right” solution is subtly wrong

Inside companies, that “core maintainer” burden maps cleanly onto staff/principal engineers and tech leads — the same people who already carry integration and accountability work.

## Verification debt

I sometimes call the resulting gap “verification debt.”

AI makes it easy to create plausible code quickly. But:

- plausibility isn’t correctness
- correctness isn’t safety
- safety isn’t maintainability

The gap between “it runs” and “we can trust it” is where engineering lives — and that gap doesn’t shrink automatically when code is cheaper. In many environments (especially regulated ones), it can widen.

## Don’t optimize time-to-first-solution

If you treat coding agents like a pure efficiency story, you’ll measure **time-to-first-solution** and celebrate.

The economic story you actually need is **time-to-safe-ownership**:

- Is the change understood by the team that will own it?
- Is it observable in production?
- Is rollback safe?
- Are there tests that fail when it breaks?
- Does it comply with your constraints (security, privacy, licensing, data handling)?

If you don’t measure this, you won’t see the cost rising until it shows up as:

- longer review cycles (or lower review quality)
- more churn and rework
- more incidents and regressions
- a growing tail of poorly understood services and scripts
- burnout among the people doing integration and accountability work

## What to do about it

The goal isn’t to fight the rebound effect by trying to stop people from building. That rarely works. Shape demand instead, and increase the fraction of change you can absorb safely.

### 1) Invest in safe throughput, not raw output

Focus on the things that turn high change volume into **safe** change volume:

- strong automated test suites (unit + contract + integration)
- “golden paths” and paved roads (platform templates, scaffolds, guardrails)
- policy-as-code and CI gates (security checks, license checks, SAST/DAST where appropriate)
- clear ownership and operational readiness checklists
- lightweight architecture governance that scales (principles + patterns, not meetings)

### 2) Treat agent output like high-variance junior output

Agent output can be fast and helpful — and it can be confidently wrong in ways that look correct at a glance.

A useful stance is: “assume it’s a good first draft, and verify like you would for a junior engineer.”

Concretely:

- require tests with changes
- prefer smaller PRs with explicit intent and scope
- standardize interfaces and contracts
- enforce linters/formatters and basic security scanning automatically

### 3) Protect senior attention

If senior engineers become the primary reviewers and integrators, their calendars will be the first system to fail.

Ways to reduce reviewer load without lowering quality:

- tighten definition of done and acceptance criteria before coding starts
- create reusable patterns so reviews become “conformance checks”
- push validation into automation (CI gates) where possible
- rotate reviewer duties and cap review queue size/WIP

## Metrics that tell the truth

If you only track “developer output,” you’ll optimize the wrong thing. A better dashboard looks like:

- PR volume and PR size distribution
- median review time and reviewer load (especially senior reviewers)
- rework rate (revisions per PR, revert frequency, bugfix churn post-merge)
- incident / change failure rate
- time-to-detect and time-to-restore regressions

If those trend the wrong way, your “cheap code” is becoming “expensive engineering.”

## Tradeoffs and counterpoints

This isn’t inevitable.

- If you already have strong paved roads, tests, and governance, higher throughput may be mostly upside.
- In small codebases with low coupling, the review/verification tax can be modest.
- If you pair agents with disciplined scoping and automation, you can *reduce* risk while increasing speed.

But the underlying constraint remains: **systems need coherence**, and coherence is maintained by engineering judgment plus verification. AI changes the slope of output. It doesn’t remove the need to decide, integrate, and prove.

## What to do next

- Audit where your bottleneck is today: implementation, review, integration, or verification.
- Add one “golden path” this quarter (template + CI gates + ready-to-run tests).
- Define “time-to-safe-ownership” for one team and start measuring it.
- Set explicit review budgets (WIP limits, max PR size) and see if quality improves.
- Invest in contract/integration tests for the interfaces that change most often.
- Make ownership explicit for every service/script that reaches production.
