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

export default function SelectFormatItemsDemo() {
  const t = usePreviewDictionary().demos.select;

  const items = [
    { value: null, label: t.themePlaceholder },
    { value: "system", label: t.themes.system },
    { value: "light", label: t.themes.light },
    { value: "dark", label: t.themes.dark },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Select items={items}>
        <SelectTrigger className="w-[220px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items
              .filter((item) => item.value !== null)
              .map((item) => (
                <SelectItem key={String(item.value)} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
