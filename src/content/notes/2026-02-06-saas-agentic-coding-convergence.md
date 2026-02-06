---
title: "SaaS in the era of agentic coding: convergence, confusion, and the custom software counter-move"
date: 2026-02-06
description: "When the cost of shipping “another feature” collapses, SaaS drifts toward sameness—while buyers increasingly replace suites with narrowly-scoped, agent-built workflow software."
tags: ["ai", "ai-agents", "enterprise-architecture", "workflow", "ai-governance", "2026"]
---

If agentic coding makes it dramatically cheaper to produce software, it won’t just make teams ship the same backlog faster. It changes what “a product” is, what differentiation looks like, and what organizations decide to *buy* versus *build*.

This note is a bet on two outcomes—and a third, hybrid outcome that I think becomes the default.

## The key shift: time to first credible implementation collapses

Agentic coding doesn’t magically eliminate the hard parts of engineering. But it does change the slope of effort.

For many product teams, the expensive part of a feature used to be “getting to working software at all.” Now the expensive part increasingly becomes “making it correct enough, safe enough, integrated enough, and supportable enough.”

That shift matters because SaaS competition has historically been powered by feature velocity. If feature velocity becomes abundant, feature checklists stop being a moat.

If you want the adjacent argument—cheaper code can make engineering more expensive, not less—see: [Cheap code, expensive engineering](/notes/2026-01-31-cheap-code-expensive-engineering/).

## Outcome 1: SaaS platforms converge in functionality

### Feature parity becomes the default

When most teams can implement “table stakes” features quickly—either with agents internally or by vendors doing the same—products drift toward the same surface area.

The result is not that products become better. The result is that they become *more similar*.

### The UI becomes a landfill

If your roadmap cost is dominated by “could we implement it?”, you say no a lot. If your roadmap cost is dominated by “should we implement it?”, you need discipline.

Most vendors will fail that discipline test.

So the average SaaS product becomes a pile of:

- overlapping features
- half-finished workflows
- “AI buttons”
- multiple ways to do the same thing
- settings that only admins understand

### Customer confusion rises

As vendors converge on capabilities, buyer choice shifts from “what can it do?” to:

- “what is the simplest thing that reliably works for our workflows?”
- “what is defensible in audit, compliance, and operations?”
- “what integrates cleanly with our systems of record?”

This is where SaaS can paradoxically lose value even while adding features.

## Outcome 2: the market shrinks (or at least unbundles)

### Build vs. buy changes shape

Historically, “buy” won because:

- it was faster to deploy than to build
- it spread cost across customers
- it came with an operating model

Agentic coding attacks the first advantage directly.

That doesn’t mean “everyone builds everything.” It means a new category becomes viable:

**Narrowly-focused internal workflow software that replaces 60–90% of what a suite is used for.**

### The replacement pattern: system of record vs. system of action

A lot of SaaS products are basically:

- forms + approvals + dashboards
- plus a database
- plus some integrations

Those are exactly the pieces that are easiest to reproduce when:

- your data already lives elsewhere
- your processes are specific to your org
- your users mostly want “get X done”, not “learn another tool”

So buyers keep the system of record (the core ledger / master data) and replace the “doing work in the tool” layer with custom flows.

### The new “SaaS alternative” isn’t open source. It’s an agent + a repo.

In practice, the alternative to buying a feature will often look like:

- a small internal app
- a handful of automations
- a thin UI (or no UI)
- strong guardrails
- continuous iteration via an agentic dev workflow

You can call this “micro-SaaS,” but inside the enterprise it’s just “how we work.”

## The hybrid default: SaaS becomes substrate, not the experience

The two outcomes above pull in opposite directions:

- vendors add everything → convergence and confusion
- buyers build narrowly → unbundling and shrink in suite value

The hybrid outcome is: the SaaS vendor survives, but the *center of gravity moves*.

Instead of “the product is the UI,” the product becomes:

- the data model / system of record
- the permissions and policy engine
- the audit trail
- the integration fabric
- the reliability and uptime story
- the governance story (retention, eDiscovery, DLP, etc.)
- and increasingly: agent interfaces and agent-safe APIs

Meanwhile, the user experience shifts toward:

- generative UI (“show me what I need right now”)
- goal-based workflows (“achieve X outcome”)
- task completion across tools

In that world, the “best SaaS” is the one that is easiest to compose, easiest to govern, and hardest to replace at the data layer.

## What SaaS vendors should do

### Stop selling features. Sell outcomes + trust.

Feature checklists won’t disappear, but they stop being differentiation.

Differentiation shifts to:

- reliability and operational maturity
- governance and compliance posture
- time-to-value in real workflows
- integration quality
- “does it work with agents without becoming a security incident?”

### Become the best substrate

Treat your product like a platform even if you sell it like an application:

- stable APIs
- webhooks and event streams
- fine-grained permissions
- transparent audit logs
- exportability
- agent-safe action interfaces

### Expect pricing to change

Classic SaaS economics assumed near-zero marginal cost per additional user.

AI features introduce non-zero marginal costs (inference / compute), so pricing drifts toward:

- usage-based components
- outcome-based pricing
- “agent worker” pricing
- guardrailed bundles tied to measurable value

## What buyers should do

### Add a “workflow portfolio” lens

Your SaaS portfolio will split into:

- systems of record (hard to replace)
- systems of engagement (likely to change)
- systems of action (increasingly buildable)

### Put guardrails around the build wave

If teams can build quickly, they will. You need lightweight guardrails that scale:

- security patterns and approved components
- reference architectures for “micro-workflow apps”
- logging/audit standards
- data classification and access patterns
- ownership and lifecycle rules (“who maintains this in 12 months?”)

### Don’t confuse a demo with an operating model

Agentic coding can produce working software fast. Running it safely for years is still engineering.

The organizations that win will be the ones that can industrialize the *boring parts*.

## Signals to watch in 2026–2027

- SaaS products shipping “agent modes” that bypass large parts of the traditional UI
- a shift from “workflow builder” to “goal/outcome builder”
- increased emphasis on event streams + action APIs
- buyers consolidating systems of record while exploding the number of small workflow apps
- pricing moving away from pure seat-based models


## Sources

- [McKinsey: The agentic enterprise (workflows, new operating models)](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-agentic-enterprise-reimagining-workflows-with-ai-agents)
- [Madrona: The end of biz apps (Charles Lamanna interview)](https://www.madrona.com/the-end-of-biz-apps-ai-agility-and-the-agent-native-enterprise-from-microsoft-cvp-charles-lamanna/)
- [METR: evidence AI tools can slow experienced devs in some settings](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [a16z: Questioning margins is a boring cliché (AI app gross margin dynamics)](https://a16z.com/questioning-margins-is-a-boring-cliche/)
- [BVP Atlas: Scaling an AI supernova (pricing lessons from AI products)](https://www.bvp.com/atlas/scaling-an-ai-supernova-lessons-from-anthropic-cursor-and-fal)
- [Sequoia podcast: Pricing in the AI era (inputs to outcomes)](https://sequoiacap.com/podcast/pricing-in-the-ai-era-from-inputs-to-outcomes-with-paid-ceo-manny-medina/)
