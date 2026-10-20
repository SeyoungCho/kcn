"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/montage/ui/select";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SelectStatesDemo() {
  const t = usePreviewDictionary().demos.montage.select;
  const plants = {
    monstera: t.plants.monstera,
    pothos: t.plants.pothos,
    oliveTree: t.plants.oliveTree,
    moneyPlant: t.plants.moneyPlant,
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-80 flex-col gap-4">
        <Select items={plants} disabled>
          <SelectTrigger aria-label={t.label}>
            <SelectValue placeholder={t.states.disabled} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(plants).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select items={plants}>
          <SelectTrigger aria-label={t.label} aria-invalid>
            <SelectValue placeholder={t.states.invalid} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(plants).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
