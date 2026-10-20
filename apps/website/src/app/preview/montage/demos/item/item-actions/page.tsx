"use client";

import { ChevronRightIcon } from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@repo/montage/ui/item";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ItemActionsDemo() {
  const t = usePreviewDictionary().demos.montage.item;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Item render={<button type="button" />} className="max-w-[400px]">
        <ItemContent>
          <ItemTitle>{t.reminderTime}</ItemTitle>
        </ItemContent>
        <ItemActions>
          {t.reminderTimeValue}
          <ChevronRightIcon className="text-fg-neutral-quaternary" />
        </ItemActions>
      </Item>
    </div>
  );
}
