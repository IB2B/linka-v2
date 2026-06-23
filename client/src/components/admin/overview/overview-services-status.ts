import type { IntegrationStatus } from "@/types/admin-settings.types";

// Dot colour per service: green = live, red = down, amber = missing config,
// slate = configured but not actively probed (e.g. Late/SMTP/Imagine/Tavily).
export function serviceDot(i: IntegrationStatus): string {
  if (!i.configured) return "bg-amber-500";
  if (i.reachable === false) return "bg-rose-500";
  if (i.reachable === true) return "bg-emerald-500";
  return "bg-zinc-400";
}

export type HealthSummary = { label: string; tone: string; dot: string };

export function summarise(items: IntegrationStatus[]): HealthSummary {
  const down = items.filter((i) => i.configured && i.reachable === false).length;
  const missing = items.filter((i) => !i.configured).length;
  if (down > 0) {
    return { label: `${down} service${down > 1 ? "s" : ""} down`,
      tone: "text-rose-600 dark:text-rose-400", dot: "bg-rose-500" };
  }
  if (missing > 0) {
    return { label: `${missing} not configured`,
      tone: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" };
  }
  return { label: "All systems operational",
    tone: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" };
}
