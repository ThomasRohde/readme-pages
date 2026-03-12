---
title: "Compound Engineering and the New SDLC"
date: 2026-03-12
description: "Software delivery is shifting from hand-written implementation to systems of planning, context, agents, review, and learning. Compound engineering helps explain why the SDLC is changing—and why tiny teams can suddenly ship above their weight."
tags: ["ai", "ai-agents", "enterprise-architecture", "workflow", "automation"]
---

Software engineering is changing fast enough that the vocabulary keeps breaking. We started with *prompt engineering*, where the focus was asking a model the right question. Then came *context engineering*, where the real work turned out to be giving the model the right files, constraints, examples, and memory. Now the more useful frame is *compound engineering*: designing engineering work so each solved problem makes the next problem easier to solve.

That is a bigger shift than it sounds. The center of gravity moves from “write the code” to “design the system that can repeatedly produce, verify, and improve code.” The SDLC does not disappear under AI. It becomes more explicit, more operational, and much more focused on feedback loops.

## What compound engineering actually means

A practical definition is simple: each unit of work should compound into the next one.

In traditional delivery, a feature ships and the team moves on. The codebase may have more functionality, but it often also has more complexity, more local exceptions, and more hidden knowledge. The next engineer starts with a slightly heavier backpack.

Compound engineering tries to reverse that. A solved bug should become a reusable pattern. A tricky migration should become a checklist. A painful review comment should become a rule, a test, a linter, a prompt, a playbook entry, or a retrieval document. The output is not just a feature. It is a feature **plus** a better delivery system.

That is the key idea from Every’s framing: the loop is not complete when the code works. It is complete when the team has captured enough of the learning that the same class of problem becomes easier, safer, or faster next time.

## The compound loop

A useful way to describe the workflow is:

**Plan → Work → Review → Compound → Repeat**

The first three steps are familiar. The fourth is what changes the economics.

### Plan

Planning matters more than before because agents are extremely sensitive to ambiguity. A human engineer can often bridge a vague ticket with tacit knowledge. An agent usually cannot do that safely.

Good planning now means:

- clarifying the requirement
- researching the codebase for existing patterns
- checking framework guidance and external constraints
- deciding affected files and change boundaries
- identifying validations before implementation starts

This makes planning feel more like architecture and less like admin. A good plan is no longer “nice to have.” It is part of execution.

### Work

The implementation step becomes more like orchestration.

The engineer still writes code, but also:

- delegates chunks to agents
- constrains tool access
- runs work in isolated branches or worktrees
- tracks progress against a plan
- decides when to re-prompt, reset, or take over manually

The point is not to stare at every generated line. The point is to keep the work aligned with intent.

### Review

Review gets broader. It is no longer just “is this code clean?” It becomes:

- correctness review
- security review
- performance review
- architecture review
- operability review
- agent-review of agent-produced work

This is where multi-agent review starts to make practical sense. If generation is cheap, parallel review becomes a rational investment.

### Compound

This is the step most teams skip.

After the change is validated, ask:

- What worked that should become standard?
- What failed that should become a guardrail?
- What context was missing?
- What would help another engineer or agent solve this faster next time?
- Can this become searchable documentation, a checklist, a test, or a reusable workflow?

This is where software delivery starts to look less like a stream of disconnected tickets and more like a learning system.

## How the SDLC is changing

The classic SDLC stages still exist, but their shape is changing.

### Requirements become executable context

Requirements used to be written primarily for humans. Increasingly, they need to be legible to both humans and machines.

A better ticket now includes:

- user goal
- constraints and non-goals
- examples
- edge cases
- acceptance criteria
- links to architecture decisions and prior art

That is not bureaucracy. That is context packaging.

### Design becomes context design

Solution design is no longer just boxes and arrows. It includes:

- what context an agent needs
- what tools it can safely use
- where deterministic code should replace model judgment
- how decisions are captured for future retrieval
- how the system is evaluated before merge

The question shifts from “How do we implement this?” to “How do we make correct implementation likely?”

### Implementation becomes orchestration plus editing

This is the most visible change. Engineers are increasingly:

- decomposing work into smaller steps
- giving agents structured briefs
- reviewing diffs instead of typing every line
- steering retries when the model drifts
- hardening the surrounding system, not just the immediate change

The best engineers do not merely generate more code. They create conditions where good code is easier to generate.

### Testing becomes the bottleneck and the moat

When implementation gets cheaper, verification becomes the scarce capability.

That raises the value of:

- unit and integration tests
- scenario-based evals
- regression datasets
- reproducible fixtures
- deployment verification checklists
- production telemetry tied back to change intent

In other words, the SDLC gets more test-heavy, not less.

### Documentation becomes runtime infrastructure

