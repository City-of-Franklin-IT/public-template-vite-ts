/**
 * Utility Functions
 *
 * Centralized location for reusable utility functions used throughout the application.
 * Add your utility functions here and import them in components.
 */

/**
 * Create authentication headers for API requests
 * @param token - Authentication token
 * @returns Headers object with authorization
 */
export const createAuthHeaders = (token: string): Headers => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${token}`)
  headers.append('Content-Type', 'application/json')
  return headers
}

/**
 * Format date to readable string
 * @param date - Date to format
 * @param locale - Locale code (default: 'en-US')
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, locale: string = 'en-US'): string => {
  return new Date(date).toLocaleDateString(locale)
}

/**
 * Format date and time
 * @param date - Date to format
 * @param locale - Locale code (default: 'en-US')
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: Date | string, locale: string = 'en-US'): string => {
  return new Date(date).toLocaleString(locale)
}

/**
 * Debounce function to limit execution frequency
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Check if a value is empty
 * @param value - Value to check
 * @returns True if value is empty
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Capitalize first letter of string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncate string to specified length
 * @param str - String to truncate
 * @param length - Maximum length
 * @returns Truncated string
 */
export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length) + '...' : str
}

/**
 * Generate UUID (simple version - for production, consider a library)
 * @returns UUID string
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Deep clone an object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Merge objects deeply
 * @param target - Target object
 * @param source - Source object
 * @returns Merged object
 */
export const deepMerge = <T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T => {
  const result = { ...target }

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key]
      const targetValue = result[key]

      if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        ) as T[Extract<keyof T, string>]
      } else {
        result[key] = sourceValue as T[Extract<keyof T, string>]
      }
    }
  }

  return result
}
