export function monthRange(month?: string): [Date, Date] | null {
  if (!month || !/^\d{4}-\d{2}$/.test(month)) return null;
  const start = new Date(`${month}-01T00:00:00Z`);
  const end = new Date(start);
  end.setUTCMonth(end.getUTCMonth() + 1);
  return [start, end];
}
