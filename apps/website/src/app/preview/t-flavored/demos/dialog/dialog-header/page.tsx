"use client";

import { Button } from "@repo/t-flavored/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/t-flavored/ui/dialog";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DialogHeaderDemo() {
  const t = usePreviewDictionary().demos.tFlavored.dialog;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Dialog>
        <DialogTrigger render={<Button size="xl" />}>
          {t.header.trigger}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.header.title}</DialogTitle>
            <DialogDescription>{t.header.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="secondary" size="lg" />}>
              {t.header.cancel}
            </DialogClose>
            <DialogClose render={<Button size="lg" />}>
              {t.header.confirm}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
