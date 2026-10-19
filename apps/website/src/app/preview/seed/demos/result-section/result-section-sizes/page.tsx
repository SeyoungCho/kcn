"use client";

import { ResultSection } from "@repo/seed/ui/result-section";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ResultSectionSizesDemo() {
  const t = usePreviewDictionary().demos.resultSection;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-8
        p-8 sm:flex-row"
    >
      <ResultSection
        size="large"
        px="x4"
        title={t.medium.title}
        description={t.medium.description}
      />
      <ResultSection
        size="medium"
        px="x4"
        title={t.medium.title}
        description={t.medium.description}
      />
    </div>
  );
}
