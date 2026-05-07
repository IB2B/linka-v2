import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-white px-8 py-20 ring-1 ring-[#E5E5E5] md:px-16 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(109,95,249,0.18)_0%,transparent_70%)]"
        />
        <div className="relative flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#737373]">
            <span className="size-1.5 rounded-full bg-[#00B67A]" />
            Booking June 2026
          </span>
          <h2 className="max-w-3xl text-[44px] font-medium leading-[1.05] tracking-[-0.025em] text-[#0F1113] md:text-[72px]">
            Stop posting.
            <br />
            <span className="text-[#6D5FF9]">Start shipping.</span>
          </h2>
          <p className="max-w-xl text-[16px] leading-[1.6] text-[#525252]">
            7 days free. No card until day 7. Cancel in one click. Your audience
            is already scrolling.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              render={<Link href="/register" />}
              nativeButton={false}
              className="h-12 rounded-full bg-[#0F1113] px-6 text-[14px] font-medium text-white hover:bg-[#0F1113]/90"
            >
              Start free trial <ArrowUpRight className="size-4" />
            </Button>
            <Button
              render={<Link href="/login" />}
              nativeButton={false}
              variant="ghost"
              className="h-12 rounded-full border border-[#E5E5E5] bg-white px-6 text-[14px] font-medium text-[#0F1113] hover:bg-[#F5F5F5]"
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
