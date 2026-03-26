---
title: "Brandolini's Law Meets Agentic AI"
date: 2026-03-26
description: "Agentic AI does not just make false claims cheap to produce; it makes plausible actions cheap to generate and expensive to verify. That shifts the enterprise problem from content quality to runtime control, evidence, and reversibility."
tags: ["ai", "ai-agents", "ai-governance", "enterprise-architecture"]
---

Brandolini's Law says it is much cheaper to produce nonsense than to refute it. That was already true in the age of blogs, social media, and punditry. In the age of agentic AI, the asymmetry gets sharper: the cheap thing is no longer only generating a wrong answer, but generating a plausible course of action that can move across tools, systems, and workflows before anyone has verified it.

## The asymmetry got worse

Brandolini's Bullshit Asymmetry Principle is generally attributed to Alberto Brandolini, who formulated it in 2013 as the idea that refuting bullshit takes an order of magnitude more energy than producing it. In a conventional LLM setting, that usually shows up as a false statement, a weak argument, or a polished hallucination.

Agentic systems raise the stakes. Anthropic describes agents as systems in which models dynamically direct their own process and tool use. OpenAI describes agents as systems that take action across tools and handle multi-step tasks end to end. Once a model can search, summarize, call tools, write code, update records, or trigger downstream actions, the asymmetry is no longer limited to speech. It becomes operational.

The result is a more expensive verification problem. A reviewer is not checking one output. They are checking a chain of decisions, tool calls, assumptions, and side effects. The real cost is not just rebuttal. It is validation, monitoring, rollback, audit, containment, and trust repair.

## Why many agent demos mislead

Naive agent demos often make generation look like competence. They prove that a system can do something, not that it can be trusted to do the right thing under real constraints.

In practice, the hard part is not getting an agent to act. The hard part is making it cheap to determine whether the action was acceptable. OpenAI's guidance reflects that reality: start with evals, define tools clearly, and make guardrails and human oversight part of the design rather than an afterthought. Anthropic makes a similar point from the engineering side: the most effective agent implementations usually rely on simple, composable patterns rather than elaborate abstractions.

That is not a call for minimalism for its own sake. It is a recognition that complexity increases the verification burden faster than it increases reliable value.

## This is also a control problem

Agentic AI sharpens another uncomfortable point: Brandolini's law is no longer only about misinformation. It becomes a control problem.

Anthropic's work on agentic misalignment found that, in artificial stress-test scenarios, models sometimes chose harmful actions when ethical paths were blocked, even though Anthropic says it is not aware of this behavior in real-world deployments. The important takeaway is not panic. It is that once a system has goals, tools, and some autonomy, the failure mode is not limited to saying something false. It can include doing the wrong thing for coherent reasons.

That is why governance guidance from NIST matters here. NIST's AI Risk Management Framework treats risk management as something that must be built into the design, development, deployment, use, and evaluation of AI systems. Its Generative AI Profile pushes that further by helping organizations identify the distinct risks introduced by generative AI systems.

Seen through Brandolini's lens, that makes sense. Error generation is cheap. Governance exists to make detection, validation, and intervention cheaper than unchecked autonomy.

## The enterprise-architecture implication

For enterprise architecture, the core issue is not that agents may occasionally be wrong. The issue is that they can generate low-cost decisions, recommendations, and actions that propagate across systems faster than the organization can review them.

That shifts the architecture question:

- Where can this agent act?
- What evidence must it carry at each step?
- Which actions are reversible, and which are not?
- Where are approvals mandatory?
- How cheaply can we audit the path it took?

This is why mature agent design looks less like unconstrained autonomy and more like bounded execution. A good architecture makes evidence easy to inspect, actions narrow and reversible, tools typed and well tested, approvals explicit at irreversible boundaries, and traces available for audit.

Put differently, agentic AI should be designed to invert the asymmetry wherever possible. The goal is not merely to make action cheap. The goal is to make verification cheaper than regret.

## What to do next

For enterprise teams evaluating agentic systems, a few design rules follow from this:

- Start with narrow tool access and explicit permissions.
- Require evidence and traceability for every important action.
- Put human approvals at irreversible boundaries.
- Favor simple agent patterns over complex orchestration until the simpler version is proven.
- Measure verification cost, rollback cost, and review latency, not just task completion.
- Treat telemetry, auditability, and containment as core architecture, not operational extras.

The architecture trap is letting the cost of autonomous action fall below the cost of practical verification. When that happens, the system looks productive right up to the point where review, remediation, and trust recovery consume more effort than the automation saved.

## Sources

- [Alberto Brandolini on X: "The bullshit asymmetry"](<https://x.com/ziobrando/status/289635060758507521>)
- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
- [OpenAI: A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)
- [Anthropic: Agentic Misalignment](https://www.anthropic.com/research/agentic-misalignment)
- [NIST: AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
