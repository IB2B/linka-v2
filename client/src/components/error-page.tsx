"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function ErrorPage({ error, reset }: Props) {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#FAFAFA] px-6 font-sans text-[#0F1113]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,17,19,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,17,19,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(60%_50%_at_50%_40%,#000_0%,transparent_85%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(50%_45%_at_50%_30%,rgba(220,38,38,0.06)_0%,transparent_75%)]"
      />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-7 text-center">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-destructive/8 ring-1 ring-destructive/15">
          <AlertTriangle className="size-5 text-destructive" strokeWidth={2} />
        </span>
        <div className="flex flex-col gap-3">
          <h1 className="text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[40px]">
            Something broke.
          </h1>
          <p className="text-[15px] leading-[1.55] tracking-tight text-[#525252]">
            We hit an error rendering this page. Try reloading, or head back home and we&rsquo;ll get you sorted.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button onClick={reset} size="lg" className="gap-1.5 tracking-tight">
            <RotateCcw className="size-3.5" /> Try again
          </Button>
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="gap-1.5 tracking-tight"
          >
            <ArrowLeft className="size-3.5" /> Go home
          </Button>
        </div>
        {error.digest && (
          <p className="text-[11px] tracking-tight text-[#737373]">
            Error code{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] text-[#525252] ring-1 ring-[#E5E5E5]">
              {error.digest}
            </code>
          </p>
        )}
      </div>
    </div>
  );
}
