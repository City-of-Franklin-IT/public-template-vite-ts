import { MsalProvider } from "@azure/msal-react"
import { BrowserRouter as Router, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { APP_BASE } from "./config"
import { msalInstance } from "./config/msal"

// Components
import Layout from "./components/layout/Layout"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import LoginPage from "./pages/Login"
import Home from "./pages/Home"

// Context
import { AuthProvider } from "./context/Auth/AuthContext"

const queryClient = new QueryClient()

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router basename={APP_BASE}>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
          </Router>
        </QueryClientProvider>
      </AuthProvider>
    </MsalProvider>
  )
}

export default App
