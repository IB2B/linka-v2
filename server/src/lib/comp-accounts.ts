// Internal/team accounts that get full (enterprise) access without paying.
// Add teammates via the COMP_ACCOUNT_EMAILS env var (comma-separated) — no
// deploy needed on a restart. The seed list is always included.
const SEED_EMAILS = ["med@intelligentb2b.com"];

const COMP_EMAILS = new Set(
  [...SEED_EMAILS, ...(process.env.COMP_ACCOUNT_EMAILS ?? "").split(",")]
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
);

export const COMP_TIER = "enterprise";

export function isCompEmail(email: string | null | undefined): boolean {
  return !!email && COMP_EMAILS.has(email.toLowerCase());
}

/**
 * Resolve the tier a user should be treated as, honoring the comp allowlist.
 * The comp bump requires a VERIFIED email — otherwise a stranger could register
 * an allowlisted address before its real owner does and claim enterprise access.
 */
export function effectiveTier(
  email: string | null | undefined,
  dbTier: string | null | undefined,
  emailVerified: boolean,
): string {
  return emailVerified && isCompEmail(email)
    ? COMP_TIER
    : (dbTier ?? "free").toLowerCase();
}
