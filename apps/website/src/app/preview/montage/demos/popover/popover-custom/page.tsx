"use client";

import { LinkIcon } from "lucide-react";
import { Button } from "@repo/montage/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/montage/ui/popover";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function PopoverCustomDemo() {
  const t = usePreviewDictionary().demos.montage.popover;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          {t.custom.trigger}
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="flex flex-col gap-1">
            <p className="text-body1 font-semibold text-foreground">
              {t.custom.title}
            </p>
            <p className="text-label1 break-keep text-muted-foreground">
              {t.custom.body}
            </p>
          </div>
          <Button size="sm">
            <LinkIcon />
            {t.custom.copy}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
