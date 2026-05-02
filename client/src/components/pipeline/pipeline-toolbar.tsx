import type { Pipeline, Stage } from "@/types/pipeline";
import { PipelineSelector } from "./pipeline-selector";
import { NewPipelineDialog } from "./new-pipeline-dialog";
import { AddStageButton } from "./add-stage-button";
import { AddOpportunityDialog } from "./add-opportunity-dialog";

type Props = {
  pipelines: Pipeline[];
  activeId: string;
  stages: Stage[];
};

export function PipelineToolbar({ pipelines, activeId, stages }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {pipelines.length > 0 ? (
        <PipelineSelector pipelines={pipelines} activeId={activeId} />
      ) : null}
      <NewPipelineDialog />
      <div className="ml-auto flex items-center gap-2">
        <AddStageButton />
        {stages.length > 0 ? <AddOpportunityDialog stages={stages} /> : null}
      </div>
    </div>
  );
}
