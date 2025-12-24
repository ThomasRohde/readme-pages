import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://thomasrohde.github.io',
  base: '/readme-pages',
  compressHTML: true,

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
    rehypePlugins: [
      // Add lazy loading and decoding attributes to images
      () => {
        return (tree) => {
          const visit = (node) => {
            if (node.type === 'element' && node.tagName === 'img') {
              node.properties = node.properties || {};
              node.properties.loading = 'lazy';
              node.properties.decoding = 'async';
            }
            if (node.children) {
              node.children.forEach(visit);
            }
          };
          visit(tree);
        };
      },
    ],
  },

  image: {
    // Enable image optimization for all formats
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});