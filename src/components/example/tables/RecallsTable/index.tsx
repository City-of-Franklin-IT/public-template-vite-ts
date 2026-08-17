import { useRecallsTable } from './hooks'

// Components
import * as Components from './components'

// Types
import type * as AppTypes from "@/context/App/AppTypes"

function RecallsTable({ recalls, isLoading, isError }: { recalls: AppTypes.RecallInterface[] | undefined, isLoading: boolean, isError: boolean }) {
  const { search, onSearchChange, page, pageCount, onPageChange, filteredCount, pagedRecalls } = useRecallsTable(recalls)

  if(isLoading) return (
    <Components.Loading />
  )

  if(isError) return (
    <Components.Error />
  )

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-primary">More Fire & Explosion Recalls ({filteredCount})</h2>
      
      <Components.Search 
        search={search}
        onSearchChange={onSearchChange} />
      <Components.RecallsTableContent pagedRecalls={pagedRecalls} />
      <Components.Pagination
        page={page} 
        pageCount={pageCount} 
        onPageChange={onPageChange} />
    </section>
  )
}

export default RecallsTable
