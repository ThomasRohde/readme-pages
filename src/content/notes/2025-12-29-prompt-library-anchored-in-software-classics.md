---
title: "A prompt library anchored in software classics (guardrails + repeatable outputs)"
date: 2025-12-29
description: "Turn “do X in the style of Y” into reusable prompt templates: explicit practices, output contracts, and checks for consistent engineering work products."
tags: ["ai-agents", "llm", "workflow", "productivity", "enterprise-architecture"]
---

“Do X in the style of Y” works because it gives an agent a known set of heuristics to imitate. The failure mode is that the agent will *invent* what “Y would say” unless you pin down **practices**, **structure**, and **checks**. This note captures a prompt library for common engineering tasks, each anchored in a trusted book/standard and designed for repeatable outcomes.

## Why “style of Y” works, and where it breaks

| Mechanism | Why it helps | Typical failure mode | Fix (what to put in the prompt) |
|---|---|---|---|
| Borrowed heuristics | A known source implies consistent norms and tradeoffs. | Hallucinated “what Y would say”; random conventions. | Name practices explicitly (AAA, seams, bulkheads) and require mapping output to them. |
| Shared vocabulary | Stable concepts: “characterization tests”, “test smells”, “SLOs”, “idempotency”. | Generic advice without concrete steps. | Require tables/checklists: recommendation → evidence → verification. |
| Implied structure | “In the style of” hints at a familiar structure. | Structure drifts; deliverables aren’t comparable. | Write an explicit output contract: patches/files + rationale + acceptance checks. |
| Default rigor | Seminal sources bias toward incrementalism. | Overreach: broad rewrites, premature abstractions, pattern-hunting. | Add constraints: small diffs, no API change, measure first, prefer deletion. |

## Prompt template anatomy

Use this skeleton to convert “style prompts” into reliable templates:

| Component | What to include | Why it matters |
|---|---|---|
| Anchor + practices | “Apply practices from **{source}**: {practice list}.” | Prevents “vibe” imitation; forces named heuristics. |
| Inputs | Paths, language/framework, constraints, acceptance criteria. | Reduces hidden assumptions (framework, budgets, runtime model). |
| Output contract | Patch/files + short rationale + a table/checklist. | Makes outcomes reviewable and repeatable. |
| Checks / invariants | Determinism, API stability, runtime budgets, “measure first”. | Catches common failure modes (flaky tests, broad refactors, guessing). |
| Stop conditions | “If info is missing, ask questions or state safe defaults.” | Avoids hallucinating APIs, behavior, and context. |

## Prompt library (copy/paste templates)

Conventions:

- Replace `{…}` placeholders.
- Template IDs are intended for storage in a registry (e.g., `prompt.testing.osherove.write_unit_tests`).
- Every template includes: **reference (anchor)** + **argumentation** + **output + checks**.

### Testing prompts (Osherove / Meszaros / Beck)

Anchors: Roy Osherove (*The Art of Unit Testing*), Gerard Meszaros (*xUnit Test Patterns*), Kent Beck (*TDD by Example*).

