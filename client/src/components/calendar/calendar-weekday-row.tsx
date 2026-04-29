import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarWeekdayRow() {
  return (
    <div className="grid grid-cols-7 border-b bg-muted/40">
      {WEEKDAYS.map((day, i) => {
        const isWeekend = i === 0 || i === 6;
        return (
          <div
            key={day}
            className={cn(
              "px-2 py-2 text-center text-xs font-medium tracking-wide uppercase",
              isWeekend ? "text-foreground/70" : "text-muted-foreground",
            )}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
