---
title: "Code Copy Button Test"
description: "Testing the copy button feature on various code blocks"
date: 2025-12-24
tags: ["testing", "code"]
---

# Code Copy Button Test

This note tests the copy button functionality with various code blocks.

## JavaScript Example

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

## TypeScript Example

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};
```

## Python Example

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

## Bash Example

```bash
#!/bin/bash
echo "Starting deployment..."
npm install
npm run build
echo "Deployment complete!"
```

## Multi-line SQL

```sql
SELECT
  u.id,
  u.name,
  u.email,
  COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.active = true
GROUP BY u.id, u.name, u.email
ORDER BY order_count DESC
LIMIT 10;
```

## Short One-liner

```js
const sum = (a, b) => a + b;
```

All code blocks above should have a "Copy" button in the top-right corner that:
- Appears on hover (desktop) or is always visible (mobile)
- Shows "Copy" text with copy icon initially
- Changes to "Copied!" with checkmark when clicked
- Has a green background when copied
- Resets to "Copy" after 2 seconds
