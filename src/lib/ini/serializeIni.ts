import type { IIniDocument, TIniValue } from "./ini.types"

/** Characters that would be ambiguous or break the grammar if left unquoted. */
const QUOTE_REQUIRED_PATTERN = /[,()"=;#\r\n]/

function needsQuoting(value: string): boolean {
  if (QUOTE_REQUIRED_PATTERN.test(value)) return true
  return value !== value.trim()
}

/**
 * Serializes a single value for use as a struct field or array member:
 * booleans become `True`/`False`, numbers are stringified as-is, strings
 * are quoted only when necessary to stay unambiguous, nested objects
 * become `(a=1,b=2)` structs, and arrays become `(v1,v2)` lists.
 */
function serializeValue(value: TIniValue): string {
  if (Array.isArray(value)) {
    return `(${value.map(serializeValue).join(",")})`
  }

  if (value !== null && typeof value === "object") {
    const members = Object.entries(value).map(([key, memberValue]) => `${key}=${serializeValue(memberValue)}`)
    return `(${members.join(",")})`
  }

  if (typeof value === "boolean") {
    return value ? "True" : "False"
  }

  if (typeof value === "number") {
    return String(value)
  }

  return needsQuoting(value) ? `"${value}"` : value
}

/**
 * Serializes an `IIniDocument` back into INI text — the inverse of
 * `parseIni`. Struct-shaped object/array values are re-flattened into
 * `key=(a=1,b=2,...)` form. An array stored directly on a section (the
 * result of repeated `key=value` lines during parsing) is re-expanded into
 * multiple `key=value` lines rather than a struct list, since that's the
 * form it originated from.
 *
 * Pure function — no DOM access, safe to unit test in isolation.
 */
export function serializeIni(document: IIniDocument): string {
  const lines: string[] = []

  for (const [sectionName, section] of Object.entries(document)) {
    lines.push(`[${sectionName}]`)

    for (const [key, value] of Object.entries(section)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          lines.push(`${key}=${serializeValue(item)}`)
        }
      } else {
        lines.push(`${key}=${serializeValue(value)}`)
      }
    }

    lines.push("")
  }

  return lines.join("\n").replace(/\n+$/, "\n")
}
