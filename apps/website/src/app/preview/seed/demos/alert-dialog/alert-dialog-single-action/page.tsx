"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/seed/ui/alert-dialog";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AlertDialogSingleActionDemo() {
  const t = usePreviewDictionary().demos.alertDialog;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <AlertDialogRoot>
        <AlertDialogTrigger render={<ActionButton variant="neutralWeak" />}>
          {t.soldOut.open}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.soldOut.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.soldOut.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>{t.soldOut.confirm}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
