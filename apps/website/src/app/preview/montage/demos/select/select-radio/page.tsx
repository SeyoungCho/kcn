"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/montage/ui/select";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SelectRadioDemo() {
  const t = usePreviewDictionary().demos.montage.select;
  const plants = {
    monstera: t.plants.monstera,
    pothos: t.plants.pothos,
    oliveTree: t.plants.oliveTree,
    moneyPlant: t.plants.moneyPlant,
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Select items={plants} defaultValue="pothos">
        <SelectTrigger aria-label={t.label} className="w-80">
          <SelectValue placeholder={t.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(plants).map(([value, label]) => (
            <SelectItem key={value} value={value} variant="radio">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
