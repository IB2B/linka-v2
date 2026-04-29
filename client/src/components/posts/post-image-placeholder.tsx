import { ImageIcon } from "lucide-react";

export function PostImagePlaceholder() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-muted">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,0,0,0.04) 45deg, transparent 90deg, rgba(0,0,0,0.04) 135deg, transparent 180deg, rgba(0,0,0,0.04) 225deg, transparent 270deg, rgba(0,0,0,0.04) 315deg, transparent 360deg)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/5"
      />
      <div className="relative flex size-12 items-center justify-center rounded-full bg-background/70 shadow-sm ring-1 ring-foreground/5">
        <ImageIcon className="size-5 text-muted-foreground/60" />
      </div>
    </div>
  );
}
