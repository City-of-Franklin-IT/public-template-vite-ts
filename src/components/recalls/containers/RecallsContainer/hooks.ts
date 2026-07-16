import { useQuery } from "@tanstack/react-query"
import * as AppActions from "@/context/App/AppActions"
import { filterFireOrExplosionRecalls, sortByRecallDateDesc } from "@/utils/recalls"
import { daysAgo } from "./utils"

export const useHandleRecallsContainer = () => {
  const recalls = useGetLatestRecalls()
  const latestRecalls = useGetLatestRecalls()

  const recallsProps = {
    recalls: recalls.data ?? [],
    isLoading: recalls.isLoading,
    isError: recalls.isError
  }

  const latestRecallsProps = {
    recalls: latestRecalls.data,
    isLoading: latestRecalls.isLoading,
    isError: latestRecalls.isError
  }

  return { recallsProps, latestRecallsProps }
}

const useGetRecalls = () => {
  return useQuery({
    queryKey: ['getRecalls'],
    queryFn: async () => {
      const recalls = await AppActions.searchRecalls({ RecallDateStart: daysAgo(729) })

      return sortByRecallDateDesc(filterFireOrExplosionRecalls(recalls))
    },
    staleTime: 1000 * 60 * 5
  })
}

const useGetLatestRecalls = () => {
  const { data, isLoading, isError } = useGetRecalls()

  const cutoff = new Date(daysAgo(30)).getTime()

  return {
    data: data?.filter(recall => new Date(recall.RecallDate).getTime() >= cutoff).slice(0, 6),
    isLoading,
    isError
  }
}
