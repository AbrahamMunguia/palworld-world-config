/**
 * Static landing page with placeholder instructions for standing up a
 * Palworld dedicated server and inviting friends to join. Generic
 * guidance only — refine with your own server's specifics (mods, save
 * location, backup schedule, etc.) before sharing it with players.
 */
export function LandingPage() {
  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-foreground">Host a Palworld Dedicated Server</h1>
        <p className="text-muted-foreground">
          Placeholder setup notes — replace this copy with your own server's specifics before
          sharing it with friends.
        </p>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-medium text-foreground">1. Install the dedicated server</h2>
        <p className="text-sm text-muted-foreground">
          Install SteamCMD, then download the Palworld Dedicated Server app (Steam App ID{" "}
          <code className="rounded bg-muted px-1 py-0.5">2394010</code>):
        </p>
        <pre className="overflow-auto rounded-lg border border-border bg-muted p-3 text-xs text-foreground">
          {"steamcmd +login anonymous +app_update 2394010 validate +quit"}
        </pre>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-medium text-foreground">2. Configure PalWorldSettings.ini</h2>
        <p className="text-sm text-muted-foreground">
          Edit <code className="rounded bg-muted px-1 py-0.5">PalWorldSettings.ini</code> in the
          server's <code className="rounded bg-muted px-1 py-0.5">Pal/Saved/Config/</code>{" "}
          directory to set your server name, password, player cap, and difficulty rates. Use the{" "}
          <strong>Import &amp; Edit</strong> page in this app to load an existing file, change
          values in a form, and preview the result before saving it back.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-medium text-foreground">3. Open the server port</h2>
        <p className="text-sm text-muted-foreground">
          Forward UDP port <code className="rounded bg-muted px-1 py-0.5">8211</code> (the
          default <code className="rounded bg-muted px-1 py-0.5">PublicPort</code>) on your router
          to the machine running the server, and allow it through any local firewall.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-medium text-foreground">4. Invite friends</h2>
        <p className="text-sm text-muted-foreground">
          Share your public IP address and port (e.g. <code className="rounded bg-muted px-1 py-0.5">203.0.113.4:8211</code>)
          with friends so they can add it as a Steam server or enter it directly in Palworld's
          "Join Multiplayer Game" screen, along with the server password if you set one.
        </p>
      </section>
    </article>
  )
}
