"use client";

import { Button } from "@repo/t-flavored/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/t-flavored/ui/tooltip";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sides = ["top", "bottom"] as const;

export default function TooltipSideDemo() {
  const t = usePreviewDictionary().demos.tFlavored.tooltip;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      {sides.map((side) => (
        <Tooltip key={side} open>
          <TooltipTrigger render={<Button variant="secondary" />}>
            {t.sides[side]}
          </TooltipTrigger>
          <TooltipContent side={side}>{t.message}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
