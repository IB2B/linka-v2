import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function SaveBar({ pending, dirty }: { pending: boolean; dirty: boolean }) {
  return (
    <div className="flex justify-end">
      <Button type="submit" size="sm" disabled={pending || !dirty}>
        {pending && <Spinner aria-hidden />}
        Save changes
      </Button>
    </div>
  );
}
