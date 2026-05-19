import { HeaderClock } from "./header-clock";
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

export function HeaderActions({ prefix, role, tier, features }: Props) {
  return (
    <div className="ml-auto flex items-center gap-2 md:gap-3">
      <SearchTrigger role={role} tier={tier} features={features} />
      <HeaderClock />
      <div className="hidden h-4 w-px bg-border md:block" aria-hidden />
      <NotificationsBell prefix={prefix} role={role} />
    </div>
  );
}
