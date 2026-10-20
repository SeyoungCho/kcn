"use client";

import { Button } from "@repo/t-flavored/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/t-flavored/ui/tooltip";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TooltipDemo() {
  const t = usePreviewDictionary().demos.tFlavored.tooltip;

  return (
    <div className="flex min-h-screen items-center justify-center p-8 pb-24">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button variant="weak" />}>
            {t.trigger}
          </TooltipTrigger>
          <TooltipContent>{t.message}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
