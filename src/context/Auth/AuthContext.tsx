/**
 * Authentication Context
 *
 * Provides authentication state and methods throughout the application.
 * Wraps the MSAL MsalProvider to offer simplified auth methods.
 */

import { createContext, useContext, ReactNode } from 'react'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'

export interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: {
    name?: string
    email?: string
  } | null
  login: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Auth Context Provider Component
 *
 * Wraps children with authentication context, providing easy access to auth state.
 * Must be inside MsalProvider.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const isAuthenticated = useIsAuthenticated()
  const { user, inProgress, accounts, instance } = useMsal()

  const isLoading = inProgress !== 'none'

  const login = async () => {
    try {
      await instance.loginPopup({
        scopes: ['openid', 'profile', 'email'],
      })
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await instance.logoutPopup()
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user: isAuthenticated
      ? {
          name: accounts[0]?.name,
          email: accounts[0]?.username,
        }
      : null,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to use authentication context
 * Must be used within AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
