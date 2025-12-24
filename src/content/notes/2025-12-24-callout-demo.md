---
title: "Callout Components Demo"
date: 2025-12-24
description: "Demonstration of all available callout/admonition types for enhanced content presentation"
tags: ["documentation", "components"]
---

This page demonstrates all the available callout/admonition components. These callouts help highlight important information, tips, warnings, and other contextual content.

## Note Callouts

:::note
This is a **note** callout. Use it for general information or side notes that provide additional context without being critical.

You can include:
- Lists
- **Bold text**
- `code snippets`
- And more markdown!
:::

## Tip Callouts

:::tip
This is a **tip** callout. Use it to share helpful advice, best practices, or pro tips that can improve the reader's experience or understanding.
:::

:::tip{title="Pro Tip"}
You can customize the title by adding a title attribute!
:::

## Info Callouts

:::info
This is an **info** callout. Use it to provide informational content that's worth highlighting but not critical. Perfect for background information or contextual details.
:::

## Warning Callouts

:::warning
This is a **warning** callout. Use it to alert readers about potential issues, deprecated features, or situations that require caution.
:::

:::warning{title="Important"}
Always backup your data before performing major operations!
:::

## Danger Callouts

:::danger
This is a **danger** callout. Use it for critical warnings about operations that could cause data loss, security issues, or breaking changes.
:::

:::danger{title="Breaking Change"}
This feature will be removed in version 2.0. Please migrate to the new API immediately.
:::

## Nested Content

Callouts support full markdown, including nested elements:

:::note{title="Complex Example"}
You can include complex content in callouts:

1. Numbered lists
2. With multiple items
3. And nested content

```javascript
// Even code blocks!
function example() {
  console.log('Hello from a callout!');
}
```

> And blockquotes for extra emphasis

:::

## Multiple Callouts in Sequence

:::tip
First tip about optimization
:::

:::warning
But be careful about this edge case
:::

:::info
Additional context you should know
:::

These callouts make documentation more engaging and help readers quickly identify important information!
