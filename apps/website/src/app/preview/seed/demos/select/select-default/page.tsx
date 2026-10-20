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
            <SelectItem value="monstera" label={t.plants.monstera} />
            <SelectItem value="pothos" label={t.plants.pothos} />
            <SelectItem value="snake-plant" label={t.plants.snakePlant} />
            <SelectItem value="boston-fern" label={t.plants.bostonFern} />
          </SelectContent>
        </SelectRoot>
      </div>
    </div>
  );
}
