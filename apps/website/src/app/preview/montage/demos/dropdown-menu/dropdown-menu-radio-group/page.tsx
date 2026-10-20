"use client";

import { useState } from "react";
import { Button } from "@repo/montage/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@repo/montage/ui/dropdown-menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DropdownMenuRadioGroupDemo() {
  const t = usePreviewDictionary().demos.montage.dropdownMenu;
  const [sort, setSort] = useState("recommended");

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          {t.radio.trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuLabel>{t.radio.label}</DropdownMenuLabel>
            <DropdownMenuRadioItem value="recommended">
              {t.radio.recommended}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="popular">
              {t.radio.popular}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price-low">
              {t.radio.priceLow}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
