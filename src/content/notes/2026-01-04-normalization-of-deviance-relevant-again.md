---
title: "Normalization of Deviance is back (because we keep shipping exceptions)"
date: 2026-01-04
description: "How small, repeated “it was fine last time” decisions turn into culture—and why AI, security exceptions, and modern delivery pressure make this failure mode feel newly urgent."
tags: ["enterprise-architecture", "security", "ai-governance", "workflow"]
---

Normalization of deviance is what happens when yesterday’s “temporary exception” quietly becomes today’s “how we do things.” It’s not usually malice—it's a slow cultural drift that turns warning signs into background noise, until the day they matter.

## The origin story: Challenger, and the day “anomaly” became “normal”

The phrase is most associated with sociologist Diane Vaughan’s study of NASA and the 1986 Space Shuttle *Challenger* disaster. Her core observation wasn’t “someone broke the rules,” but that the organization **reinterpreted** repeated anomalies as acceptable because the system kept *appearing* to work.

A simplified version of the pattern:

- Engineers observe a deviation from design intent (e.g., O‑ring erosion / blow-by).
- The deviation doesn’t immediately cause a catastrophe.
- Pressure builds to maintain schedule and commitments.
- The organization gradually treats the deviation as “in family,” and the bar for “safe enough” moves.
- Success is misread as proof of safety (instead of luck + margin).

Once that reinterpretation becomes shared and tacit, the deviance stops feeling deviant.

## The second NASA example: Columbia and “accepted risk” creep

After the 2003 *Columbia* loss, the Columbia Accident Investigation Board (CAIB) explicitly points to this same dynamic: repeated foam-shedding and debris strikes moved from “this must not happen” to “turnaround/maintenance issue” to “accepted risk,” and the Board names this as the normalization of deviance.

It’s worth noticing the nuance: the danger didn’t arrive suddenly—*the organization’s sensitivity to it left gradually*.

## The mechanism: how deviance gets normalized in real teams

You can usually find these ingredients:

### 1) Ambiguity + incomplete feedback
If the system doesn’t fail immediately, people create stories to explain why it’s fine.

- “It’s noisy, but harmless.”
- “The dashboard is wrong.”
- “That control is only for auditors.”
- “The model is mostly right.”

### 2) Local optimization under pressure
Teams optimize for throughput, KPIs, and “not blocking the release,” and only later discover they were spending safety margin.

### 3) Exception debt
Every exception creates a new “temporary” state. Without an expiry, exceptions accumulate like interest.

### 4) Social proof
Once senior people have endorsed a workaround, challenging it becomes harder—especially for newcomers.

## Why it feels suddenly relevant again

This pattern never left. What’s new is how many systems now have the perfect conditions for it.

### AI-assisted work (and agentic systems)
LLMs and copilots are *highly plausible* and often “good enough.” That’s exactly the recipe for over-trust.

Common drift:

- “Draft only” becomes “ship with light review.”
- “Suggest” becomes “decide.”
- “Explain” becomes “justify.”

If you’re building agents, the risk gets sharper: the system can turn a small, tolerated error into many automated actions before anyone notices.

### Security and compliance exception factories
Modern orgs run on waivers:

- temporary firewall rules
- “just for this vendor” access
- bypassed controls to hit a deadline
- “we’ll fix it in Q3” backlog items that never get resourced

Without governance that treats exceptions as first-class objects (owner, rationale, expiry, compensating controls), you end up normalizing vulnerability.

### Reliability work under alert fatigue
When alerts are noisy, people learn to ignore them. Then the one alert that mattered looks exactly like yesterday’s false positives.

Normalization of deviance in ops often looks like:

- silencing alerts instead of fixing signal quality
- “we always run hot” capacity habits
- accepting flakey jobs because the retry “usually works”

### Industry reminders
Aviation and space have been in the spotlight again with renewed attention on manufacturing quality, safety culture, and regulatory oversight. Even if your org isn’t building airplanes, the underlying lesson carries: **complex systems punish complacency slowly, then all at once**.

## How to spot normalization of deviance early

Use these as leading indicators:

- **Rising exception count** (policy waivers, risk acceptances, “temporary” bypasses).
- **Exceptions without expiry** or with repeated extensions.
- **Recurring incidents with the same root cause** (or “unknown” root cause).
- **Workarounds documented in tribal knowledge** (“do X or it won’t work”).
- **Metrics that reward speed but not correction** (delivery wins, no penalty for debt).
- **Decisions justified by past success** (“we’ve done it 20 times”).

## Guardrails that actually help

### Make exceptions observable (and expensive)
- Create an **exceptions register** (security, architecture, data, reliability).
- Require: owner, scope, rationale, compensating controls, expiry date, and a “remove by” plan.
- Review the register on a fixed cadence (monthly is usually enough).

### Separate “accepted risk” from “unknown risk”
If you can’t explain the mechanism, you’re not accepting risk—you’re accepting ignorance.

### Use budgets: error budgets, change budgets, risk budgets
Budgets turn abstract safety into a constraint you can operate with. When you burn the budget, you change behavior.

### Institutionalize “stop-the-line”
Make it socially safe and procedurally real to pause:

- release gates that can’t be waived without VP-level signoff
- independent review for high-impact changes
- incident follow-ups that *remove* recurring pain, not just document it

### For AI: design for bounded autonomy
- Human-in-the-loop where consequences are irreversible or high-impact.
- Kill switches, rate limits, and scoped permissions.
- Continuous evaluation (drift, regressions, adversarial inputs).
- “Disagree and escalate” paths when the model is uncertain.

## Sources

- Diane Vaughan (1996), *The Challenger Launch Decision: Risky Technology, Culture, and Deviance*.
- University of Chicago Press blog: “The Normalization of Deviance” (2016). https://pressblog.uchicago.edu/2016/01/07/the-normalization-of-deviance.html
- Columbia Accident Investigation Board (2003), Report Volume I (see discussion of foam shedding and “normalization of deviance”). https://ehss.energy.gov/deprep/archive/documents/0308_caib_report_volume1.pdf
- Price & Williams (2018), “When Doing Wrong Feels So Right: Normalization of Deviance” (PubMed). https://pubmed.ncbi.nlm.nih.gov/25742063/
- Reuters (2024-09-24), FAA testimony on Boeing safety culture reforms taking years. https://www.reuters.com/business/aerospace-defense/faa-says-boeing-safety-culture-reforms-may-take-years-2024-09-24/
- “The Normalization of Deviance in AI” (2025-12-04). https://embracethered.com/blog/posts/2025/the-normalization-of-deviance-in-ai/
