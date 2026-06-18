import type { OpportunityPlatform, Stage } from "@/types/pipeline";
import { Textarea } from "@/components/ui/textarea";
import { OppField } from "./opp-field";
import { OppContactFields } from "./opp-contact-fields";
import { OppDealFields } from "./opp-deal-fields";
import { OppSocialFields } from "./opp-social-fields";

type Props = {
  stages: Stage[];
  stageId: string; onStage: (v: string) => void;
  platform: OpportunityPlatform | ""; onPlatform: (v: OpportunityPlatform | "") => void;
  closeDate: string; onClose: (v: string) => void;
};

export function OppFormFields(props: Props) {
  return (
    <>
      <OppContactFields />
      <OppDealFields {...props} />
      <OppSocialFields />
      <OppField label="Notes" htmlFor="notes">
        <Textarea id="notes" name="notes" maxLength={5000} rows={3}
          placeholder="Context, links, terms…" />
      </OppField>
    </>
  );
}
