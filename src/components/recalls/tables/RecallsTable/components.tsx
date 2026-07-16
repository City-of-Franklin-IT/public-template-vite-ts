import { formatRecallDate } from "@/utils/recalls"
import RecallCard from "@/components/recalls/cards/RecallCard"

// Types
import type * as AppTypes from "@/context/App/AppTypes"
import React from "react"

export const Loading = () => (
  <p className="text-center">Loading recalls...</p>
)

export const Error = () => (
  <p className="text-center text-error">Unable to reach the CPSC recall database right now. Please try again shortly.</p>
)

export const Search = ({ search, onSearchChange }: { search: string, onSearchChange: (e: React.ChangeEvent<HTMLInputElement, Element>) => void }) => (
  <input
    type="text"
    placeholder="Search recall descriptions..."
    className="input w-full max-w-md rounded border-base-300 focus:border-primary"
    value={search}
    onChange={onSearchChange} />
)

export const NoResults = ({ visible }: { visible: boolean }) => {
  if(!visible) return null

  return (
    <p className="text-center">No fire or explosion hazard recalls found.</p>
  )
}

export const RecallsTableContent = ({ pagedRecalls }: { pagedRecalls: AppTypes.RecallInterface[] }) => (
  <>
    <NoResults visible={!pagedRecalls.length} />
    <Table pagedRecalls={pagedRecalls} />
    <StackedList pagedRecalls={pagedRecalls} />
  </>
)

export const Table = ({ pagedRecalls }: { pagedRecalls: AppTypes.RecallInterface[] }) => {
  if(!pagedRecalls.length) return null

  return (
    <div className="hidden lg:block">
      <div className="overflow-x-auto rounded-2xl bg-base-100 shadow-lg">
        <table className="table min-w-max">
          <thead>
            <tr className="bg-primary text-primary-content">
              <th className="text-primary-content">Recall #</th>
              <th className="text-primary-content">Title</th>
              <th className="text-primary-content">Hazard</th>
              <th className="text-primary-content">Manufacturer</th>
              <th className="text-primary-content">Published</th>
              <th className="text-primary-content">Images</th>
            </tr>
          </thead>
          <tbody>
            {pagedRecalls.map((recall, index) => (
              <RecallRow
                key={recall.RecallID}
                recall={recall}
                isEven={index % 2 === 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const StackedList = ({ pagedRecalls }: { pagedRecalls: AppTypes.RecallInterface[] }) => {
  if(!pagedRecalls.length) return null

  return (
    <div className="lg:hidden">
      <div className="flex flex-col gap-3">
        {pagedRecalls.map(recall => (
          <RecallCard
            key={recall.RecallID}
            recall={recall} />
        ))}
      </div>
    </div>
  )
}

type PaginationProps = {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ page, pageCount, onPageChange }: PaginationProps) => {
  if(pageCount <= 1) return null

  return (
    <div className="flex items-center justify-center gap-3">
      <PaginationBtn
        btnProps={{
          disabled: page <= 1,
          onClick: () => onPageChange(page - 1)
        }}
        type={'Previous'} />

      <span className="text-sm text-base-content/60">Page {page} of {pageCount}</span>

      <PaginationBtn
        btnProps={{
          disabled: page >= pageCount,
          onClick: () => onPageChange(page + 1)
        }}
        type={'Next'} />
    </div>
  )
}

const RecallRow = ({ recall, isEven }: { recall: AppTypes.RecallInterface, isEven: boolean }) => (
  <tr className={isEven ? 'bg-primary/10' : ''}>
    <td>{recall.RecallNumber}</td>
    <td><a href={recall.URL} target="_blank" rel="noreferrer" className="link link-primary">{recall.Title}</a></td>
    <td>{recall.Hazards[0]?.Name ?? ''}</td>
    <td>{recall.Manufacturers[0]?.Name ?? ''}</td>
    <td className="whitespace-nowrap">{formatRecallDate(recall.LastPublishDate)}</td>
    <td>
      {recall.Images.length > 0 && (
        <div className="flex flex-nowrap gap-1">
          {recall.Images.map((image, index) => (
            <a
              key={`${image.URL}-${index}`}
              href={image.URL}
              target="_blank"
              rel="noreferrer"
              title={image.Caption}>
              <img
                src={image.URL}
                alt={image.Caption || recall.Title}
                className="w-10 h-10 object-cover rounded border border-base-content/10 hover:opacity-80 transition-opacity"
              />
            </a>
          ))}
        </div>
      )}
    </td>
  </tr>
)

type PaginationBtnProps = {
  btnProps: {
    disabled: boolean
    onClick: React.MouseEventHandler<HTMLButtonElement>
  }
  type: 'Previous' | 'Next'
}

const PaginationBtn = ({ btnProps, type }: PaginationBtnProps) => (
  <button
    type="button"
    className="px-4 py-2 font-semibold text-sm border-2 border-base-300 text-primary rounded disabled:opacity-40 disabled:cursor-not-allowed hover:border-warning hover:cursor-pointer hover:bg-warning hover:text-white transition-colors"
    { ...btnProps }>
      {type}
  </button>
)