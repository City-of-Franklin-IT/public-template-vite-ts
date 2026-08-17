/**
 * Application Types
 *
 * Define TypeScript interfaces for your application's data structures.
 * These types should match your API responses.
 *
 * Example below shows a generic Item structure. Customize for your use case.
 */

/**
 * Example: Generic item interface
 * Replace with your actual data structure
 */
export interface Item {
  id: string | number
  title: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

/**
 * Example: API error response
 * Customize based on your API's error format
 */
export interface APIError {
  message: string
  code?: string
  details?: Record<string, unknown>
}

/**
 * Example: Paginated API response
 * Use this pattern if your API returns paginated results
 */
export interface PaginatedResponse<T> {
  data: T[]
  page: number
  pageSize: number
  total: number
}

/**
 * Add your application-specific types below:
 *
 * export interface User {
 *   id: string
 *   name: string
 *   email: string
 * }
 *
 * export interface Product {
 *   id: string
 *   title: string
 *   price: number
 * }
 */
