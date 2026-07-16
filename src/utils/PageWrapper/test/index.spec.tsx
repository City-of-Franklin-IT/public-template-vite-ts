import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import PageWrapper from "../index"

vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
}))

describe("PageWrapper", () => {
  it("renders its children", () => {
    render(<PageWrapper><div>page content</div></PageWrapper>)
    expect(screen.getByText("page content")).toBeDefined()
  })

  it("renders multiple children", () => {
    render(
      <PageWrapper>
        <span>first</span>
        <span>second</span>
      </PageWrapper>
    )
    expect(screen.getByText("first")).toBeDefined()
    expect(screen.getByText("second")).toBeDefined()
  })

  it("renders without crashing when given an empty fragment", () => {
    expect(() => render(<PageWrapper><></></PageWrapper>)).not.toThrow()
  })
})
