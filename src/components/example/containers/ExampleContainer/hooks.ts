/**
 * Example Hooks for Container Component
 *
 * Demonstrates patterns for:
 * - Data fetching with TanStack Query
 * - Custom hooks for reusable logic
 * - Derived state calculations
 *
 * Replace with your actual API calls and data logic.
 */

import { useQuery } from "@tanstack/react-query"
import * as AppActions from "@/context/App/AppActions"
import * as AppTypes from "@/context/App/AppTypes"

/**
 * Example: Fetch all items
 *
 * Replace with your actual data fetching logic
 */
export const useGetItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: AppActions.getItems,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Example: Fetch and transform items
 *
 * Shows how to derive computed data from fetched data
 */
export const useGetLatestItems = () => {
  const { data, isLoading, isError } = useGetItems()

  // Example: Get only items from the last 30 days
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 30)

  return {
    data: data?.filter(item => {
      if (!item.createdAt) return false
      return new Date(item.createdAt) >= cutoff
    }).slice(0, 6), // Take top 6
    isLoading,
    isError
  }
}

/**
 * Example: Custom hook that combines multiple queries
 *
 * Shows how to orchestrate multiple data sources
 */
export const useItemsData = () => {
  const allItems = useGetItems()
  const latestItems = useGetLatestItems()

  return {
    allItems: {
      data: allItems.data ?? [],
      isLoading: allItems.isLoading,
      error: allItems.error
    },
    latestItems: {
      data: latestItems.data,
      isLoading: latestItems.isLoading,
      error: latestItems.isError
    }
  }
}

/**
 * Example: Search/filter hook
 *
 * Shows how to handle parametrized queries
 */
export const useSearchItems = (query?: string) => {
  return useQuery({
    queryKey: ['items', 'search', query],
    queryFn: async () => {
      if (!query) return []
      // Replace with your actual search API call
      return AppActions.getItems()
    },
    enabled: !!query, // Only run when query is provided
    staleTime: 1000 * 60 * 5,
  })
}
