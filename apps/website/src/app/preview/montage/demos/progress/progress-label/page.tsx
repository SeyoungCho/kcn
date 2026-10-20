"use client";

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@repo/montage/ui/progress";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ProgressLabelDemo() {
  const t = usePreviewDictionary().demos.montage.progress;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Progress value={66} className="w-full max-w-[360px]">
        <ProgressLabel>{t.label}</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  );
}
