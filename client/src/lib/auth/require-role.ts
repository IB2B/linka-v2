import { redirect } from "next/navigation";

import { ROLE_REDIRECTS } from "@/lib/auth/constants";
import { fetchMe, type Me } from "@/lib/auth/me";
import type { UserRole } from "@/types/user-role";

export async function requireRole(role: UserRole | UserRole[]): Promise<{ user: Me }> {
  const allowed = Array.isArray(role) ? role : [role];
  const user = await fetchMe();
  if (!user) redirect("/login");
  if (!allowed.includes(user.role)) redirect(ROLE_REDIRECTS[user.role]);
  return { user };
}
