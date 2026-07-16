import { BrowserRouter as Router, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { APP_BASE } from "./config"

// Components
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={APP_BASE}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </Router>
    </QueryClientProvider>
  )
}

export default App
