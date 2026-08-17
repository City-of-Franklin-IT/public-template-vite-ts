/**
 * HandleLoading Component
 *
 * Wrapper component to display loading state while data is being fetched.
 * Shows a spinner and hides children until loading is complete.
 */

import React from 'react'

interface HandleLoadingProps {
  isLoading: boolean
  children: React.ReactNode
  message?: string
}

export default function HandleLoading({
  isLoading,
  children,
  message = 'Loading...'
}: HandleLoadingProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-base-content/70">{message}</p>
      </div>
    )
  }

  return <>{children}</>
}
