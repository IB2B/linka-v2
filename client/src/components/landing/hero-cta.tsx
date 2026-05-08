import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroCta() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        render={<Link href="/register" />}
        nativeButton={false}
        size="lg"
        className="tracking-tight"
      >
        Start free trial <ArrowUpRight />
      </Button>
      <Button
        render={<Link href="#pricing" />}
        nativeButton={false}
        size="lg"
        variant="outline"
        className="tracking-tight"
      >
        See pricing
      </Button>
    </div>
  );
}
