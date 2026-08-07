import { MockSurface } from "./mock-surface";
import { MockChip } from "./mock-chip";
import { MockRow } from "./mock-row";

// The rule is per-platform and enforced: three, five, none.
const RULES = [
  { name: "LinkedIn", tags: 3 },
  { name: "Instagram", tags: 5 },
  { name: "Reddit", tags: 0 },
];

export function VisualHashtags() {
  return (
    <MockSurface>
      <div className="flex flex-col gap-1.5">
        {RULES.map((r) => (
          <MockRow key={r.name}>
            <MockChip>{r.name}</MockChip>
            <span className="flex flex-1 items-center gap-1">
              {Array.from({ length: r.tags }, (_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-4 rounded-full bg-[#6D5FF9]/25"
                />
              ))}
              {r.tags === 0 && (
                <span className="text-[9.5px] leading-none text-[#A3A3A3]">—</span>
              )}
            </span>
          </MockRow>
        ))}
      </div>
    </MockSurface>
  );
}
