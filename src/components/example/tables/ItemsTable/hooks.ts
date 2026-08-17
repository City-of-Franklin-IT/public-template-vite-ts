/**
 * Example hooks for ItemsTable
 *
 * Demonstrates patterns for:
 * - Search/filtering
 * - Pagination
 * - Memoized computed values
 */

import { useMemo, useState } from "react"
import type * as AppTypes from "@/context/App/AppTypes"

const PAGE_SIZE = 10

/**
 * Hook for managing table state (search, pagination, filtering)
 *
 * @param items - Array of items to display
 * @returns Object with state and handlers for table
 */
export const useItemsTable = (items: AppTypes.Item[] | undefined) => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  // Compute filtered items based on search term
  const filteredItems = useMemo(() => {
    if (!items) return []

    const term = search.trim().toLowerCase()
    if (!term) return items

    // Search in title and description
    return items.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term)
    )
  }, [items, search])

  // Compute pagination info
  const pageCount = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)

  // Compute items for current page
  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredItems.slice(start, start + PAGE_SIZE)
  }, [filteredItems, currentPage])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1) // Reset to first page on search
  }

  return {
    search,
    onSearchChange: handleSearchChange,
    page: currentPage,
    pageCount,
    onPageChange: setPage,
    filteredCount: filteredItems.length,
    pagedItems
  }
}
