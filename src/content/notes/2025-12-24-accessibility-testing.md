---
title: "Accessibility Testing"
date: 2025-12-24
description: "Testing keyboard navigation and accessibility features including skip link"
tags: ["accessibility", "testing"]
---

# Accessibility Features

This page documents the accessibility features implemented in the site.

## Skip to Main Content

A "Skip to main content" link is available for keyboard users. To test:

1. Press `Tab` on page load
2. The skip link should appear at the top center of the page
3. Press `Enter` to jump directly to the main content
4. This bypasses the header and sidebar navigation

**Why it matters:** Users navigating with keyboards or screen readers can quickly access the main content without tabbing through all navigation elements on every page.

## Keyboard Navigation

All interactive elements are keyboard accessible:

- `Tab` - Move forward through interactive elements
- `Shift + Tab` - Move backward
- `Enter` or `Space` - Activate buttons and links
- `Escape` - Close mobile menu

## Screen Reader Support

The site includes proper semantic HTML and ARIA labels:

- Landmark regions (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Proper heading hierarchy (`<h1>` through `<h6>`)
- Alt text for images
- ARIA labels for icon-only buttons

## Focus Indicators

All focusable elements show clear focus indicators:

- Yellow outline when using keyboard navigation
- Consistent across light and dark modes
- High contrast ratio for visibility

## Color Contrast

All text meets WCAG AA standards:

- Regular text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- Interactive elements have clear hover/focus states

## Testing Checklist

### Manual Tests
- [ ] Skip link appears on Tab and works
- [ ] All navigation items are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Mobile menu can be opened and closed with keyboard
- [ ] Dark mode toggle works with keyboard

### Screen Reader Tests
- [ ] Page structure makes sense
- [ ] All images have alt text
- [ ] Links have descriptive text
- [ ] Buttons have accessible labels

### Automated Tools
- Lighthouse accessibility audit
- axe DevTools
- WAVE browser extension
