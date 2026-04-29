import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-4 w-80" />
      <Skeleton className="h-[560px] w-full rounded-md" />
    </div>
  );
}
