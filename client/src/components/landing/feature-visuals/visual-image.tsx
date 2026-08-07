import { MockSurface } from "./mock-surface";

// Landscape, square and portrait crops, each carrying the brand swatch.
const FRAMES = ["aspect-[16/10] w-[46%]", "aspect-square w-[26%]", "aspect-[3/4] w-[20%]"];

export function VisualImage() {
  return (
    <MockSurface>
      <div className="flex h-full items-center gap-2">
        {FRAMES.map((f) => (
          <div
            key={f}
            className={`${f} relative overflow-hidden rounded-md bg-[linear-gradient(135deg,#6D5FF9_0%,#9C8BFF_55%,#F0EEFF_100%)] ring-1 ring-[#E9E9E9]`}
          >
            <span className="absolute bottom-1 left-1 size-1.5 rounded-[2px] bg-white/85" />
          </div>
        ))}
      </div>
    </MockSurface>
  );
}
