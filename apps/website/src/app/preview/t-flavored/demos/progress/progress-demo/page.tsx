"use client";

import { useEffect, useState } from "react";
import { Progress } from "@repo/t-flavored/ui/progress";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ProgressDemo() {
  const t = usePreviewDictionary().demos.tFlavored.progress;
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Progress
        value={progress}
        aria-label={t.label}
        className="w-full max-w-[360px]"
      />
    </div>
  );
}
