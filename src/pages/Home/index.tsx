// Components
import ErrorBoundary from "@/utils/ErrorBoundary"
import RecallsContainer from "@/components/recalls/containers/RecallsContainer"

function Home() {

  return (
    <ErrorBoundary>
      <RecallsContainer />
    </ErrorBoundary>
  )
}

export default Home
