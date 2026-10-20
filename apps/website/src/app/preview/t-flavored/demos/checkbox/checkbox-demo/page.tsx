"use client";

import { Checkbox } from "@repo/t-flavored/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CheckboxDemo() {
  const t = usePreviewDictionary().demos.tFlavored.checkbox;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] flex-col gap-4">
        <label className="flex items-center gap-3 text-t6 text-grey-800">
          <Checkbox defaultChecked />
          {t.demo.terms}
        </label>
        <label className="flex items-center gap-3 text-t6 text-grey-800">
          <Checkbox defaultChecked />
          {t.demo.privacy}
        </label>
        <label className="flex items-center gap-3 text-t6 text-grey-800">
          <Checkbox />
          {t.demo.marketing}
        </label>
      </div>
    </div>
  );
}
