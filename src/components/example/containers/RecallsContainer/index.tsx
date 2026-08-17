import { useHandleRecallsContainer } from "./hooks"

// Components
import LatestRecallsSection from "@/components/recalls/cards/LatestRecallsSection"
import RecallsTable from "@/components/recalls/tables/RecallsTable"

function RecallsContainer() {
  const { latestRecallsProps, recallsProps } = useHandleRecallsContainer()

  return (
    <div className="flex flex-col gap-10 py-10">
      <LatestRecallsSection { ...latestRecallsProps } />
      <RecallsTable { ...recallsProps } />
    </div>
  )
}

export default RecallsContainer
