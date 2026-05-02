"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { analyzeAction } from "@/app/dashboard/voice-lab/actions";

type Props = { disabled: boolean; sampleCount: number };

const CONIC_STYLE = {
  background:
    "conic-gradient(from 0deg, #ff0080, #ff8c00, #ffd500, #00d26a, #00b4ff, #7b5cff, #ff0080)",
};

export function AnalyzeAllButton({ disabled, sampleCount }: Props) {
  const [pending, start] = useTransition();

  function onClick() {
    start(async () => {
      toast.info("Analyzing your voice…");
      const res = await analyzeAction();
      if (res.error) toast.error(res.error);
      else toast.success("Voice DNA updated.");
    });
  }

  const isDisabled = disabled || pending;
  return (
    <div className="relative inline-flex isolate rounded-[8px]">
      {!isDisabled && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[8px]"
        >
          <span
            style={CONIC_STYLE}
            className="absolute left-1/2 top-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite]"
          />
        </span>
      )}
      <Button
        size="sm"
        variant="outline"
        onClick={onClick}
        disabled={isDisabled}
        className="relative z-10 m-[2px] h-6 rounded-[6px] border-transparent bg-background hover:bg-background dark:bg-background dark:hover:bg-background"
      >
        {pending ? <Spinner aria-hidden /> : <Sparkles className="size-4" />}
        Analyze {sampleCount > 0 ? `${sampleCount} samples` : "all"}
      </Button>
    </div>
  );
}
