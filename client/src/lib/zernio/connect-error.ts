// socialFetch throws `Social API <status>: <body>`. Keep the status — it is what
// separates "sign in again" from "the posting service is down" — and drop the
// body, which is a server-side stack nobody clicking Connect can act on.
export function connectErrorMessage(err: unknown): string {
  const message = err instanceof Error ? err.message : "";
  const status = /Social API (\d{3})/.exec(message)?.[1];
  if (/profile not found/i.test(message)) {
    return "Your posting profile was rebuilt — press connect once more.";
  }
  if (status === "401") return "Your session expired. Sign in again.";
  if (status === "429") return "Too many attempts — wait a minute and retry.";
  if (status) {
    return `Couldn't start the connection (error ${status}). Try again.`;
  }
  return "Couldn't reach the posting service. Try again.";
}
