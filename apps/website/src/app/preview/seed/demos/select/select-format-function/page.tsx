"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/seed/ui/select";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SelectFormatFunctionDemo() {
  const t = usePreviewDictionary().demos.select;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Select defaultValue="sans-serif">
        <SelectTrigger className="w-[220px]">
          <SelectValue>
            {(value: keyof typeof t.fonts) => (
              <span style={{ fontFamily: value }}>{t.fonts[value]}</span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.entries(t.fonts).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                <span style={{ fontFamily: value }}>{label}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
