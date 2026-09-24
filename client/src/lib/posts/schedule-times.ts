export type TimeSlot = { hour: number; minute: number };

// The whole day, every 30 minutes. It used to stop at 9 PM, which left no way
// to post in the evening — often the best time on Instagram and TikTok.
export function buildTimeSlots(stepMinutes = 30): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += stepMinutes) slots.push({ hour: h, minute: m });
  }
  return slots;
}

export function combineDateTime(date: Date, slot: TimeSlot): Date {
  const d = new Date(date);
  d.setHours(slot.hour, slot.minute, 0, 0);
  return d;
}

// Where the list should open: the chosen slot, else the first slot still in
// the future today, else 9 AM — so a 48-slot list never opens at midnight.
export function initialSlotIndex(
  slots: TimeSlot[], date: Date, selected: TimeSlot | null,
): number {
  if (selected) {
    const i = slots.findIndex((s) => s.hour === selected.hour && s.minute === selected.minute);
    if (i >= 0) return i;
  }
  const now = Date.now();
  const future = slots.findIndex((s) => combineDateTime(date, s).getTime() > now);
  // future > 0 only on today, once some slots have passed.
  if (future > 0) return future;
  return Math.max(slots.findIndex((s) => s.hour === 9 && s.minute === 0), 0);
}
