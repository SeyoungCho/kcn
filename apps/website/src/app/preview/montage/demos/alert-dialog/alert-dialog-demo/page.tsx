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

export default function AlertDialogDemo() {
  const t = usePreviewDictionary().demos.montage.alertDialog;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant="outline" />}>
          {t.demo.trigger}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.demo.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.demo.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.demo.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen(false)}>
              {t.demo.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
