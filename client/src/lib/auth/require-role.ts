import { redirect } from "next/navigation";

import { ROLE_REDIRECTS } from "@/lib/auth/constants";
import { fetchMe, type Me } from "@/lib/auth/me";
import type { UserRole } from "@/types/user-role";

export async function requireRole(role: UserRole): Promise<{ user: Me }> {
  const user = await fetchMe();
  if (!user) redirect("/login");
  if (user.role !== role) redirect(ROLE_REDIRECTS[user.role]);
  return { user };
}
