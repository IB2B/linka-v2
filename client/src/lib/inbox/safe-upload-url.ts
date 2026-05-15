export function isSafeUploadUrl(u: unknown): u is string {
  if (typeof u !== "string") return false;
  if (u.startsWith("/")) return !u.startsWith("//");
  try {
    const parsed = new URL(u);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch { return false; }
}
