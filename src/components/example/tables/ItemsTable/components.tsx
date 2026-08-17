/**
 * Sub-components for ItemsTable
 *
 * Keeps table logic modular and reusable
 */

import type * as AppTypes from "@/context/App/AppTypes"
import { formatDate } from "@/components/example/containers/ExampleContainer/utils"
import React from "react"

export const Loading = () => (
  <div className="text-center py-8">
    <div className="loading loading-spinner loading-lg"></div>
    <p className="mt-4 text-base-content/70">Loading items...</p>
  </div>
)

export const Error = ({ message = "Unable to load items. Please try again." }: { message?: string }) => (
  <div className="alert alert-error">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2m-2-2l-2-2" />
    </svg>
    <span>{message}</span>
  </div>
)

export const SearchBar = ({
  search,
  onSearchChange
}: {
  search: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => (
  <input
    type="text"
    placeholder="Search items by title or description..."
    className="input input-bordered w-full max-w-md"
    value={search}
    onChange={onSearchChange}
  />
)

export const NoResults = () => (
  <div className="text-center py-8">
    <p className="text-base-content/70">No items found matching your search.</p>
  </div>
)

export const TableContent = ({ items }: { items: AppTypes.Item[] }) => {
  if (!items.length) return <NoResults />

  return (
    <>
      {/* Desktop: Table view */}
      <DesktopTable items={items} />
      {/* Mobile: Card view */}
      <MobileCards items={items} />
    </>
  )
}

const DesktopTable = ({ items }: { items: AppTypes.Item[] }) => (
  <div className="hidden lg:block">
    <div className="overflow-x-auto rounded-lg bg-base-100 shadow">
      <table className="table">
        <thead>
          <tr className="bg-base-200">
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="font-mono text-sm">{item.id}</td>
              <td className="font-semibold">{item.title}</td>
              <td className="max-w-xs truncate text-sm text-base-content/70">
                {item.description || '—'}
              </td>
              <td className="text-sm">
                {item.createdAt ? formatDate(item.createdAt) : '—'}
              </td>
              <td>
                <button className="btn btn-sm btn-ghost">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const MobileCards = ({ items }: { items: AppTypes.Item[] }) => (
  <div className="lg:hidden space-y-3">
    {items.map((item) => (
      <div key={item.id} className="card bg-base-100 shadow">
        <div className="card-body gap-2">
          <h3 className="card-title text-base">{item.title}</h3>
          {item.description && (
            <p className="text-sm text-base-content/70">{item.description}</p>
          )}
          {item.createdAt && (
            <p className="text-xs text-base-content/50">
              Created: {formatDate(item.createdAt)}
            </p>
          )}
          <div className="card-actions justify-end">
            <button className="btn btn-sm btn-primary">View</button>
          </div>
        </div>
      </div>
    ))}
  </div>
)

interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ page, pageCount, onPageChange }: PaginationProps) => {
  if (pageCount <= 1) return null

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        className="btn btn-sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>

      <span className="text-sm">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{pageCount}</span>
      </span>

      <button
        className="btn btn-sm"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  )
}
