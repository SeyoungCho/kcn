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

const fruits = [
  "apple",
  "banana",
  "blueberry",
  "grape",
  "mango",
  "orange",
  "peach",
  "strawberry",
] as const;

type Fruit = (typeof fruits)[number];

export default function ComboboxMultipleDemo() {
  const t = usePreviewDictionary().demos.combobox;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[320px]">
        <Combobox<Fruit, true>
          items={fruits}
          multiple
          defaultValue={["apple", "mango"]}
          itemToStringLabel={(fruit) => t.fruits[fruit]}
        >
          <ComboboxInputGroup>
            <ComboboxChips>
              <ComboboxValue>
                {(selected: Fruit[]) =>
                  selected.map((fruit) => (
                    <ComboboxChip key={fruit}>{t.fruits[fruit]}</ComboboxChip>
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
              {(fruit: Fruit) => (
                <ComboboxItem key={fruit} value={fruit}>
                  {t.fruits[fruit]}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
}
