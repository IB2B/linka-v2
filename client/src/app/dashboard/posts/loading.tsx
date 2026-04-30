import { Skeleton } from "@/components/ui/skeleton";
import { PageSkeletonHeader } from "@/components/dashboard/page-skeleton-header";

export default function Loading() {
  return (
    <div className="space-y-4">
      <PageSkeletonHeader titleW="w-32" descW="w-72" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-md" />
        ))}
      </div>
    </div>
  );
}
