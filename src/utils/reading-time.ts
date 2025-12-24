/**
 * Calculate reading time for content
 * @param content - The markdown or plain text content
 * @param wordsPerMinute - Reading speed (default: 200 words/minute)
 * @returns Formatted reading time string (e.g., "5 min read")
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200): string {
  if (!content) return '1 min read';
  
  // Remove markdown syntax for more accurate word count
  const plainText = content
    // Remove code blocks (count them at 50% speed)
    .replace(/```[\s\S]*?```/g, (match) => {
      const codeWords = match.split(/\s+/).length;
      return ' '.repeat(Math.floor(codeWords * 0.5));
    })
    // Remove inline code
    .replace(/`[^`]+`/g, '')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove markdown headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove markdown formatting
    .replace(/[*_~`]/g, '');
  
  // Count words
  const words = plainText.trim().split(/\s+/).length;
  
  // Calculate reading time
  const minutes = Math.ceil(words / wordsPerMinute);
  
  // Format output
  if (minutes === 1) {
    return '1 min read';
  }
  return `${minutes} min read`;
}

/**
 * Get reading time metadata for display
 */
export function getReadingTimeData(content: string) {
  const readingTime = calculateReadingTime(content);
  const words = content.trim().split(/\s+/).length;
  
  return {
    text: readingTime,
    minutes: parseInt(readingTime),
    words,
  };
}
