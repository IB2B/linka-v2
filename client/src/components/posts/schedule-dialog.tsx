"use client";

import { useState, useTransition } from "react";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { ScheduleMonthPicker } from "./schedule/schedule-month-picker";
import { ScheduleTimeList } from "./schedule/schedule-time-list";
import { schedulePostAction } from "@/app/dashboard/posts/actions";
import { combineDateTime, type TimeSlot } from "@/lib/posts/schedule-times";
import type { TimeFormat } from "@/lib/posts/schedule-format";

type Props = {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function ScheduleDialog({ postId, open, onOpenChange }: Props) {
  const [date, setDate] = useState<Date>(startOfToday);
  const [slot, setSlot] = useState<TimeSlot | null>(null);
  const [format, setFormat] = useState<TimeFormat>("12h");
  const [pending, start] = useTransition();

  function onSubmit() {
    if (!slot) return toast.error("Pick a time slot.");
    const when = combineDateTime(date, slot);
    if (when.getTime() <= Date.now()) return toast.error("Pick a future time.");
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
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-w-2xl">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="text-base">Schedule post</DialogTitle>
        </DialogHeader>
        <div className="grid min-h-0 items-start gap-4 p-4 md:grid-cols-[1fr_220px]">
          <ScheduleMonthPicker selected={date} onSelect={setDate} />
          <div className="flex h-[360px] min-h-0 flex-col">
            <ScheduleTimeList
              date={date}
              selected={slot}
              format={format}
              onFormatChange={setFormat}
              onSelect={setSlot}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t p-3">
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="button" disabled={pending || !slot} onClick={onSubmit}>
            {pending ? <Spinner aria-hidden /> : <Calendar className="size-4" />}
            Schedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
