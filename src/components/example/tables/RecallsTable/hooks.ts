import { useMemo, useState } from "react"

// Types
import * as AppTypes from "@/context/App/AppTypes"

const PAGE_SIZE = 10

export const useRecallsTable = (recalls: AppTypes.RecallInterface[] | undefined) => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filteredRecalls = useMemo(() => {
    if(!recalls) return []

    const term = search.trim().toLowerCase()
    if(!term) return recalls

    return recalls.filter(recall => recall.Description?.toLowerCase().includes(term))
  }, [recalls, search])

  const pageCount = Math.max(1, Math.ceil(filteredRecalls.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)

  const pagedRecalls = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredRecalls.slice(start, start + PAGE_SIZE)
  }, [filteredRecalls, currentPage])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return {
    search,
    onSearchChange: handleSearchChange,
    page: currentPage,
    pageCount,
    onPageChange: setPage,
    filteredCount: filteredRecalls.length,
    pagedRecalls
  }
}
