import { useId } from "react"

import { Switch } from "@/components/ui/switch"
import { FieldLabel } from "./FieldLabel"

export interface IToggleSwitchProps {
  /** Field label shown next to the control (the INI key name). */
  label: string
  /** Current boolean value. */
  checked: boolean
  /** Called with the new boolean value once the user toggles the field. */
  onChange: (nextChecked: boolean) => void
}

/**
 * A labelled toggle for editing a single `boolean`-typed INI field
 * (Palworld serializes these as `True`/`False`).
 */
export function ToggleSwitch({ label, checked, onChange }: IToggleSwitchProps) {
  const inputId = useId()

  return (
    <div className="flex items-center justify-between gap-3">
      <FieldLabel label={label} htmlFor={inputId} />
      <Switch id={inputId} checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
