"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@repo/seed/ui/select";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["large", "medium"] as const;

export default function SelectSizesDemo() {
  const t = usePreviewDictionary().demos.select;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4
        p-8"
    >
      {sizes.map((size) => (
        <div key={size} className="w-full max-w-[320px]">
          <Select size={size}>
            <SelectTrigger
              placeholder={t.sizes[size]}
              aria-label={t.sizes[size]}
            />
            <SelectContent>
              <SelectItem value="apple" label={t.fruits.apple} />
              <SelectItem value="banana" label={t.fruits.banana} />
              <SelectItem value="mango" label={t.fruits.mango} />
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