| Template ID + task | Prompt template (copy/paste) | Output + checks | Argumentation + reference |
|---|---|---|---|
| `prompt.testing.osherove.write_unit_tests`<br>Write unit tests (new code) | Write unit tests for `{unit}` applying these practices: readability + trustworthiness, Arrange-Act-Assert, clear naming, minimal mocking.<br><br>Context: `{language}`, `{test framework}`, `{dependencies}`. If a seam is needed, propose the smallest change and explain it. | Output:<br>1) Test file(s)<br>2) Rationale per test: intent + risk covered<br><br>Checks:<br>- AAA is obvious<br>- Names encode behavior/scenario<br>- No sleeps/time reliance<br>- Minimal mocking | Makes tests reviewable and stable by forcing explicit structure and a minimal-mocking bias. Ref: [The Art of Unit Testing](https://www.manning.com/books/the-art-of-unit-testing-third-edition) |
| `prompt.testing.osherove.review_tests`<br>Review existing unit tests | Review tests in `{path}`. Flag brittleness, unclear intent, over-mocking, poor naming, and hidden coupling. Provide concrete rewrites for the worst cases. | Output:<br>1) Prioritized fix list (impact × effort)<br>2) Rewritten examples for the worst 3 tests<br><br>Checks:<br>- Each finding ties to a named heuristic<br>- Show before/after test names + AAA structure | Reviews become actionable when tied to specific heuristics and backed by rewritten examples. Ref: [The Art of Unit Testing](https://www.manning.com/books/the-art-of-unit-testing-third-edition) |
| `prompt.testing.meszaros.refactor_test_suite`<br>Refactor tests without changing behavior | Refactor tests in `{path}` using a test-smell lens: remove duplication, clarify intent, eliminate test smells. **Do not change production code.** Name smells removed. | Output:<br>1) Patch/diff<br>2) Table: smell → location → change made<br><br>Checks:<br>- No prod changes<br>- Assertions still cover same contract | Naming smells + “no prod code” constrains scope and makes the refactor auditable. Ref: [xUnit Test Patterns](https://xunitpatterns.com/) |
| `prompt.testing.stabilize_flaky_tests`<br>Stabilize flaky tests | Diagnose why `{tests}` are flaky. Apply isolation + determinism: remove shared state, control time, avoid randomness, and make external IO explicit. If a test is really integration-level, say so. | Output:<br>1) Root causes (ranked)<br>2) Stabilization plan (steps + checkpoints)<br>3) Updated tests<br><br>Checks:<br>- Deterministic & repeatable locally/CI<br>- Explicit time control (fake clock)<br>- No reliance on run order | Flakiness is usually a hidden coupling problem; determinism + explicit boundaries make it fixable. Ref: [The Art of Unit Testing](https://www.manning.com/books/the-art-of-unit-testing-third-edition) |
| `prompt.testing.feathers.characterization_tests`<br>Characterization safety net | Create characterization tests for `{module}` that capture current behavior before refactoring. Document *observed* behavior and surprising edge cases; don’t “improve design”. | Output:<br>1) Test suite<br>2) Notes: observed inputs/outputs + edge cases<br><br>Checks:<br>- Locks behavior as-is<br>- Deterministic (no network/time)<br>- Labels assumptions explicitly | Characterization tests reduce fear: they give you a behavioral contract before you touch structure. Ref: [Working Effectively with Legacy Code](https://polyteknisk.dk/home/Detaljer/9780131177055) |
| `prompt.testing.property_based`<br>Property-based tests | Design property-based tests for `{function}`. State 5–10 invariants, define input domains/generators, and ensure shrinking-friendly failure output. Make failures reproducible (seed/replay). | Output:<br>1) Property tests<br>2) Table: invariant → why it matters → example counterexample<br><br>Checks:<br>- Generators cover boundaries/edge cases<br>- Failures are reproducible and small | Invariant tables keep properties crisp and reviewable; generators keep coverage honest. Ref: [The Pragmatic Programmer](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/) |
| `prompt.testing.test_doubles_decision`<br>Test doubles decision | For each dependency in `{unit}`, choose: real / fake / stub / mock. Keep mocking minimal and justify each choice. Then update tests accordingly. | Output:<br>1) Table: dependency → double type → reason → alternative considered<br>2) Updated tests<br><br>Checks:<br>- Mock only when interaction is the contract<br>- Prefer fakes for stability | Forces intentional dependency handling; prevents the “mock everything” default. Ref: [xUnit Test Patterns](https://xunitpatterns.com/) |

### Legacy code prompts (Feathers)

Anchor: Michael Feathers (*Working Effectively with Legacy Code*).

| Template ID + task | Prompt template (copy/paste) | Output + checks | Argumentation + reference |
|---|---|---|---|
| `prompt.legacy.feathers.safe_change_plan`<br>Plan a safe change | Help me change `{behavior}` in `{module}` using Feathers. Identify pinch points, propose seams, and create a minimal test harness first. Include checkpoints and rollback points. | Output:<br>1) Micro-step plan (small, reversible steps)<br>2) Checkpoint criteria per step<br>3) Rollback plan (what to revert if a checkpoint fails)<br><br>Checks:<br>- Behavior preserved until final step<br>- Every step has a verification method | Feathers is about reducing risk by creating a safety net *before* changing behavior. Ref: [Working Effectively with Legacy Code](https://polyteknisk.dk/home/Detaljer/9780131177055) |
| `prompt.legacy.feathers.introduce_seams`<br>Create seams | Find the smallest seam(s) in `{file(s)}` to test `{unit}` without global state/network/filesystem. Recommend seam type: wrapper, extraction, interface, parameterization. Keep changes minimal and reversible. | Output:<br>1) Table: seam → type → change size → risk → verification<br>2) Minimal patch + new tests<br><br>Checks:<br>- No architecture rewrite<br>- Seam exists only to enable tests | “Smallest seam” prevents big redesigns and keeps the change reviewable. Ref: [Working Effectively with Legacy Code](https://polyteknisk.dk/home/Detaljer/9780131177055) |
| `prompt.legacy.feathers.ball_of_mud_to_units`<br>Ball-of-mud to units | Add tests first, then extract. Describe a sequence of micro-commits moving from: no tests → characterization tests → extracted units. | Output:<br>1) Micro-commit plan (message → intent → verification)<br>2) Extraction targets and boundaries<br><br>Checks:<br>- Each commit compiles and tests pass<br>- No “big bang” refactor | Micro-commits enforce incrementalism, which is the only reliable way out of legacy tangles. Ref: [Working Effectively with Legacy Code](https://polyteknisk.dk/home/Detaljer/9780131177055) |
| `prompt.legacy.feathers.reduce_coupling_low_risk`<br>Reduce coupling | Identify the top 3 coupling hazards in `{module}`. Propose low-risk decoupling steps that keep behavior constant, and name the specific refactoring moves used. | Output:<br>1) Prioritized plan<br>2) Table: hazard → symptom → refactoring move → verification<br><br>Checks:<br>- Behavior constant (tests prove it)<br>- Steps are incremental and reversible | Coupling work stays safe when it’s targeted at the biggest hazards and validated stepwise. Ref: [Working Effectively with Legacy Code](https://polyteknisk.dk/home/Detaljer/9780131177055) |

### Refactoring prompts (Fowler + Feathers)

Anchor: Martin Fowler (*Refactoring*), often paired with Feathers when tests are missing.

| Template ID + task | Prompt template (copy/paste) | Output + checks | Argumentation + reference |
|---|---|---|---|
| `prompt.refactor.fowler.plan_only`<br>Refactoring plan (no code yet) | Create a refactoring plan for `{area}`. Use small behavior-preserving steps, each validated by tests. For each step include intent, preconditions, and verification. | Output:<br>1) Ordered list of refactorings<br>2) Table: step → intent → preconditions → verification<br><br>Checks:<br>- Steps are reversible<br>- Verification is concrete (commands/tests) | Preconditions + verification turn “refactor ideas” into a safe execution plan. Ref: [Refactoring](https://martinfowler.com/books/refactoring.html) |
| `prompt.refactor.smells_scan`<br>Identify refactoring opportunities | Scan `{files}` for smells (long method, divergent change, feature envy, etc.). Prioritize by risk, change frequency, and payoff. | Output:<br>1) Prioritized smell list<br>2) Table: smell → location → risk → suggested refactoring → verification idea<br><br>Checks:<br>- Prioritization explained<br>- Suggestions are incremental | Prioritization prevents “smell lists” from becoming noise and aligns work with payoff. Ref: [Refactoring](https://martinfowler.com/books/refactoring.html) |
| `prompt.refactor.safe_refactor_with_guardrails`<br>Execute a safe refactor | Refactor `{component}` for clarity while preserving behavior.<br>Constraints: keep public API stable; keep tests green; keep diffs small; list refactoring moves used. | Output:<br>1) Patch/diff<br>2) Explanation: why safer/clearer now<br>3) Refactoring moves list<br><br>Checks:<br>- API unchanged (or explicitly documented)<br>- Tests prove equivalence | Listing refactoring moves makes the change auditable and discourages stealth redesign. Ref: [Refactoring](https://martinfowler.com/books/refactoring.html) |
| `prompt.refactor.replace_conditionals`<br>Replace conditionals | Reduce conditional complexity in `{function}` using guard clauses, polymorphism, or table-driven logic. Include before/after complexity notes and coverage notes. | Output:<br>1) Patch/diff<br>2) Table: option → pros/cons → chosen approach<br>3) Before/after complexity notes<br><br>Checks:<br>- Branch behavior covered by tests<br>- No semantic drift | Conditional refactors are where subtle behavior changes hide; forcing options + coverage makes it safer. Ref: [Refactoring](https://martinfowler.com/books/refactoring.html) |

### Code quality & construction prompts (Clean Code / Code Complete / Pragmatic)

Anchors: *Clean Code*, *Code Complete*, *The Pragmatic Programmer*.

| Template ID + task | Prompt template (copy/paste) | Output + checks | Argumentation + reference |
|---|---|---|---|
| `prompt.quality.clean_code.cleanup_module`<br>Clean up a module | Clean up `{file}` using readability heuristics: naming, function size, single responsibility, clarity over cleverness. Keep behavior constant and avoid broad rewrites. | Output:<br>1) Patch/diff<br>2) Table: heuristic → change → why it helps<br><br>Checks:<br>- No behavior change<br>- Diff is focused/reviewable | The heuristic→change table forces justification per edit and blocks vague claims. Ref: [Clean Code](https://polyteknisk.dk/home/Detaljer/9780132350884) |
| `prompt.quality.review_quality`<br>Quality-focused code review | Perform a code review of `{PR/commit/files}` using construction guidance. Categorize findings (risk/readability/maintainability/quick wins) and propose fixes. | Output:<br>1) High-risk issues<br>2) Readability issues<br>3) Maintainability issues<br>4) Quick wins<br><br>Checks:<br>- Each finding includes a concrete fix + rationale | Categorization turns critique into a plan and helps teams prioritize. Ref: [Code Complete](https://www.microsoftpressstore.com/store/code-complete-9780735619678) |
| `prompt.quality.defensive_programming_pass`<br>Defensive programming pass | Harden `{module}` with validation, invariants, and error handling. Don’t over-engineer; keep checks close to boundaries and make errors actionable. | Output:<br>1) Patch/diff<br>2) Guardrails list: what it prevents → how it fails → what tests to add<br><br>Checks:<br>- Avoid duplicate validation<br>- Prefer explicit errors over silent defaults | Boundary-focused guardrails reduce real incidents without adding frameworks. Ref: [Code Complete](https://www.microsoftpressstore.com/store/code-complete-9780735619678) |
| `prompt.quality.reduce_accidental_complexity`<br>Reduce accidental complexity | Identify unnecessary abstraction in `{area}`. Remove it while keeping behavior constant. Explain what became simpler and what risk was avoided. | Output:<br>1) Patch/diff<br>2) Table: removed abstraction → replacement → benefit → risk avoided<br><br>Checks:<br>- No new layers unless justified<br>- API unchanged unless required | This template rewards deletion and demands a measurable simplification story. Ref: [The Pragmatic Programmer](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/) |

