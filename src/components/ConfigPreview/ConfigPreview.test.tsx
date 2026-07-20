import { render, screen } from "@testing-library/react"

import { ConfigPreview } from "./ConfigPreview"

describe("ConfigPreview", () => {
  it("renders the given text read-only inside a labelled region", () => {
    const text = "[Section]\nKey=Value\n"
    render(<ConfigPreview text={text} />)

    const region = screen.getByRole("region", { name: "Config preview" })
    expect(region).toHaveTextContent("[Section] Key=Value")
    // No form control is rendered for the preview text — it's not editable here.
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
  })
})
