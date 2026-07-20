import fs from "node:fs"
import path from "node:path"

import { parseIni } from "./parseIni"

const FIXTURE_PATH = path.join(__dirname, "__fixtures__", "PalWorldSettings.sample.ini")

function readFixture(): string {
  return fs.readFileSync(FIXTURE_PATH, "utf-8")
}

describe("parseIni", () => {
  it("parses section headers and simple key=value pairs", () => {
    const { document, errors } = parseIni("[/Script/Engine.GameSession]\nMaxPlayers=32\n")

    expect(errors).toEqual([])
    expect(document).toEqual({
      "/Script/Engine.GameSession": { MaxPlayers: 32 },
    })
  })

  it("ignores blank lines and both ; and # comment styles", () => {
    const { document, errors } = parseIni(
      ["; leading comment", "# another comment style", "[Section]", "", "; a comment inside the section", "Key=Value"].join(
        "\n"
      )
    )

    expect(errors).toEqual([])
    expect(document).toEqual({ Section: { Key: "Value" } })
  })

  it("parses a Palworld struct value into a nested object with typed members", () => {
    const { document, errors } = parseIni(
      '[/Script/Pal.PalGameWorldSettings]\nOptionSettings=(Difficulty=None,DayTimeSpeedRate=1.000000,bIsMultiplay=False,ServerName="My Server")\n'
    )

    expect(errors).toEqual([])
    expect(document["/Script/Pal.PalGameWorldSettings"].OptionSettings).toEqual({
      Difficulty: "None",
      DayTimeSpeedRate: 1,
      bIsMultiplay: false,
      ServerName: "My Server",
    })
  })

  it("parses a struct with no key=value members as a plain array", () => {
    const { document, errors } = parseIni("[Section]\nList=(1,2,3)\n")

    expect(errors).toEqual([])
    expect(document.Section.List).toEqual([1, 2, 3])
  })

  it("parses the sample PalWorldSettings.ini fixture without errors", () => {
    const { document, errors } = parseIni(readFixture())

    expect(errors).toEqual([])

    const options = document["/Script/Pal.PalGameWorldSettings"].OptionSettings
    expect(options).toMatchObject({
      Difficulty: "None",
      DayTimeSpeedRate: 1,
      bIsMultiplay: false,
      ServerName: "Default Palworld Server",
      ServerDescription: "",
      PublicPort: 8211,
    })
    expect(document["/Script/Engine.GameSession"]).toEqual({ MaxPlayers: 32 })
  })

  it("collects repeated keys within a section into an array", () => {
    const { document, errors } = parseIni("[Section]\nTag=One\nTag=Two\nTag=Three\n")

    expect(errors).toEqual([])
    expect(document.Section.Tag).toEqual(["One", "Two", "Three"])
  })

  it("reports malformed lines without throwing, and keeps parsing the rest", () => {
    const { document, errors } = parseIni(["[Section]", "not-a-key-value-line", "Key=Value"].join("\n"))

    expect(document).toEqual({ Section: { Key: "Value" } })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toMatch(/Line 2/)
  })

  it("reports key=value pairs found before any section header", () => {
    const { document, errors } = parseIni("Key=Value\n[Section]\nOther=1\n")

    expect(document).toEqual({ Section: { Other: 1 } })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toMatch(/outside of any section/)
  })

  it("returns an empty document with no errors for empty input", () => {
    const { document, errors } = parseIni("")

    expect(document).toEqual({})
    expect(errors).toEqual([])
  })
})
