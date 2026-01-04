---
title: "Software Engineering in 2025: Karpathy’s Tweeted Field Notes"
date: 2026-01-04
description: "A dramatic-but-practical reading of Andrej Karpathy’s 2025 tweets on how software engineering shifted under AI: from writing code to verifying outcomes, supervising agents, and fighting slop."
tags: ["ai", "llm", "ai-agents", "ai-tools", "enterprise-architecture", "workflow"]
---

2025 didn’t kill software engineering. It *rearranged its organs*.

If you read Andrej Karpathy’s 2025 tweets as a single thread, you get a field report from the front: code stays central, but the work moves upward—from typing to steering, from implementing to verifying, from single-author programs to multi-model systems. It’s exhilarating. It’s also how teams accidentally ship “slop” at scale.

## Timeline: 2025 tweets (selected) that map the shift

A selective timeline of 2025 tweets (excerpts) that speak directly to day-to-day SWE as it collides with LLMs and agents:

- **2025-09-22 — “Code is KING”**  
  Code remains the primary substrate for digital leverage, even for the “AGI pilled,” and developers will rapidly swap tools to chase advantage.

- **2025-09-25 — Jobs don’t vanish; they refactor**  
  Using radiology as analogy: benchmarks don’t equal reality; AI gets adopted as a tool first; roles shift toward monitoring/supervising; demand can increase (Jevons-style).

- **2025-10-02 — Poll: how do you code with AI?**  
  Manual → autocomplete → chat → agent. The profession fractures into modes.

- **2025-10-03 — Copy/paste is “agent-ish”**  
  When the model hands you large chunks you “slot in,” you’re already supervising an agent. Much of industry work is boilerplate, which makes this feel viable—until it hits production.

- **2025-10-09 — LLMs are weirdly afraid of exceptions**  
  RL tuning seems to produce models that treat exceptions like forbidden magic, even though exceptions are part of a healthy dev loop.

- **2025-10-12 — The HAL moment**  
  AI coding tools can do unexpectedly destructive things. The joke is funny until your repo is the punchline.

- **2025-10-13 — nanochat: make an LLM you can fork**  
  Minimal end-to-end training/inference to “talk to your own LLM” quickly. Less worship. More wrench-turning.

- **2025-10-15 — nanochat as MINIX for LLMs**  
  Not the fastest path to shipping. The best path to understanding.

- **2025-10-18 — Rewrite the eval harness in ~263 lines**  
  A pushback against dependency gravity: fewer layers, more clarity.

- **2025-10-21 — Hallucinations: hilarious, addictive, fixable**  
  Small models are fun, unreliable, and (maybe) alignable with RLHF—if you care enough.

- **2025-10-22 — Regex in tokenizers: bottleneck and dependency**  
  Infra-level attention: speed, simplicity, and fewer moving parts matter.

- **2025-10-24 — Teach a small model a “strawberry” skill**  
  Synthetic data + midtraining/SFT can endow narrow capabilities. SWE becomes “teaching,” not just coding.

- **2025-10-26 — Debugging detective stories (and the question)**  
  Low-level debugging remains brutally human… for now.

- **2025-11-10 — Slop as the trade**  
  AI trades time/cost wins for an increase in slop; it can become a release valve that prevents deeper work.

- **2025-11-16 — “Software 2.0”: automate what you can verify**  
  Software 1.0: what you can specify. Software 2.0: what you can verify. Progress is jagged where verification is hard.

- **2025-11-22 — Define “slop,” quantify it**  
  The “slop index” is intuitive today; it won’t be optional tomorrow.

- **2025-11-22 — llm-council: ensembles as a pattern**  
  Multiple models as a system: compare, vote, cross-check.

- **2025-11-23 — “Intelligent canvas” beats terminal chat**  
  Interfaces will evolve past text boxes: richer canvases for thinking, building, and reviewing.

- **2025-11-23 / 2025-11-24 — Education flips**  
  You can’t reliably detect AI homework; evaluation shifts in-class. Students should use AI, but also function without it.

- **2025-11-25 — Pretrain + finetune beats “write the algorithm”**  
  A reminder that capability is increasingly a data/optimization problem, not a handwritten one.

- **2025-12-07 — LLMs as simulators**  
  Prompting becomes “pick a perspective to simulate,” not “ask an entity for truth.”

