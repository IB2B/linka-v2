export type EmailProvider = { label: string; url: string };

const PROVIDERS: Record<string, EmailProvider> = {
  "gmail.com":       { label: "Open Gmail",    url: "https://mail.google.com" },
  "googlemail.com":  { label: "Open Gmail",    url: "https://mail.google.com" },
  "outlook.com":     { label: "Open Outlook",  url: "https://outlook.live.com/mail" },
  "hotmail.com":     { label: "Open Outlook",  url: "https://outlook.live.com/mail" },
  "live.com":        { label: "Open Outlook",  url: "https://outlook.live.com/mail" },
  "msn.com":         { label: "Open Outlook",  url: "https://outlook.live.com/mail" },
  "yahoo.com":       { label: "Open Yahoo",    url: "https://mail.yahoo.com" },
  "ymail.com":       { label: "Open Yahoo",    url: "https://mail.yahoo.com" },
  "icloud.com":      { label: "Open iCloud",   url: "https://www.icloud.com/mail" },
  "me.com":          { label: "Open iCloud",   url: "https://www.icloud.com/mail" },
  "mac.com":         { label: "Open iCloud",   url: "https://www.icloud.com/mail" },
  "proton.me":       { label: "Open Proton",   url: "https://mail.proton.me" },
  "protonmail.com":  { label: "Open Proton",   url: "https://mail.proton.me" },
  "fastmail.com":    { label: "Open Fastmail", url: "https://app.fastmail.com" },
};

export function detectEmailProvider(email: string): EmailProvider | null {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return domain ? PROVIDERS[domain] ?? null : null;
}
