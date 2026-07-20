/**
 * A parsed INI value. Palworld's `key=(a=1,b=2,...)` struct shape parses
 * into a nested object; comma-separated members without keys (e.g.
 * `(1,2,3)`) parse into an array; everything else is a boolean, number, or
 * string scalar.
 */
export type TIniValue = string | number | boolean | TIniValue[] | { [key: string]: TIniValue }

/**
 * A single `[Section]` block: a flat map of keys to parsed values.
 * Repeated keys within the same section are collected into an array.
 */
export interface IIniSection {
  [key: string]: TIniValue
}

/**
 * A full parsed INI file: a map of section names (without the surrounding
 * `[` `]`) to their contents.
 */
export interface IIniDocument {
  [sectionName: string]: IIniSection
}

/**
 * The result of parsing INI text. `errors` is never thrown — malformed
 * lines are skipped and reported here instead, so callers can decide how
 * to surface them.
 */
export interface IIniParseResult {
  document: IIniDocument
  errors: string[]
}
