"use client";

import { useState } from "react";
import { Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import { UserRow } from "@/components/admin/users/user-row";
import { UserDetailSheet } from "@/components/admin/users/user-detail-sheet";
import type { AdminUserRow } from "@/types/admin";

export function UsersTable({ users }: { users: AdminUserRow[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
  return (
    <>
      <Card size="sm" className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/40">
              <tr className="text-xs font-medium tracking-tight text-muted-foreground">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Posts</th>
                <th className="px-4 py-3">Industry</th>
                <th className="px-4 py-3">Last active</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <UserRow key={u.id} user={u} onSelect={() => setSelectedId(u.id)} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <UserDetailSheet userId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  );
}
