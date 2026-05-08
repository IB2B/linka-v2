import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import { RoleBadge } from "@/components/admin/users/role-badge";
import { StatusBadge } from "@/components/admin/users/status-badge";
import { UserRowActions } from "@/components/admin/users/user-row-actions";
import { formatRelative } from "@/lib/admin/format-relative";
import type { AdminUserRow } from "@/types/admin";

const fmt = new Intl.NumberFormat("en-US");

function fmtDate(s: string): string {
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type Props = { user: AdminUserRow; onSelect: () => void };

export function UserRow({ user, onSelect }: Props) {
  const fullName = `${user.firstName} ${user.lastName}`.trim() || user.email;
  return (
    <tr className="border-t transition hover:bg-muted/40">
      <td className="px-4 py-3">
        <button
          type="button"
          onClick={onSelect}
          className="flex w-full items-center gap-3 rounded text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <InboxAvatar name={fullName} src={user.avatarUrl} />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium tracking-tight">{fullName}</div>
            <div className="truncate text-xs tracking-tight text-muted-foreground">{user.email}</div>
          </div>
        </button>
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
      <td
        className="px-4 py-3 text-sm tabular-nums tracking-tight text-muted-foreground"
        title={user.lastActiveAt ? new Date(user.lastActiveAt).toLocaleString() : undefined}
      >
        {user.lastActiveAt ? formatRelative(user.lastActiveAt) : "—"}
      </td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight text-muted-foreground">
        {fmtDate(user.createdAt)}
      </td>
      <td className="px-4 py-3 text-right">
        <UserRowActions user={user} onView={onSelect} />
      </td>
    </tr>
  );
}
