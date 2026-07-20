import { render, screen } from "@testing-library/react"

import type { IIniDocument } from "@/lib/ini/ini.types"
import { ImportEditPage } from "./ImportEditPage"

describe("ImportEditPage", () => {
  it("renders the file import control and a hint when no config is loaded yet", () => {
    render(<ImportEditPage config={null} onImport={jest.fn()} onConfigChange={jest.fn()} />)

    expect(screen.getByLabelText(/import palworldsettings\.ini/i)).toBeInTheDocument()
    expect(screen.getByText(/import a palworldsettings\.ini file/i)).toBeInTheDocument()
  })

  it("renders the edit form once a config is present", () => {
    const config: IIniDocument = { Section: { MaxPlayers: 32 } }
    render(<ImportEditPage config={config} onImport={jest.fn()} onConfigChange={jest.fn()} />)

    expect(screen.getByLabelText("MaxPlayers")).toBeInTheDocument()
    expect(screen.queryByText(/import a palworldsettings\.ini file/i)).not.toBeInTheDocument()
  })
})
