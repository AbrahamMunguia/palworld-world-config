import { ConfigPreview } from "@/components/ConfigPreview/ConfigPreview"
import { ExportDownload } from "@/components/ExportDownload/ExportDownload"
import type { IIniDocument } from "@/lib/ini/ini.types"
import { serializeIni } from "@/lib/ini/serializeIni"

export interface IExportPreviewPageProps {
  /** The current edited config, or `null` before anything has been imported. */
  config: IIniDocument | null
}

/**
 * Shows a live, read-only text preview of the current config (serialized
 * fresh on every render via `serializeIni`) plus the real download button.
 */
export function ExportPreviewPage({ config }: IExportPreviewPageProps) {
  if (config === null) {
    return (
      <p className="text-sm text-muted-foreground">
        Import and edit a config on the Import &amp; Edit page first.
      </p>
    )
  }

  const previewText = serializeIni(config)

  return (
    <div className="flex flex-col gap-6">
      <ConfigPreview text={previewText} />
      <ExportDownload data={config} fileName="PalWorldSettings.ini" />
    </div>
  )
}
