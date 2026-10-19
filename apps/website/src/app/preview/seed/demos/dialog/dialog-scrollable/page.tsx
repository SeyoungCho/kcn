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

const paragraphs = [1, 2, 3, 4, 5, 6];

export default function DialogScrollableDemo() {
  const t = usePreviewDictionary().demos.dialog;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <DialogRoot>
        <DialogTrigger render={<ActionButton variant="neutralWeak" />}>
          {t.scrollable.open}
        </DialogTrigger>
        <DialogContent title={t.scrollable.title}>
          <DialogBody>
            <div className="flex flex-col gap-x3">
              {paragraphs.map((n) => (
                <p key={n} className="m-0 text-t5 text-fg-neutral">
                  {t.scrollable.paragraph}
                </p>
              ))}
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogAction>{t.scrollable.agree}</DialogAction>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}
