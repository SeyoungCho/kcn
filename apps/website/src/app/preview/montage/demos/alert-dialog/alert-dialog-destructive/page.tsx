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
} from "@repo/montage/ui/alert-dialog";
import { Button } from "@repo/montage/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AlertDialogDestructiveDemo() {
  const t = usePreviewDictionary().demos.montage.alertDialog;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant="destructive" />}>
          {t.destructive.trigger}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.destructive.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.destructive.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.destructive.cancel}</AlertDialogCancel>
            <AlertDialogAction
              className="text-destructive"
              onClick={() => setOpen(false)}
            >
              {t.destructive.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
