/**
 * Example Item Card Component
 *
 * A reusable card component for displaying individual items.
 * This is a presentational component that receives item data via props.
 *
 * Customize the card layout and fields to match your data structure.
 */

import type * as AppTypes from "@/context/App/AppTypes"
import * as Components from './components'

interface ItemCardProps {
  item: AppTypes.Item
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
      <div className="card-body gap-3">
        {/* ID Badge */}
        {item.id && (
          <span className="badge badge-lg badge-primary w-fit">
            #{item.id}
          </span>
        )}

        {/* Title */}
        <h3 className="card-title text-lg">
          {item.title}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-base-content/70">
            {item.description}
          </p>
        )}

        {/* Metadata */}
        {(item.createdAt || item.updatedAt) && (
          <Components.Metadata item={item} />
        )}

        {/* Action Button */}
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-sm btn-primary">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
