/**
 * Sub-components for ItemsSection
 *
 * Keep presentational logic separate from main component
 */

export const Loading = () => (
  <div className="text-center py-8">
    <div className="loading loading-spinner loading-lg"></div>
    <p className="mt-4 text-base-content/70">Loading items...</p>
  </div>
)

export const Error = ({ message = "Unable to load items. Please try again." }: { message?: string }) => (
  <div className="alert alert-error" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2m-2-2l-2-2" />
    </svg>
    <span>{message}</span>
  </div>
)

export const Empty = ({ message = "No items found." }: { message?: string }) => (
  <div className="text-center py-8">
    <p className="text-base-content/70">{message}</p>
  </div>
)
