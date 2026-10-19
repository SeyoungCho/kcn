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

export default function ComboboxDefaultDemo() {
  const t = usePreviewDictionary().demos.combobox;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[320px]">
        <Combobox<Fruit>
          items={fruits}
          itemToStringLabel={(fruit) => t.fruits[fruit]}
        >
          <ComboboxInputGroup>
            <ComboboxInput placeholder={t.placeholder} aria-label={t.label} />
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
