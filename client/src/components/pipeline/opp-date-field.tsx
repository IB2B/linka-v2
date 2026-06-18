"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ymd, fromYmd, prettyDate } from "./date-utils";

type Props = { value: string; onChange: (v: string) => void };

export function OppDateField({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const selected = fromYmd(value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button type="button" variant="outline"
            className="h-8 w-full justify-start gap-2 font-normal">
            <CalendarIcon className="size-4 text-muted-foreground" />
            {selected ? prettyDate(selected)
              : <span className="text-muted-foreground">Pick a date</span>}
          </Button>
        }
      />
      <PopoverContent align="start" className="p-0">
        <Calendar mode="single" selected={selected} defaultMonth={selected}
          onSelect={(d) => { onChange(d ? ymd(d) : ""); setOpen(false); }} />
      </PopoverContent>
    </Popover>
  );
}
