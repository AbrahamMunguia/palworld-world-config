import { render, screen } from "@testing-library/react"

import type { IIniDocument } from "@/lib/ini/ini.types"
import { ExportPreviewPage } from "./ExportPreviewPage"

describe("ExportPreviewPage", () => {
  it("shows a hint instead of a preview when no config is loaded yet", () => {
    render(<ExportPreviewPage config={null} />)

    expect(screen.getByText(/import and edit a config/i)).toBeInTheDocument()
    expect(screen.queryByRole("region", { name: "Config preview" })).not.toBeInTheDocument()
  })

  it("renders a live serialized preview and the download button once a config is loaded", () => {
    const config: IIniDocument = { Section: { Key: "Value" } }
    render(<ExportPreviewPage config={config} />)

    const region = screen.getByRole("region", { name: "Config preview" })
    expect(region).toHaveTextContent("[Section] Key=Value")
    expect(screen.getByRole("button", { name: /PalWorldSettings\.ini/i })).toBeInTheDocument()
  })
})
