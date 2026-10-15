"use client";

import { InstructionTextarea } from "./instruction-textarea";
import { InstructionsSaveRow } from "./instructions-save-row";
import { ApplyToAllButton } from "./apply-to-all-button";
import { PLATFORM_FIELDS } from "./ai-instruction-fields";
import { useInstructionsSave } from "./use-instructions-save";
import { PLATFORMS } from "@/lib/content/platforms";
import type { PlatformInstructions } from "@/lib/content/platform-instructions.types";

type Props = { platform: string; data: PlatformInstructions };

export function AiInstructionsForm({ platform, data }: Props) {
  const { pending, onSubmit, formRef, applyToAll } = useInstructionsSave(platform);
  const label = PLATFORMS.find((p) => p.value === platform)?.label ?? platform;

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
      {PLATFORM_FIELDS.map((f) => (
        <InstructionTextarea
          key={f.name}
          field={f}
          defaultValue={data[f.name as keyof PlatformInstructions] as string}
        />
      ))}
      <InstructionsSaveRow pending={pending}>
        <ApplyToAllButton platformLabel={label} pending={pending} onConfirm={applyToAll} />
      </InstructionsSaveRow>
    </form>
  );
}
