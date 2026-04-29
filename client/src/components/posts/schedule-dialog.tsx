"use client";

import { useState, useTransition } from "react";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { schedulePostAction } from "@/app/dashboard/posts/actions";
import { defaultScheduleDateTime } from "@/lib/posts/default-datetime";

type Props = {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ScheduleDialog({ postId, open, onOpenChange }: Props) {
  const [value, setValue] = useState(defaultScheduleDateTime);
  const [pending, start] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const when = new Date(value);
    if (Number.isNaN(when.getTime()) || when.getTime() <= Date.now()) {
      toast.error("Pick a date in the future.");
      return;
    }
    start(async () => {
      const res = await schedulePostAction(postId, when.toISOString());
      if (res.error) toast.error(res.error);
      else {
        toast.success("Post scheduled.");
        onOpenChange(false);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule post</DialogTitle>
          <DialogDescription>Pick when this should go out.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scheduled-for">Date & time</Label>
            <Input
              id="scheduled-for"
              type="datetime-local"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? <Spinner aria-hidden /> : <Calendar className="size-4" />}
              Schedule
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
