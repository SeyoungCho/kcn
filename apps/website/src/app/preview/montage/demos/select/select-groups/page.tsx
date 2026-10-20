"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@repo/montage/ui/select";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SelectGroupsDemo() {
  const t = usePreviewDictionary().demos.montage.select;
  const plants = {
    monstera: t.plants.monstera,
    pothos: t.plants.pothos,
    oliveTree: t.plants.oliveTree,
  };
  const tools = {
    terracottaPot: t.groups.terracottaPot,
    wateringCan: t.groups.wateringCan,
    pottingMix: t.groups.pottingMix,
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Select items={{ ...plants, ...tools }}>
        <SelectTrigger aria-label={t.groups.label} className="w-80">
          <SelectValue placeholder={t.groups.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t.groups.plants}</SelectLabel>
            {Object.entries(plants).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>{t.groups.tools}</SelectLabel>
            {Object.entries(tools).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
