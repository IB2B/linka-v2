export type MonthOption = { value: string; label: string };

export function buildMonthOptions(count = 12): MonthOption[] {
  const now = new Date();
  const opts: MonthOption[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    opts.push({ value, label });
  }
  return opts;
}

export const MONTHS = buildMonthOptions();
