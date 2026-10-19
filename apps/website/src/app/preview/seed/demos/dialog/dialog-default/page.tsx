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

export default function DialogDefaultDemo() {
  const t = usePreviewDictionary().demos.dialog;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <DialogRoot>
        <DialogTrigger render={<ActionButton variant="neutralWeak" />}>
          {t.open}
        </DialogTrigger>
        <DialogContent title={t.title} description={t.description}>
          <DialogBody>
            <p className="m-0 text-t5 text-fg-neutral">{t.body}</p>
          </DialogBody>
          <DialogFooter>
            <div className="flex gap-x2">
              <DialogAction variant="neutralWeak" className="flex-1">
                {t.cancel}
              </DialogAction>
              <DialogAction className="flex-1">{t.save}</DialogAction>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}
