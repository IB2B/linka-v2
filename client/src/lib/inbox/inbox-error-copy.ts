// Maps inbox load failures to user-facing copy. Never surfaces raw provider
// responses (e.g. Unipile's quota JSON) — only known, sanitized states.
export function inboxErrorCopy(status: number, error: string): { message: string; hint: string } {
  if (status === 402) {
    return {
      message: "Inbox add-on required",
      hint: "Enable the Inbox add-on on your Late workspace to manage DMs here.",
    };
  }
  if (error === "linkedin_unavailable") {
    return {
      message: "LinkedIn inbox unavailable",
      hint: "We couldn't reach LinkedIn right now. Try reconnecting it in Settings, or check back shortly.",
    };
  }
  if (error === "service_unavailable") {
    return {
      message: "Couldn't load conversations",
      hint: "Our messaging provider is temporarily unavailable. Please try again in a few minutes.",
    };
  }
  return {
    message: "Couldn't load conversations",
    hint: "Something went wrong loading your messages. Please try again in a few minutes.",
  };
}
