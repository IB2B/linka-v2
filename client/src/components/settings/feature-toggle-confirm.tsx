"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  open: boolean;
  feature: string;
  willEnable: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: () => void;
  pending?: boolean;
};

export function FeatureToggleConfirm({
  open, feature, willEnable, onOpenChange, onConfirm, pending,
}: Props) {
  const action = willEnable ? "Enable" : "Disable";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action} {feature}?
          </DialogTitle>
          <DialogDescription>
            {willEnable
              ? `${feature} will appear in your sidebar and become available across the app.`
              : `${feature} will be hidden from your sidebar. Your data is kept and can be restored anytime.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={pending}
          >
            Cancel
          </Button>
          <Button
            variant={willEnable ? "default" : "destructive"}
            onClick={onConfirm}
            disabled={pending}
          >
            {pending ? <Spinner aria-hidden /> : null}
            {action}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
