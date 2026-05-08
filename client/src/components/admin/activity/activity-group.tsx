import { Card } from "@/components/ui/card";
import { ActivityRow } from "@/components/admin/activity/activity-row";
import type { EventGroup } from "@/lib/admin/group-events";

export function ActivityGroup({ group }: { group: EventGroup }) {
  return (
    <section className="flex flex-col gap-2">
      <header className="flex items-center gap-3 px-1">
        <h3 className="text-xs font-semibold tracking-tight uppercase text-muted-foreground">
          {group.label}
        </h3>
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs tabular-nums tracking-tight text-muted-foreground">
          {group.events.length}
        </span>
      </header>
      <Card size="sm" className="py-0">
        <ul className="flex flex-col divide-y">
          {group.events.map((e, i) => (
            <ActivityRow key={`${e.type}-${e.at}-${i}`} event={e} />
          ))}
        </ul>
      </Card>
    </section>
  );
}
