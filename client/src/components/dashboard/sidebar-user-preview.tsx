import { getDisplayName, getInitials } from "@/lib/dashboard/user-display";
import type { SidebarUserPreviewProps } from "@/types/sidebar-user-preview-props";

export function SidebarUserPreview({ user }: SidebarUserPreviewProps) {
  return (
    <>
      <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-foreground text-xs font-medium text-background">
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          getInitials(user)
        )}
      </span>
      <span className="grid flex-1 text-left leading-tight">
        <span className="flex items-center gap-1.5 truncate">
          <span className="truncate text-sm font-medium">{getDisplayName(user)}</span>
          <span className="shrink-0 rounded px-1 py-px text-[9px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground">
            {user.role.replace("_", " ")}
          </span>
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {user.email}
        </span>
      </span>
    </>
  );
}
