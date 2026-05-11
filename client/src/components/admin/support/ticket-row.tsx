import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { SupportStatusBadge } from "@/components/admin/support/support-status-badge";
import { SupportCategoryPill } from "@/components/admin/support/support-category-pill";
import { SupportPriorityMenu } from "@/components/admin/support/support-priority-menu";
import { SupportRequester } from "@/components/admin/support/support-requester";
import { SupportActions } from "@/components/admin/support/support-actions";
import { formatRelative } from "@/lib/admin/format-relative";
import type { SupportRow } from "@/types/admin-support";

export function TicketRow({ row }: { row: SupportRow }) {
  return (
    <tr className="border-t align-middle transition hover:bg-muted/40">
      <td className="px-4 py-3 max-w-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/support/${row.id}`}
              className="truncate text-sm font-medium tracking-tight transition-colors hover:text-blue-600 hover:underline dark:hover:text-blue-400"
            >
              {row.subject}
            </Link>
            <SupportCategoryPill category={row.category} />
          </div>
          <p className="line-clamp-2 text-xs tracking-tight text-muted-foreground">
            {row.body}
          </p>
        </div>
      </td>
      <td className="px-4 py-3"><SupportRequester user={row.user} /></td>
      <td className="px-4 py-3"><SupportStatusBadge status={row.status} /></td>
      <td className="px-4 py-3"><SupportPriorityMenu id={row.id} priority={row.priority} /></td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight text-muted-foreground">
        <div title={new Date(row.createdAt).toLocaleString()}>
          {formatRelative(row.createdAt)}
        </div>
        {row.replyCount > 0 ? (
          <div className="mt-0.5 inline-flex items-center gap-1 text-xs">
            <MessageCircle className="size-3" />
            {row.replyCount}
          </div>
        ) : null}
      </td>
      <td className="px-4 py-3 text-right">
        <SupportActions id={row.id} status={row.status} />
      </td>
    </tr>
  );
}
