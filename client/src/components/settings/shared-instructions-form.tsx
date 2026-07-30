"use client";

import { BrandKitField } from "./brand-kit-field";
import { InstructionTextarea } from "./instruction-textarea";
import { InstructionsSaveRow } from "./instructions-save-row";
import { SHARED_FIELDS } from "./ai-instruction-fields";
import { useInstructionsSave } from "./use-instructions-save";
import { GLOBAL_PLATFORM } from "@/lib/content/platform-instructions.types";
import type { PlatformInstructions } from "@/lib/content/platform-instructions.types";

// Written once and reused for every platform — the user never retypes who they are.
export function SharedInstructionsForm({ data }: { data: PlatformInstructions }) {
  const { pending, onSubmit } = useInstructionsSave(GLOBAL_PLATFORM);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {SHARED_FIELDS.map((f) => (
        <InstructionTextarea
          key={f.name}
          field={f}
          defaultValue={data[f.name as keyof PlatformInstructions] as string}
        >
          {f.name === "visualStyle" && <BrandKitField kit={data.brandKit} />}
        </InstructionTextarea>
      ))}
      <InstructionsSaveRow pending={pending} />
    </form>
  );
}
