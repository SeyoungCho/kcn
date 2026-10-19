"use client";

import * as React from "react";
import IconPencilLine from "@karrotmarket/react-monochrome-icon/IconPencilLine";
import IconSquare2StackedLine from "@karrotmarket/react-monochrome-icon/IconSquare2StackedLine";
import { ActionButton } from "@repo/seed/ui/action-button";
import {
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuTrigger,
} from "@repo/seed/ui/menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const options = ["latest", "popular", "nearby"] as const;

export default function MenuRadioGroupDemo() {
  const t = usePreviewDictionary().demos.menu;
  const [sort, setSort] = React.useState<string>("latest");

  return (
    <div className="flex min-h-screen justify-center p-8 pt-12">
      <MenuRoot>
        <MenuTrigger render={<ActionButton variant="neutralWeak" />}>
          {t.groups.open}
        </MenuTrigger>
        <MenuContent>
          <MenuGroup>
            <MenuGroupLabel>{t.groups.post}</MenuGroupLabel>
            <MenuItem prefixIcon={<IconPencilLine />} label={t.items.edit} />
            <MenuItem
              prefixIcon={<IconSquare2StackedLine />}
              label={t.items.copy}
            />
          </MenuGroup>
          <MenuGroup>
            <MenuGroupLabel>{t.groups.sort}</MenuGroupLabel>
            <MenuRadioGroup
              value={sort}
              onValueChange={(value) => setSort(value as string)}
            >
              {options.map((option) => (
                <MenuRadioItem
                  key={option}
                  value={option}
                  label={t.groups.options[option]}
                />
              ))}
            </MenuRadioGroup>
          </MenuGroup>
        </MenuContent>
      </MenuRoot>
    </div>
  );
}
