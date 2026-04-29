export type RangeKey = "7" | "30" | "90" | "all";

export const RANGE_OPTIONS: { value: RangeKey; label: string }[] = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
  { value: "all", label: "All time" },
];

export function parseRange(value: string | undefined): RangeKey {
  if (value === "7" || value === "90" || value === "all") return value;
  return "30";
}

export function rangeDays(key: RangeKey): number | null {
  return key === "all" ? null : Number(key);
}

export function rangeLabel(key: RangeKey): string {
  return RANGE_OPTIONS.find((r) => r.value === key)?.label ?? "Last 30 days";
}
