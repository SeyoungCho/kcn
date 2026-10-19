"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@repo/seed/ui/popover";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const placements = ["top", "bottom"] as const;

export default function PopoverPlacementsDemo() {
  const t = usePreviewDictionary().demos.popover;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      {placements.map((placement) => (
        <PopoverRoot key={placement} placement={placement}>
          <PopoverTrigger render={<ActionButton variant="neutralWeak" />}>
            {t.placements[placement]}
          </PopoverTrigger>
          <PopoverContent title={t.placementTitle}>
            <PopoverBody className="pb-x6">
              <p className="m-0 text-t4 text-fg-neutral">
                {t.placements[placement]}
              </p>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
      ))}
    </div>
  );
}
