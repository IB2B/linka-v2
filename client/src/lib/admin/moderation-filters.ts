export type ModFilter = {
  value: string;
  label: string;
  status?: string;
  reason?: string;
};

export const MOD_FILTERS: ModFilter[] = [
  { value: "all",        label: "All" },
  { value: "pending",    label: "Pending",   status: "pending" },
  { value: "reviewing",  label: "Reviewing", status: "reviewing" },
  { value: "actioned",   label: "Actioned",  status: "actioned" },
  { value: "dismissed",  label: "Dismissed", status: "dismissed" },
  { value: "spam",       label: "Spam",          reason: "spam" },
  { value: "harassment", label: "Harassment",    reason: "harassment" },
  { value: "hate",       label: "Hate",          reason: "hate" },
  { value: "sexual",     label: "Sexual",        reason: "sexual" },
];

export function modFilterFromParams(p: { status?: string; reason?: string }): string {
  if (p.status) {
    const f = MOD_FILTERS.find((x) => x.status === p.status);
    if (f) return f.value;
  }
  if (p.reason) {
    const f = MOD_FILTERS.find((x) => x.reason === p.reason);
    if (f) return f.value;
  }
  return "all";
}
