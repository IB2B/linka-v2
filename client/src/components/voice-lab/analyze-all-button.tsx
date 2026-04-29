"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { analyzeAction } from "@/app/dashboard/voice-lab/actions";

type Props = { disabled: boolean; sampleCount: number };

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

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={onClick}
      disabled={disabled || pending}
    >
      {pending ? <Spinner aria-hidden /> : <Sparkles className="size-4" />}
      Analyze {sampleCount > 0 ? `${sampleCount} samples` : "all"}
    </Button>
  );
}
