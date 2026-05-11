export type SupportFilter = {
  value: string;
  label: string;
  status?: string;
  priority?: string;
  category?: string;
};

export const SUPPORT_FILTERS: SupportFilter[] = [
  { value: "all",       label: "All" },
  { value: "open",      label: "Open",      status: "open" },
  { value: "pending",   label: "Pending",   status: "pending" },
  { value: "resolved",  label: "Resolved",  status: "resolved" },
  { value: "closed",    label: "Closed",    status: "closed" },
  { value: "urgent",    label: "Urgent",    priority: "urgent" },
  { value: "high",      label: "High",      priority: "high" },
  { value: "bug",       label: "Bugs",      category: "bug" },
  { value: "billing",   label: "Billing",   category: "billing" },
  { value: "feature",   label: "Features",  category: "feature" },
  { value: "account",   label: "Account",   category: "account" },
];

export function supportFilterFromParams(
  p: { status?: string; priority?: string; category?: string },
): string {
  if (p.status) {
    const f = SUPPORT_FILTERS.find((x) => x.status === p.status);
    if (f) return f.value;
  }
  if (p.priority) {
    const f = SUPPORT_FILTERS.find((x) => x.priority === p.priority);
    if (f) return f.value;
  }
  if (p.category) {
    const f = SUPPORT_FILTERS.find((x) => x.category === p.category);
    if (f) return f.value;
  }
  return "all";
}
