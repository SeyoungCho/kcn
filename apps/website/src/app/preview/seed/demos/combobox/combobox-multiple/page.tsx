"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@repo/seed/ui/combobox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const plants = [
  "monstera",
  "pothos",
  "oliveTree",
  "moneyPlant",
  "snakePlant",
  "arecaPalm",
  "bostonFern",
  "rosemary",
] as const;

type Plant = (typeof plants)[number];

export default function ComboboxMultipleDemo() {
  const t = usePreviewDictionary().demos.combobox;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[320px]">
        <Combobox<Plant, true>
          items={plants}
          multiple
          defaultValue={["monstera", "snakePlant"]}
          itemToStringLabel={(plant) => t.plants[plant]}
        >
          <ComboboxInputGroup>
            <ComboboxChips>
              <ComboboxValue>
                {(selected: Plant[]) =>
                  selected.map((plant) => (
                    <ComboboxChip
                      key={plant}
                      removeLabel={t.removeChip.replace(
                        "{item}",
                        t.plants[plant],
                      )}
                    >
                      {t.plants[plant]}
                    </ComboboxChip>
                  ))
                }
              </ComboboxValue>
              <ComboboxInput
                placeholder={t.multiplePlaceholder}
                aria-label={t.label}
              />
            </ComboboxChips>
          </ComboboxInputGroup>
          <ComboboxContent>
            <ComboboxEmpty>{t.empty}</ComboboxEmpty>
            <ComboboxList>
              {(plant: Plant) => (
                <ComboboxItem key={plant} value={plant}>
                  {t.plants[plant]}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
}
