"use client";

import { useState } from "react";
import { SettingsSection } from "./settings-section";
import { AiInstructionsForm } from "./ai-instructions-form";
import { SharedInstructionsForm } from "./shared-instructions-form";
import { InstructionsGroup } from "./instructions-group";
import { PlatformTabs } from "./platform-tabs";
import { PLATFORMS } from "@/lib/content/platforms";
import {
  EMPTY_INSTRUCTIONS, GLOBAL_PLATFORM,
  type PlatformInstructions,
} from "@/lib/content/platform-instructions.types";

type Props = { instructions: Record<string, PlatformInstructions> };

export function AiInstructionsSection({ instructions }: Props) {
  const [platform, setPlatform] = useState(PLATFORMS[0].value);
  const at = (key: string): PlatformInstructions =>
    instructions[key] ?? { platform: key, ...EMPTY_INSTRUCTIONS };

  return (
    <SettingsSection
      title="AI Instructions"
      description="Tell the AI who you are once, then fine-tune how you show up on each platform. Applied every time you generate."
    >
      <InstructionsGroup
        title="About you"
        description="Written once — used for every platform."
      >
        <SharedInstructionsForm data={at(GLOBAL_PLATFORM)} />
      </InstructionsGroup>

      <InstructionsGroup
        title="Per platform"
        description="Only what changes between platforms. Anything left blank falls back to your answers above."
      >
        <PlatformTabs value={platform} onChange={setPlatform} />
        <AiInstructionsForm key={platform} platform={platform} data={at(platform)} />
      </InstructionsGroup>
    </SettingsSection>
  );
}
