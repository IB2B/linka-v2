import Link from "next/link";
import { CalendarPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CalendarAgendaRow } from "./calendar-agenda-row";
import { dateKey } from "@/lib/calendar/format";
import { generateHref } from "@/lib/calendar/generate-href";
import { isPastDay } from "@/lib/calendar/view-range";
import type { GeneratedPost } from "@/types/post";

type Props = { date: Date; posts: GeneratedPost[] };

export function CalendarDayView({ date, posts }: Props) {
  const canCreate = !isPastDay(date);
  return (
    <div className="space-y-3 rounded-md border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          {posts.length === 0 ? "Nothing on this day yet." : `${posts.length} post${posts.length === 1 ? "" : "s"}`}
        </p>
        {canCreate ? (
          <Button render={<Link href={generateHref(dateKey(date))} />}
            nativeButton={false} size="sm" variant="outline">
            <CalendarPlus className="size-4" />
            Create a post for this day
          </Button>
        ) : null}
      </div>
      {posts.length > 0 ? (
        <div className="flex flex-col gap-2">
          {posts.map((p) => <CalendarAgendaRow key={p.id} post={p} />)}
        </div>
      ) : null}
    </div>
  );
}
