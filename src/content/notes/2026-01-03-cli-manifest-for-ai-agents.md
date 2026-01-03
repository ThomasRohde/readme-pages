---
title: "A Manifest for AI-Agent-Optimized CLIs"
date: 2026-01-03
description: "A set of interface contracts for building CLIs that are self-explanatory, progressively discoverable, and reliably usable by both humans and AI agents."
tags: ["ai", "ai-agents", "ai-tools", "automation", "enterprise-architecture", "workflow"]
---

If you want AI agents to use your CLI *reliably*, you can’t treat the interface as “just text.” You need a contract: predictable commands, deterministic outputs, structured errors, and built-in discoverability—without sacrificing human ergonomics.

This note is a **manifest** you can adopt (or use as a checklist) when designing CLIs with `--help`, `--explain`, `--json`, and typo-recovery/suggestions.

## Manifest principles

- **Self-explanatory by default**: a user (human or agent) should learn the CLI from the CLI.
- **Progressive discoverability**: start simple (`--help`) and reveal depth (`--help --verbose`, examples, schema export).
- **Deterministic and parseable**: output is stable across runs; JSON mode is strict and machine-safe.
- **Recoverable failures**: errors are categorized, structured, and come with next steps.
- **Safe-by-default operations**: destructive actions require explicit scope + confirmation controls.
- **Automation-ready**: no hanging prompts; stable exit codes; clear stdout/stderr separation.

## Baseline contract (every command MUST follow this)

### Global flags MUST exist everywhere

These flags should work at any command depth (root and subcommands):

- `--help` / `-h`: usage, options, subcommands, **at least one runnable example**
- `--json`: machine-readable output for success **and** failure
- `--version`: the installed binary version
- `--quiet`: suppress non-essential output (especially in pipelines/CI)
- `--verbose`: more diagnostics (to stderr)
- `--debug`: deep diagnostics (to stderr; redact secrets)
- `--no-input` (or `--non-interactive`): fail fast instead of prompting
- `--yes` (or `--force`): auto-confirm prompts *when safe and supported*

### Streams MUST be separated

- **stdout**: primary output (human text OR JSON, depending on mode)
- **stderr**: diagnostics, warnings, progress, prompts, debug logs

In `--json` mode, stdout MUST remain valid JSON regardless of verbosity.

### Exit codes MUST be stable

- `0` means success
- Non-zero means failure
- Error categories MUST map to documented exit codes, and `--json` errors MUST include the mapped `exit_code`.

## Naming and ergonomics

### Commands and flags

- Use **kebab-case** for flags and subcommands (`create-project`, `--dry-run`).
- Prefer **verb-first** commands: `create`, `list`, `get`, `update`, `delete`.
- Keep synonyms minimal. If you *must* alias, mark the alias as deprecated and surface it in schema/help.

### Help that can be copied

Help output SHOULD be copy/paste runnable:

- Avoid placeholder syntax that breaks if copied verbatim (unless clearly marked variables).
- Include at least one “happy path” example and one “recovery path” example (e.g., retry with `--dry-run` / `--json`).

## Output contract

### Human-readable mode (default)

- Prefer stable ordering (sorted lists, consistent columns).
- Avoid spinners/animations unless TTY is detected.
- Print “what happened” and “what to do next” in failures (brief, actionable).

### JSON mode MUST be strict

In `--json`, output MUST be valid JSON with **no extra commentary** mixed into the stream.

A recommended stable envelope:

```json
{
  "ok": true,
  "command": "tool project create",
  "version": "1.2.3",
  "data": {},
  "meta": {
    "duration_ms": 123,
    "warnings": []
  }
}
```

A recommended error shape (same envelope, different payload):

```json
{
  "ok": false,
  "command": "tool project create",
  "version": "1.2.3",
  "error": {
    "code": "validation.missing_required",
    "category": "validation",
    "message": "Missing required flag: --name",
    "exit_code": 2,
    "suggestions": [
      {
        "type": "add-flag",
        "title": "Provide a name",
        "command": "tool project create --name <value>"
      }
    ],
    "details": {
      "missing": ["name"]
    }
  }
}
```

Guidelines:

- Timestamps SHOULD be RFC3339 with timezone or epoch (and labeled).
- Ordering SHOULD be deterministic (especially lists).
- Long-running outputs MAY support NDJSON, but only if explicitly documented (and never mixed with non-JSON logs).

