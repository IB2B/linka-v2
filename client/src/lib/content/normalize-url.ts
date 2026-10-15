// People type "yourapp.com", not "https://yourapp.com". Adds the scheme when
// it's missing; returns "" for anything that doesn't look like a web address.
export function normalizeUrl(input: string): string {
  const v = input.trim();
  if (!v) return "";
  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v.replace(/^\/+/, "")}`;
  try {
    const url = new URL(withScheme);
    return url.hostname.includes(".") ? url.toString().replace(/\/$/, "") : "";
  } catch {
    return "";
  }
}
