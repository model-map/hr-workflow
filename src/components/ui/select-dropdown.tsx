import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn_ui/select";

type SelectItems = {
  id: string;
  label: string;
};

type SelectDropdownType = {
  label?: string;
  placeholder: string;
  selectItems: SelectItems[];
  value?: string;
  onChange?: (value: string) => void;
};

export function SelectDropdown({
  label,
  placeholder,
  selectItems,
  value,
  onChange,
}: SelectDropdownType) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {selectItems.map((item) => (
            <SelectItem key={item.id} value={item.label}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
