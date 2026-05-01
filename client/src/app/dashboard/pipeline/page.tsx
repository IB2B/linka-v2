import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { PipelineBoard } from "@/components/pipeline/pipeline-board";
import { AddOpportunityDialog } from "@/components/pipeline/add-opportunity-dialog";
import { PipelineEmptyState } from "@/components/pipeline/pipeline-empty-state";
import { getBoard } from "@/lib/pipelines/get-board";

export default async function PipelinePage() {
  const board = await getBoard();

  if (!board.pipeline || !board.stages.length) {
    return (
      <>
        <PageHeader title="Pipeline" description="Track inbound deals through stages." />
        <Separator className="my-2" />
        <PipelineEmptyState />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Pipeline"
          description={`${board.pipeline.name} — drag cards between stages to update them.`}
        />
        <AddOpportunityDialog stages={board.stages} />
      </div>
      <Separator className="my-2" />
      <PipelineBoard stages={board.stages} opportunities={board.opportunities} />
    </>
  );
}
