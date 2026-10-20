"use client";

import { useState } from "react";
import { Button } from "@repo/t-flavored/ui/button";
import { Progress } from "@repo/t-flavored/ui/progress";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ProgressAnimatedDemo() {
  const t = usePreviewDictionary().demos.tFlavored.progress;
  const [progress, setProgress] = useState(0);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] flex-col gap-10">
        <Progress value={progress} size="lg" aria-label={t.label} />
        <Button onClick={() => setProgress(progress === 0 ? 100 : 0)}>
          {progress === 0 ? t.start : t.reset}
        </Button>
      </div>
    </div>
  );
}
