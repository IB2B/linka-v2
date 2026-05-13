import { MoreHorizontal, ExternalLink, BellOff, Trash2, CheckCheck, BookOpen, GitBranch } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Props = {
  url: string | null;
  pending: boolean;
  onSummarize: () => void;
  onAddToPipeline: () => void;
};

export function ThreadActionsMenu({ url, pending, onSummarize, onAddToPipeline }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
        {pending ? <Spinner className="size-3.5" /> : <MoreHorizontal className="size-4" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onSummarize} disabled={pending}>
          <BookOpen className="size-3.5" /> Summarize chat
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onAddToPipeline}>
          <GitBranch className="size-3.5" /> Add to pipeline
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(url ?? "#", "_blank")}>
          <ExternalLink className="size-3.5" /> Open in app
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Mark as read — coming soon")}>
          <CheckCheck className="size-3.5" /> Mark as read
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Mute — coming soon")}>
          <BellOff className="size-3.5" /> Mute
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Delete — coming soon")} className="text-destructive focus:text-destructive">
          <Trash2 className="size-3.5" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
