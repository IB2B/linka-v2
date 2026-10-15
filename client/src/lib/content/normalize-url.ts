// People type "yourapp.com", not "https://yourapp.com". Returns an https link,
// upgrading http:// (we never fetch or store plain http), or "" for anything
// that doesn't look like a public web address.
export function normalizeUrl(input: string): string {
  const v = input.trim();
  if (!v) return "";
  const https = /^https?:\/\//i.test(v)
    ? v.replace(/^https?:\/\//i, "https://")
    : `https://${v.replace(/^\/+/, "")}`;
  try {
    const url = new URL(https);
    return url.hostname.includes(".") ? url.toString().replace(/\/$/, "") : "";
  } catch {
    return "";
  }
}
