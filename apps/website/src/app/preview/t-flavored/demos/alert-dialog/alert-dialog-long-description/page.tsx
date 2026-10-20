"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/t-flavored/ui/alert-dialog";
import { Button } from "@repo/t-flavored/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AlertDialogLongDescriptionDemo() {
  const t = usePreviewDictionary().demos.tFlavored.alertDialog;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button size="xl" />}>
          {t.longDescription.trigger}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {Array.from({ length: 30 }, () => t.longDescription.line).join(
                "\n",
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction variant="link" onClick={() => setOpen(false)}>
              {t.demo.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
