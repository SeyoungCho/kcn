"use client";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@repo/seed/ui/select";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SelectStatesDemo() {
  const t = usePreviewDictionary().demos.select;

  const items = (
    <SelectContent>
      <SelectItem value="monstera" label={t.plants.monstera} />
      <SelectItem value="pothos" label={t.plants.pothos} />
      <SelectItem value="snake-plant" label={t.plants.snakePlant} />
    </SelectContent>
  );

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[320px] flex-col gap-6">
        <SelectRoot
          label={t.states.invalid}
          invalid
          errorMessage={t.errorMessage}
        >
          <SelectTrigger placeholder={t.placeholder} />
          {items}
        </SelectRoot>
        <SelectRoot label={t.states.disabled} disabled>
          <SelectTrigger placeholder={t.placeholder} />
          {items}
        </SelectRoot>
        <SelectRoot
          label={t.states.readOnly}
          readOnly
          defaultValue={["pothos"]}
        >
          <SelectTrigger placeholder={t.placeholder} />
          {items}
        </SelectRoot>
      </div>
    </div>
  );
}
