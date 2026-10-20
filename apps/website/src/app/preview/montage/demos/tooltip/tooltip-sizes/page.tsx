"use client";

import { Button } from "@repo/montage/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/montage/ui/tooltip";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TooltipSizesDemo() {
  const t = usePreviewDictionary().demos.montage.tooltip;
  const sizes = [
    { size: "sm", label: t.sizes.sm },
    { size: "default", label: t.sizes.default },
  ] as const;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      <TooltipProvider>
        {sizes.map(({ size, label }) => (
          <Tooltip key={size}>
            <TooltipTrigger render={<Button variant="outline" />}>
              {label}
            </TooltipTrigger>
            <TooltipContent size={size}>{t.message}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
