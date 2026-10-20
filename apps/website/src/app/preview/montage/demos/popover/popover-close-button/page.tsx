"use client";

import { Button } from "@repo/montage/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTrigger,
} from "@repo/montage/ui/popover";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function PopoverCloseButtonDemo() {
  const t = usePreviewDictionary().demos.montage.popover;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          {t.closeButton.trigger}
        </PopoverTrigger>
        <PopoverContent showCloseButton>
          <PopoverHeader>
            <PopoverDescription>{t.closeButton.description}</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  );
}
