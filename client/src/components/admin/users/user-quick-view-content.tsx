import { UserDetailMeta } from "@/components/admin/users/user-detail-meta";
import { UserDetailStats } from "@/components/admin/users/detail/user-detail-stats";
import { UserDetailActivity } from "@/components/admin/users/user-detail-activity";
import { RoleBadge } from "@/components/admin/users/role-badge";
import { StatusBadge } from "@/components/admin/users/status-badge";
import { tierLabel } from "@/lib/billing/format";
import type { AdminUserDetail } from "@/types/admin";

const ACTIVITY_LIMIT = 6;

export function UserQuickViewContent({ detail }: { detail: AdminUserDetail }) {
  const events = detail.activity.slice(0, ACTIVITY_LIMIT);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <RoleBadge role={detail.user.role} />
        <StatusBadge status={detail.user.status} />
        <span className="text-xs tracking-tight text-muted-foreground">
          {tierLabel(detail.user.planTier)}
        </span>
      </div>
      <UserDetailStats stats={detail.stats} />
      <section className="space-y-2">
        <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Profile
        </h4>
        <UserDetailMeta detail={detail} />
      </section>
      <section className="space-y-2">
        <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recent activity
        </h4>
        <UserDetailActivity events={events} />
      </section>
    </div>
  );
}
