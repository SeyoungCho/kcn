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
  const [value, setValue] = useState("first");

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button />}>
          {t.radio.trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
            <DropdownMenuLabel>{t.radio.label}</DropdownMenuLabel>
            <DropdownMenuRadioItem value="first">
              {t.items.first}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="second">
              {t.items.second}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="third">
              {t.items.third}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
