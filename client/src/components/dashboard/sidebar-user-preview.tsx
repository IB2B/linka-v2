import { getDisplayName, getInitials } from "@/lib/dashboard/user-display";
import type { SidebarUserPreviewProps } from "@/types/sidebar-user-preview-props";

export function SidebarUserPreview({ user }: SidebarUserPreviewProps) {
  return (
    <>
      <span className="flex size-8 items-center justify-center rounded-md bg-foreground text-xs font-medium text-background">
        {getInitials(user)}
      </span>
      <span className="grid flex-1 text-left leading-tight">
        <span className="truncate text-sm font-medium">
          {getDisplayName(user)}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {user.email}
        </span>
      </span>
    </>
  );
}
