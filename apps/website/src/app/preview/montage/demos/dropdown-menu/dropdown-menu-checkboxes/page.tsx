"use client";

import { useState } from "react";
import { Button } from "@repo/montage/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/montage/ui/dropdown-menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DropdownMenuCheckboxesDemo() {
  const t = usePreviewDictionary().demos.montage.dropdownMenu;
  const [foliage, setFoliage] = useState(true);
  const [succulents, setSucculents] = useState(false);
  const [herbs, setHerbs] = useState(true);
  const [flowers, setFlowers] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          {t.checkboxes.trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>{t.checkboxes.label}</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              variant="checkbox"
              checked={foliage}
              onCheckedChange={setFoliage}
            >
              {t.checkboxes.foliage}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              variant="checkbox"
              checked={succulents}
              onCheckedChange={setSucculents}
            >
              {t.checkboxes.succulents}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              variant="checkbox"
              checked={herbs}
              onCheckedChange={setHerbs}
            >
              {t.checkboxes.herbs}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              variant="checkbox"
              checked={flowers}
              onCheckedChange={setFlowers}
              disabled
            >
              {t.checkboxes.flowers}
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
