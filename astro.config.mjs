import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { h } from 'hastscript';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import remarkAdmonitions from './src/plugins/remark-admonitions.mjs';
import remarkVideo from './src/plugins/remark-video.mjs';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://thomasrohde.github.io',
  base: '/readme-pages',
  compressHTML: true,

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        const url = item.url;
        // Homepage gets highest priority
        if (url.endsWith('/readme-pages/') || url.endsWith('/readme-pages')) {
          item.priority = 1.0;
        } else if (url.includes('/tags/') || url.includes('/recipe-tags/')) {
          // Tag archive pages — lowest priority (check before /notes/ and /recipes/)
          item.priority = 0.4;
        } else if (url.match(/\/notes\/[^/]+\//)) {
          // Individual notes — primary content
          item.priority = 0.8;
        } else if (url.match(/\/recipes\/[^/]+\//)) {
          // Individual recipes — primary content
          item.priority = 0.8;
        } else if (url.endsWith('/notes/') || url.endsWith('/recipes/')) {
          // Collection index pages
          item.priority = 0.9;
        } else {
          item.priority = 0.6;
        }
        return item;
      },
    }),
  ],

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
    remarkPlugins: [
      remarkDirective,
      remarkAdmonitions,
      [remarkVideo, { base: '/readme-pages' }],
    ],
    rehypePlugins: [
      // Generate IDs for headings
      rehypeSlug,
      // Add anchor links to headings
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          properties: {
            className: ['heading-anchor'],
            ariaLabel: 'Link to this section',
          },
          content: h('span.anchor-icon', '#'),
        },
      ],
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
