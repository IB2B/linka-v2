import { Skeleton } from "@/components/ui/skeleton";
import { PageSkeletonHeader } from "@/components/dashboard/page-skeleton-header";

export default function Loading() {
  return (
    <div className="space-y-4">
      <PageSkeletonHeader />
      <Skeleton className="h-[560px] w-full rounded-md" />
    </div>
  );
}
