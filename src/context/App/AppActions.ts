/**
 * API Actions
 *
 * Centralized location for all API calls. This keeps API logic separate from
 * component logic and makes it easy to mock for testing.
 *
 * Example functions below - replace with your actual API calls.
 */

import { API_BASE_URL } from "@/config"
import * as AppTypes from '@/context/App/AppTypes'

/**
 * Example: Fetch a list of items
 *
 * Replace with your actual API endpoint and response type
 */
export const getItems = async (): Promise<AppTypes.Item[]> => {
  if (!API_BASE_URL) {
    // Return empty array or mock data if no API is configured
    console.warn('API_BASE_URL is not configured')
    return []
  }

  const res = await fetch(`${API_BASE_URL}/items`)

  if (!res.ok) {
    throw new Error(`Failed to fetch items: ${res.statusText}`)
  }

  return res.json()
}

/**
 * Example: Fetch a single item by ID
 */
export const getItemById = async (id: string | number): Promise<AppTypes.Item> => {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured')
  }

  const res = await fetch(`${API_BASE_URL}/items/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch item: ${res.statusText}`)
  }

  return res.json()
}

/**
 * Example: Create a new item
 */
export const createItem = async (item: Omit<AppTypes.Item, 'id' | 'createdAt'>): Promise<AppTypes.Item> => {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured')
  }

  const res = await fetch(`${API_BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })

  if (!res.ok) {
    throw new Error(`Failed to create item: ${res.statusText}`)
  }

  return res.json()
}

/**
 * Example: Update an item
 */
export const updateItem = async (id: string | number, item: Partial<AppTypes.Item>): Promise<AppTypes.Item> => {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured')
  }

  const res = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })

  if (!res.ok) {
    throw new Error(`Failed to update item: ${res.statusText}`)
  }

  return res.json()
}

/**
 * Example: Delete an item
 */
export const deleteItem = async (id: string | number): Promise<void> => {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured')
  }

  const res = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error(`Failed to delete item: ${res.statusText}`)
  }
}

/**
 * Template for adding more API functions:
 *
 * export const searchItems = async (query: string): Promise<AppTypes.Item[]> => {
 *   const params = new URLSearchParams({ q: query })
 *   const res = await fetch(`${API_BASE_URL}/items/search?${params.toString()}`)
 *   if (!res.ok) throw new Error(`Search failed: ${res.statusText}`)
 *   return res.json()
 * }
 */
