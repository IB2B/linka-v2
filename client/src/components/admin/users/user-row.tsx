import Link from "next/link";
import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import { RoleBadge } from "@/components/admin/users/role-badge";
import { StatusBadge } from "@/components/admin/users/status-badge";
import { UserRowActions } from "@/components/admin/users/user-row-actions";
import type { AdminUserRow } from "@/types/admin";

const fmt = new Intl.NumberFormat("en-US");

function fmtDate(s: string): string {
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function UserRow({ user }: { user: AdminUserRow }) {
  const fullName = `${user.firstName} ${user.lastName}`.trim() || user.email;
  return (
    <tr className="border-t transition hover:bg-muted/40">
      <td className="px-4 py-3">
        <Link
          href={`/admin/users/${user.id}`}
          className="flex items-center gap-3"
        >
          <InboxAvatar name={fullName} src={user.avatarUrl} />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium tracking-tight">{fullName}</div>
            <div className="truncate text-xs tracking-tight text-muted-foreground">{user.email}</div>
          </div>
        </Link>
      </td>
      <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
      <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
      <td className="px-4 py-3 text-sm capitalize tracking-tight text-muted-foreground">
        {user.planTier}
      </td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight">
        {fmt.format(user.postsCount)}
      </td>
      <td className="px-4 py-3 text-sm tracking-tight text-muted-foreground">
        {user.industry ?? "—"}
      </td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight text-muted-foreground">
        {fmtDate(user.createdAt)}
      </td>
      <td className="px-4 py-3 text-right">
        <UserRowActions user={user} />
      </td>
    </tr>
  );
}
