"use client";

import Link from "next/link";
import { Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { onClose: () => void };

export function PipelineEmptyState({ onClose }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Layers className="size-5" />
      </div>
      <div>
        <p className="text-sm font-medium">No pipelines yet</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Create your first pipeline to organize conversations into stages.
        </p>
      </div>
      <Button
        size="sm"
        className="gap-1.5"
        render={<Link href="/dashboard/pipeline" onClick={onClose} />}
        nativeButton={false}
      >
        <Plus className="size-3.5" />
        Create pipeline
      </Button>
    </div>
  );
}
