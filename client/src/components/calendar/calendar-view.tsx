"use client";

import { useMemo, useState } from "react";

import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";
import { buildMonth } from "@/lib/calendar/build-month";
import type { GeneratedPost } from "@/types/post";
import type { PlatformFilter, StatusFilter } from "@/types/calendar";

export function CalendarView({ posts }: { posts: GeneratedPost[] }) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
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
  const days = useMemo(
    () => buildMonth(cursor, filtered),
    [cursor, filtered],
  );

  function shift(months: number) {
    setCursor(
      (c) => new Date(c.getFullYear(), c.getMonth() + months, 1),
    );
  }
  function today() {
    const d = new Date();
    setCursor(new Date(d.getFullYear(), d.getMonth(), 1));
  }

  return (
    <div className="space-y-3">
      <CalendarHeader
        cursor={cursor}
        status={status}
        platform={platform}
        onPrev={() => shift(-1)}
        onNext={() => shift(1)}
        onToday={today}
        onStatusChange={setStatus}
        onPlatformChange={setPlatform}
      />
      <CalendarGrid days={days} />
    </div>
  );
}
