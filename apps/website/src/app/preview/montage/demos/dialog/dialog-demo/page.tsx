"use client";

import { Button } from "@repo/montage/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/montage/ui/dialog";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DialogDemo() {
  const t = usePreviewDictionary().demos.montage.dialog;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Dialog>
        <DialogTrigger render={<Button />}>{t.demo.trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.demo.title}</DialogTitle>
            <DialogDescription>{t.demo.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" size="lg" />}>
              {t.demo.cancel}
            </DialogClose>
            <DialogClose render={<Button size="lg" />}>
              {t.demo.confirm}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
