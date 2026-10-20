"use client";

import { useState } from "react";
import { Button } from "@repo/t-flavored/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/t-flavored/ui/tooltip";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TooltipControlledDemo() {
  const t = usePreviewDictionary().demos.tFlavored.tooltip;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8 pb-24">
      <Tooltip open={open}>
        <TooltipTrigger
          render={<Button onClick={() => setOpen((prev) => !prev)} />}
        >
          {t.controlled}
        </TooltipTrigger>
        <TooltipContent>{t.message}</TooltipContent>
      </Tooltip>
    </div>
  );
}
