import { cn } from "@/lib/utils";

function Bar({ className }: { className?: string }) {
  return <div className={cn("rounded-md bg-muted", className)} />;
}

function BubbleLeft() {
  return (
    <div className="flex items-end gap-2">
      <div className="size-7 shrink-0 rounded-full bg-muted" />
      <Bar className="h-9 w-48" />
    </div>
  );
}

function BubbleRight() {
  return (
    <div className="flex justify-end">
      <Bar className="h-9 w-56 bg-primary/20" />
    </div>
  );
}

export function ThreadSkeleton() {
  return (
    <div className="flex h-full flex-col animate-pulse">
      {/* header */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <div className="size-8 rounded-full bg-muted" />
        <div className="space-y-1.5">
          <Bar className="h-3 w-28" />
          <Bar className="h-2.5 w-16" />
        </div>
      </div>
      {/* messages */}
      <div className="flex-1 space-y-4 overflow-hidden p-4">
        <BubbleLeft />
        <BubbleRight />
        <BubbleLeft />
        <BubbleLeft />
        <BubbleRight />
        <BubbleLeft />
      </div>
      {/* composer */}
      <div className="border-t p-3">
        <Bar className="mb-2 h-7 w-24" />
        <Bar className="h-9 w-full" />
      </div>
    </div>
  );
}
