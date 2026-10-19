"use client";

import * as React from "react";
import { ActionButton } from "@repo/seed/ui/action-button";
import {
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetRoot,
  BottomSheetTrigger,
} from "@repo/seed/ui/bottom-sheet";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function BottomSheetDefaultDemo() {
  const t = usePreviewDictionary().demos.bottomSheet;
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <BottomSheetRoot open={open} onOpenChange={setOpen}>
        <BottomSheetTrigger render={<ActionButton variant="neutralWeak" />}>
          {t.default.open}
        </BottomSheetTrigger>
        <BottomSheetContent
          title={t.default.title}
          description={t.default.description}
        >
          <BottomSheetFooter>
            <ActionButton size="large" onClick={() => setOpen(false)}>
              {t.default.confirm}
            </ActionButton>
          </BottomSheetFooter>
        </BottomSheetContent>
      </BottomSheetRoot>
    </div>
  );
}
