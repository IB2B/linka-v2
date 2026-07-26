"use client";

import { useState } from "react";
import { SettingsSection } from "./settings-section";
import { AiInstructionsForm } from "./ai-instructions-form";
import { PLATFORMS } from "@/lib/content/platforms";
import {
  EMPTY_INSTRUCTIONS, type PlatformInstructions,
} from "@/lib/content/platform-instructions.types";
import { cn } from "@/lib/utils";

type Props = { instructions: Record<string, PlatformInstructions> };

export function AiInstructionsSection({ instructions }: Props) {
  const [platform, setPlatform] = useState(PLATFORMS[0].value);
  const data: PlatformInstructions =
    instructions[platform] ?? { platform, ...EMPTY_INSTRUCTIONS };

  return (
    <SettingsSection
      title="AI Instructions"
      description="Tell the AI who you are and what to post — separately for each platform. Applied every time you generate."
    >
      <div className="flex flex-wrap gap-1.5">
        {PLATFORMS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPlatform(p.value)}
            className={cn(
              "cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors",
              platform === p.value
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
      <AiInstructionsForm key={platform} platform={platform} data={data} />
    </SettingsSection>
  );
}
