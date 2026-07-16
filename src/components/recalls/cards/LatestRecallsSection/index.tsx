// Components
import * as Components from './components'
import RecallCard from "@/components/recalls/cards/RecallCard"

// Types
import type * as AppTypes from "@/context/App/AppTypes"

function LatestRecallsSection({ recalls, isLoading, isError }: { recalls: AppTypes.RecallInterface[] | undefined, isLoading: boolean, isError: boolean }) {
  if(isLoading) return (
    <Components.Loading />
  )

  if(isError) return (
    <Components.Error />
  )

  if(!recalls?.length) return null

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-primary">Latest Fire & Explosion Recalls</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recalls.map(recall =>
          <RecallCard
            key={recall.RecallID}
            recall={recall} />
        )}
      </div>
    </section>
  )
}

export default LatestRecallsSection
