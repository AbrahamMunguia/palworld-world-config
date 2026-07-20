import type { IIniDocument, IIniParseResult, IIniSection, TIniValue } from "./ini.types"

const SECTION_HEADER_PATTERN = /^\[(.+)\]$/
const NUMBER_PATTERN = /^-?\d+(\.\d+)?$/

/**
 * Splits a comma-separated list at the top nesting level only, ignoring
 * commas that appear inside double-quoted strings or nested parentheses.
 * Used to break a Palworld struct body (`a=1,b=2,c=(x=1)`) into its
 * individual members without mangling nested structs or quoted strings
 * that happen to contain a comma.
 */
function splitTopLevel(input: string): string[] {
  const parts: string[] = []
  let depth = 0
  let inQuotes = false
  let current = ""

  for (const char of input) {
    if (char === '"') {
      inQuotes = !inQuotes
      current += char
      continue
    }

    if (!inQuotes) {
      if (char === "(") {
        depth += 1
      } else if (char === ")") {
        depth -= 1
      } else if (char === "," && depth === 0) {
        parts.push(current)
        current = ""
        continue
      }
    }

    current += char
  }

  if (current.length > 0 || parts.length > 0) {
    parts.push(current)
  }

  return parts.filter((part) => part.trim().length > 0)
}

/**
 * Parses the inside of a `(...)` struct. If every member is a `key=value`
 * pair, returns a nested object (Palworld's dominant shape, e.g.
 * `OptionSettings=(Difficulty=None,...)`); otherwise treats the members as
 * a plain list and returns an array.
 */
function parseStructBody(body: string): TIniValue {
  const members = splitTopLevel(body)

  if (members.length === 0) {
    return {}
  }

  const isObjectShaped = members.every((member) => member.includes("="))

  if (!isObjectShaped) {
    return members.map((member) => parseValue(member))
  }

  const struct: IIniSection = {}
  for (const member of members) {
    const separatorIndex = member.indexOf("=")
    const key = member.slice(0, separatorIndex).trim()
    const valueRaw = member.slice(separatorIndex + 1)
    struct[key] = parseValue(valueRaw)
  }

  return struct
}

/**
 * Parses a single scalar-or-struct value (the right-hand side of a
 * `key=` pair). Recognizes Palworld's `(a=1,b=2)` struct shape, quoted
 * strings, booleans (`True`/`False`), and numbers, falling back to a raw
 * string for bareword enum-like values (e.g. `Difficulty=None`).
 */
function parseValue(raw: string): TIniValue {
  const trimmed = raw.trim()

  if (trimmed.startsWith("(") && trimmed.endsWith(")")) {
    return parseStructBody(trimmed.slice(1, -1))
  }

  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1)
  }

  if (trimmed === "True") return true
  if (trimmed === "False") return false

  if (NUMBER_PATTERN.test(trimmed)) {
    return Number(trimmed)
  }

  return trimmed
}

/**
 * Assigns a `key=value` pair to a section. A key seen for the first time
 * is stored as-is; a repeated key collects previous and new values into an
 * array rather than overwriting.
 */
function assignEntry(section: IIniSection, key: string, value: TIniValue): void {
  if (!(key in section)) {
    section[key] = value
    return
  }

  const existing = section[key]
  if (Array.isArray(existing)) {
    existing.push(value)
  } else {
    section[key] = [existing, value]
  }
}

/**
 * Parses standard INI text — `[Section]` headers, `key=value` pairs, and
 * `;`/`#` comments — plus Palworld's `key=(a=1,b=2,...)` struct shape into
 * a nested `IIniDocument`. Never throws: lines that don't match the
 * grammar are skipped and reported in `errors` so callers can decide how
 * to surface them, while parsing continues for the remaining lines.
 */
export function parseIni(contents: string): IIniParseResult {
  const document: IIniDocument = {}
  const errors: string[] = []

  let currentSectionName: string | null = null

  const lines = contents.split(/\r\n|\r|\n/)

  lines.forEach((rawLine, index) => {
    const lineNumber = index + 1
    const line = rawLine.trim()

    if (line.length === 0) return
    if (line.startsWith(";") || line.startsWith("#")) return

    const sectionMatch = line.match(SECTION_HEADER_PATTERN)
    if (sectionMatch) {
      const sectionName = sectionMatch[1].trim()
      if (sectionName.length === 0) {
        errors.push(`Line ${lineNumber}: empty section name: "${rawLine}"`)
        return
      }
      currentSectionName = sectionName
      if (!(sectionName in document)) {
        document[sectionName] = {}
      }
      return
    }

    const separatorIndex = line.indexOf("=")
    if (separatorIndex === -1) {
      errors.push(`Line ${lineNumber}: malformed line, expected "[Section]" or "key=value": "${rawLine}"`)
      return
    }

    const key = line.slice(0, separatorIndex).trim()
    if (key.length === 0) {
      errors.push(`Line ${lineNumber}: missing key before "=": "${rawLine}"`)
      return
    }

    if (currentSectionName === null) {
      errors.push(`Line ${lineNumber}: key "${key}" found outside of any section: "${rawLine}"`)
      return
    }

    const valueRaw = line.slice(separatorIndex + 1)
    assignEntry(document[currentSectionName], key, parseValue(valueRaw))
  })

  return { document, errors }
}
