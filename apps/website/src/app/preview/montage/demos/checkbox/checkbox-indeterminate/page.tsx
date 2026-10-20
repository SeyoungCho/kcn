"use client";

import { useState } from "react";
import { Checkbox } from "@repo/montage/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CheckboxIndeterminateDemo() {
  const t = usePreviewDictionary().demos.montage.checkbox;
  const [monstera, setMonstera] = useState(true);
  const [wateringCan, setWateringCan] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-2">
        <label
          className="flex items-center gap-2 text-body2 text-fg-neutral-primary"
        >
          <Checkbox
            checked={monstera && wateringCan}
            indeterminate={monstera !== wateringCan}
            onCheckedChange={(checked) => {
              setMonstera(checked);
              setWateringCan(checked);
            }}
          />
          {t.indeterminate.all}
        </label>
        <div className="flex flex-col gap-2 pl-5">
          <label
            className="flex items-center gap-2 text-body2
              text-fg-neutral-primary"
          >
            <Checkbox checked={monstera} onCheckedChange={setMonstera} />
            {t.indeterminate.monstera}
          </label>
          <label
            className="flex items-center gap-2 text-body2
              text-fg-neutral-primary"
          >
            <Checkbox checked={wateringCan} onCheckedChange={setWateringCan} />
            {t.indeterminate.wateringCan}
          </label>
        </div>
      </div>
    </div>
  );
}
