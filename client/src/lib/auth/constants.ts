import type { UserRole } from "@/types/user-role";

export const USER_ROLES = ["USER", "ADMIN", "SUPER_ADMIN"] as const;

export const ROLE_REDIRECTS: Record<UserRole, string> = {
  SUPER_ADMIN: "/super-admin",
  ADMIN: "/admin",
  USER: "/dashboard",
};
