"use client";

import { BellIcon, GlobeIcon, SunMoonIcon } from "lucide-react";
import { Button } from "@repo/montage/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/montage/ui/dropdown-menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DropdownMenuIconsDemo() {
  const t = usePreviewDictionary().demos.montage.dropdownMenu;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          {t.icons.trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <BellIcon />
            {t.icons.reminders}
            <DropdownMenuShortcut>
              {t.icons.remindersValue}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <GlobeIcon />
            {t.icons.language}
            <DropdownMenuShortcut>{t.icons.languageValue}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SunMoonIcon />
            {t.icons.theme}
            <DropdownMenuShortcut>{t.icons.themeValue}</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