## Explain, plan, and dry-run

Agents do best when they can ask “what will happen?” before mutating anything.

### `--explain`

For mutating commands, `--explain` MUST:

- Describe **reads/writes**, side effects, external calls/endpoints
- Show **resolved config + defaults** (redact secrets)
- Produce machine-readable output with `--json`

Suggested shape in JSON:

```json
{
  "ok": true,
  "mode": "explain",
  "command": "tool project delete --id 123",
  "data": {
    "reads": ["project:123"],
    "writes": ["audit-log"],
    "external_calls": ["https://api.example.com/projects/123"],
    "prompts": [
      {
        "text": "Delete project 123?",
        "default": "no",
        "skippable_with": "--yes"
      }
    ]
  }
}
```

### `--dry-run`

For mutating commands, `--dry-run` MUST:

- Compute an ordered plan of actions
- Perform **no writes**
- Return success (`exit 0`) when the plan is computable

Suggested plan format:

```json
{
  "ok": true,
  "mode": "dry-run",
  "command": "tool project create --name demo",
  "data": {
    "plan": [
      {"action": "validate", "target": "inputs", "reason": "required flags present"},
      {"action": "create", "target": "project:demo", "reason": "requested by user"},
      {"action": "emit", "target": "stdout", "reason": "return created id"}
    ]
  }
}
```

## Errors that teach (and agents can recover from)

### Classification and structure

Errors MUST include:

- `category` (e.g., `validation`, `auth`, `not_found`, `conflict`, `internal`)
- stable `code` (machine-actionable)
- human `message`
- `exit_code`
- at least one actionable suggestion when possible

### “Did you mean” and corrections

When users mistype:

- Unknown subcommands/flags MUST return a suggestion if a close match exists.
- Validation errors SHOULD include the expected constraints (type, range, pattern).
- In human mode, print the exact usage line for the failing command.

Example (human mode):

```text
error: unknown flag --jso
did you mean: --json

usage: tool project list [--json] [--quiet] [--filter <expr>]
```

## Non-interactive safety

Agentic workflows are often non-TTY. The CLI MUST not hang.

- In non-TTY environments, prompts MUST fail unless `--yes` is provided.
- With `--no-input`, any prompt MUST fail fast and name the required flag.
- Destructive operations MUST require either:
  - an explicit scoped selector (no “delete everything” by accident), and
  - confirmation (prompt or override flag)

Recommended safety flags:

- `--safe`: disable destructive actions unless combined with `--force`
- `--scope <id|pattern>` / `--only <pattern>`: constrain what can be touched

## Introspection for tools and agents

A CLI that wants to be “agent-friendly” SHOULD ship a machine-readable command inventory:

- `tool schema --json` (or equivalent) outputs:
  - command tree
  - flags, arg types (when known)
  - which commands support `--json`, `--explain`, `--dry-run`
  - at least one example per command
  - tool identifier + version

This is how agents avoid brittle “guessing” and can programmatically plan.

## Compatibility and deprecations

- Prefer additive changes to JSON outputs.
- If you rename a flag or JSON field:
  - keep the old one working during a deprecation window
  - warn on stderr (never contaminate JSON stdout)
- Provide `tool deprecations --json` to make breakage detectable in automation.

## Conformance checklist (what to test in CI)

For every command:

- [ ] `--help` exits `0`, includes examples
- [ ] `--json` prints parseable JSON on success
- [ ] `--json` prints parseable JSON on failure
- [ ] Unknown flags/subcommands produce suggestions (when close match exists)
- [ ] Exit code matches documented category and `error.exit_code`
- [ ] `--no-input` never blocks
- [ ] `--explain` and `--dry-run` perform no writes (for mutating commands)
- [ ] stdout/stderr separation holds under `--verbose` / `--debug`
- [ ] Output ordering is stable (golden tests)

## What to do next

- Pick 5–10 real tasks and build an “agent run” benchmark (single-shot success rate).
- Add `--json` envelope + structured error codes first; it pays dividends immediately.
- Implement `--explain` and `--dry-run` for every mutating command.
- Add `schema --json` so tools can discover your command surface without scraping text help.
- Add golden tests for deterministic output and safety tests for non-interactive mode.

## Sources

- Internal PRD: “CLI Manifest for AI-Agent-Optimized Interfaces” fileciteturn0file0
