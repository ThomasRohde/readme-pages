---
title: "Compound Knowledge: A Claude Code Plugin That Treats Learning as Infrastructure"
date: 2026-03-23
description: "How the compound-knowledge plugin for Claude Code turns knowledge work from transactional to cumulative — and why the feedback loop matters more than the individual skills."
tags: ["ai", "ai-agents", "knowledge-management", "workflow", "productivity", "claude-code"]
---

# Compound Knowledge: A Claude Code Plugin That Treats Learning as Infrastructure

Most AI-assisted knowledge work is transactional. You open a session, solve today's problem, close the session. Whatever you learned — about the domain, about what worked, about what was wrong — lives in a conversation log that nobody will read again. The next time a related question comes up, you start from scratch.

The [compound-knowledge plugin](https://github.com/EveryInc/compound-knowledge-plugin) for Claude Code, built by [Every](https://every.to), takes a different position: knowledge work should be cumulative. Each cycle of planning, execution, and review should leave behind something that makes the next cycle faster and better informed. That sounds obvious. The interesting part is the mechanism.

## The closed loop

The plugin provides six workflow commands that form a cycle:

1. **Brainstorm** — brain-dump raw thoughts; the system searches for related past work and surfaces it automatically
2. **Plan** — structure the brainstorm into an actionable plan, with research agents running in parallel to find relevant prior decisions and saved learnings
3. **Confidence** — a gut-check at any point: what do you know, what don't you, and what would increase certainty
4. **Review** — two specialised agents check the plan in parallel: one for strategic alignment (are the goals clear? are hypotheses falsifiable? are metrics measurable?), another for data accuracy (is every number sourced? are baselines explicit?)
5. **Work** — execute the plan with task tracking, dependency management, and an execution log that persists to the plan file
6. **Compound** — extract one to three learnings from the session and save them to a searchable knowledge base

Step 6 is what closes the loop. The learnings saved by `/kw:compound` are exactly what `/kw:plan` searches for in the next cycle. That is the compounding mechanism: each session's output becomes the next session's input.

## Why the loop matters more than the skills

You could replicate any individual skill with a well-crafted prompt. "Review this plan for strategic alignment" is not hard to ask. What you cannot easily replicate is the *closed feedback loop* across sessions, because that requires:

- A persistent, searchable knowledge base (the plugin uses `docs/knowledge/` — plain markdown with YAML frontmatter, git-tracked)
- Automatic retrieval at planning time (research agents search by keywords and tags without being asked)
- Stale knowledge detection (when a new learning contradicts an old one, the plugin flags it for update or removal)
- A consistent structure that makes learnings machine-readable (typed as insight, playbook, correction, or pattern, with confidence levels and source references)

None of this is technically complex. All of it is operationally difficult to maintain by hand. The plugin's value is not sophistication — it is consistency. It ensures the loop actually runs, every time, without relying on discipline that competes with productive work.

## What a learning looks like

Each entry in `docs/knowledge/` is a short markdown file:

```yaml
---
type: insight
tags: [trials, conversion, campaigns]
confidence: high
created: 2026-02-15
source: Q1 trial campaign analysis
---
```

Followed by a title, a two-to-four sentence explanation, context on how it was discovered, and an implication for future work. Deliberately small. The goal is not to write essays about what you learned — it is to leave a signal that a future planning agent can pick up.

This is the right unit of knowledge for AI-augmented work. A human writing a retrospective document produces something too long and too narrative for an agent to use efficiently. A bare tag or label is too thin to convey meaning. A structured micro-document with typed metadata sits in the useful middle ground: rich enough to inform, cheap enough to produce, greppable enough to retrieve.

## The planning step is where compounding becomes visible

When you run `/kw:plan`, three research agents launch in parallel before the plan is written:

- **Past-work researcher** — searches `plans/` for related prior decisions and outcomes
- **Knowledge-base researcher** — searches `docs/knowledge/` for saved learnings matching the topic
- **External research** — optionally searches the web for frameworks and best practices

The results surface in a "What I Found" section. This is where you see the compounding effect directly: planning a workshop in March and the system already knows what you learned about workshop design in February. Starting a campaign and it reminds you that extended trial periods delay revenue recognition. Drafting a strategy and prior decisions about scope constraints appear automatically.

The important thing is that this happens without being asked. The research agents fire on every planning cycle. If nothing is found, they report "no prior context" and the plan proceeds. If something is found, it shapes the plan from the start. The cost of checking is near zero. The cost of not checking is repeating mistakes.

## Design choices worth noting

**Plain markdown over a database.** The knowledge base is just files in a directory. No proprietary format, no external service, no migration risk. You can grep it, git-blame it, read it in any editor. This matters more than it seems: knowledge systems that require a specialised tool to access tend to die when the tool falls out of favour.

**Pyramid Principle for plans.** The plugin's plan templates lead with the answer. Strategy documents open with the recommendation, not the analysis. Campaign plans open with the timeline, not the goals. Research documents open with the findings, not the methodology. This is an opinionated choice borrowed from consulting practice, and it forces clarity: if you cannot state your recommendation in one paragraph, you do not yet know what you are recommending.

**Parallel review, not sequential.** Strategic alignment and data accuracy are checked simultaneously by separate agents. This is faster, but it also prevents a common failure mode: when review is sequential, the first reviewer's framing biases the second. Parallel review produces independent perspectives.

**Severity triage.** Review findings are graded P1 (blocks shipping — wrong data, unfalsifiable hypothesis), P2 (should fix — missing sources, unclear metrics), P3 (nice to have — wording, formatting). This prevents the common outcome where a document is reviewed, a list of 15 suggestions is produced, and nothing happens because the list is undifferentiated.

## What this is not

This is not a project management tool. It does not track deadlines, assign tasks to people, or integrate with Jira. The `/kw:work` command breaks a plan into tasks and executes them, but within a single Claude Code session, not across a team.

It is not a writing tool. It does not help you draft prose or edit copy. The output is structured planning documents, not polished articles.

It is not a replacement for thinking. The plugin systematises the *process* around knowledge work — capture, plan, review, extract — but the quality of the input still depends on the quality of the questions you bring. A well-structured plan built on the wrong premise is still wrong. The review agents will catch some of this (the strategic-alignment reviewer specifically checks whether hypotheses are falsifiable), but not all of it.

## The meta-observation

I have been using this plugin to manage a knowledge repository — restructuring it, planning a workshop, researching best practices. The experience is instructive.

The first cycle through the loop felt over-structured. Brainstorm, plan, review, compound — for what amounts to reorganising some folders and adding frontmatter to files? But by the second planning cycle (designing a publishing workflow), the knowledge-base researcher was already surfacing learnings from the first cycle: that PARA fails for solo knowledge workers, that frontmatter is the highest-leverage metadata addition, that "curate on use" beats scheduled reviews.

That is the compound effect in miniature. Not dramatic. Not transformative in a single session. Just slightly faster, slightly better informed, and slightly less likely to repeat a mistake. Over many cycles, that compounds.

The honest assessment is that the plugin is useful precisely in proportion to how much knowledge work you do in Claude Code. If you use it occasionally, the knowledge base stays thin and the compounding effect is marginal. If it is your primary working environment — and for a growing number of knowledge workers collaborating with AI agents, it is — the loop becomes genuinely valuable after a few weeks of accumulation.

## Where to find it

- Repository: [EveryInc/compound-knowledge-plugin](https://github.com/EveryInc/compound-knowledge-plugin)
- Install: `/plugin marketplace add EveryInc/compound-knowledge-plugin` in Claude Code
- Creator: [Every](https://every.to) (Austin Tedesco)
- License: MIT
