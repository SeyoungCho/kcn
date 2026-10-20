"use client";

import { useState } from "react";
import { Button } from "@repo/t-flavored/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@repo/t-flavored/ui/dropdown-menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DropdownMenuRadioGroupDemo() {
  const t = usePreviewDictionary().demos.tFlavored.dropdownMenu;
  const [value, setValue] = useState("recommended");

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button />}>
          {t.radio.trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
            <DropdownMenuLabel>{t.radio.label}</DropdownMenuLabel>
            <DropdownMenuRadioItem value="recommended">
              {t.radio.items.recommended}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="popular">
              {t.radio.items.popular}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="priceLow">
              {t.radio.items.priceLow}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
