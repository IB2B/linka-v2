import { ActivityAvatar } from "@/components/admin/activity/activity-avatar";
import { metaFor } from "@/lib/admin/activity-meta";
import { formatRelative } from "@/lib/admin/format-relative";
import type { ActivityEvent } from "@/types/admin";

export function ActivityRow({ event }: { event: ActivityEvent }) {
  const { verb } = metaFor(event.type);
  const actorName = event.actor
    ? `${event.actor.firstName} ${event.actor.lastName}`.trim() || event.actor.email
    : "Someone";

  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <ActivityAvatar actor={event.actor} type={event.type} />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-sm tracking-tight">
          <span className="font-medium">{actorName}</span>{" "}
          <span className="text-muted-foreground">{verb(event.detail)}</span>
        </p>
        {event.actor && (
          <p className="truncate text-xs tracking-tight text-muted-foreground">
            {event.actor.email}
          </p>
        )}
      </div>
      <span
        className="shrink-0 text-xs tracking-tight text-muted-foreground tabular-nums"
        title={new Date(event.at).toLocaleString()}
      >
        {formatRelative(event.at)}
      </span>
    </li>
  );
}
