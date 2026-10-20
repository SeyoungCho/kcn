"use client";

import { Button } from "@repo/t-flavored/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/t-flavored/ui/tooltip";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["sm", "default", "lg"] as const;

export default function TooltipSizesDemo() {
  const t = usePreviewDictionary().demos.tFlavored.tooltip;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center
        gap-x-20 gap-y-24 p-8 pb-24"
    >
      {sizes.map((size) => (
        <Tooltip key={size} open>
          <TooltipTrigger render={<Button variant="secondary" />}>
            {t.sizes[size]}
          </TooltipTrigger>
          <TooltipContent size={size}>{t.message}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
