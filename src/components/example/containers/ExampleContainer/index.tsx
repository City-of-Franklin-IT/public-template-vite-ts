/**
 * Example Container Component
 *
 * This is an example "smart" component that manages data fetching and state.
 * Container components are responsible for:
 * - Fetching/managing data
 * - Handling business logic
 * - Lifting state for child components
 *
 * Replace this with your actual container logic.
 */

import { useState } from 'react'
import ItemsSection from "@/components/example/cards/ItemsSection"
import ItemsTable from "@/components/example/tables/ItemsTable"

function ExampleContainer() {
  // Example state - replace with your actual state management
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Example: You would typically use TanStack Query here
  // const { data: items, isLoading, error } = useQuery({
  //   queryKey: ['items'],
  //   queryFn: AppActions.getItems,
  // })

  return (
    <div className="flex flex-col gap-10 py-10 px-4 max-w-6xl mx-auto">
      {/* Section 1: Items Grid/Cards */}
      <ItemsSection
        items={items}
        isLoading={isLoading}
        error={error}
      />

      {/* Section 2: Items Table */}
      <ItemsTable
        items={items}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}

export default ExampleContainer
