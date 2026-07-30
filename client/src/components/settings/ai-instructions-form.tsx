"use client";

import { InstructionTextarea } from "./instruction-textarea";
import { InstructionsSaveRow } from "./instructions-save-row";
import { PLATFORM_FIELDS } from "./ai-instruction-fields";
import { useInstructionsSave } from "./use-instructions-save";
import type { PlatformInstructions } from "@/lib/content/platform-instructions.types";

type Props = { platform: string; data: PlatformInstructions };

export function AiInstructionsForm({ platform, data }: Props) {
  const { pending, onSubmit } = useInstructionsSave(platform);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {PLATFORM_FIELDS.map((f) => (
        <InstructionTextarea
          key={f.name}
          field={f}
          defaultValue={data[f.name as keyof PlatformInstructions] as string}
        />
      ))}
      <InstructionsSaveRow pending={pending} />
    </form>
  );
}
