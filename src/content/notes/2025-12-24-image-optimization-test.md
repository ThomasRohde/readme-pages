---
title: "Image Optimization Test"
date: 2025-12-24
description: "Testing image optimization with lazy loading and responsive images"
tags: ["test", "images"]
---

# Image Optimization Test

This page demonstrates the image optimization features with lazy loading and responsive images.

## Markdown Images

Images in markdown are automatically optimized:

![Example placeholder image](https://via.placeholder.com/800x400/137fec/ffffff?text=Optimized+Image)

The image above is automatically:
- Lazy loaded for better performance
- Responsive with proper sizing
- Styled with rounded corners and shadow
- Optimized with WebP format when supported

## Using the OptimizedImage Component

For more control, use the `OptimizedImage` component directly in Astro files:

```astro
import OptimizedImage from '../components/OptimizedImage.astro';
import myImage from '../assets/example.jpg';

<OptimizedImage src={myImage} alt="Example" />
```

## Image Best Practices

1. **Always include alt text** for accessibility
2. **Place images in `src/assets/`** for automatic optimization
3. **Use descriptive filenames** like `feature-screenshot.jpg` not `img123.jpg`
4. **Specify dimensions when possible** to prevent layout shift
5. **Use lazy loading** for images below the fold (enabled by default)

## Multiple Images

![First image](https://via.placeholder.com/600x300/0ea5e9/ffffff?text=Image+1)

![Second image](https://via.placeholder.com/600x300/8b5cf6/ffffff?text=Image+2)

![Third image](https://via.placeholder.com/600x300/ec4899/ffffff?text=Image+3)

All images are automatically optimized and lazy loaded!
