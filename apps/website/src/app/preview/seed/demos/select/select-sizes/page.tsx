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

export default function SelectSizesDemo() {
  const t = usePreviewDictionary().demos.select;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[260px] flex-col gap-4">
        <Select size="lg" defaultValue="apple">
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t.largePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t.fruitsLabel}</SelectLabel>
              <SelectItem value="apple">{t.fruits.apple}</SelectItem>
              <SelectItem value="banana">{t.fruits.banana}</SelectItem>
              <SelectItem value="mango">{t.fruits.mango}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select size="md" defaultValue="apple">
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t.mediumPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t.fruitsLabel}</SelectLabel>
              <SelectItem value="apple">{t.fruits.apple}</SelectItem>
              <SelectItem value="banana">{t.fruits.banana}</SelectItem>
              <SelectItem value="mango">{t.fruits.mango}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
