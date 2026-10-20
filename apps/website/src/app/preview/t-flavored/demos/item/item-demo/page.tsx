"use client";

import { ChevronRight, Leaf, Sprout, TreePalm } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@repo/t-flavored/ui/item";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ItemDemo() {
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
        {rows.map(({ icon: Icon, title, description }) => (
          <Item key={title} render={<button type="button" />}>
            <ItemMedia variant="icon">
              <Icon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{title}</ItemTitle>
              <ItemDescription>{description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ChevronRight />
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
