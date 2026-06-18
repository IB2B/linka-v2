"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar({ className, classNames, ...props }: CalendarProps) {
  const d = getDefaultClassNames()
  return (
    <DayPicker
      showOutsideDays
      className={cn("p-1", className)}
      classNames={{
        months: cn(d.months, "relative"),
        month_caption: cn(d.month_caption, "h-8 px-2"),
        caption_label: cn(d.caption_label, "text-sm font-medium"),
        nav: cn(d.nav, "absolute inset-x-0 top-0 flex justify-between"),
        button_previous: cn(d.button_previous, "size-8 rounded-md hover:bg-accent"),
        button_next: cn(d.button_next, "size-8 rounded-md hover:bg-accent"),
        weekday: cn(d.weekday, "w-9 text-xs font-normal text-muted-foreground"),
        day: cn(d.day, "p-0 text-center text-sm"),
        day_button: cn(d.day_button, "size-9 rounded-md font-normal hover:bg-accent aria-selected:opacity-100"),
        today: cn(d.today, "font-semibold text-primary"),
        selected: cn(d.selected, "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button:hover]:bg-primary"),
        outside: cn(d.outside, "text-muted-foreground/40"),
        disabled: cn(d.disabled, "text-muted-foreground/30"),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          ),
      }}
      {...props}
    />
  )
}
