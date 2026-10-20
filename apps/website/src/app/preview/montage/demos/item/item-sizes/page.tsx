"use client";

import {
  Item,
  ItemContent,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@repo/montage/ui/item";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ItemSizesDemo() {
  const t = usePreviewDictionary().demos.montage.item;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ItemGroup className="max-w-[400px]">
        <Item size="sm">
          <ItemContent>
            <ItemTitle>{t.size.sm}</ItemTitle>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item size="default">
          <ItemContent>
            <ItemTitle>{t.size.default}</ItemTitle>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item size="lg">
          <ItemContent>
            <ItemTitle>{t.size.lg}</ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  );
}
