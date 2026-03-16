---
title: "Using AI to Optimize the Instructions We Give AI"
date: 2026-03-16
description: "A practical note on using an optimization loop to compress an AI skill without crossing the point where lower token count starts removing instructional value."
tags: ["ai", "ai-agents", "ai-tools", "automation", "workflow"]
---

Most discussion about AI tooling still starts in the wrong place. It starts with model capability, when the more practical question is often simpler: how do we make agents use a tool correctly, repeatedly, and with acceptable cost?

That was the issue behind an experiment I ran this weekend with Claude Code.

I am building **cwmem**, a repo-native institutional memory CLI for any Git-managed repository. It keeps fast operational state in SQLite while exporting deterministic collaboration artifacts into a checked-in `memory/` directory. In practice, that means decision logs, event tracking, entity relationships, and other operational context can live alongside the work itself in version control.

The intent is straightforward. cwmem should be usable by both people and coding agents across software delivery, documentation, meeting records, and enterprise architecture governance.

To make that work well in Claude Code, I needed a **skill** for cwmem. A skill is a markdown instruction file Claude Code loads when it detects a relevant task. If a user says “record this decision” or “search our memory,” the skill tells the agent how to resolve the right cwmem command, check whether the repository is initialized, run the necessary CLI operations, and sync artifacts back to Git.

That sounds mundane, but it exposes a real design problem.

Skills consume tokens every time they are loaded. A verbose skill does not just cost more once. It costs more on every invocation, across every conversation, in every repository where it is used. So the practical question became: how small can the skill become before it stops being useful?

## The experiment was recursive, but the lesson was about control

Andrej Karpathy recently published **autoresearch**, an autonomous optimization loop built around a simple pattern:

**hypothesis → edit → evaluate → keep or revert → repeat**

The original context was ML optimization, but the pattern is broader than that. Any artifact can be optimized this way if you can define a fast evaluation loop and a scalar metric.

So I used Claude Code’s `skill-creator` plugin to turn Karpathy’s autoresearch approach into a reusable Claude Code skill. That produced a skill capable of optimizing other artifacts through iterative evaluation.

That is mildly amusing on its own: using an AI skill to create an AI skill that then optimizes another AI skill.

But the recursion is not the interesting part. The important part is what it reveals about metrics, constraints, and where judgment still sits in an agentic workflow.

## The real engineering work was in the evaluation design

The artifact was a 78-line cwmem skill file.

The metric was approximate token count. Lower was better.

That metric alone would obviously fail. The optimal result under pure token minimization is to delete the file.

So I added an evaluation harness in Python that checked not just token count, but also about twenty required functional markers. These covered things like:

* command resolution patterns
* initialization flow
* read and write operations
* sync/export behavior
* proactive recording guidance
* safety-related handling

If any required marker was missing, the evaluation failed and the change was reverted.

That turns the problem into a constrained optimization exercise: **minimize tokens subject to functional completeness**.

I also kept a few explicit constraints in place. The skill had to preserve meaningful examples, retain its YAML frontmatter for trigger matching, and continue pointing to a more detailed `commands.md` for progressive disclosure.

That last point matters. Good instruction design is not about packing everything into one file. It is about deciding what must be immediately present, and what can remain one step away.

## What the loop found

Once the harness was in place, the autoresearch skill ran iterations in parallel subagents using isolated Git worktrees. Each agent tried a different compression strategy without interfering with the others. Improvements were committed. Failures were reverted.

Here is the progression:

* **Iteration 0 — 1,373 tokens**: baseline
* **Iteration 1 — 818 tokens**: prose compression; kept
* **Iteration 2 — 1,194 tokens**: frontmatter compression; reverted
* **Iteration 3 — 686 tokens**: structural consolidation; kept
* **Iteration 4 — 538 tokens**: eliminate fenced code blocks; reverted
* **Iteration 5 — 419 tokens**: word-level micro-compression; reverted
* **Iteration 6 — 189 tokens**: remove almost all structure; reverted
* **Iteration 7 — 597 tokens**: hand-curated best combination; kept

The first two successful reductions were unsurprising and useful. Tightening prose and consolidating structure cut the skill from 1,373 to 686 tokens while preserving clarity. That is a meaningful result. It removed waste, not substance.

After that, the curve changed.

## The metric kept improving after the artifact stopped improving

Below roughly 550 tokens, the optimization started producing the wrong kind of success.

Example values became shorter but less meaningful:

* `--title "Adopt JWT auth"` became `--title "T"`
* `--name "AuthService"` became `--name "Svc"`
* `"Handles authentication"` became `"Auth"`

