import type { UserFeatures, UserTier } from "@/lib/auth/me";
import type { UserRole } from "@/types/user-role";

export type SidebarNavProps = {
  role: UserRole;
  tier: UserTier;
  features: UserFeatures;
};
