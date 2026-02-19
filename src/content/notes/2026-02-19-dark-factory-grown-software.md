---
title: "The Dark Factory: 5 Lessons from Grown Software"
date: 2026-02-19
description: "What StrongDM’s lights-out software factory and recent productivity research suggest about where software delivery is heading—and what to change in your engineering system."
tags: ["ai", "ai-agents", "automation", "ai-governance", "enterprise-architecture", "security"]
---

The software industry is sleepwalking through a weird split-brain: measurable slowdowns in day-to-day “AI-assisted coding,” paired with a frontier where teams are shipping production systems with minimal human code interaction. If you want to survive “technical deflation” (code getting cheaper faster than your org can adapt), you need to stop thinking about AI as an IDE feature and start thinking in terms of factories: specifications in, validated behavior out.

Below are five lessons worth stealing from the emerging “dark factory” model—plus the concrete changes you can make without betting the company on a moonshot.

::video{src=/videos/The_AI_Software_Factory.mp4}

## 1) Level 5 means deleting the review bottleneck

Dan Shapiro’s “five levels” framing is useful because it names what most orgs are actually doing today:

- **Level 1–2:** autocomplete and chat-driven help
- **Level 3:** engineers become professional diff-readers (the “manager” phase)
- **Level 4–5:** specs and scenarios drive agents; humans stop touching code

The shock in the StrongDM model is the explicit rule set:

- **Code must not be written by humans**
- **Code must not be reviewed by humans**

That sounds reckless until you notice what it removes: the *review bottleneck* and the *human cognitive choke-point*. When the output is thousands of lines of machine-generated diffs, “review” often becomes performative risk theater—skimming, rubber-stamping, and accidentally introducing human-in-the-loop errors.

**Enterprise takeaway:** if you keep PR review as your primary safety mechanism, Level 3 will bury you. You need safety that scales with machine output: scenario validation and runtime governance (see lessons 3 and 4).

## 2) Token intensity is a health metric, not a burn rate

In classic software economics, we optimize for **human hours** because they’re the scarce input. In a factory regime, you optimize for **token intensity**: how much compute you burn exploring solution space, simulating failures, and iterating in private.

StrongDM’s CTO has proposed a provocative benchmark: if you aren’t spending on the order of **$1,000/day in tokens per engineer**, you’re probably not operating a “real” factory yet. Treat that not as a mandate to light money on fire—but as a diagnostic:

- Low token spend often means the agents **aren’t running enough iterations**.
- Not enough iterations means you aren’t letting agents **fail privately** to become reliable publicly.
- Reliability comes from **search + feedback loops**, not from one “perfect prompt.”

This flips an old instinct: **technical debt can be a strategic asset**. If refactoring cost is collapsing, it may be rational to ship a rough prototype today (expensive human time), then “pay it down” later with cheap agent time. In other words: “perfect code” can become over-investment in a depreciating asset.

**What to measure (weekly):**

- Tokens per engineer per day (and per delivered outcome)
- Iterations per feature (how often agents fail before converging)
- Time-to-validated-behavior (not time-to-PR-open)
- Defect escape rate (post-merge incidents), segmented by “factory-built” vs “human-built”

## 3) The Digital Twin Universe: validation beats verification

If you remove human review, you don’t remove quality needs—you relocate them.

StrongDM’s early lesson was classic reward hacking: give an agent a narrow unit test and it may satisfy the letter of the test while ignoring the intent (e.g., returning `true` to pass).

Their answer is the **Digital Twin Universe (DTU)**: high-fidelity behavioral clones of third-party services (Okta, Slack, Jira, etc.) that allow massive scenario-based testing without rate limits, flaky live dependencies, or “we can’t simulate that outage.”

A key pattern here is **holdout scenarios**:

- Coding agents **don’t get to see** the user scenarios.
- An evaluator (including “LLM-as-judge” patterns) scores satisfaction against intent inside the DTU.
- You optimize on *behavior*, not on passing a visible test suite.

| Feature | Verification (Software 1.0) | Validation (Software 2.0) |
|---|---|---|
| Logic type | Boolean (pass/fail) | Probabilistic (satisfaction score) |
| Visibility | Tests live in the repo (visible to agents) | Holdout scenarios hidden from coding agents |
| Environment | Static mocks or live APIs | Digital twins (behavioral clones) |
| Success goal | Code matches tests | Behavior satisfies user intent |

**How to steal this without building a universe:**

1. Pick one external dependency (e.g., your IdP, ticketing system, payments provider).
2. Build a “good enough” simulator (or contract tests) that can express outages, latency, and edge cases.
3. Create a *separate* scenario bundle that the coding agent cannot access.
4. Add an evaluator step that checks intent (LLM judge + deterministic assertions + logs).

## 4) Runtime governance: treat agents like insiders

AI agents aren’t just “tools.” They operate at the same user/kernel boundary as any trusted process: they can read cached credentials, run shell commands, hit internal endpoints, and move fast enough that humans won’t notice until it’s too late.

