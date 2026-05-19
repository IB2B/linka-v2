"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { UserRow } from "@/components/admin/users/user-row";
import { SortableTh } from "@/components/admin/users/sortable-th";
import { UserQuickViewSheet } from "@/components/admin/users/user-quick-view-sheet";
import type { SortDir, SortKey } from "@/lib/admin/users-sort";
import type { AdminUserRow } from "@/types/admin";

type Props = {
  users: AdminUserRow[];
  sort?: SortKey;
  dir?: SortDir;
  params: Record<string, string | undefined>;
};

export function UsersTable({ users, sort, dir, params }: Props) {
  const [selected, setSelected] = useState<AdminUserRow | null>(null);

  if (users.length === 0) {
    return (
      <Card size="sm" className="items-center justify-center gap-3 px-6 py-16 text-center">
        <Users className="size-5 text-muted-foreground" />
        <p className="text-sm font-medium tracking-tight">No users match this filter</p>
        <p className="max-w-sm text-sm tracking-tight text-muted-foreground">
          Clear the filter or try a different search term.
        </p>
      </Card>
    );
  }
  const headerProps = { current: sort, dir, params };
  return (
    <>
      <Card size="sm" className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/40">
              <tr>
                <SortableTh label="User" sortKey="name" {...headerProps} />
                <SortableTh label="Role" sortKey="role" {...headerProps} />
                <SortableTh label="Status" sortKey="status" {...headerProps} />
                <SortableTh label="Plan" sortKey="plan" {...headerProps} />
                <SortableTh label="Posts" sortKey="posts" {...headerProps} />
                <SortableTh label="Industry" sortKey="industry" {...headerProps} />
                <SortableTh label="Joined" sortKey="joined" {...headerProps} />
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <UserRow key={u.id} user={u} onOpen={() => setSelected(u)} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {selected && (
        <UserQuickViewSheet
          key={selected.id}
          user={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
