"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CalendarFilter } from "./calendar-filter";
import { CalendarPlatformFilter } from "./calendar-platform-filter";
import { CalendarViewSwitch } from "./calendar-view-switch";
import { viewLabel } from "@/lib/calendar/view-range";
import type { CalendarViewMode, PlatformFilter, StatusFilter } from "@/types/calendar";

type Props = {
  cursor: Date;
  view: CalendarViewMode;
  status: StatusFilter;
  platform: PlatformFilter;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (v: CalendarViewMode) => void;
  onStatusChange: (f: StatusFilter) => void;
  onPlatformChange: (f: PlatformFilter) => void;
};

export function CalendarHeader(props: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={props.onPrev} aria-label={`Previous ${props.view}`}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={props.onToday}>
            Today
          </Button>
          <Button size="sm" variant="outline" onClick={props.onNext} aria-label={`Next ${props.view}`}>
            <ChevronRight className="size-4" />
          </Button>
          <h2 className="ml-2 text-lg font-semibold tracking-tight">
            {viewLabel(props.cursor, props.view)}
          </h2>
        </div>
        <CalendarViewSwitch value={props.view} onChange={props.onViewChange} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <CalendarPlatformFilter value={props.platform} onChange={props.onPlatformChange} />
        <CalendarFilter value={props.status} onChange={props.onStatusChange} />
      </div>
    </div>
  );
}
