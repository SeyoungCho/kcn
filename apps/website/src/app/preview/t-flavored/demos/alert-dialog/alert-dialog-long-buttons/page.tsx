"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/t-flavored/ui/alert-dialog";
import { Button } from "@repo/t-flavored/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AlertDialogLongButtonsDemo() {
  const t = usePreviewDictionary().demos.tFlavored.alertDialog;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button size="xl" />}>
          {t.longButtons.trigger}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.title}</AlertDialogTitle>
            <AlertDialogDescription>{t.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.longButtons.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen(false)}>
              {t.longButtons.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
