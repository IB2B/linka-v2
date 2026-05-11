import Link from "next/link";
import { Activity as ActivityIcon, ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ActivityRow } from "@/components/admin/activity/activity-row";
import type { ActivityEvent } from "@/types/admin";

export function OverviewActivity({ events }: { events: ActivityEvent[] }) {
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="flex items-center justify-between border-b px-5 py-3">
        <div className="flex items-center gap-2">
          <ActivityIcon className="size-3.5 text-muted-foreground" />
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Recent activity
          </h3>
        </div>
        <Link
          href="/admin/activity"
          className="inline-flex items-center gap-1 text-xs font-medium tracking-tight text-muted-foreground hover:text-foreground"
        >
          View all <ArrowRight className="size-3" />
        </Link>
      </div>
      {events.length === 0 ? (
        <div className="px-5 py-12 text-center text-sm tracking-tight text-muted-foreground">
          Nothing happening yet.
        </div>
      ) : (
        <ul className="divide-y">
          {events.map((e, i) => <ActivityRow key={`${e.at}-${i}`} event={e} />)}
        </ul>
      )}
    </Card>
  );
}
