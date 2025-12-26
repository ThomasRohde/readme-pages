---
title: "Customizing AI Assistants: Claude Projects, Gemini Gems, and Custom GPTs"
date: 2025-12-26
description: "A practical comparison of how to customize Claude, Gemini, and ChatGPT using Projects, Gems, and GPTs for repeatable, context-aware workflows."
tags: ["ai", "ai-tools", "llm", "productivity", "workflow"]
---

Each major AI assistant now offers a way to create persistent, customized versions of itself. Claude has Projects, Gemini has Gems, and ChatGPT has Custom GPTs. These features solve the same core problem: eliminating repetitive prompting and loading context every session. This note compares what each offers and when to use which.

## Claude Projects

Claude Projects let you create a workspace with persistent instructions and uploaded files that apply to every conversation within the project.

**Key capabilities:**

- Custom instructions that persist across all chats in the project
- File uploads (PDFs, code, docs) that Claude can reference
- Memory that builds context over time within the project
- Conversation history stays scoped to the project

**Best for:** Long-running work where you need Claude to remember context across sessions—writing projects, codebases, research with reference documents.

**Limitations:** Projects are personal (no sharing). The custom instructions and files are fixed; you update them manually.

## Gemini Gems

Gems are custom versions of Gemini with a defined persona, instructions, and behavior. Google positions them as "experts" you can create for specific tasks.

**Key capabilities:**

- Custom instructions defining tone, expertise, and behavior
- Can be shared with others (via link)
- Access to Gemini's tools (search, code execution) based on the Gem's purpose
- Quick to create from the Gems gallery or from scratch

**Best for:** Repeatable tasks with a consistent persona—a writing coach, a coding tutor, a brainstorming partner. Good when you want to share the customization with others.

**Limitations:** No persistent file uploads like Claude Projects. Context resets between sessions unless you manually re-provide it.

## ChatGPT Custom GPTs

Custom GPTs are the most mature of the three. They allow custom instructions, uploaded knowledge files, and optionally external API integrations (Actions).

**Key capabilities:**

- Custom instructions and conversation starters
- Knowledge files (up to 20 files) the GPT can search and reference
- Actions: connect to external APIs for live data or operations
- Publishable to the GPT Store or shareable via link
- Code Interpreter and DALL-E access can be toggled per GPT

**Best for:** Productized assistants you want to share or publish. Complex workflows that need external integrations. Teams standardizing on a shared assistant.

**Limitations:** Knowledge file search can be inconsistent for large or complex documents. Actions require technical setup (OpenAPI specs). Rate limits apply to published GPTs.

## Comparison at a glance

| Feature | Claude Projects | Gemini Gems | ChatGPT GPTs |
|---------|-----------------|-------------|--------------|
| Custom instructions | Yes | Yes | Yes |
| Persistent files | Yes | No | Yes (knowledge files) |
| Memory across sessions | Yes (within project) | No | Limited (user memory, not GPT-specific) |
| Shareable | No | Yes | Yes |
| External API integrations | No | No | Yes (Actions) |
| Code execution | Yes | Yes | Yes (toggle) |
| Image generation | Yes | Yes | Yes (toggle) |

## When to use which

- **Use Claude Projects** when you're working solo on something with lots of reference material (a codebase, a research corpus, a long-form writing project) and you want Claude to "remember" across sessions.
- **Use Gemini Gems** when you want a lightweight, shareable custom persona without needing to upload files. Good for coaching, brainstorming, or consistent tone.
- **Use Custom GPTs** when you need to share a polished assistant with others, integrate external APIs, or publish something for broader use.

## What to do next

- Pick one workflow you repeat weekly and build a customization for it
- Start simple: instructions only, no files or integrations
- Test with real tasks before adding complexity (files, Actions)
- If you need external data, explore ChatGPT Actions or MCP connectors
- Document your custom instructions somewhere version-controlled so you can iterate

## Sources

- [Claude Projects documentation](https://support.anthropic.com/en/articles/9517075-what-are-projects)
- [Gemini Gems overview](https://blog.google/products/gemini/google-gemini-update-august-2024/)
- [OpenAI Custom GPTs guide](https://help.openai.com/en/articles/8554397-creating-a-gpt)
