import type { UserRole } from "@/types/user-role";

export type DashboardUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  role: UserRole;
};
