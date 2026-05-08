import { Activity as ActivityIcon } from "lucide-react";

import { ActivityGroup } from "@/components/admin/activity/activity-group";
import { groupEventsByDate } from "@/lib/admin/group-events";
import type { ActivityEvent } from "@/types/admin";

export function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/30 px-6 py-16 text-center">
        <ActivityIcon className="size-5 text-muted-foreground" />
        <p className="text-sm font-medium tracking-tight">Nothing here yet</p>
        <p className="max-w-sm text-sm tracking-tight text-muted-foreground">
          Try a different filter, or wait for users to do something interesting.
        </p>
      </div>
    );
  }
  const groups = groupEventsByDate(events);
  return (
    <div className="flex flex-col gap-6">
      {groups.map((g) => <ActivityGroup key={g.label} group={g} />)}
    </div>
  );
}
