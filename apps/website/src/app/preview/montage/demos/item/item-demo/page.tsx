"use client";

import { Fragment } from "react";
import { BellIcon, ChevronRightIcon, ShieldIcon, UserIcon } from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@repo/montage/ui/item";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ItemDemo() {
  const t = usePreviewDictionary().demos.montage.item;
  const settings = [
    {
      icon: BellIcon,
      title: t.settings.notifications.title,
      description: t.settings.notifications.description,
    },
    {
      icon: ShieldIcon,
      title: t.settings.privacy.title,
      description: t.settings.privacy.description,
    },
    {
      icon: UserIcon,
      title: t.settings.account.title,
      description: t.settings.account.description,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ItemGroup className="max-w-[400px]">
        {settings.map((setting, index) => (
          <Fragment key={setting.title}>
            {index > 0 && <ItemSeparator />}
            <Item render={<button type="button" />}>
              <ItemMedia>
                <setting.icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{setting.title}</ItemTitle>
                <ItemDescription>{setting.description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="text-fg-neutral-quaternary" />
              </ItemActions>
            </Item>
          </Fragment>
        ))}
      </ItemGroup>
    </div>
  );
}
