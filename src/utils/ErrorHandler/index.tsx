/**
 * ErrorHandler Component
 *
 * Component to display error messages with retry capability.
 * Used with React Query and other async operations.
 */

import React from 'react'

interface ErrorHandlerProps {
  error: Error | null | string
  onRetry?: () => void
  showDetails?: boolean
}

export default function ErrorHandler({
  error,
  onRetry,
  showDetails = false
}: ErrorHandlerProps) {
  if (!error) return null

  const message = typeof error === 'string' ? error : error.message
  const details = typeof error === 'string' ? null : error.stack

  return (
    <div className="alert alert-error shadow-lg">
      <div className="flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2"
          />
        </svg>
        <div>
          <h3 className="font-bold">Error</h3>
          <div className="text-sm">{message}</div>
          {showDetails && details && (
            <div className="text-xs mt-2 max-h-32 overflow-auto font-mono bg-base-100 p-2 rounded">
              {details}
            </div>
          )}
        </div>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-sm btn-outline">
          Retry
        </button>
      )}
    </div>
  )
}
