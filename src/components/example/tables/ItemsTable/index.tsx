/**
 * Example Items Table Component
 *
 * Display items in a table format with search and pagination.
 * This is a presentational component that receives data via props.
 *
 * Customize columns, search logic, and actions as needed.
 */

import { useItemsTable } from './hooks'
import * as Components from './components'
import type * as AppTypes from "@/context/App/AppTypes"

interface ItemsTableProps {
  items?: AppTypes.Item[]
  isLoading?: boolean
  error?: string | null
  title?: string
}

function ItemsTable({
  items,
  isLoading = false,
  error = null,
  title = "All Items"
}: ItemsTableProps) {
  const {
    search,
    onSearchChange,
    page,
    pageCount,
    onPageChange,
    filteredCount,
    pagedItems
  } = useItemsTable(items)

  if (isLoading) return <Components.Loading />

  if (error) return <Components.Error message={error} />

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-primary">
        {title} ({filteredCount})
      </h2>

      <Components.SearchBar
        search={search}
        onSearchChange={onSearchChange}
      />

      <Components.TableContent items={pagedItems} />

      {pageCount > 1 && (
        <Components.Pagination
          page={page}
          pageCount={pageCount}
          onPageChange={onPageChange}
        />
      )}
    </section>
  )
}

export default ItemsTable
