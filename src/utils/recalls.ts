import * as AppTypes from "@/context/App/AppTypes"

const FIRE_EXPLOSION_TERMS = ["fire", "explosion", "explode", "flammab", "ignit", "burn hazard"]

export const isFireOrExplosionHazard = (recall: AppTypes.RecallInterface): boolean => {
  const haystack = [
    recall.Title,
    ...recall.Hazards.map(hazard => hazard.Name)
  ].join(' ').toLowerCase()

  return FIRE_EXPLOSION_TERMS.some(term => haystack.includes(term))
}

export const filterFireOrExplosionRecalls = (recalls: AppTypes.RecallInterface[]): AppTypes.RecallInterface[] => {
  return recalls.filter(isFireOrExplosionHazard)
}

export const sortByRecallDateDesc = (recalls: AppTypes.RecallInterface[]): AppTypes.RecallInterface[] => {
  return [...recalls].sort((a, b) => new Date(b.RecallDate).getTime() - new Date(a.RecallDate).getTime())
}

export const formatRecallDate = (date: string): string => {
  if(!date) return ''

  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
