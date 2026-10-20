"use client";

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@repo/montage/ui/combobox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

type Product = { value: string; label: string };
type ProductGroup = { value: string; items: Product[] };

export default function ComboboxGroupsDemo() {
  const t = usePreviewDictionary().demos.montage.combobox;
  const groups: ProductGroup[] = [
    {
      value: t.groups.foliage,
      items: [
        { value: "monstera", label: t.plants.monstera },
        { value: "pothos", label: t.plants.pothos },
        { value: "fern", label: t.plants.fern },
      ],
    },
    {
      value: t.groups.tools,
      items: [
        { value: "terracotta-pot", label: t.tools.terracottaPot },
        { value: "watering-can", label: t.tools.wateringCan },
        { value: "potting-mix", label: t.tools.pottingMix },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Combobox items={groups}>
        <ComboboxInput
          placeholder={t.groups.placeholder}
          aria-label={t.groups.label}
          className="w-80"
        />
        <ComboboxContent>
          <ComboboxEmpty>{t.empty}</ComboboxEmpty>
          <ComboboxList>
            {(group: ProductGroup) => (
              <ComboboxGroup key={group.value} items={group.items}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item: Product) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
