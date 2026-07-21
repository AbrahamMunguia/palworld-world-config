import { useId, useRef, useState } from "react"
import type { ChangeEvent } from "react"

import { Button } from "@/components/ui/button"
import type { IIniParseResult } from "@/lib/ini/ini.types"
import { parseIni } from "@/lib/ini/parseIni"

export interface IFileImportProps {
  /** Called with the parse result once a selected `.ini` file has been read and parsed. */
  onImport: (result: IIniParseResult) => void
  /** Visible label for the file input. */
  label?: string
}

/**
 * Reads a `File` as text using the `FileReader` API, wrapped in a Promise
 * for `async`/`await` ergonomics.
 */
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "")
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"))
    reader.readAsText(file)
  })
}

/**
 * Lets the user pick a local `.ini` file, reads it with the browser
 * File/FileReader API, parses it with `parseIni`, and reports the result
 * to the caller via `onImport`. Purely an input + parse trigger — it does
 * not own where the parsed data is stored or render any editing UI.
 *
 * The native `<input type="file">` is required for file selection but is
 * visually hidden; a themed, high-contrast `Button` is the visible trigger
 * and forwards clicks to the input via `inputRef`, so keyboard/AT users get
 * standard button semantics (Enter/Space activation, focus-visible ring)
 * while sighted users get a clear, adequately-sized click target.
 */
export function FileImport({ onImport, label = "Import PalWorldSettings.ini" }: IFileImportProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [readError, setReadError] = useState<string | null>(null)
  const [parseErrors, setParseErrors] = useState<string[]>([])

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    // Allow re-selecting the same file to trigger another change event.
    event.target.value = ""

    if (!file) return

    setReadError(null)
    setParseErrors([])

    let text: string
    try {
      text = await readFileAsText(file)
    } catch {
      setReadError(`Could not read "${file.name}". The file may be unreadable or corrupted.`)
      return
    }

    const result = parseIni(text)
    setParseErrors(result.errors)
    onImport(result)
  }

  const alertMessage =
    readError ??
    (parseErrors.length > 0
      ? `Parsed with ${parseErrors.length} issue(s): ${parseErrors.join(" | ")}`
      : null)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept=".ini"
        onChange={handleChange}
        className="sr-only"
      />
      <Button type="button" size="lg" onClick={() => inputRef.current?.click()} className="self-start">
        {label}
      </Button>
      {alertMessage !== null && (
        <p role="alert" className="text-sm text-destructive">
          {alertMessage}
        </p>
      )}
    </div>
  )
}
