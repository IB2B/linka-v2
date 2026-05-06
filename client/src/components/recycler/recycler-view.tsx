import { RecyclerSettingsCard } from "./recycler-settings-card";
import { RecyclerCandidateList } from "./recycler-candidate-list";
import { RecyclerEmpty } from "./recycler-empty";
import type { RecycleCandidate, RecycleSettings } from "@/types/recycler";

type Props = {
  candidates: RecycleCandidate[];
  settings: RecycleSettings;
};

export function RecyclerView({ candidates, settings }: Props) {
  return (
    <div className="space-y-6">
      <RecyclerSettingsCard settings={settings} />
      {candidates.length === 0 ? (
        <RecyclerEmpty minAgeDays={settings.minAgeDays} />
      ) : (
        <RecyclerCandidateList candidates={candidates} />
      )}
    </div>
  );
}