In older teams, docs often decayed because they sat outside the main flow of delivery. In an agent-heavy workflow, docs become operational assets.

Project instructions, architecture notes, runbooks, solution write-ups, and review findings become part of the context system. If they are well-structured and easy to retrieve, they directly improve future work. If they are vague or stale, they poison future work.

This is one reason the line between “documentation” and “engineering system” is getting blurry.

### Release becomes a delegation pipeline

A modern release flow increasingly looks like this:

1. A human defines the goal and the constraints.
2. One or more agents propose or implement a change.
3. Tests and specialized reviews assess the output.
4. Findings are fixed or escalated.
5. Reusable learnings are captured.
6. Production behavior informs the next cycle.

That is still SDLC. It is just more recursive.

## Why tiny teams matter

This shift helps explain the rise of *tiny teams*.

Tiny teams are not simply small teams with a cost-cutting story. They are small teams with unusually high leverage because more of the delivery loop can be delegated, parallelized, reviewed, and captured.

The pattern usually looks like this:

- one or two humans own the product end to end
- agents handle large parts of implementation, analysis, or review
- the team relies on strong defaults, templates, and checklists
- documentation is written for retrieval, not just for compliance
- feedback loops are tight and local, so coordination cost stays low

That is why a tiny team can feel strangely large in output. It is operating with a smaller coordination surface and a bigger automation surface.

### What tiny teams do well

Tiny teams tend to perform especially well when the work benefits from:

- rapid iteration
- clear product ownership
- strong taste and decision speed
- reusable technical patterns
- a manageable compliance surface
- platform support that removes repetitive work

### What breaks tiny teams

Tiny teams struggle when:

- requirements are politically contested
- domain rules are implicit and undocumented
- testing is weak
- operational risk is high
- too many priorities compete at once
- governance still depends on serial handoffs between many stakeholders

The lesson is not “everyone should become a tiny team.” The lesson is that smaller teams now scale further **if** their systems compound.

## What compound engineering changes for enterprise teams

Enterprises should pay attention, but not imitate the surface features.

The wrong takeaway is: “one engineer plus agents can replace whole departments.”

The better takeaway is:

- reduce avoidable coordination
- turn review comments into reusable controls
- make architecture legible to agents
- invest in evaluation and retrieval infrastructure
- standardize the boring parts of delivery
- keep humans focused on judgment, risk, and product intent

Enterprise advantage may actually increase here. Large organizations already have patterns, controls, and institutional knowledge. The opportunity is to make those assets machine-usable instead of burying them in wikis, tickets, and tribal memory.

## A better mental model

The progression looks like this:

- **Prompt engineering** asks: how do I phrase the request?
- **Context engineering** asks: what does the model need to know?
- **Compound engineering** asks: how does this unit of work improve the next unit of work?
- **Tiny teams** are what you get when the answer starts working operationally.

That is why this shift matters. It is not about becoming dependent on AI for every keystroke. It is about building an engineering system that learns faster than the work expands.

## Where to start

You do not need a grand AI transformation program to apply this.

Pick one workflow and make it compound:

1. Choose a narrow lane such as bug fixing, docs updates, test generation, or code review.
2. Create a lightweight planning template with constraints, examples, and validations.
3. Add one review checklist that catches common failure modes.
4. Capture one solved problem in a format that is easy to retrieve later.
5. Update your engineering instructions, templates, or guardrails based on what you learned.
6. Measure whether the second and third runs got faster or safer.

If the answer is yes, you are already doing compound engineering.

## What to watch out for

There are a few failure modes worth naming early.

### More output, less understanding

Fast generation can hide shallow understanding. Teams can ship more while learning less unless they force reflection and review.

### Documentation theater

A pile of notes is not compound learning. The material has to be searchable, current, and tied to real decisions.

### Over-agenting

Not every task needs a swarm. Sometimes one engineer and one well-scoped agent beat a complex pipeline.

### False confidence

Agent review is useful, but it is not a replacement for accountability. Humans still own the change, the release, and the consequences.

## The real shift

The important change in software engineering is not that models can write code.

It is that software delivery can now be structured as a learning loop made of plans, context, tools, agents, review, and captured knowledge. Once that loop is in place, the SDLC changes shape. Documentation matters more. Testing matters more. Review matters more. Architecture matters more. Small teams become more powerful. And engineering starts to look less like isolated implementation and more like designing a system that compounds.

That is the real opportunity: not just faster code, but a delivery machine that gets better every time it runs.

## Sources

- [Every: Compound Engineering](https://every.to/guides/compound-engineering)
- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)
- [Are More LLM Calls All You Need? Towards Scaling Laws of Compound Inference Systems](https://arxiv.org/abs/2403.02419)
