import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroCta() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        render={<Link href="/register" />}
        nativeButton={false}
        className="h-11 rounded-full bg-zinc-900 px-5 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] hover:bg-zinc-800"
      >
        Start free <ArrowRight className="size-4" />
      </Button>
      <Button
        render={<Link href="/login" />}
        nativeButton={false}
        variant="ghost"
        className="h-11 rounded-full bg-white/70 px-5 text-sm font-medium text-zinc-800 backdrop-blur hover:bg-white"
      >
        I already have an account
      </Button>
    </div>
  );
}
