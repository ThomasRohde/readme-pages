# Image Optimization Guide

This project includes automatic image optimization with lazy loading, WebP format support, and responsive sizing.

## Quick Start

### Method 1: Markdown Images (Recommended for Content)

Simply use standard markdown image syntax in your `.md` files:

```markdown
![Description of image](https://example.com/image.jpg)
```

**Features automatically applied:**
- Lazy loading
- Responsive sizing
- Rounded corners with shadow
- WebP format when supported

### Method 2: OptimizedImage Component (For Astro Files)

For images stored in `src/assets/`, use the `OptimizedImage` component:

```astro
---
import OptimizedImage from '../components/OptimizedImage.astro';
import heroImage from '../assets/hero.jpg';
---

<OptimizedImage 
  src={heroImage} 
  alt="Hero image description"
  width={800}
  height={400}
/>
```

## Image Storage

### For Optimized Images
Place images in `src/assets/` - these will be automatically:
- Optimized at build time
- Converted to modern formats (WebP)
- Generated with multiple sizes for responsive loading

### For Static Images
Place images in `public/assets/` if you need direct URL access without optimization.

## Component Props

The `OptimizedImage` component accepts:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `src` | `ImageMetadata \| string` | Yes | - | Image source from assets or URL |
| `alt` | `string` | Yes | - | Alt text for accessibility |
| `width` | `number` | No | - | Width constraint |
| `height` | `number` | No | - | Height constraint |
| `class` | `string` | No | `''` | Additional CSS classes |
| `loading` | `'lazy' \| 'eager'` | No | `'lazy'` | Loading strategy |

## Best Practices

### 1. Always Include Alt Text
```markdown
❌ ![](image.jpg)
✅ ![Screenshot of the dashboard showing analytics](image.jpg)
```

### 2. Use Descriptive Filenames
```
❌ img1.jpg, photo.png, screenshot.jpg
✅ dashboard-analytics.jpg, user-profile.png, mobile-menu-screenshot.jpg
```

### 3. Optimize Image Dimensions
- Save images at 2x the display size for retina displays
- Don't exceed 2000px width for prose content
- Use appropriate formats: JPEG for photos, PNG for graphics with transparency

### 4. Lazy Load Below the Fold
```astro
<!-- Hero image - load immediately -->
<OptimizedImage src={hero} alt="Hero" loading="eager" />

<!-- Content images - lazy load (default) -->
<OptimizedImage src={feature} alt="Feature" />
```

### 5. Specify Dimensions When Possible
```astro
<!-- Prevents layout shift during load -->
<OptimizedImage 
  src={image} 
  alt="Product photo"
  width={600}
  height={400}
/>
```

## Image Styling

Images in prose content automatically receive:
- `rounded-lg` - Rounded corners
- `shadow-md` - Subtle shadow
- `my-6` - Vertical spacing
- Responsive width (max 100%)

### Custom Styling
```astro
<OptimizedImage 
  src={image} 
  alt="Custom styled image"
  class="border-2 border-primary"
/>
```

## Performance Features

### Automatic Optimizations
1. **Format conversion**: Automatically serves WebP with fallbacks
2. **Lazy loading**: Images load only when scrolled into view
3. **Responsive images**: Multiple sizes generated for different viewports
4. **Layout stability**: Prevents content shift during image load

### Build-Time Processing
Images are processed during `npm run build`:
- Resized to optimal dimensions
- Compressed for web delivery
- Multiple formats generated
- Cached for faster rebuilds

## Troubleshooting

### Images not optimizing
- Ensure images are in `src/assets/` not `public/`
- Check that `sharp` is installed: `npm install sharp`
- Rebuild: `npm run build`

### Images causing layout shift
- Specify width and height attributes
- Use aspect-ratio CSS for consistent sizing

### External images not loading
- External URLs load directly without optimization
- For external images requiring optimization, download and place in `src/assets/`

## Examples

See [2025-12-24-image-optimization-test.md](src/content/notes/2025-12-24-image-optimization-test.md) for live examples.
