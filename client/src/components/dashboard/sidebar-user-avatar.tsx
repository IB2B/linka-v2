import { getInitials } from "@/lib/dashboard/user-display";
import { peakUsagePct, usageTone } from "@/lib/usage/usage-tone";
import { cn } from "@/lib/utils";
import { UsageRing } from "./usage-ring";
import type { DashboardUser } from "@/types/dashboard-user";
import type { UsageSummary } from "@/types/usage";

type Props = { user: DashboardUser; usage?: UsageSummary | null };

// Avatar, optionally wrapped in a ring showing the fullest plan quota.
export function SidebarUserAvatar({ user, usage }: Props) {
  const peak = usage ? peakUsagePct(usage) : null;
  return (
    <span className="relative flex size-8 shrink-0 items-center justify-center">
      {peak !== null ? (
        <UsageRing pct={peak} tone={usageTone(peak)} stroke={1.5}
          className="absolute inset-0 size-8!" />
      ) : null}
      <span className={cn(
        "flex items-center justify-center overflow-hidden rounded-full bg-foreground text-xs font-medium text-background",
        peak !== null ? "size-6 text-[10px]" : "size-8",
      )}>
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          getInitials(user)
        )}
      </span>
    </span>
  );
}
