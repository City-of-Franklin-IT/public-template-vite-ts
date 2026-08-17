/**
 * Sub-components for ItemCard
 *
 * Keep sub-component logic separate for reusability
 */

import type * as AppTypes from '@/context/App/AppTypes'
import { formatDate } from '@/components/example/containers/ExampleContainer/utils'

/**
 * Display metadata (created/updated dates)
 */
export const Metadata = ({ item }: { item: AppTypes.Item }) => (
  <div className="divider my-1" />
  <div className="text-xs text-base-content/50 space-y-1">
    {item.createdAt && (
      <p>Created: {formatDate(item.createdAt)}</p>
    )}
    {item.updatedAt && (
      <p>Updated: {formatDate(item.updatedAt)}</p>
    )}
  </div>
)

/**
 * Display tags/badges for item categories or status
 */
export const Tags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map(tag => (
      <span key={tag} className="badge badge-sm badge-outline">
        {tag}
      </span>
    ))}
  </div>
)

/**
 * Display rating or score
 */
export const Rating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
    <div className="rating rating-sm">
      {[...Array(5)].map((_, i) => (
        <input
          key={i}
          type="radio"
          name={`rating-${Math.random()}`}
          className="mask mask-star-2 bg-warning"
          disabled
          checked={i < Math.round(rating)}
          readOnly
        />
      ))}
    </div>
  </div>
)
