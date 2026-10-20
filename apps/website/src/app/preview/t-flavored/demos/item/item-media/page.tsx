"use client";

import { Bell, Gift } from "lucide-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@repo/t-flavored/ui/item";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ItemMediaDemo() {
  const t = usePreviewDictionary().demos.tFlavored.item;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ItemGroup className="max-w-[400px]">
        <Item>
          <ItemMedia>
            <Bell className="text-grey-600" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{t.media.default.title}</ItemTitle>
            <ItemDescription>{t.media.default.description}</ItemDescription>
          </ItemContent>
        </Item>
        <Item>
          <ItemMedia variant="icon">
            <Gift />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{t.media.icon.title}</ItemTitle>
            <ItemDescription>{t.media.icon.description}</ItemDescription>
          </ItemContent>
        </Item>
        <Item>
          <ItemMedia variant="icon">{t.media.text.label}</ItemMedia>
          <ItemContent>
            <ItemTitle>{t.media.text.title}</ItemTitle>
            <ItemDescription>{t.media.text.description}</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  );
}
