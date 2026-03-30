---
title: "Workflows That Build Themselves"
date: 2026-03-30
description: "How checkpointflow dogfoods its own workflow engine to create Claude Code skills — and how this very note was published by one of them."
tags:
  - ai-agents
  - checkpointflow
  - developer-tools
  - workflows
  - dogfooding
draft: false
---

This note was published by an AI agent following a six-step procedure: gather content, create the file, build-verify, commit, push, monitor deployment. The agent didn't improvise those steps. They were written down, explicitly, in a skill definition that tells the agent exactly what to do at each stage.

That skill was itself created by a workflow running inside [checkpointflow](https://github.com/thomasrohde/checkpointflow) — the very tool this note is about.

It's turtles all the way down. And that's the point.

## The problem with agent workflows

Most agent workflows today are implicit. An operator types a prompt, the agent does some work, the operator reviews the output, maybe asks for changes. The "workflow" lives in the chat thread — ephemeral, unauditable, unrepeatable.

This works fine for one-off tasks. It falls apart for anything you want to do twice:

- **State is fragile.** Important decisions live only in conversation context, which can be lost, truncated, or misinterpreted on the next turn.
- **Pause and resume are accidental.** There's no explicit model for "wait here until a human approves" or "hand off to a different agent."
- **Validation is optional.** Outputs flow between steps unchecked. A bad output in step two silently corrupts step five.
- **Handoffs are lossy.** A second agent — or the same agent in a new session — can't reliably continue where the first left off.

These aren't hypothetical problems. They're the reason that agentic workflows feel brittle despite the underlying models being increasingly capable.

## What checkpointflow does about it

Checkpointflow (`cpf`) is a deterministic, resumable workflow engine designed for agents, operators, and shell automation. You define workflows as portable YAML state machines:

```yaml
schema_version: checkpointflow/v1
workflow:
  id: publish_note
  name: Publish a Note
  steps:
    - id: gather_content
      kind: await_event
      audience: user
      prompt: "What should the note be about?"

    - id: draft_note
      kind: await_event
      audience: agent
      prompt: "Write the note based on: ${steps.gather_content.outputs.topic}"

    - id: review
      kind: await_event
      audience: user
      prompt: "Review the draft. Approve or revise?"
      transitions:
        - when: ${event.decision == "revise"}
          next: draft_note

    - id: publish
      kind: cli
      command: "git add . && git commit -m 'New note' && git push"

    - id: done
      kind: end
```

Three properties make this different from "just writing a script":

1. **Waiting is a first-class primitive.** The `await_event` step type models explicit pauses — for human approval, agent analysis, external callbacks. The runtime persists state to disk, so a workflow can wait hours, days, or indefinitely and resume exactly where it stopped.

2. **Everything is validated.** Inputs, outputs, and events are checked against JSON Schema at every boundary. A malformed agent response doesn't silently propagate; it fails loudly at the step that produced it.

3. **Agent-agnostic orchestration.** The same workflow works whether steps are handled by Claude Code, a GitHub Action, a shell script, or a human with a terminal. The workflow contract is in the YAML, not in any particular agent's context window.

## The dogfooding layer

Here's where it gets recursive.

Checkpointflow ships with a `cpf-skill-creator` — a cpf workflow that guides the creation of new Claude Code skills. It's a nine-phase state machine:

1. **Capture intent** (human) — refine what the skill should do
2. **Research and draft** (agent) — write the SKILL.md and test cases
3. **Review draft** (human) — approve, revise, or cancel
4. **Run tests and grade** (agent) — benchmark with and without the skill
5. **Review results** (human) — iterate, optimize, or ship
6. **Improve skill** (agent) — if iterating, refine based on feedback
7. **Optimize description** (agent) — tune the trigger description for accuracy
8. **Review optimization** (human) — accept or tweak
9. **Package** (agent) — prepare for distribution

Each phase has typed inputs and outputs. Transitions are explicit — "revise" loops back to drafting, "cancel" terminates cleanly. The workflow can pause at any human checkpoint, be resumed days later, and pick up with full context.

The `publish-note` skill that published this very note was born from this process. An agent drafted it, a human reviewed it, tests validated it, and now it runs as a reliable six-step procedure whenever a new note needs to go live.

## Why this matters beyond developer tooling

The pattern here isn't specific to publishing notes or creating skills. It's a general answer to a question that every organization deploying AI agents will eventually face: **how do you make agent workflows repeatable, auditable, and safe to hand off?**

The conventional answer is "just prompt better" or "add more guardrails." Checkpointflow's answer is more structural: make the workflow a first-class artifact. Write it down. Version it. Validate it. Let it pause and resume. Let different agents and humans participate in the same workflow without losing state.

This is what "deterministic orchestration" means in practice — not that every step produces the same output (agents are stochastic), but that the *sequence, validation, and handoff logic* are predictable and inspectable.

## What to do next

- **If you're building agent workflows**: consider whether your orchestration logic lives in code, YAML, or just in the conversation. The more explicit it is, the easier it is to debug, audit, and improve.
- **If you're evaluating workflow engines**: look for first-class support for human-in-the-loop checkpoints, typed I/O validation, and agent-agnostic step execution. These matter more than the number of integrations.
- **If you want to try checkpointflow**: install it with `uv tool install checkpointflow`, run `cpf guide` for the full documentation, and `cpf init` to scaffold your first workflow.

## Sources

- [checkpointflow on GitHub](https://github.com/thomasrohde/checkpointflow) — the workflow engine
- [Claude Code](https://claude.ai/code) — the AI coding agent that runs cpf skills
- [Astro](https://astro.build) — the static site framework hosting this note
