import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { getSettingDescription } from "@/lib/ini/settingDescriptions"

export interface IFieldLabelProps {
  /** Field label text — the INI key name, or a positional label for array items. */
  label: string
  /** `id` of the control this label describes, wired via the native `htmlFor` association. */
  htmlFor: string
}

/**
 * The `<Label>` shared by every config field control (`NumberStepper`,
 * `TextInput`, `ToggleSwitch`). When a plain-English description of the INI
 * key is known (see `@/lib/ini/settingDescriptions`), the label text becomes
 * a tooltip trigger that reveals it on hover or keyboard focus. Keys with no
 * known description — this form is schema-less and can render any key —
 * fall back to a plain label with a native `title` tooltip, same as before.
 */
export function FieldLabel({ label, htmlFor }: IFieldLabelProps) {
  const description = getSettingDescription(label)

  if (!description) {
    return (
      <Label htmlFor={htmlFor} className="min-w-0 flex-1 truncate" title={label}>
        {label}
      </Label>
    )
  }

  return (
    <Label htmlFor={htmlFor} className="min-w-0 flex-1 truncate">
      <Tooltip>
        <TooltipTrigger className="truncate">{label}</TooltipTrigger>
        <TooltipContent>{description}</TooltipContent>
      </Tooltip>
    </Label>
  )
}
