"use client";

import { Spinner } from "@/components/ui/spinner";
import { formatAge } from "@/components/pipeline/format-age";

type Props = { count: number; fetchedAt: string | null; pending: boolean };

export function TrendsMeta({ count, fetchedAt, pending }: Props) {
  if (pending) {
    return (
      <p className="flex items-center gap-1.5 px-1 text-xs text-muted-foreground">
        <Spinner size="xs" aria-hidden />
        Scanning the latest news…
      </p>
    );
  }
  if (!count || !fetchedAt) return null;
  const age = formatAge(fetchedAt);
  const noun = count === 1 ? "trend" : "trends";
  return (
    <p className="px-1 text-xs text-muted-foreground" suppressHydrationWarning>
      {age === "now" ? "Updated just now" : `Updated ${age} ago`} · {count} {noun}
    </p>
  );
}
