import { fireEvent, render, screen } from "@testing-library/react"

import type { IIniDocument } from "@/lib/ini/ini.types"
import { ExportDownload } from "./ExportDownload"

describe("ExportDownload", () => {
  const data: IIniDocument = { Section: { Key: "Value" } }

  beforeEach(() => {
    URL.createObjectURL = jest.fn().mockReturnValue("blob:mock-url")
    URL.revokeObjectURL = jest.fn()
  })

  it("renders a real button labelled with the file name", () => {
    render(<ExportDownload data={data} fileName="PalWorldSettings.ini" />)

    const button = screen.getByRole("button", { name: /PalWorldSettings\.ini/i })
    expect(button.tagName).toBe("BUTTON")
  })

  it("serializes the document, creates a Blob URL, and triggers a download on click", () => {
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {})

    render(<ExportDownload data={data} fileName="PalWorldSettings.ini" />)
    fireEvent.click(screen.getByRole("button", { name: /PalWorldSettings\.ini/i }))

    expect(URL.createObjectURL).toHaveBeenCalledTimes(1)
    const blobArg = (URL.createObjectURL as jest.Mock).mock.calls[0][0] as Blob
    expect(blobArg).toBeInstanceOf(Blob)

    expect(clickSpy).toHaveBeenCalledTimes(1)
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock-url")

    clickSpy.mockRestore()
  })
})
