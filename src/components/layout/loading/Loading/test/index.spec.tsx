import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Loading from "../index"

describe("Loading", () => {
  it("renders an img with alt text \"loading icon\"", () => {
    render(<Loading />)
    expect(screen.getByAltText("loading icon")).toBeDefined()
  })

  it("applies animate-pulse class to the icon", () => {
    render(<Loading />)
    const img = screen.getByAltText("loading icon")
    expect(img.className).toContain("animate-pulse")
  })

  it("renders a fixed position container", () => {
    const { container } = render(<Loading />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain("fixed")
    expect(wrapper.className).toContain("inset-0")
  })

  it("applies pointer-events-none to prevent blocking interaction", () => {
    render(<Loading />)
    const img = screen.getByAltText("loading icon")
    expect(img.className).toContain("pointer-events-none")
  })
})