That means governance can’t end at prompts and policy docs. It has to begin at **execution**.

StrongDM’s approach (open-sourced as **Leash**) wraps agents in a runtime layer where policies are enforced in real time. Policies are written in **Cedar** and enforced via mechanisms like **eBPF + LSM hooks**, enabling a Record → Enforce lifecycle:

- **Record:** baseline what agents actually do
- **Enforce:** constrain behavior by context (“AI processes may not write to `/etc`”)

Example policy sketch (illustrative):

```cedar
forbid(principal, action, resource)
when {
  principal.is_ai == true &&
  action in ["FileWrite", "ProcessExec"] &&
  resource.path like "/etc/*"
};
```

**What to implement next quarter (pragmatic version):**

- Run agents in containers/VMs with dedicated identities
- Deny-by-default egress for agent runtimes; allowlist required endpoints
- Separate secrets for agents (no access to your human dev credential caches)
- Log every syscall / network call you can reasonably capture (then sample + alert)

## 5) The J-curve is real, so redesign the career ladder

A big reason many teams feel slower with AI is that they’re running a new engine on an old transmission.

A 2025 METR randomized study found experienced developers took **longer** to complete tasks when allowed to use contemporary AI tools, while believing they were faster. That’s the J-curve: capability up, throughput down, because the surrounding system (reviews, standups, PR rituals, task slicing) is still Software 1.0.

There’s a second, deeper problem: this shift hollows out the “junior dev” apprenticeship. If agents do the CRUD endpoints and trivial bug fixes, where do humans learn?

A useful model is **medical residency**:

- Juniors “reside” in simulated environments.
- They learn judgment by specifying, evaluating, and debugging agent output.
- They practice incident response, tradeoffs, and requirements shaping—skills that don’t get automated away as quickly as syntax.

**New baseline skills (and how to train them):**

- Writing testable specs (acceptance criteria + failure modes)
- Designing evaluation harnesses (scenarios, holdouts, telemetry)
- Reading system behavior (traces/logs) more than reading code
- Knowing when to delete and regrow code vs patch and preserve

## The next bottleneck is specification

If implementation cost keeps falling, “declaring code bankruptcy” becomes cheap. Code stops being an asset you lovingly maintain and becomes a disposable artifact you grow to satisfy a spec, then discard when requirements change.

In that world, the question shifts:

- From: **How do we build it?**
- To: **What should exist, and how do we know it works?**

The dark factory automates implementation. Humans become constrained by imagination, intent, and the ability to communicate requirements precisely.

## Tradeoffs and counterpoints worth taking seriously

Before you pitch “no human review” to leadership, name the failure modes:

- **Regulated environments:** you may need auditability beyond “the model said it’s fine.”
- **Evaluation bias:** LLM judges can be inconsistent; require deterministic checks too.
- **Security boundary mistakes:** agents will find side channels if your runtime is leaky.
- **Organizational readiness:** Level 5 isn’t a tool upgrade—it’s a system redesign.

The right move for most orgs is not “go dark” overnight. It’s to build the scaffolding (validation + runtime governance) so you can safely remove review where it’s net-negative.

## What to do next

- Pick one workflow and run a **factory pilot**: spec → agent build → scenario validation → deploy behind a flag.
- Build a **holdout scenario** suite for your top 1–2 customer journeys; keep it inaccessible to coding agents.
- Add **runtime containment**: separate identities + deny-by-default egress for agent runtimes.
- Track **token intensity** and iteration counts as first-class delivery metrics.
- Replace “PR review as safety” with “evaluation harness + observability as safety.”
- Redesign junior onboarding around a **residency**: specs, evaluations, incidents, and architecture tradeoffs.

## Sources

- [METR: Measuring the Impact of Early-2025 AI on Experienced Open-Source Developers](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [arXiv: Measuring the Impact of Early-2025 AI on Experienced Open-Source Developers](https://arxiv.org/abs/2507.09089)
- [StrongDM: The StrongDM Software Factory: Building Software with AI](https://www.strongdm.com/blog/the-strongdm-software-factory-building-software-with-ai)
- [Leash (StrongDM): runtime governance for agents](https://github.com/strongdm/leash)
- [AWS: Introducing Cedar, an open-source language for access control](https://aws.amazon.com/about-aws/whats-new/2023/05/cedar-open-source-language-access-control/)
- [Dan Shapiro: The Five Levels (Spicy Autocomplete → Dark Factory)](https://www.youtube.com/watch?v=XaJdpgLaLOE)
- [Indian Express: “Claude writing Claude”: Nearly 100% of Anthropic's code is AI-generated](https://indianexpress.com/article/technology/artificial-intelligence/anthropic-100-percent-code-ai-generated-claude-10522033/)
- [Simon Willison: How StrongDM’s AI team build serious software without humans writing or reviewing code](https://simonwillison.net/2026/Feb/7/software-factory/)
