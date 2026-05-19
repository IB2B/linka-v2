const TICKET_PREFIX = "ticket-";
const SOCIAL_PREFIX = "social-";

export function readOneUrl(id: string, isAdmin: boolean): string | null {
  if (isAdmin && id.startsWith(TICKET_PREFIX)) {
    return `/api/admin/notifications/${id.slice(TICKET_PREFIX.length)}/read`;
  }
  if (!isAdmin && id.startsWith(SOCIAL_PREFIX)) {
    return `/api/social/notifications/${id.slice(SOCIAL_PREFIX.length)}/read`;
  }
  return null;
}

export function readAllUrl(isAdmin: boolean): string {
  return isAdmin ? "/api/admin/notifications/read-all" : "/api/social/notifications/read-all";
}
