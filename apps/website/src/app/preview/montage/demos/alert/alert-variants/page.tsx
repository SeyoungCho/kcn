"use client";

import { Bell, CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react";
import { Alert, AlertTitle } from "@repo/montage/ui/alert";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AlertVariantsDemo() {
  const t = usePreviewDictionary().demos.montage.alert;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-md flex-col gap-3">
        <Alert>
          <Info />
          <AlertTitle>{t.variants.default}</AlertTitle>
        </Alert>
        <Alert variant="positive">
          <CircleCheck />
          <AlertTitle>{t.variants.positive}</AlertTitle>
        </Alert>
        <Alert variant="cautionary">
          <TriangleAlert />
          <AlertTitle>{t.variants.cautionary}</AlertTitle>
        </Alert>
        <Alert variant="destructive">
          <CircleX />
          <AlertTitle>{t.variants.destructive}</AlertTitle>
        </Alert>
        <Alert variant="neutral">
          <Bell />
          <AlertTitle>{t.variants.neutral}</AlertTitle>
        </Alert>
      </div>
    </div>
  );
}
