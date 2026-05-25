import { Card } from "@/components/ui/card";
import { metaFor, TONE_CLASSES } from "@/lib/admin/activity-meta";
import { formatRelative } from "@/lib/admin/format-relative";
import type { ActivityEvent } from "@/types/admin";

export function UserDetailActivity({ events }: { events: ActivityEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/30 px-4 py-6 text-center text-sm tracking-tight text-muted-foreground">
        No activity recorded yet.
      </div>
    );
  }
  return (
    <Card size="sm" className="py-0">
      <ul className="flex flex-col divide-y">
        {events.map((e, i) => {
          const { Icon, tone, verb } = metaFor(e.type);
          return (
            <li key={i} className="flex items-center gap-3 px-4 py-2.5">
              <span className={`grid size-7 shrink-0 place-items-center rounded-full ring-1 ${TONE_CLASSES[tone]}`}>
                <Icon className="size-3.5" />
              </span>
              <span className="flex-1 truncate text-sm tracking-tight text-muted-foreground">
                {verb(e.detail)}
              </span>
              <span
                className="shrink-0 text-xs tabular-nums tracking-tight text-muted-foreground"
                title={new Date(e.at).toLocaleString()}
              >
                {formatRelative(e.at)}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
