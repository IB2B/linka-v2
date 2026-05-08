import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white px-8 py-16 md:px-14 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(109,95,249,0.12)_0%,transparent_70%)]"
        />
        <div className="relative flex flex-col items-center gap-6 text-center">
          <Badge variant="outline" className="gap-1.5 tracking-tight text-[#525252]">
            <span className="size-1.5 rounded-full bg-[#00B67A]" />
            Booking June 2026
          </Badge>
          <h2 className="max-w-3xl text-[36px] font-semibold leading-[1.1] tracking-tight text-[#0F1113] md:text-[56px]">
            Stop posting. Start shipping.
          </h2>
          <p className="max-w-xl text-[15px] leading-[1.6] tracking-tight text-[#525252]">
            7 days free. No card until day 7. Cancel in one click. Your audience
            is already scrolling.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <Button
              render={<Link href="/register" />}
              nativeButton={false}
              size="lg"
              className="tracking-tight"
            >
              Start free trial <ArrowUpRight />
            </Button>
            <Button
              render={<Link href="/login" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="tracking-tight"
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
