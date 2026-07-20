export interface IConfigPreviewProps {
  /** Pre-serialized INI text to display, e.g. the output of `serializeIni`. */
  text: string
}

/**
 * Dumb, read-only display of already-serialized INI text. Knows nothing
 * about `IIniDocument`/`TIniValue` internals — it just renders whatever
 * string it's given inside a scrollable, monospaced, read-only block.
 */
export function ConfigPreview({ text }: IConfigPreviewProps) {
  return (
    <div role="region" aria-label="Config preview" className="flex flex-col gap-2">
      <pre className="max-h-[32rem] overflow-auto rounded-lg border border-border bg-muted p-4 text-xs whitespace-pre-wrap text-foreground">
        {text}
      </pre>
    </div>
  )
}
