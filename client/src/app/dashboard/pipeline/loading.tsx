import { Skeleton } from "@/components/ui/skeleton";
import { PageSkeletonHeader } from "@/components/dashboard/page-skeleton-header";

export default function Loading() {
  return (
    <>
      <PageSkeletonHeader titleW="w-32" descW="w-96" />
      <div className="-mx-6 min-h-0 flex-1 overflow-hidden px-6 pb-2">
        <div className="flex h-full gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-full w-72 shrink-0 rounded-xl" />
          ))}
        </div>
      </div>
    </>
  );
}
