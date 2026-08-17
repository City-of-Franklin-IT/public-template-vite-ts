import { BrowserRouter as Router, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from "react-toastify"
import { APP_BASE } from "./config"
import 'react-toastify/dist/ReactToastify.css'

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
        </Router>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
