"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import {
  DialogAction,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTrigger,
} from "@repo/seed/ui/dialog";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sizes = ["medium", "large"] as const;

export default function DialogSizesDemo() {
  const t = usePreviewDictionary().demos.dialog;

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      {sizes.map((size) => (
        <DialogRoot key={size} size={size}>
          <DialogTrigger render={<ActionButton variant="neutralWeak" />}>
            {t.sizes[size]}
          </DialogTrigger>
          <DialogContent title={t.sizes[size]}>
            <DialogBody>
              <p className="m-0 text-t5 text-fg-neutral">{t.sizeBody}</p>
            </DialogBody>
            <DialogFooter>
              <DialogAction>{t.save}</DialogAction>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      ))}
    </div>
  );
}
