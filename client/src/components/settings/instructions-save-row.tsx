import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function InstructionsSaveRow({ pending }: { pending: boolean }) {
  return (
    <div className="flex justify-end">
      <Button type="submit" size="sm" disabled={pending} className="gap-1.5 min-w-24">
        {pending && <Spinner size="xs" />}
        Save changes
      </Button>
    </div>
  );
}
