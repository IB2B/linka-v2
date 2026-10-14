import { HeaderCompose } from "./header-compose";
import { NotificationsBell } from "./notifications-bell";
import { SearchTrigger } from "./search-trigger";
import type { UserFeatures, UserTier } from "@/lib/auth/me";
import type { UserRole } from "@/types/user-role";

type Props = {
  prefix: string;
  role: UserRole;
  tier: UserTier;
  features: UserFeatures;
};

// Search, then the main action, then notifications at the edge.
export function HeaderActions({ prefix, role, tier, features }: Props) {
  return (
    <div className="ml-auto flex items-center gap-2 md:gap-3">
      <SearchTrigger role={role} tier={tier} features={features} />
      {role === "USER" ? <HeaderCompose /> : null}
      <NotificationsBell prefix={prefix} role={role} />
    </div>
  );
}
