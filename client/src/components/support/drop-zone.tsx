import { cn } from "@/lib/utils";

type Props = {
  onDrop: (file: File) => void;
  dragging: boolean;
  onDraggingChange: (v: boolean) => void;
  children: React.ReactNode;
};

export function DropZone({ onDrop, dragging, onDraggingChange, children }: Props) {
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    onDraggingChange(false);
    const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith("image/"));
    if (file) onDrop(file);
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); onDraggingChange(true); }}
      onDragLeave={() => onDraggingChange(false)}
      onDrop={handleDrop}
      className={cn(
        "rounded-xl border bg-background ring-1 ring-transparent transition focus-within:ring-ring",
        dragging && "ring-primary",
      )}
    >
      {children}
    </div>
  );
}