### Architecture prompts (Clean Architecture / DDD / PoEAA / GoF)

Anchors: *Clean Architecture*, DDD, PoEAA, GoF patterns.

| Template ID + task | Prompt template (copy/paste) | Output + checks | Argumentation + reference |
|---|---|---|---|
| `prompt.arch.clean_architecture.boundary_audit`<br>Boundary audit | Audit dependencies in `{repo/module}` applying Clean Architecture: dependencies point inward; frameworks isolated; use-cases defined. Provide a text boundary diagram and 3 smallest-first steps with verification. | Output:<br>1) Text boundary diagram<br>2) 3 refactoring steps (smallest first) + verification per step<br><br>Checks:<br>- Steps are incremental and test-backed<br>- Violations are clearly identified | “Diagram + 3 steps” prevents hand-wavy architecture advice and forces actionable, incremental change. Ref: [Clean Architecture](https://polyteknisk.dk/home/Detaljer/9780134494166) |
| `prompt.arch.extract_use_cases`<br>Extract use-cases | Restructure `{feature}` so business rules live in use-cases/application services, not controllers/UI. Propose folder structure + minimal movement plan. | Output:<br>1) Proposed structure<br>2) Movement plan (steps + verification)<br><br>Checks:<br>- Endpoints/behavior unchanged (unless stated)<br>- Minimal movement, maximum clarity | Keeps architecture work grounded: small moves that shift dependency direction without churn. Ref: [Clean Architecture](https://polyteknisk.dk/home/Detaljer/9780134494166) |
| `prompt.arch.ddd.discovery_lightweight`<br>DDD discovery (lightweight) | From `{docs/code}`, infer candidate bounded contexts, aggregates, and ubiquitous language terms. Output: context map (text), aggregate boundaries, risks/unknowns. Clearly separate “observed” vs “assumed.” | Output:<br>1) Context map (text)<br>2) Table: term → meaning → owning context → evidence<br>3) Risks/unknowns list<br><br>Checks:<br>- Observed vs assumed explicit<br>- Boundaries have a rationale | DDD is mostly about shared language and boundaries; the term table makes the language explicit and reviewable. Ref: [DDD (Eric Evans)](https://www.domainlanguage.com/) |
| `prompt.arch.poeaa.domain_model_vs_transaction_script`<br>PoEAA decision | Given `{feature}`, decide whether Transaction Script or Domain Model fits better. Justify with criteria (complexity, invariants, change rate, team skill). Propose minimal structure for the choice. | Output:<br>1) Decision table: criterion → TS vs DM → score + notes<br>2) Minimal structure proposal + next step<br><br>Checks:<br>- Switching costs named<br>- Avoid “big framework” proposals | A scored decision table forces explicit tradeoffs and prevents pattern cargo-culting. Ref: [PoEAA](https://martinfowler.com/books/eaa.html) |
| `prompt.arch.gof.pattern_or_no_pattern`<br>GoF pattern (or no pattern) | In `{module}`, identify one place a GoF pattern would reduce coupling/duplication — **or** argue “no pattern needed.” If beneficial, provide a minimal patch and show why it’s simpler. | Output:<br>1) Recommendation (or “no pattern”) + why<br>2) Patch only if net simpler<br>3) Table: before pain → after change → complexity change<br><br>Checks:<br>- No pattern for its own sake<br>- Complexity decreases measurably | Allows “no” as the correct answer, which prevents pattern-hunting. The before/after table forces a measurable benefit. Ref: [GoF Design Patterns](https://polyteknisk.dk/home/Detaljer/9780201633610) |

### Data & distributed systems prompts (DDIA)

Anchor: Martin Kleppmann (*Designing Data-Intensive Applications*).

| Template ID + task | Prompt template (copy/paste) | Output + checks | Argumentation + reference |
|---|---|---|---|
| `prompt.ddia.data_model_query_review`<br>Data model & query review | Review `{schema/code}` using DDIA tradeoffs: access patterns, indexes, consistency, operational concerns, changeability. | Output:<br>1) Issues list (ranked)<br>2) Table: access pattern → current fit → recommendation → migration risk<br><br>Checks:<br>- Every recommendation ties to an access pattern | Access-pattern mapping prevents generic advice and forces tradeoff reasoning. Ref: [DDIA](https://polyteknisk.dk/home/Detaljer/9781449373320) |
| `prompt.ddia.consistency_concurrency`<br>Consistency & concurrency | Design an approach for `{workflow}` handling idempotency, retries, and ordering. Include failure cases and tests you’d add. | Output:<br>1) Strategy (with assumptions)<br>2) Failure table: failure → detection → mitigation → test<br><br>Checks:<br>- Idempotency story explicit<br>- Retries are safe, bounded, and observable | Failure tables force you to design for the hard parts (retries, reorder, partial failure), not just the happy path. Ref: [DDIA](https://polyteknisk.dk/home/Detaljer/9781449373320) |
| `prompt.ddia.eventing_log_based`<br>Eventing / log-based design | For `{domain event flow}`, propose an event-driven design **or argue against it**. Include schema evolution and replay strategy. | Output:<br>1) Event definitions + versions<br>2) Consumer responsibilities<br>3) Safeguards: idempotency, replay/backfill, versioning<br><br>Checks:<br>- Ownership boundaries clear<br>- Evolution strategy explicit | “Argue against it” is crucial—eventing isn’t always the right tradeoff. Ref: [DDIA](https://polyteknisk.dk/home/Detaljer/9781449373320) |

### Resilience & operability prompts (Release It! / Google SRE)

Anchors: *Release It!* and Google SRE guidance.

| Template ID + task | Prompt template (copy/paste) | Output + checks | Argumentation + reference |
|---|---|---|---|
| `prompt.ops.release_it.production_readiness_review`<br>Production-readiness review | Review `{service}` using Release It! concerns: timeouts, bulkheads, circuit breakers, backpressure, graceful degradation. Prioritize risks and propose smallest-first fixes with validation. | Output:<br>1) Risk list (impact × likelihood)<br>2) Fix plan (smallest first) + validation per fix<br><br>Checks:<br>- Fixes are testable/observable<br>- Avoid “rewrite into microservices” answers | Prioritization + validation blocks generic reliability advice and keeps fixes incremental. Ref: [Release It!](https://pragprog.com/titles/mnee2/release-it-second-edition/) |
| `prompt.ops.failure_mode_drill`<br>Failure-mode drill | List top failure modes for `{service}` and define expected behavior. Include detection, mitigation, and test strategy. | Output:<br>Table: failure mode → detection → mitigation → test strategy → runbook placeholder<br><br>Checks:<br>- Includes dependency slowdowns/timeouts<br>- Includes degradation behavior, not only outages | One table turns reliability thinking into tickets, tests, alerts, and runbooks. Ref: [Release It!](https://pragprog.com/titles/mnee2/release-it-second-edition/) |
| `prompt.ops.slo_sli_definition`<br>SLO/SLI definition | Define user-centered SLIs/SLOs for `{service}`. Include targets, error budget policy, and alerting approach (page vs ticket). | Output:<br>1) SLIs + definitions<br>2) SLO targets + rationale<br>3) Alerting policy (burn-rate based) + noise rules<br><br>Checks:<br>- Metrics map to user pain<br>- Alerts tie to SLO burn, not raw spikes | SLOs work when they align engineering and product tradeoffs via error budgets. Ref: [Google SRE books](https://sre.google/books/) |
| `prompt.ops.observability_upgrade`<br>Observability upgrade | Improve observability for `{component}`: logs, metrics, traces. Specify what to instrument, naming conventions, correlation strategy, and example dashboards/alerts (described). | Output:<br>1) Instrumentation plan<br>2) Naming conventions table<br>3) Dashboard/alert sketches<br><br>Checks:<br>- Correlation IDs + trace propagation supported<br>- High-cardinality metrics avoided or justified | Explicit naming/correlation prevents observability “stuff” from becoming expensive noise. Ref: [Google SRE books](https://sre.google/books/) |

### Delivery & DevOps prompts (Continuous Delivery / Accelerate)

Anchors: *Continuous Delivery* and *Accelerate* (DORA framing).

| Template ID + task | Prompt template (copy/paste) | Output + checks | Argumentation + reference |
|---|---|---|---|
| `prompt.devops.cicd.pipeline_design`<br>CI/CD pipeline design | Design a CI/CD pipeline for `{repo}` applying Continuous Delivery: fast feedback, staged gates, repeatability. Include what runs where and failure behavior. | Output:<br>1) Pipeline stages table: stage → purpose → tools → runtime budget → gate criteria<br>2) Failure behavior: stop/continue/rollback + notifications<br><br>Checks:<br>- Early stages are fast<br>- Gates are explicit and automatable | Stages + budgets prevent “pipeline theater” and produce a design you can implement. Ref: [Continuous Delivery](https://bibliotek.dk/materiale/continuous-delivery_jez-humble/work-of%3A820030-katalog%3A991005239829708986) |
| `prompt.devops.test_strategy_across_pipeline`<br>Test strategy across pipeline | Propose a test strategy (unit/integration/e2e/contract) supporting rapid delivery. Define where each runs and typical runtime budgets. | Output:<br>Table: test type → purpose → where it runs → runtime budget → ownership → stability risks<br><br>Checks:<br>- Unit tests dominate volume<br>- E2E is minimal and stabilized | Budgets + placement force tradeoffs and prevent test sprawl from killing throughput. Ref: [Continuous Delivery](https://bibliotek.dk/materiale/continuous-delivery_jez-humble/work-of%3A820030-katalog%3A991005239829708986) |
| `prompt.devops.dora_metrics_plan`<br>DORA metrics plan | Propose how to measure DORA metrics for `{team/service}`: definitions, data sources, and anti-gaming safeguards. | Output:<br>1) Definitions table: metric → definition → source → pitfalls<br>2) Anti-gaming checklist<br><br>Checks:<br>- Data collection automatable<br>- Incentives/edge cases addressed | Explicit pitfalls + anti-gaming keeps metrics from becoming a target and losing meaning. Ref: [Accelerate](https://itrevolution.com/product/accelerate/) |

### Security prompts (Shostack / OWASP ASVS)

Anchors: Adam Shostack (*Threat Modeling*) and OWASP ASVS.

| Template ID + task | Prompt template (copy/paste) | Output + checks | Argumentation + reference |
|---|---|---|---|
| `prompt.security.shostack.threat_model_feature`<br>Threat model a feature | Threat model `{feature}`. Output: assets, trust boundaries, attacker goals, threats, mitigations, and a prioritized backlog. Be explicit about assumptions. | Output:<br>1) Trust boundary diagram (text is fine)<br>2) Threat table: threat → impact → likelihood → mitigation → verification/test<br>3) Prioritized backlog (top 5–15 items)<br><br>Checks:<br>- Mitigations map to threats<br>- Assumptions listed | Threat modeling is only useful if it yields actionable mitigations and a backlog. Ref: [Threat Modeling](https://shostack.org/books/threat-modeling-book) |
| `prompt.security.asvs.review`<br>ASVS-based security review | Review `{service}` against OWASP ASVS level `{1/2/3}`. Map gaps to ASVS sections and propose concrete engineering actions with owners. | Output:<br>Table: ASVS section → gap → action → effort → owner → verification/test<br><br>Checks:<br>- Actions are implementable tickets<br>- Scope matches ASVS level | ASVS gives a requirements checklist; mapping to actions + verification makes it engineering work. Ref: [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) |
| `prompt.security.secure_code_review`<br>Secure coding pass on a PR | Do a security-focused review of `{PR/files}` guided by ASVS categories (authn, authz, input validation, error handling, crypto, etc.). Provide findings and minimal fixes. | Output:<br>1) Findings table: issue → risk → location → fix → test to add<br>2) Minimal patch suggestions<br><br>Checks:<br>- Tie each issue to a concrete abuse scenario<br>- Prefer least-invasive fix | Abuse-scenario grounding avoids both speculation and pedantic checklists. Ref: [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) |

