"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/seed/ui/select";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SelectDisabledDemo() {
  const t = usePreviewDictionary().demos.select;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Select disabled defaultValue="apple">
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder={t.disabledPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t.fruitsLabel}</SelectLabel>
            <SelectItem value="apple">{t.fruits.apple}</SelectItem>
            <SelectItem value="banana">{t.fruits.banana}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
