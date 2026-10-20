"use client";

import { Button } from "@repo/t-flavored/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@repo/t-flavored/ui/dialog";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DialogDemo() {
  const t = usePreviewDictionary().demos.tFlavored.dialog;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Dialog>
        <DialogTrigger render={<Button size="xl" />}>
          {t.demo.trigger}
        </DialogTrigger>
        <DialogContent className="items-center px-5 pt-8 pb-5 text-center">
          <p className="mb-6 text-st10 break-keep">{t.demo.body}</p>
          <DialogClose render={<Button size="xl" className="w-full" />}>
            {t.demo.confirm}
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