### Debugging & performance prompts (Agans / Gregg)

Anchors: David Agans (*Debugging: The 9 Indispensable Rules*) and Brendan Gregg’s performance methodology.

| Template ID + task | Prompt template (copy/paste) | Output + checks | Argumentation + reference |
|---|---|---|---|
| `prompt.debugging.agans.systematic_debug`<br>Debug a bug systematically | Help me debug `{symptom}`. Follow: reproduce, isolate, change one thing at a time, verify assumptions. Produce an investigation plan and ranked hypotheses. | Output:<br>1) Plan: step → expected observation → what it rules in/out<br>2) Ranked hypotheses + evidence needed<br><br>Checks:<br>- Each step tests exactly one hypothesis<br>- Assumptions explicitly verified | Debugging fails when you skip falsifiable steps; this template forces hypothesis-driven investigation. Ref: [Debugging (Agans)](https://archive.org/details/debugging9indisp0000agan) |
| `prompt.performance.gregg.measure_first`<br>Performance investigation | Investigate `{symptom}` using “measure first.” Provide a measurement plan, ranked hypotheses, and next actions. Avoid tuning before evidence. | Output:<br>1) Measurement plan (what/where/how long/workload)<br>2) Hypotheses ranked + evidence needed<br>3) Next actions table: action → expected outcome → rollback<br><br>Checks:<br>- No tuning before measurement<br>- Use realistic workload and baseline | Measurement-first prevents guesswork and avoids making performance worse. Ref: [Systems Performance (Gregg)](https://www.brendangregg.com/systems-performance-2nd-edition-book.html) |

### API & interface prompts (OpenAPI / contract-first)

Anchors: OpenAPI specification + contract-first workflows.

| Template ID + task | Prompt template (copy/paste) | Output + checks | Argumentation + reference |
|---|---|---|---|
| `prompt.api.openapi.design_contract_first`<br>Design an API contract first | Design an OpenAPI spec for `{use case}`. Focus on consistency, evolvability, and clear error semantics. Output OpenAPI YAML + example requests/responses. Include versioning guidance. | Output:<br>1) OpenAPI YAML<br>2) Example requests/responses<br>3) Error table: error case → status → body → caller action<br><br>Checks:<br>- Resource naming consistent<br>- Backward compatibility story stated | The error table forces a usable contract for clients and avoids vague “400/500” semantics. Ref: [OpenAPI v3.2.0](https://spec.openapis.org/oas/v3.2.0.html) |
| `prompt.api.contract_testing_plan`<br>Contract testing plan | Given OpenAPI spec `{link/text}`, propose contract tests for providers and consumers. Include schema evolution checks and ownership. | Output:<br>Table: contract surface → provider tests → consumer tests → tooling → ownership<br><br>Checks:<br>- Backward compatibility checks included<br>- Deprecation/versioning is tested | Mapping surfaces to tests turns contract-first from documentation into enforcement. Ref: [OpenAPI Initiative](https://www.openapis.org/) |

### Documentation prompts (maintainers-first)

Anchor: maintainer-focused documentation (pragmatic maintainability mindset).

| Template ID + task | Prompt template (copy/paste) | Output + checks | Argumentation + reference |
|---|---|---|---|
| `prompt.docs.module_just_enough`<br>“Just enough” docs | Write maintainer-focused docs for `{module}`: purpose, key invariants, extension points, common pitfalls. Include examples and how to validate changes safely. | Output:<br>1) README section<br>2) Table: invariant → why it exists → how to validate → where enforced<br><br>Checks:<br>- Extension points named<br>- Verification steps included | Invariants + verification are what maintainers actually need; the table makes docs operational. Ref: [The Pragmatic Programmer](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/) |
| `prompt.docs.changelog_migration_notes`<br>Changelog + migration notes | Given changes in `{PR}`, write a changelog entry and migration notes. Include upgrade steps and breaking-change detection. | Output:<br>1) Changelog entry<br>2) Migration steps (numbered)<br>3) Table: breaking change → symptom → detection → fix/rollback<br><br>Checks:<br>- Names who is impacted<br>- Includes detection and rollback | Migration notes fail when they omit detection. This forces “how to notice you’re broken” and “how to recover.” Ref: [The Pragmatic Programmer](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/) |

