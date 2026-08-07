import { Play } from "lucide-react";

import { MockSurface } from "./mock-surface";

// A waveform that reads as speech rather than a decorative equaliser.
const WAVE = [3, 6, 10, 7, 12, 5, 9, 14, 6, 4, 8, 11, 5, 3];

export function VisualAvatar() {
  return (
    <MockSurface>
      <div className="flex h-full items-center gap-2">
        <div className="relative flex h-full w-[42%] items-center justify-center overflow-hidden rounded-md bg-[#0F1113]">
          <span className="absolute bottom-0 h-[52%] w-[44%] rounded-t-full bg-white/15" />
          <span className="absolute bottom-[46%] size-4 rounded-full bg-white/25" />
          <Play className="relative size-3 fill-white text-white" />
        </div>
        <div className="flex h-8 flex-1 items-center gap-[3px]">
          {WAVE.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h * 2}px` }}
              className="w-[3px] flex-1 rounded-full bg-[#6D5FF9]/35"
            />
          ))}
        </div>
      </div>
    </MockSurface>
  );
}
