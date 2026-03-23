---
title: "Architecture Review as a Governed Practice"
date: 2026-03-23
description: "Why architecture review stays inconsistent — and what changes when you treat evaluation criteria as governed, machine-readable assets instead of tacit knowledge."
tags: ["enterprise-architecture", "ai", "ai-agents", "governance", "architecture-quality"]
---

Architecture review is one of those practices that every enterprise IT organisation does and almost none does consistently. Two architects reviewing the same solution design will weight different concerns, apply different mental models, and arrive at different conclusions about readiness. This is not a sign that either architect is wrong. It is a sign that the evaluation criteria are implicit — carried in heads, not codified in a shared standard.

That inconsistency is manageable when review is a human-only activity performed a few times a month. It becomes a serious governance problem when AI agents enter the picture.

## The AI amplification problem

AI coding agents are already generating architecture artifacts — solution designs, ADRs, capability maps. The volume is increasing. The question of whether those artifacts are *good enough* to act on now lands at scale: more artifacts, produced faster, needing review sooner. And if you ask an AI agent to review an architecture artifact without giving it explicit criteria, you get exactly the same problem you had with human reviewers, but faster and at higher volume. The agent will hallucinate quality where there is none, apply unstated assumptions about what "good" means, and produce confident-sounding assessments with no reproducibility guarantee.

The root cause is the same in both cases. Review criteria live as tacit knowledge — in the reviewer's experience, in the review board's conventions, in the unwritten expectations of the governance function. Tacit knowledge does not scale. It does not transfer to new reviewers. It certainly does not transfer to AI agents.

## Making the criteria explicit

[EaROS](https://thomasrohde.github.io/EAROS) — the Enterprise Architecture Rubric Operational Standard — takes the position that architecture evaluation criteria should be governed assets: versioned, machine-readable, evidence-anchored, and calibrated. Not checklists. Not templates. Rubrics — the kind used in academic assessment, where every score level on every criterion has a precise verbal descriptor and a mandatory evidence requirement.

The framework is built in three layers:

**Core** defines nine dimensions that apply to every architecture artifact: stakeholder fit, scope clarity, concern coverage, traceability, internal consistency, risk coverage, compliance, actionability, and maintainability. Each dimension is scored on a 0–4 ordinal scale with verbal anchors at every level. This is the universal foundation — if you assess nothing else, assess these.

**Profiles** extend the core for specific artifact types. The solution-architecture profile adds criteria for optioning and quality-attribute analysis. The reference-architecture profile adds views, prescriptiveness, golden-path guidance, and reusability. Currently five profiles ship with the standard: solution architecture, reference architecture, ADR, capability map, and roadmap. Each inherits all core dimensions and adds four to twelve artifact-specific criteria.

**Overlays** inject cross-cutting concerns on top of any core-plus-profile combination. Apply the security overlay when the artifact touches authentication or data handling. Apply the data-governance overlay when it involves data flows or retention. Overlays compose — you can stack security and regulatory on the same assessment without conflicts, because each overlay only adds criteria; it never modifies the core or profile.

This layered design is deliberate. A flat, monolithic rubric would be simpler to build but impossible to maintain across artifact types. The layering means the core can evolve independently from profiles, and a team can author a new profile — say, for integration architecture or API design — without touching anything else.

## Gates before averages

One design choice deserves particular attention. EaROS uses gate logic rather than relying on aggregate scores alone.

In most assessment models, a high average can mask a critical weakness. A solution design might score well on scope clarity and traceability but completely ignore security — and still pass if the average exceeds the threshold. Gate criteria prevent this. A criterion marked as a critical gate will trigger an automatic rejection if it scores below the threshold, regardless of how high the other scores are. A major gate caps the best possible outcome at conditional pass.

This is the difference between an assessment framework and a checkbox exercise. Gates encode the governance function's actual risk appetite: these things matter enough that no amount of excellence elsewhere compensates for their absence.

## Designed for agents, auditable by humans

EaROS is built for AI-agent use from the ground up. The rubric files are YAML — machine-readable, diffable, version-controlled. The evaluation output conforms to a JSON Schema that captures not just scores but the evidence cited for each score, the confidence level, and whether the evidence was directly observed, inferred, or sourced externally. When an agent assesses an artifact, the evaluation record is a complete audit trail: what was scored, why, and on what basis.

The tooling reflects this. `earos init` scaffolds a workspace with all rubrics, schemas, and ten agent skills — assess, review, create, calibrate, report, validate, remediate, and more. The skills are agent-agnostic: they work with Claude Code, Cursor, Copilot, Windsurf, or any AI coding tool that reads skill files. The workspace also includes a browser-based editor with a guided assessment wizard, an artifact editor, and a rubric editor, so human reviewers are not excluded from a system designed for agents.

The calibration infrastructure is what lifts this from a framework to a standard. EaROS includes gold-set artifacts — reference documents with known scores established by expert consensus. You can run any agent (or any reviewer) against the gold set and measure inter-rater reliability. That gives you an empirical answer to "how consistent are our assessments?" rather than an opinion.

## What this is not

EaROS is not a documentation standard. It does not prescribe what an architecture artifact should contain — it evaluates what is there against explicit criteria. It is not a replacement for architectural judgment. The rubric tells you whether the evidence is present and consistent; it does not tell you whether the architectural choices are sound. And it is not a certification framework. There is no central body, no accreditation, no badge. It is a tool for teams that want their architecture governance to be reproducible rather than personality-dependent.

## The practical question

The interesting question is not whether architecture review should be more consistent — everyone agrees it should. The question is what it costs to make it consistent, and whether that cost is justified.

Rubric-based assessment has real overhead. Someone has to author and maintain the rubrics. Calibration sessions take time. Profile authoring requires domain expertise. For a team reviewing three artifacts a quarter, the investment probably does not pay back.

But for a team where AI agents are generating and reviewing artifacts continuously — where the volume of architecture work is increasing because agents make it cheap to produce — the calculus changes. Without explicit criteria, you get volume without quality assurance. The governance function either becomes a bottleneck (reviewing everything manually) or becomes theatrical (rubber-stamping what agents produce). Governed rubrics offer a third path: the criteria are explicit, the scoring is reproducible, and the AI agent's assessment is auditable. The governance function shifts from doing reviews to governing the review criteria.

That shift — from reviewing artifacts to governing the rubric that evaluates artifacts — is where architecture governance needs to go as AI-generated artifacts become the norm rather than the exception.

## Where to find it

- Documentation: [thomasrohde.github.io/EAROS](https://thomasrohde.github.io/EAROS)
- Repository: [ThomasRohde/EAROS](https://github.com/ThomasRohde/EAROS)
- Install: `npm install -g @trohde/earos`
- License: CC BY 4.0
