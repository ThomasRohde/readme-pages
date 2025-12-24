import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const notes = await getCollection('notes', ({ data }) => {
    return !data.draft;
  });

  // Sort notes by date (newest first)
  const sortedNotes = notes.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  // Construct full site URL including base path
  const baseUrl = import.meta.env.BASE_URL || '/readme-pages';
  const siteUrl = context.site || 'https://thomasrohde.github.io';
  const fullSiteUrl = new URL(baseUrl, siteUrl).href;

  return rss({
    title: 'Thomas Rohde - Notes',
    description: 'Technical notes, thoughts, and documentation',
    site: fullSiteUrl,
    items: sortedNotes.map((note) => ({
      title: note.data.title,
      description: note.data.description || '',
      link: `${fullSiteUrl}/notes/${note.slug}/`,
      pubDate: new Date(note.data.date),
      categories: note.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
    stylesheet: false,
  });
}
