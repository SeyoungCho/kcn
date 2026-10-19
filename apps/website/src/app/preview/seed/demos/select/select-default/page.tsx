"use client";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@repo/seed/ui/select";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SelectDefaultDemo() {
  const t = usePreviewDictionary().demos.select;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[320px]">
        <SelectRoot label={t.label} description={t.description}>
          <SelectTrigger placeholder={t.placeholder} />
          <SelectContent>
            <SelectItem value="apple" label={t.fruits.apple} />
            <SelectItem value="banana" label={t.fruits.banana} />
            <SelectItem value="blueberry" label={t.fruits.blueberry} />
            <SelectItem value="mango" label={t.fruits.mango} />
          </SelectContent>
        </SelectRoot>
      </div>
    </div>
  );
}
