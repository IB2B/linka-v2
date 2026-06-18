import { Input } from "@/components/ui/input";
import type { OpportunityPlatform, Stage } from "@/types/pipeline";
import { OppField } from "./opp-field";
import { OppSelectField } from "./opp-select-field";
import { OppDateField } from "./opp-date-field";

const PLATFORMS = [
  { value: "", label: "No platform" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "x", label: "X" },
  { value: "instagram", label: "Instagram" },
  { value: "threads", label: "Threads" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
];

type Props = {
  stages: Stage[];
  stageId: string; onStage: (v: string) => void;
  platform: OpportunityPlatform | ""; onPlatform: (v: OpportunityPlatform | "") => void;
  closeDate: string; onClose: (v: string) => void;
};

export function OppDealFields({
  stages, stageId, onStage, platform, onPlatform, closeDate, onClose,
}: Props) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <OppField label="Stage">
          <OppSelectField ariaLabel="Stage" value={stageId} onChange={onStage}
            options={stages.map((s) => ({ value: s.id, label: s.name }))} />
        </OppField>
        <OppField label="Source">
          <OppSelectField ariaLabel="Source platform" value={platform}
            onChange={(v) => onPlatform(v as OpportunityPlatform | "")} options={PLATFORMS} />
        </OppField>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <OppField label="Deal value (€)" htmlFor="valueAmount">
          <Input id="valueAmount" name="valueAmount" type="number" min={0} step="any"
            inputMode="decimal" placeholder="0" />
        </OppField>
        <OppField label="Expected close">
          <OppDateField value={closeDate} onChange={onClose} />
        </OppField>
      </div>
    </>
  );
}
