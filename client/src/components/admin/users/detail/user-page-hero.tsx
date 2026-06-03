import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import { Badge } from "@/components/ui/badge";
import { RoleBadge } from "@/components/admin/users/role-badge";
import { StatusBadge } from "@/components/admin/users/status-badge";
import { UserDetailActions } from "@/components/admin/users/detail/user-detail-actions";
import { UserMonthPicker } from "@/components/admin/users/detail/user-month-picker";
import { tierLabel } from "@/lib/billing/format";
import type { AdminUserRow, AdminUserDetail } from "@/types/admin";

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const fmtRelative = (s: string | null) => {
  if (!s) return null;
  const diff = Date.now() - new Date(s).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  return fmtDate(s);
};

type Props = { user: AdminUserRow; profile: AdminUserDetail["profile"]; month?: string };

export function UserPageHero({ user, profile, month }: Props) {
  const name = `${user.firstName} ${user.lastName}`.trim() || user.email;
  const lastActive = fmtRelative(user.lastActiveAt);
  return (
    <div className="space-y-4">
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-xs font-medium tracking-tight text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> Back to users
      </Link>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <InboxAvatar name={name} src={user.avatarUrl} />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-semibold tracking-tight">{name}</h1>
            {profile.jobTitle && (
              <p className="truncate text-sm tracking-tight text-muted-foreground">{profile.jobTitle}</p>
            )}
            <p className="truncate text-sm tracking-tight text-muted-foreground">{user.email}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <RoleBadge role={user.role} />
              <StatusBadge status={user.status} />
              <Badge variant="outline">{tierLabel(user.planTier)}</Badge>
              <span className="text-xs tracking-tight text-muted-foreground">
                · joined {fmtDate(user.createdAt)}
              </span>
              {lastActive && (
                <span className="flex items-center gap-1 text-xs tracking-tight text-muted-foreground">
                  <Clock className="size-3" /> active {lastActive}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <UserMonthPicker current={month} />
          <UserDetailActions user={user} />
        </div>
      </div>
    </div>
  );
}
