"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/montage/ui/select";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SelectMultipleDemo() {
  const t = usePreviewDictionary().demos.montage.select;
  const plants = {
    monstera: t.plants.monstera,
    pothos: t.plants.pothos,
    snakePlant: t.plants.snakePlant,
    bostonFern: t.plants.bostonFern,
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Select items={plants} multiple defaultValue={["monstera", "bostonFern"]}>
        <SelectTrigger aria-label={t.multiple.label} className="w-80">
          <SelectValue placeholder={t.multiple.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(plants).map(([value, label]) => (
            <SelectItem key={value} value={value} variant="checkbox">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
