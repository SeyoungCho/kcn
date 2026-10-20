"use client";

import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@repo/montage/ui/alert";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AlertDemo() {
  const t = usePreviewDictionary().demos.montage.alert;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Alert className="max-w-md">
        <Info />
        <AlertTitle>{t.demo.title}</AlertTitle>
        <AlertDescription>{t.demo.description}</AlertDescription>
      </Alert>
    </div>
  );
}
