import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import ErrorBoundary from "../index"

const mockNavigate = vi.fn()

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router")
  return { ...actual, useNavigate: () => mockNavigate }
})

function ThrowingComponent(): never {
  throw new Error("Test render error")
}

describe("ErrorBoundary", () => {
  it("renders children when no error occurs", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary><div>safe content</div></ErrorBoundary>
      </MemoryRouter>
    )
    expect(screen.getByText("safe content")).toBeDefined()
  })

  it("renders null (no visible output) when a child throws", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    const { container } = render(
      <MemoryRouter>
        <ErrorBoundary><ThrowingComponent /></ErrorBoundary>
      </MemoryRouter>
    )
    expect(container.firstChild).toBeNull()
    consoleSpy.mockRestore()
  })

  it("calls navigate to APP_BASE after 50ms when a child throws", () => {
    vi.useFakeTimers()
    mockNavigate.mockReset()
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})

    render(
      <MemoryRouter>
        <ErrorBoundary><ThrowingComponent /></ErrorBoundary>
      </MemoryRouter>
    )
    vi.advanceTimersByTime(50)
    expect(mockNavigate).toHaveBeenCalledWith("/recalls")

    consoleSpy.mockRestore()
    vi.useRealTimers()
  })
})
