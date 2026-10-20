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

export default function AlertDialogDefaultDemo() {
  const t = usePreviewDictionary().demos.alertDialog;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <AlertDialogRoot>
        <AlertDialogTrigger render={<ActionButton variant="criticalSolid" />}>
          {t.cancelOrder.open}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.cancelOrder.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.cancelOrder.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex gap-x2">
              <AlertDialogAction variant="neutralWeak" className="flex-1">
                {t.cancelOrder.cancel}
              </AlertDialogAction>
              <AlertDialogAction variant="criticalSolid" className="flex-1">
                {t.cancelOrder.confirm}
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
