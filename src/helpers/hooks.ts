/**
 * Custom Hooks
 *
 * Centralized location for reusable custom hooks used throughout the application.
 * Add your custom hooks here and import them in components.
 */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "@/context/Auth/AuthContext"

/**
 * useGetToken - Get the current authentication token
 */
export const useGetToken = () => {
  const { token } = useAuth()
  return token
}

/**
 * useActiveAccount - Get current authentication status and user email
 */
export const useActiveAccount = () => {
  const { user, isAuthenticated } = useAuth()
  return {
    authenticated: isAuthenticated,
    email: user?.email
  }
}

/**
 * useEnableQuery - Ensure user is authenticated before enabling queries
 * Useful for protecting data fetching that requires authentication
 */
export const useEnableQuery = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, isLoading, navigate])

  return { enabled: isAuthenticated && !isLoading }
}

/**
 * useWindowSize - Track window dimensions
 * Useful for responsive behavior and media queries
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

/**
 * useIsMobile - Check if viewport is mobile size
 */
export const useIsMobile = () => {
  const { width } = useWindowSize()
  return width < 768 // Tailwind md breakpoint
}
