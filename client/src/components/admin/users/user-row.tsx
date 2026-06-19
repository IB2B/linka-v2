"use client";

import { type KeyboardEvent } from "react";
import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import { RoleBadge } from "@/components/admin/users/role-badge";
import { StatusBadge } from "@/components/admin/users/status-badge";
import { UserRowActions } from "@/components/admin/users/user-row-actions";
import { tierLabel, formatMoney } from "@/lib/billing/format";
import { formatRelative } from "@/lib/admin/format-relative";
import type { AdminUserRow } from "@/types/admin";

const fmt = new Intl.NumberFormat("en-US");

function fmtDate(s: string): string {
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type Props = { user: AdminUserRow; onOpen: () => void };

export function UserRow({ user, onOpen }: Props) {
  const fullName = `${user.firstName} ${user.lastName}`.trim() || user.email;

  function onKeyDown(e: KeyboardEvent<HTMLTableRowElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  }

  return (
    <tr
      onClick={onOpen}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open details for ${fullName}`}
      className="cursor-pointer border-t transition hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <InboxAvatar name={fullName} src={user.avatarUrl} />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium tracking-tight">{fullName}</div>
            <div className="truncate text-xs tracking-tight text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
      <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
      <td className="px-4 py-3 text-sm tracking-tight text-muted-foreground">{tierLabel(user.planTier)}</td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight text-muted-foreground">
        {user.mrr != null ? formatMoney(user.mrr, user.mrrCurrency ?? "eur") : "—"}
      </td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight">
        {fmt.format(user.postsThisMonth)}
        <span className="text-muted-foreground"> / {user.postsLimit >= 10000 ? "∞" : fmt.format(user.postsLimit)}</span>
      </td>
      <td className="px-4 py-3 text-sm tracking-tight text-muted-foreground">{user.industry ?? "—"}</td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight text-muted-foreground">{fmtDate(user.createdAt)}</td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight text-muted-foreground">
        {user.lastActiveAt ? formatRelative(user.lastActiveAt) : "—"}
      </td>
      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
        <UserRowActions user={user} />
      </td>
    </tr>
  );
}
