import { visit } from 'unist-util-visit';

/**
 * Remark plugin to transform directive nodes (:::note, :::tip, etc.) into admonition blocks
 * Supports: note, tip, info, warning, danger
 */
export default function remarkAdmonitions() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {});
        const name = node.name.toLowerCase();
        
        // Map admonition types to styles
        const admonitionTypes = {
          note: { icon: '📝', title: 'Note', colorClass: 'note' },
          tip: { icon: '💡', title: 'Tip', colorClass: 'tip' },
          info: { icon: 'ℹ️', title: 'Info', colorClass: 'info' },
          warning: { icon: '⚠️', title: 'Warning', colorClass: 'warning' },
          danger: { icon: '🚨', title: 'Danger', colorClass: 'danger' },
        };
        
        if (admonitionTypes[name]) {
          const config = admonitionTypes[name];
          const attributes = node.attributes || {};
          const title = attributes.title || config.title;
          
          data.hName = 'div';
          data.hProperties = {
            className: ['admonition', `admonition-${config.colorClass}`],
          };
          
          // Add title node at the beginning
          const titleNode = {
            type: 'paragraph',
            data: {
              hName: 'div',
              hProperties: {
                className: ['admonition-title'],
              },
            },
            children: [
              {
                type: 'text',
                value: `${config.icon} ${title}`,
              },
            ],
          };
          
          // Wrap content in a div
          const contentNode = {
            type: 'div',
            data: {
              hName: 'div',
              hProperties: {
                className: ['admonition-content'],
              },
            },
            children: node.children || [],
          };
          
          node.children = [titleNode, contentNode];
        }
      }
    });
  };
}
