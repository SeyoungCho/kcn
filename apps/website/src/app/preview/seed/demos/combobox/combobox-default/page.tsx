"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
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

export default function ComboboxDefaultDemo() {
  const t = usePreviewDictionary().demos.combobox;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[320px]">
        <Combobox<Plant>
          items={plants}
          itemToStringLabel={(plant) => t.plants[plant]}
        >
          <ComboboxInputGroup>
            <ComboboxInput placeholder={t.placeholder} aria-label={t.label} />
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
