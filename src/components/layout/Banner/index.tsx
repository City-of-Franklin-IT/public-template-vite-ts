/**
 * Banner Component
 *
 * Main header/banner for the application.
 * For parent template: includes user menu with logout functionality.
 * Customize with your organization's branding, title, and subtitle.
 */

import { APP_TITLE, APP_DESCRIPTION, ORG_NAME } from "@/config"
import { useAuth } from "@/context/Auth/AuthContext"

function Banner() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="w-full bg-primary text-primary-content">
      {/* Main Header */}
      <div className="px-6 py-7 text-center flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          {/* Organization Logo - Replace with your logo */}
          {/*
          <img
            src={yourLogo}
            alt="Organization logo"
            className="w-28 h-28 object-contain mx-auto mb-2.5"
          />
          */}

          <h1 className="text-2xl font-bold tracking-wide mx-auto max-w-2xl md:text-3xl">
            {APP_TITLE}
          </h1>

          <p className="mt-1.5 opacity-80">
            {APP_DESCRIPTION}
          </p>

          {ORG_NAME && (
            <>
              <p className="mt-2 opacity-70 text-sm">
                {ORG_NAME}
              </p>
              <hr className="w-12 h-0.5 mt-3.5 mx-auto rounded-full border-0 bg-primary-content/80" />
            </>
          )}
        </div>

        {/* User Menu */}
        {user && (
          <div className="mt-4 md:mt-0 md:ml-6 flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">
                {user.name || 'User'}
              </p>
              <p className="text-xs opacity-70">
                {user.email}
              </p>
            </div>

            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-sm gap-2"
              >
                <span className="text-lg">👤</span>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
              >
                <li>
                  <button onClick={handleLogout}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Banner
