"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@repo/montage/ui/combobox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

type Plant = { value: string; label: string };

export default function ComboboxMultipleDemo() {
  const t = usePreviewDictionary().demos.montage.combobox;
  const anchor = useComboboxAnchor();
  const plants: Plant[] = [
    { value: "monstera", label: t.plants.monstera },
    { value: "pothos", label: t.plants.pothos },
    { value: "olive", label: t.plants.olive },
    { value: "pilea", label: t.plants.pilea },
    { value: "snake", label: t.plants.snake },
    { value: "areca", label: t.plants.areca },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Combobox
        items={plants}
        multiple
        defaultValue={plants.filter(
          (plant) => plant.value === "monstera" || plant.value === "pilea",
        )}
        isItemEqualToValue={(item, value) => item.value === value.value}
      >
        <ComboboxChips ref={anchor} className="w-80">
          <ComboboxValue>
            {(selected: Plant[]) => (
              <>
                {selected.map((plant) => (
                  <ComboboxChip key={plant.value}>{plant.label}</ComboboxChip>
                ))}
                <ComboboxChipsInput
                  aria-label={t.multiple.label}
                  placeholder={
                    selected.length > 0 ? undefined : t.multiple.placeholder
                  }
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>{t.empty}</ComboboxEmpty>
          <ComboboxList>
            {(plant: Plant) => (
              <ComboboxItem key={plant.value} value={plant} variant="checkbox">
                {plant.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
