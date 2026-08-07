import { MockSurface } from "./mock-surface";
import { MockBar } from "./mock-bar";

// Three board columns with a thinning card count — a pipeline, not a grid.
const COLUMNS = [3, 2, 1];

export function VisualPipeline() {
  return (
    <MockSurface>
      <div className="grid h-full grid-cols-3 gap-1.5">
        {COLUMNS.map((count, c) => (
          <div key={c} className="flex flex-col gap-1">
            <span className="h-1 w-5 rounded-full bg-[#D8D8D8]" />
            <div className="flex flex-1 flex-col gap-1 rounded-md bg-white p-1 ring-1 ring-[#EFEFEF]">
              {Array.from({ length: count }, (_, i) => (
                <span
                  key={i}
                  className="flex h-4 items-center rounded-[3px] bg-[#FAFAFA] px-1 ring-1 ring-[#F0F0F0]"
                >
                  <MockBar w={i % 2 ? "w-1/2" : "w-3/4"} tone={c === 2 ? "brand" : undefined} />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MockSurface>
  );
}
