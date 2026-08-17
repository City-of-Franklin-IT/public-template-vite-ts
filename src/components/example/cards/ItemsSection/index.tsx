/**
 * Example Items Section Component
 *
 * A presentational component that displays a grid of items.
 * This is a "dumb" component that receives data via props.
 *
 * Replace with your actual items display logic.
 */

import * as Components from './components'
import ItemCard from "@/components/example/cards/ItemCard"
import type * as AppTypes from "@/context/App/AppTypes"

interface ItemsSectionProps {
  items?: AppTypes.Item[]
  isLoading?: boolean
  error?: string | null
  title?: string
}

function ItemsSection({
  items,
  isLoading = false,
  error = null,
  title = "Latest Items"
}: ItemsSectionProps) {
  if (isLoading) return <Components.Loading />

  if (error) return <Components.Error message={error} />

  if (!items?.length) return null

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-primary">{title}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <ItemCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  )
}

export default ItemsSection
