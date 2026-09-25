import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ROLE_REDIRECTS } from "@/lib/auth/constants";
import { fetchMe } from "@/lib/auth/me";

// For pages a signed-in user has no reason to see (landing, login, sign-up),
// e.g. after pressing Back from the dashboard. The session is checked against
// the API, not just the cookie, so an expired cookie still sees the page
// instead of bouncing to /login. Visitors without a cookie never hit the API.
export async function redirectIfSignedIn(): Promise<void> {
  const store = await cookies();
  if (!store.get("token")) return;
  const user = await fetchMe().catch(() => null);
  if (user) redirect(ROLE_REDIRECTS[user.role]);
}
