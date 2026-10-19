"use client";

import IconBellLine from "@karrotmarket/react-monochrome-icon/IconBellLine";
import IconPencilLine from "@karrotmarket/react-monochrome-icon/IconPencilLine";
import IconSquare2StackedLine from "@karrotmarket/react-monochrome-icon/IconSquare2StackedLine";
import IconTrashcanLine from "@karrotmarket/react-monochrome-icon/IconTrashcanLine";
import { ActionButton } from "@repo/seed/ui/action-button";
import {
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@repo/seed/ui/menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function MenuDefaultDemo() {
  const t = usePreviewDictionary().demos.menu;

  return (
    <div className="flex min-h-screen justify-center p-8 pt-12">
      <MenuRoot>
        <MenuTrigger render={<ActionButton variant="neutralWeak" />}>
          {t.open}
        </MenuTrigger>
        <MenuContent>
          <MenuGroup>
            <MenuItem prefixIcon={<IconPencilLine />} label={t.items.edit} />
            <MenuItem
              prefixIcon={<IconSquare2StackedLine />}
              label={t.items.copy}
            />
            <MenuItem
              prefixIcon={<IconBellLine />}
              label={t.items.notify}
              description={t.items.notifyDescription}
            />
          </MenuGroup>
          <MenuGroup>
            <MenuItem
              tone="critical"
              prefixIcon={<IconTrashcanLine />}
              label={t.items.delete}
            />
          </MenuGroup>
        </MenuContent>
      </MenuRoot>
    </div>
  );
}
