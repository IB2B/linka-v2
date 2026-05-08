import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import { ContentPlatforms } from "@/components/admin/content/content-platforms";
import { ContentStatusBadge } from "@/components/admin/content/content-status-badge";
import { ContentThumb } from "@/components/admin/content/content-thumb";
import { formatRelative } from "@/lib/admin/format-relative";
import type { AdminContentRow } from "@/types/admin-content";

function fmtDate(s: string): string {
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function whenText(row: AdminContentRow): string | null {
  if (row.status === "posted" && row.postedAt) return `Posted ${fmtDate(row.postedAt)}`;
  if (row.status === "scheduled" && row.scheduledFor) return `For ${fmtDate(row.scheduledFor)}`;
  return null;
}

export function ContentRow({ row }: { row: AdminContentRow }) {
  const fullName = `${row.firstName} ${row.lastName}`.trim() || row.email;
  const when = whenText(row);
  return (
    <tr className="border-t transition hover:bg-muted/40">
      <td className="px-4 py-3">
        <div className="flex items-start gap-3">
          <ContentThumb src={row.imageUrl} alt={row.excerpt.slice(0, 40)} />
          <p className="line-clamp-2 max-w-xl text-sm tracking-tight text-foreground/90">
            {row.excerpt || <span className="italic text-muted-foreground">No content</span>}
          </p>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <InboxAvatar name={fullName} src={row.avatarUrl} />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium tracking-tight">{fullName}</div>
            <div className="truncate text-xs tracking-tight text-muted-foreground">{row.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3"><ContentPlatforms primary={row.platform} platforms={row.platforms} /></td>
      <td className="px-4 py-3"><ContentStatusBadge status={row.status} /></td>
      <td className="px-4 py-3 text-xs tabular-nums tracking-tight text-muted-foreground">
        {when ?? "—"}
      </td>
      <td
        className="px-4 py-3 text-xs tabular-nums tracking-tight text-muted-foreground"
        title={new Date(row.createdAt).toLocaleString()}
      >
        {formatRelative(row.createdAt)}
      </td>
    </tr>
  );
}
