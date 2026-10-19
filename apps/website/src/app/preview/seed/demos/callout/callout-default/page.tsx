"use client";

import IconILowercaseSerifCircleLine from "@karrotmarket/react-monochrome-icon/IconILowercaseSerifCircleLine";
import { Callout } from "@repo/seed/ui/callout";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CalloutDefaultDemo() {
  const t = usePreviewDictionary().demos.callout;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[420px]">
        <Callout
          tone="informative"
          prefixIcon={<IconILowercaseSerifCircleLine />}
          title={t.title}
          description={t.description}
          linkProps={{ children: t.link }}
        />
      </div>
    </div>
  );
}
