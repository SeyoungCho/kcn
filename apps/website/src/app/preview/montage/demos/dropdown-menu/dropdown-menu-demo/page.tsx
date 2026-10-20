"use client";

import { Button } from "@repo/montage/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/montage/ui/dropdown-menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DropdownMenuDemo() {
  const t = usePreviewDictionary().demos.montage.dropdownMenu;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          {t.demo.trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>{t.demo.label}</DropdownMenuLabel>
            <DropdownMenuItem>{t.demo.track}</DropdownMenuItem>
            <DropdownMenuItem>{t.demo.reorder}</DropdownMenuItem>
            <DropdownMenuItem>{t.demo.receipt}</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
