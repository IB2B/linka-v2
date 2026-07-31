const TICKET_PREFIX = "ticket-";
const SOCIAL_PREFIX = "social-";
const POST_PREFIXES = ["fail-", "up-", "gen-"];

export function readOneUrl(id: string, isAdmin: boolean): string | null {
  if (isAdmin) {
    return id.startsWith(TICKET_PREFIX)
      ? `/api/admin/notifications/${id.slice(TICKET_PREFIX.length)}/read`
      : null;
  }
  if (id.startsWith(SOCIAL_PREFIX)) {
    return `/api/social/notifications/${id.slice(SOCIAL_PREFIX.length)}/read`;
  }
  // Post notices keep their synthetic id as the key — the server stores it
  // verbatim in notification_reads.
  if (POST_PREFIXES.some((p) => id.startsWith(p))) {
    return `/api/posts/notifications/${id}/read`;
  }
  return null;
}

// Users have two independent read stores (posts + social engagement), so
// "mark all" fans out. Admins only have tickets.
export function readAllUrls(isAdmin: boolean): string[] {
  if (isAdmin) return ["/api/admin/notifications/read-all"];
  return [
    "/api/posts/notifications/read-all",
    "/api/social/notifications/read-all",
  ];
}
