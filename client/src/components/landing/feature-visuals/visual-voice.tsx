import { MockSurface } from "./mock-surface";
import { MockBar } from "./mock-bar";
import { MockChip } from "./mock-chip";
import { MockRow } from "./mock-row";

export function VisualVoice() {
  return (
    <MockSurface>
      <div className="flex flex-col gap-1.5">
        {["w-4/5", "w-3/5"].map((w) => (
          <MockRow key={w}>
            <MockBar w={w} />
          </MockRow>
        ))}
        <div className="flex flex-col gap-1 rounded-md bg-white px-2 py-1.5 ring-1 ring-[#6D5FF9]/25">
          <MockBar w="w-full" tone="brand" />
          <MockBar w="w-2/3" tone="brand" />
          <div className="pt-0.5">
            <MockChip tone="good">98%</MockChip>
          </div>
        </div>
      </div>
    </MockSurface>
  );
}
