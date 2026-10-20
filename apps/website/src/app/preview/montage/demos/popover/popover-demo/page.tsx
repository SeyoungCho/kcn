"use client";

import { Button } from "@repo/montage/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@repo/montage/ui/popover";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function PopoverDemo() {
  const t = usePreviewDictionary().demos.montage.popover;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          {t.demo.trigger}
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>{t.demo.title}</PopoverTitle>
            <PopoverDescription>{t.demo.description}</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  );
}
