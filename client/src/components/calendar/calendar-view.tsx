"use client";

import { useMemo, useState } from "react";

import { CalendarHeader } from "./calendar-header";
import { CalendarBody } from "./calendar-body";
import { shiftCursor } from "@/lib/calendar/view-range";
import type { GeneratedPost } from "@/types/post";
import type { CalendarViewMode, PlatformFilter, StatusFilter } from "@/types/calendar";

function startOfToday(): Date {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function CalendarView({ posts }: { posts: GeneratedPost[] }) {
  const [view, setView] = useState<CalendarViewMode>("month");
  const [cursor, setCursor] = useState(startOfToday);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [platform, setPlatform] = useState<PlatformFilter>("all");

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (status === "all" || p.status === status) &&
          (platform === "all" || p.platform?.toLowerCase() === platform),
      ),
    [posts, status, platform],
  );

  function open(next: CalendarViewMode, date: Date) {
    setView(next);
    setCursor(date);
  }

  return (
    <div className="space-y-3">
      <CalendarHeader
        cursor={cursor}
        view={view}
        status={status}
        platform={platform}
        onPrev={() => setCursor((c) => shiftCursor(c, view, -1))}
        onNext={() => setCursor((c) => shiftCursor(c, view, 1))}
        onToday={() => setCursor(startOfToday())}
        onViewChange={setView}
        onStatusChange={setStatus}
        onPlatformChange={setPlatform}
      />
      <CalendarBody view={view} cursor={cursor} posts={filtered}
        onOpenDay={(d) => open("day", d)} onOpenMonth={(d) => open("month", d)} />
    </div>
  );
}
