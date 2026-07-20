import fs from "node:fs"
import path from "node:path"

import { parseIni } from "./parseIni"
import { serializeIni } from "./serializeIni"

const FIXTURE_PATH = path.join(__dirname, "__fixtures__", "PalWorldSettings.sample.ini")

describe("serializeIni", () => {
  it("serializes simple key=value pairs under a section header", () => {
    const text = serializeIni({ Section: { Key: "Value", Count: 3 } })

    expect(text).toBe("[Section]\nKey=Value\nCount=3\n")
  })

  it("serializes booleans as True/False", () => {
    const text = serializeIni({ Section: { Flag: true, OtherFlag: false } })

    expect(text).toContain("Flag=True")
    expect(text).toContain("OtherFlag=False")
  })

  it("re-flattens a nested object into a (key=value,...) struct", () => {
    const text = serializeIni({
      "/Script/Pal.PalGameWorldSettings": {
        OptionSettings: { Difficulty: "None", DayTimeSpeedRate: 1, bIsMultiplay: false },
      },
    })

    expect(text).toContain("OptionSettings=(Difficulty=None,DayTimeSpeedRate=1,bIsMultiplay=False)")
  })

  it("quotes strings only when needed to stay unambiguous", () => {
    const text = serializeIni({ Section: { Name: "Has, a comma", Plain: "None", Empty: "" } })

    expect(text).toContain('Name="Has, a comma"')
    expect(text).toContain("Plain=None")
    expect(text).toContain("Empty=")
  })

  it("re-expands a repeated-key array into multiple key=value lines", () => {
    const text = serializeIni({ Section: { Tag: ["One", "Two"] } })

    expect(text).toBe("[Section]\nTag=One\nTag=Two\n")
  })

  it("round-trips the sample PalWorldSettings.ini fixture through parse -> serialize -> parse", () => {
    const original = fs.readFileSync(FIXTURE_PATH, "utf-8")

    const first = parseIni(original)
    expect(first.errors).toEqual([])

    const serialized = serializeIni(first.document)
    const second = parseIni(serialized)

    expect(second.errors).toEqual([])
    expect(second.document).toEqual(first.document)
  })
})
