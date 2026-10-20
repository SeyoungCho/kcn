"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@repo/t-flavored/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@repo/t-flavored/ui/item";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ItemActionsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.item;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ItemGroup className="max-w-[400px]">
        <Item>
          <ItemContent>
            <ItemTitle>{t.actions.button.title}</ItemTitle>
            <ItemDescription>{t.actions.button.description}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="weak" size="sm">
              {t.actions.button.label}
            </Button>
          </ItemActions>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>{t.actions.text.title}</ItemTitle>
            <ItemDescription>{t.actions.text.description}</ItemDescription>
          </ItemContent>
          <ItemContent>
            <ItemTitle>{t.actions.text.amount}</ItemTitle>
            <ItemDescription>{t.actions.text.status}</ItemDescription>
          </ItemContent>
        </Item>
        <Item render={<a href="#" />}>
          <ItemContent>
            <ItemTitle className="font-medium text-grey-700">
              {t.actions.arrow.title}
            </ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRight />
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  );
}
