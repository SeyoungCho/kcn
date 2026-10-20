"use client";

import { CopyIcon } from "lucide-react";
import { Button } from "@repo/montage/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipShortcut,
  TooltipTrigger,
} from "@repo/montage/ui/tooltip";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function TooltipShortcutDemo() {
  const t = usePreviewDictionary().demos.montage.tooltip;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                aria-label={t.shortcut.label}
              />
            }
          >
            <CopyIcon />
          </TooltipTrigger>
          <TooltipContent>
            {t.shortcut.label}
            <TooltipShortcut>⌘C</TooltipShortcut>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
