"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@repo/montage/ui/button";
import { Calendar } from "@repo/montage/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/montage/ui/popover";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

function formatDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}.${month}.${day}`;
}

export default function CalendarDatePickerDemo() {
  const t = usePreviewDictionary().demos.montage.calendar;
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <div className="flex min-h-screen items-start justify-center p-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              data-empty={!date}
              className="w-60 justify-between font-normal
                data-[empty=true]:text-muted-foreground"
            />
          }
        >
          {date ? formatDate(date) : t.pickDeliveryDate}
          <CalendarIcon />
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            onSelect={(value) => {
              setDate(value);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
