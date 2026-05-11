import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";

import { Card } from "@/components/ui/card";
import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import type { TopPublisher } from "@/types/admin-analytics";

const fmt = new Intl.NumberFormat("en-US");

export function TopPublishers({ users }: { users: TopPublisher[] }) {
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="flex items-center justify-between border-b px-5 py-3">
        <div className="flex items-center gap-2">
          <Trophy className="size-3.5 text-muted-foreground" />
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Top publishers
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
          No published posts in this range.
        </div>
      ) : (
        <ul className="divide-y">
          {users.map((u, i) => {
            const name = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email;
            return (
              <li key={u.id} className="flex items-center gap-3 px-4 py-3">
                <span className="grid size-5 shrink-0 place-items-center rounded-md bg-muted text-[11px] font-medium tabular-nums text-muted-foreground">
                  {i + 1}
                </span>
                <InboxAvatar name={name} src={u.avatarUrl} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium tracking-tight">{name}</div>
                  <div className="truncate text-xs tracking-tight text-muted-foreground">
                    {u.email}
                  </div>
                </div>
                <span className="shrink-0 text-sm font-medium tabular-nums tracking-tight">
                  {fmt.format(u.count)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
