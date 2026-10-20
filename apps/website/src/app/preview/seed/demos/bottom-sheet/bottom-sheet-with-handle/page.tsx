"use client";

import * as React from "react";
import { ActionButton } from "@repo/seed/ui/action-button";
import {
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetRoot,
  BottomSheetTrigger,
} from "@repo/seed/ui/bottom-sheet";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const options = ["recommended", "popular", "priceLow"] as const;

export default function BottomSheetWithHandleDemo() {
  const t = usePreviewDictionary().demos.bottomSheet;
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <BottomSheetRoot open={open} onOpenChange={setOpen}>
        <BottomSheetTrigger render={<ActionButton variant="neutralWeak" />}>
          {t.handle.open}
        </BottomSheetTrigger>
        <BottomSheetContent
          title={t.handle.title}
          showHandle
          showCloseButton={false}
        >
          <BottomSheetBody className="pb-x4">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className="cursor-pointer border-none bg-transparent py-x3
                  text-start text-t5 text-fg-neutral"
                onClick={() => setOpen(false)}
              >
                {t.handle.options[option]}
              </button>
            ))}
          </BottomSheetBody>
        </BottomSheetContent>
      </BottomSheetRoot>
    </div>
  );
}
