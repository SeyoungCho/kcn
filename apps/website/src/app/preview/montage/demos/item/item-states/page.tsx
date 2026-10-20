"use client";

import { useState } from "react";
import { CheckIcon } from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@repo/montage/ui/item";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ItemStatesDemo() {
  const t = usePreviewDictionary().demos.montage.item;
  const [delivery, setDelivery] = useState("standard");
  const options = [
    { value: "standard", label: t.delivery.standard },
    { value: "early-morning", label: t.delivery.earlyMorning },
    { value: "pickup", label: t.delivery.storePickup },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ItemGroup className="max-w-[400px]">
        {options.map((option) => (
          <Item
            key={option.value}
            render={<button type="button" />}
            aria-current={delivery === option.value}
            onClick={() => setDelivery(option.value)}
          >
            <ItemContent>
              <ItemTitle>{option.label}</ItemTitle>
            </ItemContent>
            {delivery === option.value && (
              <ItemActions>
                <CheckIcon className="size-5.5 text-fg-brand-primary" />
              </ItemActions>
            )}
          </Item>
        ))}
        <Item render={<button type="button" />} aria-disabled>
          <ItemContent>
            <ItemTitle>{t.delivery.sameDay}</ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  );
}
