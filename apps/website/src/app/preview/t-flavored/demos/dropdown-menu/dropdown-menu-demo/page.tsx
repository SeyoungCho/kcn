"use client";

import { Button } from "@repo/t-flavored/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/t-flavored/ui/dropdown-menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DropdownMenuDemo() {
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
            <DropdownMenuItem>{t.items.first}</DropdownMenuItem>
            <DropdownMenuItem>{t.items.second}</DropdownMenuItem>
            <DropdownMenuItem>{t.items.third}</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
