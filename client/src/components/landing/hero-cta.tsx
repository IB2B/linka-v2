import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroCta() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        render={<Link href="/register" />}
        nativeButton={false}
        className="h-12 rounded-full bg-[#6D5FF9] px-6 text-[14px] font-medium text-white hover:bg-[#5a4ce0]"
      >
        Start free trial <ArrowUpRight className="size-4" />
      </Button>
      <Button
        render={<Link href="#pricing" />}
        nativeButton={false}
        variant="ghost"
        className="h-12 rounded-full border border-[#E5E5E5] bg-white px-6 text-[14px] font-medium text-[#0F1113] hover:bg-[#F5F5F5]"
      >
        See pricing
      </Button>
    </div>
  );
}
