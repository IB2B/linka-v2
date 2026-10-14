import { HeaderCompose } from "./header-compose";
import { NotificationsBell } from "./notifications-bell";
import { SearchTrigger } from "./search-trigger";
import { UsagePill } from "./usage-pill";
import type { UserFeatures, UserTier } from "@/lib/auth/me";
import type { UsageSummary } from "@/types/usage";
import type { UserRole } from "@/types/user-role";

type Props = {
  prefix: string;
  role: UserRole;
  tier: UserTier;
  features: UserFeatures;
  usage?: UsageSummary | null;
};

export function HeaderActions({ prefix, role, tier, features, usage }: Props) {
  const isUser = role === "USER";
  return (
    <div className="ml-auto flex items-center gap-2 md:gap-3">
      <SearchTrigger role={role} tier={tier} features={features} />
      {isUser && usage ? <UsagePill usage={usage} tier={tier} /> : null}
      <NotificationsBell prefix={prefix} role={role} />
      {isUser ? <HeaderCompose /> : null}
    </div>
  );
}
