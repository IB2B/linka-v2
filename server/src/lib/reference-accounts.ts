export const MAX_REFERENCE_ACCOUNTS = 5;

const MAX_LEN = 200;

function safeJson(s: string): unknown {
  try { return JSON.parse(s); } catch { return null; }
}

// Accounts the user admires: profile URLs or @handles. Stored as a JSON array;
// mysql2 may hand it back already parsed, hence the string fallback.
export function parseReferenceAccounts(raw: unknown): string[] | null {
  if (!raw) return null;
  const v = typeof raw === "string" ? safeJson(raw) : raw;
  if (!Array.isArray(v)) return null;
  const list = v
    .filter((x): x is string => typeof x === "string")
    .map((x) => x.trim().slice(0, MAX_LEN))
    .filter(Boolean)
    .slice(0, MAX_REFERENCE_ACCOUNTS);
  return list.length ? list : null;
}
