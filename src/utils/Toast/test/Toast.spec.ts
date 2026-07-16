import { describe, it, expect, vi, beforeEach } from "vitest"
import { savedPopup, errorPopup, infoPopup } from "../Toast"
import { toast } from "react-toastify"

vi.mock("react-toastify", () => ({
  toast: vi.fn(),
}))

const toastOptions = {
  closeButton: false,
  autoClose: 5000,
  position: "bottom-center",
  theme: "transparent",
  closeOnClick: true,
}

describe("savedPopup", () => {
  beforeEach(() => vi.mocked(toast).mockReset())

  it("calls toast once", () => {
    savedPopup("Saved!")
    expect(toast).toHaveBeenCalledTimes(1)
  })

  it("passes the correct toast options", () => {
    savedPopup("Saved!")
    expect(toast).toHaveBeenCalledWith(expect.anything(), expect.objectContaining(toastOptions))
  })

  it("still calls toast when no message is provided", () => {
    savedPopup(undefined)
    expect(toast).toHaveBeenCalledTimes(1)
  })
})

describe("errorPopup", () => {
  beforeEach(() => vi.mocked(toast).mockReset())

  it("calls toast once", () => {
    errorPopup("Something failed")
    expect(toast).toHaveBeenCalledTimes(1)
  })

  it("passes the correct toast options", () => {
    errorPopup("Something failed")
    expect(toast).toHaveBeenCalledWith(expect.anything(), expect.objectContaining(toastOptions))
  })

  it("still calls toast when no message is provided", () => {
    errorPopup()
    expect(toast).toHaveBeenCalledTimes(1)
  })
})

describe("infoPopup", () => {
  beforeEach(() => vi.mocked(toast).mockReset())

  it("calls toast once", () => {
    infoPopup("Some information")
    expect(toast).toHaveBeenCalledTimes(1)
  })

  it("passes the correct toast options", () => {
    infoPopup("Some information")
    expect(toast).toHaveBeenCalledWith(expect.anything(), expect.objectContaining(toastOptions))
  })
})
