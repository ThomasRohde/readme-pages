import type { Loader, LoaderContext } from 'astro/loaders';
import matter from 'gray-matter';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, basename, relative } from 'path';
import { fileURLToPath } from 'url';

interface LoaderOptions {
  pattern: string;
  base: string;
}

/**
 * Custom content loader for notes that auto-generates missing frontmatter.
 * - Generates `title` from filename (strips date prefix)
 * - Generates `date` from filename pattern YYYY-MM-DD or uses today's date
 */
export function notesLoader(options: LoaderOptions): Loader {
  return {
    name: 'notes-loader-with-defaults',
    
    async load(context: LoaderContext) {
      const { store, parseData, generateDigest, logger, config, renderMarkdown } = context;
      
      // Resolve base path relative to project root
      const baseDir = join(fileURLToPath(config.root), options.base);
      
      // Get all markdown files
      const files = getMarkdownFiles(baseDir);
      
      store.clear();
      
      for (const filePath of files) {
        const filename = basename(filePath).replace(/\.(md|mdx)$/, '');
        const id = filename;
        
        try {
          const fileContent = readFileSync(filePath, 'utf-8');
          const { data: frontmatter, content } = matter(fileContent);
          
          // Auto-generate title if missing
          if (!frontmatter.title) {
            frontmatter.title = generateTitle(filename, true);
            logger.info(`Auto-generated title for ${filename}: "${frontmatter.title}"`);
          }
          
          // Auto-generate date if missing
          if (!frontmatter.date) {
            const extractedDate = extractDateFromFilename(filename);
            frontmatter.date = extractedDate || new Date().toISOString().split('T')[0];
            logger.info(`Auto-generated date for ${filename}: ${frontmatter.date}`);
          }
          
          // Validate and parse data
          const data = await parseData({
            id,
            data: frontmatter,
          });
          
          // Render the markdown content
          const rendered = await renderMarkdown(content);
          
          const digest = generateDigest(data);
          
          store.set({
            id,
            data,
            body: content,
            filePath: relative(fileURLToPath(config.root), filePath),
            rendered,
            digest,
          });
        } catch (error) {
          logger.error(`Error processing ${filePath}: ${error}`);
          throw error;
        }
      }
    },
  };
}

/**
 * Custom content loader for pages that auto-generates missing frontmatter.
 * - Generates `title` from filename
 */
export function pagesLoader(options: LoaderOptions): Loader {
  return {
    name: 'pages-loader-with-defaults',
    
    async load(context: LoaderContext) {
      const { store, parseData, generateDigest, logger, config, renderMarkdown } = context;
      
      // Resolve base path relative to project root
      const baseDir = join(fileURLToPath(config.root), options.base);
      
      // Get all markdown files
      const files = getMarkdownFiles(baseDir);
      
      store.clear();
      
      for (const filePath of files) {
        const filename = basename(filePath).replace(/\.(md|mdx)$/, '');
        const id = filename;
        
        try {
          const fileContent = readFileSync(filePath, 'utf-8');
          const { data: frontmatter, content } = matter(fileContent);
          
          // Auto-generate title if missing
          if (!frontmatter.title) {
            frontmatter.title = generateTitle(filename, false);
            logger.info(`Auto-generated title for ${filename}: "${frontmatter.title}"`);
          }
          
          // Validate and parse data
          const data = await parseData({
            id,
            data: frontmatter,
          });
          
          // Render the markdown content
          const rendered = await renderMarkdown(content);
          
          const digest = generateDigest(data);
          
          store.set({
            id,
            data,
            body: content,
            filePath: relative(fileURLToPath(config.root), filePath),
            rendered,
            digest,
          });
        } catch (error) {
          logger.error(`Error processing ${filePath}: ${error}`);
          throw error;
        }
      }
    },
  };
}

/**
 * Get all markdown files in a directory recursively
 */
function getMarkdownFiles(baseDir: string): string[] {
  const files: string[] = [];
  
  function walk(dir: string) {
    try {
      const entries = readdirSync(dir);
      for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          walk(fullPath);
        } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
          files.push(fullPath);
        }
      }
    } catch {
      // Directory doesn't exist or isn't accessible
    }
  }
  
  walk(baseDir);
  return files;
}

/**
 * Generate a human-readable title from a filename.
 * Examples:
 *   "my-cool-post" → "My Cool Post"
 *   "2025-12-24-building-with-klondike" → "Building With Klondike"
 */
function generateTitle(filename: string, isNote: boolean): string {
  let slug = filename;

  // For notes, strip leading date pattern (YYYY-MM-DD-)
  if (isNote) {
    slug = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  }

  // Convert kebab-case/snake_case to Title Case
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

/**
 * Extract date from filename if it starts with YYYY-MM-DD pattern.
 * Returns the date string or null if not found.
 */
function extractDateFromFilename(filename: string): string | null {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}
