import { tierLabel } from "@/lib/billing/format";
import { getDisplayName } from "@/lib/dashboard/user-display";
import { SidebarUserAvatar } from "./sidebar-user-avatar";
import type { SidebarUserPreviewProps } from "@/types/sidebar-user-preview-props";

// Users see their plan in the badge; staff see their role.
export function SidebarUserPreview({ user, usage }: SidebarUserPreviewProps) {
  const badge = user.role === "USER" ? tierLabel(user.tier) : user.role.replace("_", " ");
  return (
    <>
      <SidebarUserAvatar user={user} usage={usage} />
      <span className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
        <span className="flex items-center gap-1.5 truncate">
          <span className="truncate text-sm font-medium">{getDisplayName(user)}</span>
          <span className="shrink-0 rounded px-1 py-px text-[9px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground">
            {badge}
          </span>
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {user.email}
        </span>
      </span>
    </>
  );
}
