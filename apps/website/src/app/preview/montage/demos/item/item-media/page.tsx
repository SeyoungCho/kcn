"use client";

import { BellIcon, ChevronRightIcon, SproutIcon } from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@repo/montage/ui/item";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ItemMediaDemo() {
  const t = usePreviewDictionary().demos.montage.item;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ItemGroup className="max-w-[400px]">
        <Item render={<button type="button" />}>
          <ItemMedia>
            <BellIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{t.settings.notifications.title}</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="text-fg-neutral-quaternary" />
          </ItemActions>
        </Item>
        <Item render={<button type="button" />}>
          <ItemMedia variant="icon">
            <SproutIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{t.plant.title}</ItemTitle>
            <ItemDescription>{t.plant.description}</ItemDescription>
          </ItemContent>
        </Item>
        <Item render={<button type="button" />}>
          <ItemMedia variant="image">
            <div
              className="size-full
                bg-[linear-gradient(135deg,var(--color-light-blue-60),var(--color-violet-50))]"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{t.plant.title}</ItemTitle>
            <ItemDescription>{t.plant.description}</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  );
}
