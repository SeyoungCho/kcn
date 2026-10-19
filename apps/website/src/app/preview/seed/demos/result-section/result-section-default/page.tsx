"use client";

import IconMagnifyingglassLine from "@karrotmarket/react-monochrome-icon/IconMagnifyingglassLine";
import { Icon } from "@repo/seed/ui/icon";
import { ResultSection } from "@repo/seed/ui/result-section";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ResultSectionDefaultDemo() {
  const t = usePreviewDictionary().demos.resultSection;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ResultSection
        asset={
          <Icon
            svg={<IconMagnifyingglassLine />}
            size={48}
            color="var(--fg-neutral-subtle)"
            className="mb-x4"
          />
        }
        title={t.title}
        description={t.description}
        primaryActionProps={{ children: t.primaryAction }}
        secondaryActionProps={{ children: t.secondaryAction }}
      />
    </div>
  );
}
