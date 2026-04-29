export type TimeSlot = { hour: number; minute: number };

export function buildTimeSlots(
  startHour = 9,
  endHour = 21,
  stepMinutes = 30,
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      if (h === endHour && m > 0) break;
      slots.push({ hour: h, minute: m });
    }
  }
  return slots;
}

export function combineDateTime(date: Date, slot: TimeSlot): Date {
  const d = new Date(date);
  d.setHours(slot.hour, slot.minute, 0, 0);
  return d;
}
