import { MockSurface } from "./mock-surface";
import { MockBar } from "./mock-bar";
import { MockChip } from "./mock-chip";

const TOPICS = [
  { score: 92, w: "w-[92%]" },
  { score: 78, w: "w-[78%]" },
  { score: 61, w: "w-[61%]" },
];

export function VisualRadar() {
  return (
    <MockSurface>
      <div className="flex flex-col gap-1.5">
        {TOPICS.map((t) => (
          <div
            key={t.score}
            className="flex items-center gap-2 rounded-md bg-white px-2 py-1.5 ring-1 ring-[#EFEFEF]"
          >
            <span className="flex-1">
              <MockBar w="w-3/4" />
            </span>
            <span className="h-1 w-10 overflow-hidden rounded-full bg-[#F0F0F0]">
              <span className={`block h-full rounded-full bg-[#6D5FF9]/45 ${t.w}`} />
            </span>
            <MockChip tone="brand">{t.score}</MockChip>
          </div>
        ))}
      </div>
    </MockSurface>
  );
}