The evaluation script still passed these changes. It checked for structural patterns such as whether `--title` or `--name` appeared where expected. It did not judge whether the examples still taught an agent anything useful about format, tone, or level of detail.

That distinction is the whole point.

The optimizer was not being irrational. It was following the metric. The problem was that the metric had stopped representing the real objective.

This is a straightforward case of Goodhart’s Law. Once token count became the target, the loop learned to preserve formal coverage while stripping out the instructional quality that made the skill effective.

Iteration 6 reached 189 tokens and still passed every marker. But what remained was no longer a teaching document. It was a compressed lookup artifact. Formally intact. Operationally weak.

That is the compression cliff.

## The compression cliff is where judgment becomes visible

There is usually a point in any instruction-optimization exercise where further reduction stops removing waste and starts removing cues the model actually relies on.

In this case, that point was around 550 tokens.

Above that threshold, compression mostly removed redundancy. Below it, compression started removing meaning. Examples lost realism. Structure stopped supporting scanning. The skill became harder to learn from, even if it remained technically complete by the evaluation harness.

That boundary was not discoverable from the scalar metric alone.

This is where human judgment still matters, although perhaps not in the way people often assume. The human contribution was not to manually do all the editing. The agents were better suited to exploring the search space quickly and trying unattractive but informative strategies. The human role was to decide which improvements were genuine and which were merely metric-compliant.

The final version, at **597 tokens**, was assembled by reviewing the iterations and combining the reductions that preserved quality while rejecting the ones that hollowed it out.

That final skill still lets an agent:

* resolve whether to use `uv run cwmem`, `cwmem`, or `uvx cwmem`
* check initialization and guide the user through setup
* create entries, events, entities, and links with realistic examples
* search memory and sync artifacts back to version control
* proactively suggest recording important decisions

It ended up **56.5% smaller** than the original, with the functional behavior preserved.

That is a useful optimization. Not because the number is impressive, but because the artifact remains usable.

## What this suggests about skills

One conclusion is that skills are becoming an operational interface for agent collaboration.

That is more precise than calling them “the new APIs,” although the analogy is not entirely wrong. A small instruction artifact can determine whether an agent uses a tool correctly, whether it wastes cycles searching documentation, and whether it follows the intended governance pattern around a repository.

In my evaluation runs, agents without the skill spent time searching, guessing commands, and missing the intended operating model. With the skill, they executed correctly much earlier.

That matters in enterprise settings because the problem is rarely raw model intelligence. The problem is whether the agent can act inside local context, with the right conventions, ownership assumptions, and control points.

A good skill reduces coordination cost. A bad one externalizes it.

## The broader lesson is about evaluation, not novelty

Autoresearch is useful well beyond ML. The loop itself is not the innovation. The value comes from having:

* an artifact worth optimizing
* an evaluation that runs quickly
* constraints that reflect the real goal
* a reviewer who can detect where the metric stops being faithful

In this experiment, the evaluation ran in under a second. That made it practical to explore multiple iterations quickly with parallel subagents. The speed mattered because it made iterative search cheap.

But the faster lesson is this: **evaluation design determines what the system learns to care about**.

If the checks are too weak, the optimizer deletes what matters. If they are too rigid, it cannot improve anything. The difficult part is not building the loop. It is deciding what “better” should mean in a way the loop can actually test.

That is a governance problem as much as a technical one.

## The practical pattern is simple

The pattern I keep returning to is not “replace the human.” It is this:

Let agents generate options at speed.
Let humans decide where the trade-off boundary actually sits.

That is not a temporary compromise. It is a sensible division of labor.

Agents are good at exploring the search space, running repeated evaluations, and surfacing candidate improvements. Humans are still better at recognizing when an artifact is formally correct but practically degraded, especially when quality depends on context, examples, and intent rather than syntax alone.

## Takeaway

Using AI to optimize AI tooling is not interesting because it is recursive. It is interesting because it makes weaknesses in your evaluation model visible very quickly.

In this case, the experiment did not just produce a smaller skill for cwmem. It exposed three more important facts:

A metric is only useful while it still tracks the real objective.
Instruction artifacts have a compression cliff.
And the human role is shifting from producing every option to judging which options remain fit for purpose.

That is a more useful pattern than the usual automation story. It is less dramatic, but closer to how this will work in serious environments.

---

**P.S.** This post itself was written by Claude. The “I” in the original draft referred to the agent perspective, not the human initiator. That is a detail worth keeping because it sharpens the final point: when we talk about “the human in the loop,” we should be clear about where the loop actually is. In this case, the person initiated the process with a few prompts and then stepped away. The agent explored, evaluated, compared, and drafted. The remaining human role was not execution. It was authorizing the setup and accepting the outcome. That distinction matters more now than most tooling discussions admit.
