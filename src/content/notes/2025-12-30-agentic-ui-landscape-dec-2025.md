---
title: "Agentic UI landscape as of Dec 2025"
date: 2025-12-30
description: "A pragmatic map of the emerging 'agentic UI' stack: runtime protocols vs declarative widget specs, plus how to pick what to adopt without locking yourself into a dead end."
tags: ["ai", "ai-agents", "enterprise-architecture", "ai-tools", "security"]
---
![Agentic UI landscape Dec 2025](agentic_ui.jpeg)
“Agentic UI” is currently overloaded: teams use it to describe both **what** an agent wants to render (widgets) and **how** the agent and frontend stay coordinated (runtime). Those are being standardized on different tracks, and mixing them up is where most architecture confusion comes from.

This note is a Dec 2025 snapshot of the pieces that seem to be sticking, how they layer, and what I’d adopt if I needed to ship in 2026 without betting the company on a single vendor.

## The two meanings of “Agentic UI”

1. **Generative UI specs (payload / schema)**  
   Structured, declarative descriptions of UI elements: forms, cards, tables, charts, buttons, etc. Think: “UI intent” or “widget tree” in data.

2. **Interaction / runtime protocols (pipe / state machine)**  
   How an agent and a frontend exchange events, stream partial work, keep state synchronized, handle handoffs, reconnects, long-running actions, and tool lifecycle visibility.

The useful design move is to treat these as **separate layers** with a stable interface between them.

## A layered stack you can mix-and-match

A practical “agentic stack” mental model:

- **Tools & context:** MCP (Model Context Protocol) for tool invocation + resources.
- **Agent-to-agent:** A2A for agent↔agent collaboration (separate from UI).
- **Agent-to-frontend runtime:** AG-UI (or equivalent) for event streaming + state + lifecycle.
- **Generative UI schema:** A2UI, MCP Apps / MCP-UI resource embedding, Open-JSON-UI, etc.
- **Host environment:** Chat app / IDE / web app / native shell that renders and enforces sandboxing.

This matches how Google frames A2UI: declarative UI intent *layered* with runtime protocols like AG-UI and agent-to-agent patterns.  

## The Dec 2025 landscape (what’s emerging)

### MCP UI track: “UI resources” embedded via MCP (web/HTML centric)

There are two closely related things here:

- **MCP-UI (community pattern):** a fast-moving community effort where MCP servers can return interactive UI “resources” (often HTML/web components, sometimes sandboxed in iframes/webviews) alongside tool outputs, and compatible hosts render them.  
- **MCP Apps (SEP-1865):** a more “officializing” proposal that standardizes how UI resources are represented and linked in MCP, including a `ui://` URI scheme and metadata that associates UI with tools, using MCP’s JSON-RPC base for bidirectional communication.

**When it shines**
- You want to reuse the web ecosystem (HTML, JS components, existing widgets).
- Your host can enforce a sandbox model (iframe/webview).
- You need “ship it now” UI inside an existing MCP host (chat/IDE).

**What to watch**
- You’re still embedding code-like artifacts (even if sandboxed). Your security posture is mostly your host’s sandbox + permissions model.

### A2UI: declarative “no arbitrary code” UI intent (cross-platform)

A2UI (Agent-to-UI) is a declarative format where the agent describes UI in structured data intended to render “natively” across hosts without executing arbitrary agent-provided code. It’s early-stage/public preview and versioned (v0.8 at launch).

**When it shines**
- You care about strict safety (no agent-supplied scripts).
- You need multiple renderers (web + mobile + desktop) with consistent semantics.
- You want a spec you can implement in your own host with predictable controls.

**What to watch**
- Declarative specs live or die by: component catalog governance, versioning discipline, and compatibility testing across renderers.

### AG-UI: runtime protocol (not a widget schema)

AG-UI positions itself as the agent↔frontend runtime layer: event streaming, tool lifecycle visibility, state updates, handoffs, reconnects, etc. It explicitly distinguishes itself from generative UI specs like A2UI, MCP-UI, and Open-JSON-UI.

**When it shines**
- You’re building your own app/host and need a clean, transport-agnostic runtime contract.
- You want to support *multiple* UI payload formats over the same runtime channel.
- You expect long-running interactions and need reconnect/handoff semantics.

**What to watch**
- You still need to pick (or build) a rendering model. AG-UI is the “event bus,” not the “widgets.”

### Open-JSON-UI: another declarative widget schema (ecosystem-reported)

Open-JSON-UI shows up as another “generative UI” schema alongside A2UI and MCP-UI. Some ecosystem docs describe it as derived from OpenAI’s internal declarative schema; treat the origin story as “reported” until there is an official OpenAI spec page, but it’s clearly being implemented/bridged in the CopilotKit / AG-UI ecosystem.

**When it shines**
- You want an “open” JSON schema that already has adapters/bridges in popular tooling.
- You want optionality: support multiple declarative payloads behind one runtime.

**What to watch**
- Governance clarity and long-term compatibility guarantees.

### Shipping host/framework patterns (not standards, but they drive reality)

- **OpenAI ChatGPT Apps SDK:** A concrete host runtime where MCP servers can be paired with UI bundles rendered inside ChatGPT (iframe) and linked via tool metadata. This pushes MCP-based UI patterns into production.  
- **CopilotKit:** Functions as a compatibility layer/popularizer for AG-UI + multiple generative UI specs, and publishes comparative guidance that shapes choices.  
- **Vercel AI SDK UI:** Influential “generative UI” patterns for the React/Next ecosystem (framework conventions rather than a cross-vendor spec).  
- **LangGraph / LangChain patterns:** Framework-specific ways to map agent outputs to UI components.

