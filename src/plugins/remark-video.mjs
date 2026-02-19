import { visit } from 'unist-util-visit';

/**
 * Remark plugin to transform ::video directive into an HTML5 video element.
 * Usage: ::video{src=/videos/my-video.mp4}
 * Options: { base: '/readme-pages' } - prepended to src paths starting with /
 */
export default function remarkVideo(options = {}) {
  const base = (options.base || '').replace(/\/$/, '');

  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'leafDirective' && node.name === 'video') {
        const attributes = node.attributes || {};
        let src = attributes.src;
        if (!src) return;

        if (base && src.startsWith('/')) {
          src = base + src;
        }

        const data = node.data || (node.data = {});
        data.hName = 'video';
        data.hProperties = {
          controls: true,
          preload: 'metadata',
          src,
          style: 'width:100%;max-width:720px;border-radius:8px;margin:1.5rem 0;',
        };
        node.children = [];
      }
    });
  };
}
