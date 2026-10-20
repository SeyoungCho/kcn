"use client";

import { useState } from "react";
import { Button } from "@repo/t-flavored/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/t-flavored/ui/dropdown-menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DropdownMenuCheckboxesDemo() {
  const t = usePreviewDictionary().demos.tFlavored.dropdownMenu;
  const [statusBar, setStatusBar] = useState(true);
  const [activityBar, setActivityBar] = useState(false);
  const [panel, setPanel] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="weak" />}>
          {t.checkboxes.trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>{t.checkboxes.label}</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={statusBar}
              onCheckedChange={setStatusBar}
            >
              {t.checkboxes.statusBar}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activityBar}
              onCheckedChange={setActivityBar}
            >
              {t.checkboxes.activityBar}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={panel}
              onCheckedChange={setPanel}
            >
              {t.checkboxes.panel}
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
