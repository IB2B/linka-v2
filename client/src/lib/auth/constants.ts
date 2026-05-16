import type { UserRole } from "@/types/user-role";

export const USER_ROLES = ["USER", "ADMIN"] as const;

export const ROLE_REDIRECTS: Record<UserRole, string> = {
  ADMIN: "/admin",
  USER: "/dashboard",
};
