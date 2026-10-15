import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = { pending: boolean; children?: React.ReactNode };

// Extra actions (e.g. "Apply to all platforms") sit left of Save.
export function InstructionsSaveRow({ pending, children }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {children}
      <Button type="submit" size="sm" disabled={pending} className="gap-1.5 min-w-24">
        {pending && <Spinner size="xs" />}
        Save changes
      </Button>
    </div>
  );
}
