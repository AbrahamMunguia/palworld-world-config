import { fireEvent, render, screen } from "@testing-library/react"

import { ToggleSwitch } from "./ToggleSwitch"

describe("ToggleSwitch", () => {
  it("renders a labelled switch reflecting the current checked state", () => {
    render(<ToggleSwitch label="bIsPvP" checked={true} onChange={jest.fn()} />)

    const toggle = screen.getByRole("switch", { name: "bIsPvP" })
    expect(toggle).toHaveAttribute("aria-checked", "true")
  })

  it("calls onChange with the flipped boolean when toggled", () => {
    const handleChange = jest.fn()
    render(<ToggleSwitch label="bIsPvP" checked={false} onChange={handleChange} />)

    fireEvent.click(screen.getByRole("switch", { name: "bIsPvP" }))

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange.mock.calls[0][0]).toBe(true)
  })
})
