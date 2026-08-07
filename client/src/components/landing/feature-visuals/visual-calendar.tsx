import { MockSurface } from "./mock-surface";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
// Scheduled slots per day — uneven on purpose, a real week is not a pattern.
const SLOTS = [2, 0, 3, 1, 2, 0, 1];

export function VisualCalendar() {
  return (
    <MockSurface>
      <div className="grid h-full grid-cols-7 gap-1">
        {DAYS.map((d, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-center text-[8.5px] leading-none text-[#A3A3A3]">
              {d}
            </span>
            <div className="flex flex-1 flex-col gap-1 rounded-md bg-white p-1 ring-1 ring-[#EFEFEF]">
              {Array.from({ length: SLOTS[i] }, (_, s) => (
                <span
                  key={s}
                  className="h-2 rounded-[3px] bg-[#6D5FF9]/25"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </MockSurface>
  );
}
