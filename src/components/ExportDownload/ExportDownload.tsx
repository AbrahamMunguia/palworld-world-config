import { Button } from "@/components/ui/button"
import type { IIniDocument } from "@/lib/ini/ini.types"
import { serializeIni } from "@/lib/ini/serializeIni"

export interface IExportDownloadProps {
  /** The parsed INI document to serialize and download. */
  data: IIniDocument
  /** Name of the downloaded file, including extension (e.g. "PalWorldSettings.ini"). */
  fileName: string
}

/**
 * A real `<button>` that serializes `data` back into INI text via
 * `serializeIni` and triggers a browser download of the result as
 * `fileName` — the actual deliverable: a file usable on a real Palworld
 * server. Does not render any editing UI.
 */
export function ExportDownload({ data, fileName }: IExportDownloadProps) {
  function handleClick() {
    const contents = serializeIni(data)
    const blob = new Blob([contents], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  return (
    <Button type="button" onClick={handleClick}>
      Download {fileName}
    </Button>
  )
}
