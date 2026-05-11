import Link from "next/link";
import { ArrowRight, UserPlus } from "lucide-react";

import { Card } from "@/components/ui/card";
import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import { formatRelative } from "@/lib/admin/format-relative";
import type { AdminUserRow } from "@/types/admin";

export function OverviewRecentUsers({ users }: { users: AdminUserRow[] }) {
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="flex items-center justify-between border-b px-5 py-3">
        <div className="flex items-center gap-2">
          <UserPlus className="size-3.5 text-muted-foreground" />
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            New signups
          </h3>
        </div>
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-1 text-xs font-medium tracking-tight text-muted-foreground hover:text-foreground"
        >
          All users <ArrowRight className="size-3" />
        </Link>
      </div>
      {users.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm tracking-tight text-muted-foreground">
          No signups yet.
        </div>
      ) : (
        <ul className="divide-y">
          {users.map((u) => {
            const name = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email;
            return (
              <li key={u.id} className="flex items-center gap-3 px-4 py-3">
                <InboxAvatar name={name} src={u.avatarUrl} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium tracking-tight">{name}</div>
                  <div className="truncate text-xs tracking-tight text-muted-foreground">
                    {u.email} · {u.planTier}
                  </div>
                </div>
                <span
                  className="shrink-0 text-xs tabular-nums tracking-tight text-muted-foreground"
                  title={new Date(u.createdAt).toLocaleString()}
                >
                  {formatRelative(u.createdAt)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