- **2025-12-09 — Programming horror still exists**  
  A small, sharp reminder: the world is still full of edge cases and leaky abstractions.

- **2025-12-28 — Vibe coding spills into real life**  
  Home automation as code, built conversationally, because it’s *fun* and it works (until it doesn’t).

## The thesis: SWE moved from implementation to verification

Karpathy’s “Software 2.0” frame is the cleanest architectural summary of 2025:

- **Software 1.0** automates what you can *specify*.
- **Software 2.0** automates what you can *verify*.

That’s a profound (and uncomfortable) migration path for teams:

- Specs stay ambiguous longer.
- Verification becomes the bottleneck (tests, evals, invariants, monitoring).
- “Coding” expands to include data curation, prompts, fine-tunes, and eval harnesses.

If you want to stay employed in this world, the job is not “be faster at typing.” The job is “be the person who can prove the thing is safe and correct enough to ship.”

## The agent spectrum is already here (even if you hate the word)

The poll framing (manual → autocomplete → chat → agent) is less about tools and more about *control surfaces*:

- **Autocomplete**: you keep the wheel; the model suggests.
- **Chat**: you ask; it responds; you integrate.
- **Agent**: you delegate; you review the outcome.

Karpathy’s observation that copy/paste chunks are “agent-ish” is the punchline: a lot of the profession already *operates as review of generated work*. That’s fine—until teams treat review like a rubber stamp.

Practical reframing:

- Don’t argue about whether you “use agents.”
- Ask: **what is the largest unit of work you accept from a model without running a verification loop?**

## Safety isn’t philosophical; it’s “don’t delete the repo”

The HAL joke lands because it names the real problem: delegation without guardrails. In 2025, “agentic” often meant “has permissions” long before it meant “has judgment.”

If exceptions scare your model, it will hide the mess from you. If it’s overconfident, it will make the mess bigger. Either way, your process needs:

- **Sandboxing**: agents work in disposable environments by default.
- **Blast-radius limits**: scoped credentials; read-only unless explicitly escalated.
- **Plan → act → report loops**: make the agent narrate intent and diffs before applying them.
- **Non-negotiable verification**: tests, linters, type checks, build, smoke tests.

The darkly funny part: the safer you make the loop, the more it starts looking like… software engineering.

## Minimalism as an antidote to dependency gravity

nanochat, the MINIX analogy, and the “bacterial rewrite” energy all point to the same countercurrent in 2025: when everything becomes AI-shaped, clarity becomes scarce—and therefore valuable.

Minimalism isn’t nostalgia. It’s an operational choice:

- Fewer dependencies mean fewer supply-chain surprises.
- Smaller codebases invite real understanding (and real debugging).
- Performance bottlenecks become visible (see: regex in tokenizers).

If your stack feels like a haunted mansion, a small rewrite can be an exorcism.

## “Slop” is the new technical debt (and it compounds faster)

The most dramatic warning in the thread is also the most mundane: speed creates temptation.

AI can produce “good enough” artifacts that:

- pass a shallow review,
- meet a deadline,
- and quietly erode the system’s coherence.

That’s slop: not “wrong,” but *structurally careless*. In 2025, teams learned that slop isn’t just content. It’s architecture, naming, boundaries, tests, and operational discipline.

A working definition you can operationalize:

- **Slop is output that increases future cognitive load faster than it increases present value.**

If you can’t quantify it yet, you can still **measure proxies**: defect rates, flaky tests, review time per LOC, rollback frequency, alert fatigue, “time to understand.”

## Interfaces and education: the canvas replaces the terminal

The “intelligent canvas” idea is what happens when you admit the terminal metaphor is tired. SWE work is not a single stream of text—it’s state, diffs, diagrams, tests, environments, deployments, incidents.

Expect tools that:

- show the code *and* the model’s plan,
- visualize dependencies and blast radius,
- embed evals as first-class objects,
- and let you “pin” verified facts as the model continues.

Education follows: if you can’t detect AI in homework, you stop pretending. You shift evaluation to where verification is possible: in-class, live, supervised. And the goal becomes twofold:

- proficient *with* AI,
- functional *without* AI.

That’s not moralizing. It’s resilience engineering.


