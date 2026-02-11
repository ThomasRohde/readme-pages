---
title: "Agent loops as ambiguity loops"
date: 2026-02-11
description: "Why agents feel different from one-shot prompting: they turn uncertainty into a managed cycle of inspection, action, and refinement—and that changes how you design safety and governance."
tags: ["ai", "ai-agents", "ai-governance", "workflow", "security"]
---

When software developer and educator **Scott Hanselman** says “the agent loop is an ambiguity loop,” he’s pointing at what’s actually new about agents versus one-shot prompting: ambiguity isn’t something you guess away—it’s something you iteratively collapse by checking reality.

In a one-shot interaction, the model has to infer missing context from priors. In an agent loop, the system can fetch ground truth, run tools, inspect outputs, and try again until uncertainty reduces enough to act safely and correctly.

## The core loop

A useful mental model is a repeated cycle:

1. **Notice what’s unclear** (unknowns, missing inputs, conflicts).
2. **Take an action that reduces uncertainty** (read, query, run, measure).
3. **Update the plan** based on what you learned.
4. **Repeat** until you hit a stop condition.

That’s basically OODA (observe–orient–decide–act) applied to knowledge work—or debugging promoted from “a developer habit” to “a product feature.”

## Why ambiguity is the point

Most real tasks are under-specified:

- Requirements are fuzzy (“make it faster,” “clean this up,” “integrate with X”).
- The environment is unknown (repo layout, versions, configs, permissions, network access).
- Success criteria are implicit (“what counts as done?”).
- Tool outputs can conflict or be incomplete (docs vs logs vs tests).

Agents are valuable when they can **turn ambiguity into questions and experiments**:

- Read the repo instead of assuming structure.
- Run tests to see what fails instead of theorizing.
- Query APIs to get current state instead of hallucinating it.
- Make a small change, measure, then iterate.

The failure mode is also clear: if the goal/spec is vague, the loop can wander, because it’s optimizing against a moving target.

## A practical restatement

An agent is less like “smart autocomplete” and more like a **clarification engine**:

> What don’t I know yet that prevents me from acting safely and correctly?

In coding terms: **speculate → check reality → adjust**. Without “check reality,” you’re back to vibes.

## Why this matters for safety and governance

The same mechanism that makes agents powerful also makes them risky:

- A loop that keeps acting can **compound mistakes**.
- Ambiguity can get treated as **permission** (“I’ll just try…”), especially with broad tool access.
- Iteration can drift scope unless there are explicit stop conditions.

So the governance framing becomes crisp:

- If you allow an agent loop, you’re authorizing an **iterative process**, not a single answer.
- Controls must be designed for iteration: **budgets, checkpoints, audit trails, scoped permissions, and stop conditions**.

## A working heuristic for coding agents

Design the workflow around ambiguity reduction:

1. **Force explicit unknowns up front**
   - Ask for: assumptions, missing inputs, risks, and what it will inspect first.

2. **Separate exploration from execution**
   - Allow read/search/test runs by default.
   - Gate write operations, deploys, and privileged actions behind explicit checkpoints.

3. **Define “done” like a contract**
   - Acceptance criteria, constraints, and “don’t touch” boundaries reduce semantic load on a few vague words.

4. **Prefer loops that converge**
   - Good loops: tighter diffs, fewer open questions, improving test signals.
   - Bad loops: thrashing, widening scope, chasing new errors across many files.

## What to do next

- Add a “stop conditions” checklist to your agent workflows (budget, time, diff size, confidence threshold).
- Require agents to log: assumptions → actions taken → evidence → decision.
- Split tool permissions into tiers (read-only by default; escalation by checkpoint).
- Standardize acceptance criteria templates for common tasks (refactor, performance, integration).
- Measure convergence: test pass rate, diff size trend, and number of open unknowns per iteration.

## Sources

- [Zencastr — “Where is AI taking us? (with Gergely Orosz)”](https://zencastr.com/z/P-ljHViI)
- [LinkedIn — Scott Hanselman post (“AI-Augmented Coding: Beyond 'One Shots'”)](https://www.linkedin.com/posts/shanselman_people-should-not-be-judging-ai-augmented-activity-7425086894884933632--TnF)
- [Zencastr — “Run your AI Agent in a Sandbox”](https://zencastr.com/z/LabMuV8v)
