export type SubsFilter = { value: string; label: string; status?: string };

export const SUBS_FILTERS: SubsFilter[] = [
  { value: "all",       label: "All" },
  { value: "active",    label: "Active",    status: "active" },
  { value: "trialing",  label: "Trialing",  status: "trialing" },
  { value: "canceled",  label: "Canceled",  status: "canceled" },
  { value: "past_due",  label: "Past due",  status: "past_due" },
];

export function subsFilterFromParams(p: { status?: string }): string {
  if (p.status) {
    const f = SUBS_FILTERS.find((x) => x.status === p.status);
    if (f) return f.value;
  }
  return "all";
}
