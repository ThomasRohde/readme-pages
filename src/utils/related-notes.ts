import type { CollectionEntry } from 'astro:content';

/**
 * Calculate similarity score between two notes based on shared tags
 * @param currentTags - Tags of the current note
 * @param otherTags - Tags of another note
 * @returns Number of shared tags (higher = more similar)
 */
function calculateTagSimilarity(currentTags: string[], otherTags: string[]): number {
  if (!currentTags || !otherTags || currentTags.length === 0 || otherTags.length === 0) {
    return 0;
  }
  
  const currentSet = new Set(currentTags);
  const sharedTags = otherTags.filter(tag => currentSet.has(tag));
  return sharedTags.length;
}

/**
 * Find related notes based on tag similarity
 * @param currentSlug - Slug of the current note (to exclude from results)
 * @param currentTags - Tags of the current note
 * @param allNotes - All available notes
 * @param maxResults - Maximum number of related notes to return (default: 3)
 * @returns Array of related notes sorted by relevance
 */
export function findRelatedNotes(
  currentSlug: string,
  currentTags: string[] = [],
  allNotes: CollectionEntry<'notes'>[],
  maxResults: number = 3
): CollectionEntry<'notes'>[] {
  // Filter out current note and draft notes
  const candidates = allNotes.filter(
    note => note.id !== currentSlug && !note.data.draft
  );
  
  // If current note has no tags, return most recent notes
  if (!currentTags || currentTags.length === 0) {
    return candidates
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .slice(0, maxResults);
  }
  
  // Score each candidate by tag overlap
  const scoredNotes = candidates.map(note => ({
    note,
    score: calculateTagSimilarity(currentTags, note.data.tags || [])
  }));
  
  // Sort by score (descending), then by date (descending)
  scoredNotes.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.note.data.date.getTime() - a.note.data.date.getTime();
  });
  
  // Return top results that have at least 1 shared tag, or fall back to recent notes
  const relatedWithTags = scoredNotes.filter(item => item.score > 0).slice(0, maxResults);
  
  if (relatedWithTags.length === maxResults) {
    return relatedWithTags.map(item => item.note);
  }
  
  // If not enough notes with shared tags, pad with most recent
  const additionalNeeded = maxResults - relatedWithTags.length;
  const remaining = scoredNotes
    .filter(item => item.score === 0)
    .slice(0, additionalNeeded);
  
  return [
    ...relatedWithTags.map(item => item.note),
    ...remaining.map(item => item.note)
  ];
}
