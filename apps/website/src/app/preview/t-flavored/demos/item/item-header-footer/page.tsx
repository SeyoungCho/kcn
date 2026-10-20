"use client";

import { ChevronDown, CreditCard, PiggyBank, Wallet } from "lucide-react";
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
