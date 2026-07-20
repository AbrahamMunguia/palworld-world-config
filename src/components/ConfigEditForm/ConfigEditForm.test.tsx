import { fireEvent, render, screen } from "@testing-library/react"

import type { IIniDocument } from "@/lib/ini/ini.types"
import { ConfigEditForm } from "./ConfigEditForm"

function buildDocument(): IIniDocument {
  return {
    "/Script/Engine.GameSession": {
      MaxPlayers: 32,
    },
    "/Script/Pal.PalGameWorldSettings": {
      OptionSettings: {
        Difficulty: "None",
        ExpRate: 1.5,
        bIsPvP: false,
        Admins: ["alice", "bob"],
      },
    },
  }
}

describe("ConfigEditForm", () => {
  it("renders a section per top-level key and a control per field, typed by runtime value", () => {
    render(<ConfigEditForm document={buildDocument()} onChange={jest.fn()} />)

    expect(screen.getByRole("group", { name: "/Script/Engine.GameSession" })).toBeInTheDocument()
    expect(screen.getByRole("group", { name: "/Script/Pal.PalGameWorldSettings" })).toBeInTheDocument()
    // Nested struct renders as its own labelled group.
    expect(screen.getByRole("group", { name: "OptionSettings" })).toBeInTheDocument()

    expect((screen.getByLabelText("MaxPlayers") as HTMLInputElement).value).toBe("32")
    expect((screen.getByLabelText("Difficulty") as HTMLInputElement).value).toBe("None")
    expect((screen.getByLabelText("ExpRate") as HTMLInputElement).value).toBe("1.5")
    expect(screen.getByRole("switch", { name: "bIsPvP" })).toHaveAttribute("aria-checked", "false")
  })

  it("renders one control per array item, labelled positionally", () => {
    render(<ConfigEditForm document={buildDocument()} onChange={jest.fn()} />)

    expect((screen.getByLabelText("Admins #1") as HTMLInputElement).value).toBe("alice")
    expect((screen.getByLabelText("Admins #2") as HTMLInputElement).value).toBe("bob")
  })

  it("immutably updates a top-level scalar field without touching other sections", () => {
    const document = buildDocument()
    const handleChange = jest.fn()
    render(<ConfigEditForm document={document} onChange={handleChange} />)

    fireEvent.change(screen.getByLabelText("MaxPlayers"), { target: { value: "16" } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    const next = handleChange.mock.calls[0][0] as IIniDocument
    expect(next["/Script/Engine.GameSession"].MaxPlayers).toBe(16)
    // Untouched section is passed through unchanged, original document is not mutated.
    expect(next["/Script/Pal.PalGameWorldSettings"]).toBe(document["/Script/Pal.PalGameWorldSettings"])
    expect(document["/Script/Engine.GameSession"].MaxPlayers).toBe(32)
  })

  it("immutably updates a deeply nested struct field, preserving its siblings", () => {
    const document = buildDocument()
    const handleChange = jest.fn()
    render(<ConfigEditForm document={document} onChange={handleChange} />)

    fireEvent.change(screen.getByLabelText("ExpRate"), { target: { value: "3" } })

    const next = handleChange.mock.calls[0][0] as IIniDocument
    const nextOptions = next["/Script/Pal.PalGameWorldSettings"].OptionSettings as Record<string, unknown>
    expect(nextOptions.ExpRate).toBe(3)
    expect(nextOptions.Difficulty).toBe("None")
    expect(nextOptions.bIsPvP).toBe(false)
  })

  it("updates only the edited array item, leaving the rest of the array intact", () => {
    const document = buildDocument()
    const handleChange = jest.fn()
    render(<ConfigEditForm document={document} onChange={handleChange} />)

    fireEvent.change(screen.getByLabelText("Admins #2"), { target: { value: "carol" } })

    const next = handleChange.mock.calls[0][0] as IIniDocument
    const nextOptions = next["/Script/Pal.PalGameWorldSettings"].OptionSettings as Record<string, unknown>
    expect(nextOptions.Admins).toEqual(["alice", "carol"])
  })
})
