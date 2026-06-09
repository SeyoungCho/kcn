"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/seed/ui/select";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SelectDefaultDemo() {
  const t = usePreviewDictionary().demos.select;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Select>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder={t.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">{t.fruits.apple}</SelectItem>
          <SelectItem value="banana">{t.fruits.banana}</SelectItem>
          <SelectItem value="blueberry">{t.fruits.blueberry}</SelectItem>
          <SelectItem value="mango">{t.fruits.mango}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
