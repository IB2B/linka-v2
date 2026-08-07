import { MockSurface } from "./mock-surface";
import { MockBar } from "./mock-bar";
import { MockChip } from "./mock-chip";
import { MockRow } from "./mock-row";

// One idea, three different lengths — the point of the feature is that the
// output is not the same text three times.
const OUT = [
  { name: "LinkedIn", w: "w-4/5" },
  { name: "X", w: "w-1/3" },
  { name: "Reddit", w: "w-3/5" },
];

export function VisualFanout() {
  return (
    <MockSurface>
      <div className="flex flex-col gap-1.5">
        <div className="rounded-md bg-[#6D5FF9]/8 px-2 py-1.5 ring-1 ring-[#6D5FF9]/15">
          <MockBar w="w-1/2" tone="brand" />
        </div>
        {OUT.map((o) => (
          <MockRow key={o.name}>
            <MockChip>{o.name}</MockChip>
            <MockBar w={o.w} />
          </MockRow>
        ))}
      </div>
    </MockSurface>
  );
}
