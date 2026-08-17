/**
 * Login Page
 *
 * Display login UI and handle authentication flow for the parent application.
 * Users must authenticate here before accessing protected routes.
 */

import { useState } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/context/Auth/AuthContext'
import { APP_TITLE, APP_DESCRIPTION, ORG_NAME } from '@/config'

export default function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth()
  const [error, setError] = useState<string | null>(null)

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleLogin = async () => {
    try {
      setError(null)
      await login()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Login failed. Please try again.'
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card bg-white shadow-2xl">
          <div className="card-body space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {APP_TITLE}
              </h1>
              <p className="text-gray-600">
                {APP_DESCRIPTION}
              </p>
              <p className="text-sm text-gray-500">
                {ORG_NAME}
              </p>
            </div>

            {/* Info Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <p className="text-sm text-blue-900">
                <strong>Sign in with your {ORG_NAME} account</strong>
              </p>
              <p className="text-xs text-blue-700">
                You'll be authenticated through Azure Entra ID to securely access this application.
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="alert alert-error">
                <div className="flex gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="alert alert-info">
                <span className="loading loading-spinner loading-sm"></span>
                <span>Signing in...</span>
              </div>
            )}

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="btn btn-primary w-full btn-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Footer Info */}
            <div className="divider my-4"></div>
            <p className="text-xs text-center text-gray-500">
              By signing in, you agree to our terms and privacy policy
            </p>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Need help?</p>
          <p className="text-blue-600 hover:text-blue-800 cursor-pointer">
            Contact {ORG_NAME} IT Support
          </p>
        </div>
      </div>
    </div>
  )
}
