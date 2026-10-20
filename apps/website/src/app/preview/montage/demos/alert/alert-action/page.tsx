"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@repo/montage/ui/alert";
import { Button } from "@repo/montage/ui/button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AlertActionDemo() {
  const t = usePreviewDictionary().demos.montage.alert;
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      {open ? (
        <Alert className="max-w-md">
          <Info />
          <AlertTitle>{t.action.title}</AlertTitle>
          <AlertDescription>{t.action.description}</AlertDescription>
          <AlertAction>
            <Button variant="link" size="sm">
              {t.action.view}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-fg-neutral-tertiary"
              aria-label={t.action.close}
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </Button>
          </AlertAction>
        </Alert>
      ) : (
        <Button variant="outline" onClick={() => setOpen(true)}>
          {t.action.reopen}
        </Button>
      )}
    </div>
  );
}