## Operationalizing this in an agent system

Store templates as named entries and reference them by **ID** plus local constraints:

- `templateId`: `prompt.testing.osherove.write_unit_tests`
- `inputs`: files, language, framework, acceptance criteria
- `constraints`: “no prod changes”, “public API stable”, “runtime ≤ 2 min”, etc.
- `reviewChecklist`: copy the “Checks” list verbatim into your task definition

This keeps agent context small while still enforcing a consistent “house style” for work outputs.

## What to do next

- Start with 8–12 templates that match your highest-frequency tasks (tests, refactoring, code review, CI/CD, security review).
- Treat “Checks” as a gate: review output *against the checklist*, not against vibes.
- When output drifts, tighten the **output contract** (tables, invariants, verification), not the “style” wording.
- Keep a small registry doc: template ID → when to use → example run from your codebase.
- For risky legacy changes, chain templates: characterization tests → safe refactor → production-readiness review.

## Sources

- [The Art of Unit Testing (Manning)](https://www.manning.com/books/the-art-of-unit-testing-third-edition)
- [xUnit Test Patterns](https://xunitpatterns.com/)
- [Test-Driven Development: By Example (InformIT)](https://www.informit.com/store/test-driven-development-by-example-9780321146533)
- [Working Effectively with Legacy Code (Polyteknisk)](https://polyteknisk.dk/home/Detaljer/9780131177055)
- [Refactoring (martinfowler.com)](https://martinfowler.com/books/refactoring.html)
- [Clean Code (Polyteknisk)](https://polyteknisk.dk/home/Detaljer/9780132350884)
- [Code Complete, 2nd ed. (Microsoft Press)](https://www.microsoftpressstore.com/store/code-complete-9780735619678)
- [Clean Architecture (Polyteknisk)](https://polyteknisk.dk/home/Detaljer/9780134494166)
- [Patterns of Enterprise Application Architecture (martinfowler.com)](https://martinfowler.com/books/eaa.html)
- [Design Patterns (GoF) (Polyteknisk)](https://polyteknisk.dk/home/Detaljer/9780201633610)
- [Designing Data-Intensive Applications (Polyteknisk)](https://polyteknisk.dk/home/Detaljer/9781449373320)
- [Release It! (PragProg)](https://pragprog.com/titles/mnee2/release-it-second-edition/)
- [Google SRE online books](https://sre.google/books/)
- [Continuous Delivery (Bibliotek.dk)](https://bibliotek.dk/materiale/continuous-delivery_jez-humble/work-of%3A820030-katalog%3A991005239829708986)
- [Accelerate (IT Revolution)](https://itrevolution.com/product/accelerate/)
- [Threat Modeling (Shostack)](https://shostack.org/books/threat-modeling-book)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- [OpenAPI Specification v3.2.0](https://spec.openapis.org/oas/v3.2.0.html)
- [OpenAPI Initiative](https://www.openapis.org/)
- [Debugging: The 9 Indispensable Rules (Internet Archive)](https://archive.org/details/debugging9indisp0000agan)
- [Systems Performance (Brendan Gregg)](https://www.brendangregg.com/systems-performance-2nd-edition-book.html)
- [Domain Language (Eric Evans / DDD)](https://www.domainlanguage.com/)

- Site publishing/tag references (internal): fileciteturn0file0 fileciteturn0file1 fileciteturn0file2 fileciteturn0file3
