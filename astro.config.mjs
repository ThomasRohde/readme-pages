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
      priority: 0.7,
      lastmod: new Date(),
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
