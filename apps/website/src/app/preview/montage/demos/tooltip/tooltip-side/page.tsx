"use client";

import { Button } from "@repo/montage/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/montage/ui/tooltip";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TooltipSideDemo() {
  const t = usePreviewDictionary().demos.montage.tooltip;
  const sides = [
    { side: "top", label: t.sides.top },
    { side: "right", label: t.sides.right },
    { side: "bottom", label: t.sides.bottom },
    { side: "left", label: t.sides.left },
  ] as const;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <TooltipProvider>
        <div className="flex flex-wrap justify-center gap-3">
          {sides.map(({ side, label }) => (
            <Tooltip key={side}>
              <TooltipTrigger render={<Button variant="outline" />}>
                {label}
              </TooltipTrigger>
              <TooltipContent side={side}>{t.message}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
