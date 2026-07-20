import type { IIniDocument, IIniSection, TIniValue } from "@/lib/ini/ini.types"
import { ConfigValueField } from "./ConfigValueField"

export interface IConfigEditFormProps {
  /** The parsed INI document currently being edited. */
  document: IIniDocument
  /** Called with a new, immutably-updated document after any field edit. */
  onChange: (nextDocument: IIniDocument) => void
}

/**
 * Generic editing form for a parsed `IIniDocument`. Renders one labelled
 * section per top-level `[Section]` and, for each field inside it, an
 * input inferred purely from the field's runtime type (see
 * `ConfigValueField`) — there is no hardcoded Palworld field catalog, so
 * any INI file the parser can produce is editable here.
 *
 * A section (`IIniSection`) is structurally identical to a nested struct
 * value (`{ [key: string]: TIniValue }`), so sections are rendered by
 * delegating straight to `ConfigValueField`'s object case rather than
 * duplicating that logic here.
 */
export function ConfigEditForm({ document, onChange }: IConfigEditFormProps) {
  function handleSectionChange(sectionName: string, nextValue: TIniValue) {
    onChange({ ...document, [sectionName]: nextValue as IIniSection })
  }

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(document).map(([sectionName, section]) => (
        <ConfigValueField
          key={sectionName}
          label={sectionName}
          value={section}
          onChange={(nextValue) => handleSectionChange(sectionName, nextValue)}
        />
      ))}
    </div>
  )
}
