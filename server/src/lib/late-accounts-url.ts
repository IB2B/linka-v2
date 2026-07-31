// Late rejects `limit` unless `page` comes with it ("page and limit must be
// provided together"), so the pair is built here and never inlined at call sites.
export function lateAccountsUrl(profileId: string): string {
  return `/accounts?profileId=${encodeURIComponent(profileId)}&page=1&limit=100`;
}
