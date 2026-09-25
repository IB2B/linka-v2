import Link from "next/link";
import { Plus } from "lucide-react";

import { generateHref } from "@/lib/calendar/generate-href";
import { cn } from "@/lib/utils";

type Props = { dayKey: string; className?: string };

// Starts the generate flow for this day; the new post opens with the
// schedule dialog already on that date.
export function CalendarAddButton({ dayKey, className }: Props) {
  return (
    <Link
      href={generateHref(dayKey)}
      aria-label={`Create a post for ${dayKey}`}
      title="Create a post for this day"
      className={cn(
        "flex size-5 items-center justify-center rounded-md text-muted-foreground transition hover:bg-primary hover:text-primary-foreground",
        "opacity-0 group-hover/day:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
        className,
      )}
    >
      <Plus className="size-3.5" />
    </Link>
  );
}
