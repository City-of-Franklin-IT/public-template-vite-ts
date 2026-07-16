import { useState, useEffect } from "react"

export const useGetWindowSize = (): boolean => { // Get window size
  const [state, setState] = useState<{ width: number }>({ width: window.innerWidth })

  useEffect(() => {
    const handleResize = () => setState({ width: window.innerWidth })

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return state.width < 1025
}

export const useDebounce = <T>(value: T, delay: number): T => { // Debouncer
  const [state, setState] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setState(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return state
}
