import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import { Badge } from "@/components/ui/badge";
import { RoleBadge } from "@/components/admin/users/role-badge";
import { StatusBadge } from "@/components/admin/users/status-badge";
import type { AdminUserRow } from "@/types/admin";

function fmtDate(s: string): string {
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function UserDetailHeader({ user }: { user: AdminUserRow }) {
  const fullName = `${user.firstName} ${user.lastName}`.trim() || user.email;
  return (
    <div className="flex items-start gap-4 px-6 py-5">
      <InboxAvatar name={fullName} src={user.avatarUrl} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h2 className="truncate text-base font-semibold tracking-tight">{fullName}</h2>
        <p className="truncate text-sm tracking-tight text-muted-foreground">{user.email}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <RoleBadge role={user.role} />
          <StatusBadge status={user.status} />
          <Badge variant="outline" className="capitalize">{user.planTier}</Badge>
          <span className="text-xs tracking-tight text-muted-foreground">
            · joined {fmtDate(user.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
