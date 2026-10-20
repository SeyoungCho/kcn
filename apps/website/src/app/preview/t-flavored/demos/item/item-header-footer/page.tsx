"use client";

import { ChevronDown, Leaf, Sprout, TreePalm } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@repo/t-flavored/ui/item";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ItemHeaderFooterDemo() {
  const t = usePreviewDictionary().demos.tFlavored.item;

  const rows = [
    {
      icon: Leaf,
      title: t.plants.monstera.title,
      description: t.plants.monstera.description,
    },
    {
      icon: TreePalm,
      title: t.plants.areca.title,
      description: t.plants.areca.description,
    },
    {
      icon: Sprout,
      title: t.plants.rosemary.title,
      description: t.plants.rosemary.description,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ItemGroup className="max-w-[400px]">
        <ItemHeader>
          <ItemContent>
            <ItemDescription>{t.header.description}</ItemDescription>
            <ItemTitle>{t.header.title}</ItemTitle>
          </ItemContent>
          <ItemActions>{t.header.action}</ItemActions>
        </ItemHeader>
        {rows.map(({ icon: Icon, title, description }) => (
          <Item key={title}>
            <ItemMedia variant="icon">
              <Icon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{title}</ItemTitle>
              <ItemDescription>{description}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
        <ItemFooter render={<button type="button" />}>
          {t.footer}
          <ChevronDown />
        </ItemFooter>
      </ItemGroup>
    </div>
  );
}
