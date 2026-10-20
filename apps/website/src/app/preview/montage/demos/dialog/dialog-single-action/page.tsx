"use client";

import { Button } from "@repo/montage/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/montage/ui/dialog";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DialogSingleActionDemo() {
  const t = usePreviewDictionary().demos.montage.dialog;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          {t.singleAction.trigger}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.singleAction.title}</DialogTitle>
          </DialogHeader>
          <p className="text-body1-reading break-keep text-foreground">
            {t.singleAction.body}
          </p>
          <DialogFooter>
            <DialogClose render={<Button size="lg" />}>
              {t.singleAction.confirm}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
