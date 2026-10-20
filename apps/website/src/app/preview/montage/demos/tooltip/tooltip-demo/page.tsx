"use client";

import { Button } from "@repo/montage/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/montage/ui/tooltip";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TooltipDemo() {
  const t = usePreviewDictionary().demos.montage.tooltip;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            {t.trigger}
          </TooltipTrigger>
          <TooltipContent>{t.message}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
