"use client";

import { Spinner } from "@repo/t-flavored/ui/spinner";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SpinnerWithLabelDemo() {
  const t = usePreviewDictionary().demos.tFlavored.spinner;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3.5">
        <Spinner aria-label={t.loading} />
        <p className="text-center text-t6 whitespace-pre-wrap text-grey-800">
          {t.label}
        </p>
      </div>
    </div>
  );
}
