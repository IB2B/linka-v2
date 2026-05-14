import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function PaymentsSkeleton() {
  return (
    <Card size="sm" className="overflow-hidden p-0">
      <div className="divide-y">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="px-4 py-3">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    </Card>
  );
}
