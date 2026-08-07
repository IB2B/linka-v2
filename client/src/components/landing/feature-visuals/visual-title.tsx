import { MockSurface } from "./mock-surface";
import { MockBar } from "./mock-bar";
import { MockChip } from "./mock-chip";

export function VisualTitle() {
  return (
    <MockSurface>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between rounded-md bg-white px-2 py-2 ring-1 ring-[#6D5FF9]/25">
          <MockBar w="w-2/3" tone="brand" />
          <span className="text-[9px] tabular-nums leading-none text-[#A3A3A3]">
            68/100
          </span>
        </div>
        <div className="flex flex-col gap-1 rounded-md bg-white px-2 py-1.5 ring-1 ring-[#EFEFEF]">
          <MockBar w="w-full" />
          <MockBar w="w-4/5" />
        </div>
        <div className="flex gap-1">
          <MockChip tone="good">Reddit</MockChip>
          <MockChip tone="good">YouTube</MockChip>
          <MockChip tone="good">Pinterest</MockChip>
        </div>
      </div>
    </MockSurface>
  );
}
