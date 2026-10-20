"use client";

import { useState } from "react";
import { Button } from "@repo/montage/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@repo/montage/ui/popover";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function PopoverFooterDemo() {
  const t = usePreviewDictionary().demos.montage.popover;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button variant="outline" />}>
          {t.footer.trigger}
        </PopoverTrigger>
        <PopoverContent showCloseButton>
          <PopoverHeader>
            <PopoverTitle>{t.footer.title}</PopoverTitle>
            <PopoverDescription>{t.footer.description}</PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <Button
              variant="link"
              size="sm"
              className="text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              {t.footer.dismiss}
            </Button>
            <Button variant="link" size="sm" onClick={() => setOpen(false)}>
              {t.footer.action}
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
}
