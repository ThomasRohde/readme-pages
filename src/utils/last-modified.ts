import { execSync } from 'child_process';

/**
 * Get the last modified date of a file from git history.
 * Falls back to the current date if git is not available or file is not tracked.
 * 
 * @param filePath - Absolute or relative path to the file
 * @returns Date object representing the last modification time
 */
export function getLastModified(filePath: string): Date {
  try {
    // Get the timestamp of the last commit that modified this file
    const timestamp = execSync(
      `git log -1 --format=%ct "${filePath}"`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
    ).trim();
    
    if (!timestamp) {
      // File not tracked in git, use current date
      return new Date();
    }
    
    // Convert Unix timestamp to Date
    return new Date(parseInt(timestamp) * 1000);
  } catch (error) {
    // Git not available or other error, use current date
    return new Date();
  }
}

/**
 * Format a date as relative time (e.g., "2 days ago", "3 months ago")
 * 
 * @param date - Date to format
 * @returns Formatted relative time string
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
  } else if (diffWeek < 4) {
    return `${diffWeek} week${diffWeek !== 1 ? 's' : ''} ago`;
  } else if (diffMonth < 12) {
    return `${diffMonth} month${diffMonth !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffYear} year${diffYear !== 1 ? 's' : ''} ago`;
  }
}

/**
 * Get the last modified date from git and format as relative time
 * 
 * @param filePath - Path to the file
 * @returns Formatted string like "Updated 3 days ago"
 */
export function getLastModifiedFormatted(filePath: string): string {
  const lastModified = getLastModified(filePath);
  const relative = formatRelativeTime(lastModified);
  return `Updated ${relative}`;
}
