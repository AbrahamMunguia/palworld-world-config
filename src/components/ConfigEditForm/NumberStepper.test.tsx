import { fireEvent, render, screen } from "@testing-library/react"

import { NumberStepper } from "./NumberStepper"

describe("NumberStepper", () => {
  it("renders a labelled numeric input showing the current value", () => {
    render(<NumberStepper label="ExpRate" value={1.5} onChange={jest.fn()} />)

    const input = screen.getByLabelText("ExpRate") as HTMLInputElement
    expect(input).toHaveAttribute("type", "number")
    expect(input.value).toBe("1.5")
  })

  it("calls onChange with the parsed number when edited", () => {
    const handleChange = jest.fn()
    render(<NumberStepper label="ExpRate" value={1} onChange={handleChange} />)

    const input = screen.getByLabelText("ExpRate")
    fireEvent.change(input, { target: { value: "2.5" } })

    expect(handleChange).toHaveBeenCalledWith(2.5)
  })

  it("does not call onChange while the field is left in a non-numeric state", () => {
    const handleChange = jest.fn()
    render(<NumberStepper label="ExpRate" value={1} onChange={handleChange} />)

    const input = screen.getByLabelText("ExpRate")
    fireEvent.change(input, { target: { value: "" } })

    expect(handleChange).not.toHaveBeenCalled()
  })
})
