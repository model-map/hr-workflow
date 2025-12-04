"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/shadcn_ui/button";
import { Calendar } from "@/components/shadcn_ui/calendar";
import { Label } from "@/components/shadcn_ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn_ui/popover";

type DatePickerProps = {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
};

export function DatePicker({ label, value, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const dateValue = value ?? undefined;

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {dateValue ? dateValue.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange?.(date!);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
