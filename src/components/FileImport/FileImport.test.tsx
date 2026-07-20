import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import { FileImport } from "./FileImport"

function selectFile(input: HTMLInputElement, file: File) {
  Object.defineProperty(input, "files", { value: [file], configurable: true })
  fireEvent.change(input)
}

describe("FileImport", () => {
  it("has an accessible, labelled file input that accepts only .ini files", () => {
    render(<FileImport onImport={jest.fn()} />)

    const input = screen.getByLabelText(/import palworldsettings\.ini/i)
    expect(input).toHaveAttribute("type", "file")
    expect(input).toHaveAttribute("accept", ".ini")
  })

  it("parses a selected .ini file and calls onImport with the result", async () => {
    const handleImport = jest.fn()
    render(<FileImport onImport={handleImport} />)

    const input = screen.getByLabelText(/import palworldsettings\.ini/i) as HTMLInputElement
    const file = new File(["[Section]\nKey=Value\n"], "PalWorldSettings.ini", { type: "text/plain" })

    selectFile(input, file)

    await waitFor(() => expect(handleImport).toHaveBeenCalledTimes(1))
    expect(handleImport).toHaveBeenCalledWith({ document: { Section: { Key: "Value" } }, errors: [] })
  })

  it("surfaces parse errors through a role=alert region without throwing", async () => {
    const handleImport = jest.fn()
    render(<FileImport onImport={handleImport} />)

    const input = screen.getByLabelText(/import palworldsettings\.ini/i) as HTMLInputElement
    const file = new File(["[Section]\nnot-a-valid-line\n"], "broken.ini", { type: "text/plain" })

    selectFile(input, file)

    const alert = await screen.findByRole("alert")
    expect(alert).toHaveTextContent(/issue/i)
    expect(handleImport).toHaveBeenCalledTimes(1)
  })

  it("shows a read error via role=alert when the file cannot be read, and does not call onImport", async () => {
    const handleImport = jest.fn()
    render(<FileImport onImport={handleImport} />)

    const input = screen.getByLabelText(/import palworldsettings\.ini/i) as HTMLInputElement
    const file = new File(["irrelevant"], "bad.ini", { type: "text/plain" })

    const readAsTextSpy = jest.spyOn(FileReader.prototype, "readAsText").mockImplementation(function (this: FileReader) {
      // Simulate an async read failure, mirroring how FileReader reports errors.
      setTimeout(() => this.dispatchEvent(new Event("error")), 0)
    })

    selectFile(input, file)

    const alert = await screen.findByRole("alert")
    expect(alert).toHaveTextContent(/could not read/i)
    expect(handleImport).not.toHaveBeenCalled()

    readAsTextSpy.mockRestore()
  })
})
