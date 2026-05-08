export type SubsFilter = {
  value: string;
  label: string;
  tier?: string;
  status?: string;
};

export const SUBS_FILTERS: SubsFilter[] = [
  { value: "all",       label: "All" },
  { value: "active",    label: "Active",    status: "active" },
  { value: "trialing",  label: "Trialing",  status: "trialing" },
  { value: "canceled",  label: "Canceled",  status: "canceled" },
  { value: "past_due",  label: "Past due",  status: "past_due" },
  { value: "free",      label: "Free",      tier: "free" },
  { value: "starter",   label: "Starter",   tier: "starter" },
  { value: "pro",       label: "Pro",       tier: "pro" },
  { value: "scale",     label: "Scale",     tier: "scale" },
];

export function subsFilterFromParams(p: { tier?: string; status?: string }): string {
  if (p.status) {
    const f = SUBS_FILTERS.find((x) => x.status === p.status);
    if (f) return f.value;
  }
  if (p.tier) {
    const f = SUBS_FILTERS.find((x) => x.tier === p.tier);
    if (f) return f.value;
  }
  return "all";
}
