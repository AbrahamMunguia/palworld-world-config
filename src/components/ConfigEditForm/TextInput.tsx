import { useId } from "react"
import type { ChangeEvent } from "react"

import { Input } from "@/components/ui/input"
import { FieldLabel } from "./FieldLabel"

export interface ITextInputProps {
  /** Field label shown next to the control (the INI key name). */
  label: string
  /** Current string value. */
  value: string
  /** Called with the new string value once the user edits the field. */
  onChange: (nextValue: string) => void
}

/** A labelled text input for editing a single `string`-typed INI field. */
export function TextInput({ label, value, onChange }: ITextInputProps) {
  const inputId = useId()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value)
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <FieldLabel label={label} htmlFor={inputId} />
      <Input id={inputId} type="text" value={value} onChange={handleChange} className="w-48 shrink-0" />
    </div>
  )
}
