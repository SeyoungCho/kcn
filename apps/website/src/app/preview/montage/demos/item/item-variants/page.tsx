"use client";

import { ChevronRightIcon } from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@repo/montage/ui/item";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ItemVariantsDemo() {
  const t = usePreviewDictionary().demos.montage.item;
  const titles = [t.settings.notifications.title, t.settings.privacy.title];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[400px] flex-col gap-6">
        <ItemGroup
          className="rounded-16 bg-surface-elevated-primary px-5 py-2 shadow-sm"
        >
          {titles.map((title) => (
            <Item key={title} render={<button type="button" />}>
              <ItemContent>
                <ItemTitle>{title}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="text-fg-neutral-quaternary" />
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
        <ItemGroup
          className="rounded-16 bg-surface-elevated-primary py-2 shadow-sm"
        >
          {titles.map((title) => (
            <Item key={title} variant="full" render={<button type="button" />}>
              <ItemContent>
                <ItemTitle>{title}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="text-fg-neutral-quaternary" />
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </div>
    </div>
  );
}
