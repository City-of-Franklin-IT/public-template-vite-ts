import { CPSC_BASE_URL } from "@/config"

// Types
import * as AppTypes from '@/context/App/AppTypes'

/**
* Search recalls
*
* GET /RestWebServices/Recall
**/
export const searchRecalls = async (params: AppTypes.RecallSearchParamsInterface): Promise<AppTypes.RecallInterface[]> => {
  const query = new URLSearchParams({ format: 'json' })

  Object.entries(params).forEach(([key, value]) => {
    if(value) query.set(key, value)
  })

  const res = await fetch(`${ CPSC_BASE_URL }?${ query.toString() }`)

  if(!res.ok) throw new Error(res.statusText)

  const data = await res.json()

  if(!Array.isArray(data)) return []

  if(data.length === 1 && data[0].RecallID === 0) throw new Error(data[0].Title || 'CPSC recall provider error')

  return data.filter(recall => recall.RecallID)
}