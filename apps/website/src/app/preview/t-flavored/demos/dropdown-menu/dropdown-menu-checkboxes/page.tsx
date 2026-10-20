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
  const [easyCare, setEasyCare] = useState(true);
  const [petSafe, setPetSafe] = useState(false);
  const [sale, setSale] = useState(false);

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
              checked={easyCare}
              onCheckedChange={setEasyCare}
            >
              {t.checkboxes.easyCare}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={petSafe}
              onCheckedChange={setPetSafe}
            >
              {t.checkboxes.petSafe}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={sale} onCheckedChange={setSale}>
              {t.checkboxes.sale}
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
