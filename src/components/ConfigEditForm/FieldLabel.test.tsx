import { fireEvent, render, screen } from "@testing-library/react"

import { FieldLabel } from "./FieldLabel"

describe("FieldLabel", () => {
  it("reveals the setting's description in a tooltip when the label is focused", async () => {
    render(<FieldLabel label="ExpRate" htmlFor="exp-rate-input" />)

    expect(
      screen.queryByText("Multiplier applied to experience points gained.")
    ).not.toBeInTheDocument()

    fireEvent.focus(screen.getByText("ExpRate"))

    expect(
      await screen.findByText("Multiplier applied to experience points gained.")
    ).toBeInTheDocument()
  })

  it("falls back to a plain label with a native title for keys with no known description", () => {
    render(<FieldLabel label="SomeUnknownFutureKey" htmlFor="unknown-input" />)

    const label = screen.getByText("SomeUnknownFutureKey")
    expect(label).toHaveAttribute("title", "SomeUnknownFutureKey")
    expect(label.tagName).toBe("LABEL")
  })
})
