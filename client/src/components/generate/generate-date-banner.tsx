import Link from "next/link";
import { CalendarDays } from "lucide-react";

const fmt = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" });

export function GenerateDateBanner({ date }: { date: Date }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-brand-soft/60 px-4 py-2.5 text-sm">
      <CalendarDays className="size-4 shrink-0 text-primary" />
      <p className="min-w-0 flex-1">
        Creating a post for <span className="font-semibold">{fmt.format(date)}</span>.
        You&apos;ll pick the time right after it&apos;s generated.
      </p>
      <Link href="/dashboard/calendar" className="text-xs font-medium text-muted-foreground hover:text-foreground">
        Back to calendar
      </Link>
    </div>
  );
}
