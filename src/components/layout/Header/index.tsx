/**
 * Header Component
 *
 * Main header for the application.
 */

import cofIcon from "@/assets/icons/cof/cof.png"
import { APP_TITLE, APP_DESCRIPTION } from "@/config"

function Header() {
  
  return (
    <header className="w-full bg-primary text-center px-6 py-7">
      <img
        src={cofIcon}
        alt="COF logo"
        className="w-28 h-28 object-contain mx-auto mb-2.5" />
      <h1 className="text-2xl font-bold text-primary-content tracking-wide mx-auto max-w-2xl md:text-3xl">{APP_TITLE}</h1>
      <p className="mt-1.5 text-primary-content/80">{APP_DESCRIPTION}</p>
      <p className="mt-2 text-primary-content/70 text-sm">City of Franklin</p>
      <hr className="w-12 h-0.5 mt-3.5 mx-auto rounded-full border-0 bg-primary-content/80" />
    </header>
  )
}

export default Header
