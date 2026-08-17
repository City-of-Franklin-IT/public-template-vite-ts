/**
 * Example utility functions for the container
 *
 * These are helper functions used by the container hooks.
 * Useful for date manipulation, formatting, calculations, etc.
 */

/**
 * Get a date string N days in the past
 *
 * @param days - Number of days to go back
 * @returns ISO date string (YYYY-MM-DD)
 *
 * Example: daysAgo(30) returns "2026-07-18" (if today is "2026-08-17")
 */
export const daysAgo = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().split('T')[0]
}

/**
 * Format a date string for display
 *
 * @param dateString - ISO date string or Date object
 * @returns Formatted date string
 *
 * Example: formatDate("2026-08-17") returns "Aug 17, 2026"
 */
export const formatDate = (dateString?: string | Date): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
