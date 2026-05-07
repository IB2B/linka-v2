import type { UserFeatures } from "@/lib/auth/me";
import type { UserRole } from "@/types/user-role";

export type SidebarNavProps = {
  role: UserRole;
  features: UserFeatures;
};
