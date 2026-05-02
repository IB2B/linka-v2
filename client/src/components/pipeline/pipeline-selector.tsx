"use client";

import { useRouter } from "next/navigation";

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { Pipeline } from "@/types/pipeline";

type Props = { pipelines: Pipeline[]; activeId: string };

export function PipelineSelector({ pipelines, activeId }: Props) {
  const router = useRouter();
  return (
    <Select
      value={activeId}
      onValueChange={(v) => router.push(`/dashboard/pipeline?pipelineId=${v}`)}
    >
      <SelectTrigger className="min-w-48">
        <SelectValue placeholder="Pick a pipeline">
          {(value: string) => pipelines.find((p) => p.id === value)?.name ?? "Pick a pipeline"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {pipelines.map((p) => (
          <SelectItem key={p.id} value={p.id}>
            {p.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
