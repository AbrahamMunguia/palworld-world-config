import { useState } from "react"

import { Button } from "@/components/ui/button"
import type { IIniDocument, IIniParseResult } from "@/lib/ini/ini.types"
import { ExportPreviewPage } from "@/pages/ExportPreviewPage"
import { ImportEditPage } from "@/pages/ImportEditPage"
import { LandingPage } from "@/pages/LandingPage"

/** The three top-level pages this app switches between. */
export type TPage = "landing" | "import-edit" | "export-preview"

const PAGE_LABELS: Record<TPage, string> = {
  landing: "Home",
  "import-edit": "Import & Edit",
  "export-preview": "Export & Preview",
}

const PAGE_ORDER: TPage[] = ["landing", "import-edit", "export-preview"]

/**
 * App shell: a simple client-side page switcher plus the shared
 * `currentConfig` state, since both the Import/Edit and Export/Preview
 * pages need to read and write the same parsed INI document. The tree is
 * shallow enough that plain lifted state and props are sufficient — no
 * router or store needed.
 */
function App() {
  const [page, setPage] = useState<TPage>("landing")
  const [currentConfig, setCurrentConfig] = useState<IIniDocument | null>(null)

  function handleImport(result: IIniParseResult) {
    setCurrentConfig(result.document)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 p-6">
      <nav aria-label="Main" className="flex flex-wrap gap-2 border-b border-border pb-4">
        {PAGE_ORDER.map((pageKey) => (
          <Button
            key={pageKey}
            type="button"
            variant={page === pageKey ? "default" : "outline"}
            aria-current={page === pageKey ? "page" : undefined}
            onClick={() => setPage(pageKey)}
          >
            {PAGE_LABELS[pageKey]}
          </Button>
        ))}
      </nav>

      <main className="flex-1">
        {page === "landing" && <LandingPage />}
        {page === "import-edit" && (
          <ImportEditPage config={currentConfig} onImport={handleImport} onConfigChange={setCurrentConfig} />
        )}
        {page === "export-preview" && <ExportPreviewPage config={currentConfig} />}
      </main>
    </div>
  )
}

export default App
