"use client";

import { ChevronRight, CreditCard, PiggyBank, Wallet } from "lucide-react";
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
      icon: Wallet,
      title: t.account.title,
      description: t.account.description,
    },
    { icon: CreditCard, title: t.card.title, description: t.card.description },
    {
      icon: PiggyBank,
      title: t.savings.title,
      description: t.savings.description,
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
