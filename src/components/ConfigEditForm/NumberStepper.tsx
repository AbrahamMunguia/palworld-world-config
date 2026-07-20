import { useId } from "react"
import type { ChangeEvent } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface INumberStepperProps {
  /** Field label shown next to the control (the INI key name). */
  label: string
  /** Current numeric value. */
  value: number
  /** Called with the new numeric value once the user edits the field. */
  onChange: (nextValue: number) => void
}

/**
 * A labelled numeric input for editing a single `number`-typed INI field.
 * Renders as a native `type="number"` input (browsers give this stepper
 * up/down affordances for free) so both integer and decimal Palworld
 * settings (e.g. `ExpRate=1.000000`) can be edited directly.
 */
export function NumberStepper({ label, value, onChange }: INumberStepperProps) {
  const inputId = useId()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.valueAsNumber
    if (!Number.isNaN(nextValue)) {
      onChange(nextValue)
    }
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <Label htmlFor={inputId} className="min-w-0 flex-1 truncate" title={label}>
        {label}
      </Label>
      <Input
        id={inputId}
        type="number"
        step="any"
        value={value}
        onChange={handleChange}
        className="w-32 shrink-0"
      />
    </div>
  )
}
