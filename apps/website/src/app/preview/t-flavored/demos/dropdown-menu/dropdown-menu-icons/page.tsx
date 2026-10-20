"use client";

import { Copy, Settings, Share, Trash2 } from "lucide-react";
import { Button } from "@repo/t-flavored/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/t-flavored/ui/dropdown-menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DropdownMenuIconsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.dropdownMenu;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button />}>
          {t.trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>{t.label}</DropdownMenuLabel>
            <DropdownMenuItem>
              {t.icons.copy}
              <DropdownMenuShortcut>
                <Copy />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t.icons.share}
              <DropdownMenuShortcut>
                <Share />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t.icons.settings}
              <DropdownMenuShortcut>
                <Settings />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            {t.icons.delete}
            <DropdownMenuShortcut>
              <Trash2 className="text-destructive" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
