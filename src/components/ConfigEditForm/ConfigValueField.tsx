import type { TIniValue } from "@/lib/ini/ini.types"
import { NumberStepper } from "./NumberStepper"
import { TextInput } from "./TextInput"
import { ToggleSwitch } from "./ToggleSwitch"

export interface IConfigValueFieldProps {
  /** Field label shown to the user — the INI key name, or a positional label for array items. */
  label: string
  /** The current value. Its runtime type decides which control (or nested group) renders. */
  value: TIniValue
  /** Called with the field's replacement value after an edit. Always an immutable replacement, never a mutation. */
  onChange: (nextValue: TIniValue) => void
}

/**
 * Recursively renders an editing control for a single `TIniValue`, purely
 * based on its runtime type — there is no hardcoded catalog of Palworld
 * field names. Scalars render a matching input; nested struct objects and
 * arrays render as a labelled `<fieldset>` that recurses this same
 * component for each member, so arbitrarily nested INI structs (e.g.
 * `OptionSettings=(...)`) are handled without extra cases.
 */
export function ConfigValueField({ label, value, onChange }: IConfigValueFieldProps) {
  if (Array.isArray(value)) {
    return (
      <fieldset className="flex flex-col gap-3 rounded-lg border border-border p-3">
        <legend className="px-1 text-sm font-semibold text-foreground">{label}</legend>
        <div className="flex flex-col gap-3">
          {value.map((item, index) => (
            <ConfigValueField
              // eslint-disable-next-line react/no-array-index-key -- items are positional, not identified by id
              key={index}
              label={`${label} #${index + 1}`}
              value={item}
              onChange={(nextItem) => {
                const nextArray = [...value]
                nextArray[index] = nextItem
                onChange(nextArray)
              }}
            />
          ))}
        </div>
      </fieldset>
    )
  }

  if (typeof value === "object") {
    return (
      <fieldset className="flex flex-col gap-3 rounded-lg border border-border p-3">
        <legend className="px-1 text-sm font-semibold text-foreground">{label}</legend>
        <div className="flex flex-col gap-3">
          {Object.entries(value).map(([key, fieldValue]) => (
            <ConfigValueField
              key={key}
              label={key}
              value={fieldValue}
              onChange={(nextFieldValue) => onChange({ ...value, [key]: nextFieldValue })}
            />
          ))}
        </div>
      </fieldset>
    )
  }

  if (typeof value === "boolean") {
    return <ToggleSwitch label={label} checked={value} onChange={onChange} />
  }

  if (typeof value === "number") {
    return <NumberStepper label={label} value={value} onChange={onChange} />
  }

  return <TextInput label={label} value={value} onChange={onChange} />
}
