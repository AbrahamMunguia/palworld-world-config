import { ConfigEditForm } from "@/components/ConfigEditForm/ConfigEditForm"
import { FileImport } from "@/components/FileImport/FileImport"
import type { IIniDocument, IIniParseResult } from "@/lib/ini/ini.types"

export interface IImportEditPageProps {
  /** The currently loaded/edited config, or `null` before anything has been imported. */
  config: IIniDocument | null
  /** Forwarded straight to `FileImport`; the parent owns storing the parsed document. */
  onImport: (result: IIniParseResult) => void
  /** Called with an immutably-updated document whenever the user edits a field. */
  onConfigChange: (nextConfig: IIniDocument) => void
}

/**
 * Composes the existing `FileImport` I/O component with the generic
 * `ConfigEditForm`. Owns no config state itself — both `config` and the
 * change callbacks are lifted to the parent (`App`) since the Export &
 * Preview page needs the same state.
 */
export function ImportEditPage({ config, onImport, onConfigChange }: IImportEditPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <FileImport onImport={onImport} />

      {config === null ? (
        <p className="text-sm text-muted-foreground">
          Import a PalWorldSettings.ini file above to start editing.
        </p>
      ) : (
        <ConfigEditForm document={config} onChange={onConfigChange} />
      )}
    </div>
  )
}
