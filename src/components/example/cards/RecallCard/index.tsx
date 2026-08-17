import { formatRecallDate } from "@/utils/recalls"

// Types
import type * as AppTypes from "@/context/App/AppTypes"

// Components
import * as Components from './components'

function RecallCard({ recall }: { recall: AppTypes.RecallInterface }) {
  return (
    <div className="flex flex-col gap-2 p-5 rounded-2xl bg-base-100 shadow-lg hover:-translate-y-0.5 transition-all">
      <a href={recall.URL} target="_blank" rel="noreferrer" className="flex flex-col gap-2">
        <span className="text-[11px] w-fit uppercase tracking-wide text-error font-semibold px-2.5 py-1 rounded-full bg-error/10">Recall #{recall.RecallNumber}</span>
        <h3 className="text-lg font-bold text-primary">{recall.Title}</h3>
        <p className="text-sm text-base-content/60">{formatRecallDate(recall.LastPublishDate)}</p>
      </a>
      <Components.Images
        visible={recall.Images.length > 0}
        images={recall.Images}
        title={recall.Title} />
    </div>
  )
}

export default RecallCard
