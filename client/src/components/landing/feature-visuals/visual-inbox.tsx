import { CornerDownRight } from "lucide-react";

import { MockSurface } from "./mock-surface";
import { MockBar } from "./mock-bar";
import { MockChip } from "./mock-chip";

const THREADS = [
  { avatar: "bg-[#6D5FF9]/20", w: "w-3/5" },
  { avatar: "bg-[#00A06C]/20", w: "w-2/5" },
];

export function VisualInbox() {
  return (
    <MockSurface>
      <div className="flex flex-col gap-1.5">
        {THREADS.map((t) => (
          <div
            key={t.avatar}
            className="flex flex-col gap-1.5 rounded-md bg-white px-2 py-1.5 ring-1 ring-[#EFEFEF]"
          >
            <div className="flex items-center gap-1.5">
              <span className={`size-3.5 shrink-0 rounded-full ${t.avatar}`} />
              <MockBar w={t.w} />
            </div>
            <div className="flex items-center gap-1.5 pl-5">
              <CornerDownRight className="size-2.5 shrink-0 text-[#C4C4C4]" />
              <MockBar w="w-1/2" tone="brand" />
              <MockChip tone="good">✓</MockChip>
            </div>
          </div>
        ))}
      </div>
    </MockSurface>
  );
}
