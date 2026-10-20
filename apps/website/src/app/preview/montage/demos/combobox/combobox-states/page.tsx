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

export default function ComboboxStatesDemo() {
  const t = usePreviewDictionary().demos.montage.combobox;
  const plants: Plant[] = [
    { value: "monstera", label: t.plants.monstera },
    { value: "pothos", label: t.plants.pothos },
    { value: "olive", label: t.plants.olive },
    { value: "pilea", label: t.plants.pilea },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-80 flex-col gap-4">
        <Combobox items={plants} disabled>
          <ComboboxInput placeholder={t.states.disabled} aria-label={t.label} />
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
        <Combobox items={plants}>
          <ComboboxInput
            placeholder={t.states.invalid}
            aria-label={t.label}
            aria-invalid
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
    </div>
  );
}
