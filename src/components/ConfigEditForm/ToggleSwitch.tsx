import { useId } from "react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

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
      <Label htmlFor={inputId} className="min-w-0 flex-1 truncate" title={label}>
        {label}
      </Label>
      <Switch id={inputId} checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
