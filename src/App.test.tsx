import { fireEvent, render, screen } from "@testing-library/react"

import App from "./App"

describe("App", () => {
  it("shows the landing page by default", () => {
    render(<App />)

    expect(screen.getByRole("heading", { level: 1, name: /host a palworld dedicated server/i })).toBeInTheDocument()
  })

  it("switches to the Import & Edit page via the nav", () => {
    render(<App />)

    fireEvent.click(screen.getByRole("button", { name: "Import & Edit" }))

    expect(screen.getByLabelText(/import palworldsettings\.ini/i)).toBeInTheDocument()
  })

  it("carries the imported config over to the Export & Preview page", async () => {
    render(<App />)

    fireEvent.click(screen.getByRole("button", { name: "Import & Edit" }))

    const input = screen.getByLabelText(/import palworldsettings\.ini/i) as HTMLInputElement
    const file = new File(["[Section]\nKey=Value\n"], "PalWorldSettings.ini", { type: "text/plain" })
    Object.defineProperty(input, "files", { value: [file], configurable: true })
    fireEvent.change(input)

    await screen.findByLabelText("Key")

    fireEvent.click(screen.getByRole("button", { name: "Export & Preview" }))

    const region = screen.getByRole("region", { name: "Config preview" })
    expect(region).toHaveTextContent("[Section] Key=Value")
  })
})