## Decision rules: what to adopt (and what to defer)

Use this as a fast filter:

### If you need to embed diverse tool UIs inside an existing MCP host
**Adopt:** MCP Apps / MCP-UI pattern  
- Treat UI resources as sandboxed web artifacts.
- Focus your effort on: permissions, sandbox boundaries, and resource provenance.

### If you need maximum safety + cross-platform native rendering
**Adopt:** A2UI-style declarative intent  
- Use a strict component catalog and schema validation.
- Invest early in renderer conformance tests (same intent → same UI behavior).

### If you need a custom app with real-time events and long-running flows
**Adopt:** AG-UI (runtime layer)  
- Choose one or more payload formats (A2UI, Open-JSON-UI, MCP UI resources).
- Build a reconnection + handoff story from day one.

### If you’re unsure (most enterprise teams)
**Avoid betting on a single payload.**  
Build a thin internal abstraction (an “IR”) and support at least two render backends:
- **Backend A:** “Web embed” (MCP Apps / UI resources)
- **Backend B:** “Declarative intent” (A2UI or Open-JSON-UI)

That way you can ship quickly with embed-UI while gradually moving high-risk flows to declarative intent.

## Minimal adapter architecture (internal UI IR)

A simple pattern that keeps you portable:

1. **Normalize:** Convert model/tool output into an internal UI intermediate representation (IR).
2. **Validate:** Enforce schema + security policy at the IR boundary.
3. **Render:** Emit one of:
   - A2UI payload
   - Open-JSON-UI payload
   - MCP `ui://` resources + metadata
4. **Run:** Use AG-UI (or equivalent) to stream events, state updates, and lifecycle signals.

Example (sketch):

```json
{
  "irVersion": "1",
  "screen": {
    "title": "Approve invoice",
    "components": [
      { "type": "table", "id": "lines", "dataRef": "invoice.lines" },
      { "type": "button", "id": "approve", "label": "Approve", "action": "tool:approveInvoice" }
    ]
  },
  "policy": {
    "allowExternalNavigation": false,
    "allowedTools": ["approveInvoice", "requestChanges"]
  }
}
```

## Security posture checklist (things that actually bite)

- **Sandbox boundary:** iframe/webview isolation, CSP, postMessage allowlists.
- **Provenance:** which tool/server produced the UI resource? can it be spoofed?
- **Least privilege:** UI actions should map to explicit tool calls with scoped permissions.
- **Schema validation:** reject unknown fields / versions; log and monitor.
- **State integrity:** treat UI state updates as untrusted input; verify server-side.
- **Auditability:** record intent + tool calls + user actions for review and incident response.

## What to do next

- Pick your **host environments** (ChatGPT Apps, Claude Desktop, IDE, your own web app) and list their sandbox + extension constraints.
- Decide whether your “first win” is **web embed** (faster) or **declarative intent** (safer).
- Define a small **internal UI IR** and a validation/policy layer (start with ~10 component types).
- Implement **two renderers** (embed + declarative) so you can migrate high-risk flows without rewrites.
- Add **conformance tests**: the same IR should render equivalently across hosts/renderers.
- Treat “agentic UI” as part of your **threat model** (supply chain + prompt injection + UI spoofing).

## Sources

- Google Developers Blog: Introducing A2UI (Agent-to-UI) and how it layers with other protocols  
  [Introducing A2UI: An open project for agent-driven interfaces](https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/)
- MCP-UI community repository  
  [MCP-UI-Org/mcp-ui](https://github.com/MCP-UI-Org/mcp-ui)
- Shopify Engineering on MCP-UI and interactive components  
  [MCP UI: Breaking the text wall with interactive components](https://shopify.engineering/mcp-ui-breaking-the-text-wall)
- Model Context Protocol blog: MCP Apps (SEP-1865)  
  [MCP Apps: Extending servers with interactive user interfaces](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/)
- A2UI project site  
  [A2UI](https://a2ui.org/)
- AG-UI protocol repository  
  [AG-UI: the Agent-User Interaction Protocol](https://github.com/ag-ui-protocol/ag-ui)
- CopilotKit blog: AG-UI and A2UI explained (stack framing)  
  [AG-UI and A2UI Explained](https://www.copilotkit.ai/blog/ag-ui-and-a2ui-explained-how-the-emerging-agentic-stack-fits-together)
- CopilotKit docs: Open-JSON-UI  
  [Open-JSON-UI](https://docs.copilotkit.ai/generative-ui-specs/open-json-ui)
- OpenAI Developers: ChatGPT Apps SDK + MCP server integration  
  [Build your MCP server](https://developers.openai.com/apps-sdk/build/mcp-server/)
- The Verge: overview of ChatGPT Apps SDK (host reality / adoption signal)  
  [OpenAI will let developers build apps that work inside ChatGPT](https://www.theverge.com/news/793039/openai-chatgpt-apps-developers-sdk-canva-zillow-devday-2025)
- Vercel AI SDK UI docs: generative UI patterns  
  [AI SDK UI: Generative User Interfaces](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)
- LangChain docs: generative UI with LangGraph  
  [How to implement generative user interfaces with LangGraph](https://docs.langchain.com/langsmith/generative-ui-react)
- arXiv: Portal UX Agent (research direction)  
  [Portal UX Agent — A Plug-and-Play Engine for Rendering ...](https://arxiv.org/html/2511.00843v1)
