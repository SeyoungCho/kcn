"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@repo/montage/ui/combobox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

type Plant = { value: string; label: string };

export default function ComboboxDemo() {
  const t = usePreviewDictionary().demos.montage.combobox;
  const plants: Plant[] = [
    { value: "monstera", label: t.plants.monstera },
    { value: "pothos", label: t.plants.pothos },
    { value: "olive", label: t.plants.olive },
    { value: "pilea", label: t.plants.pilea },
    { value: "snake", label: t.plants.snake },
    { value: "areca", label: t.plants.areca },
    { value: "fern", label: t.plants.fern },
    { value: "rosemary", label: t.plants.rosemary },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Combobox items={plants}>
        <ComboboxInput
          placeholder={t.placeholder}
          aria-label={t.label}
          className="w-80"
        />
        <ComboboxContent>
          <ComboboxEmpty>{t.empty}</ComboboxEmpty>
          <ComboboxList>
            {(plant: Plant) => (
              <ComboboxItem key={plant.value} value={plant}>
                {plant.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
