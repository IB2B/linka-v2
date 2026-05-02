import { Separator } from "@/components/ui/separator";
import { PipelineBoard } from "@/components/pipeline/pipeline-board";
import { PipelineToolbar } from "@/components/pipeline/pipeline-toolbar";
import { PipelineEmptyState } from "@/components/pipeline/pipeline-empty-state";
import { NewPipelineDialog } from "@/components/pipeline/new-pipeline-dialog";
import { getBoard } from "@/lib/pipelines/get-board";

type SP = Promise<{ pipelineId?: string }>;

export default async function PipelinePage({ searchParams }: { searchParams: SP }) {
  const { pipelineId } = await searchParams;
  const board = await getBoard(pipelineId);

  if (!board.pipeline) {
    return (
      <>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
          <NewPipelineDialog />
        </div>
        <Separator className="my-2" />
        <PipelineEmptyState />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{board.pipeline.name}</h1>
        <PipelineToolbar
          pipelines={board.pipelines}
          activeId={board.pipeline.id}
          stages={board.stages}
        />
      </div>
      <Separator />
      {board.stages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed bg-card/40 p-10 text-center text-sm text-muted-foreground">
          No stages yet. Click <span className="px-1 font-medium text-foreground">Add stage</span> above to start moving deals.
        </div>
      ) : (
        <PipelineBoard stages={board.stages} opportunities={board.opportunities} />
      )}
    </>
  );
}
