"use client";

import * as React from "react";
import { Checkbox, CheckboxGroup } from "@repo/seed/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const interests = ["sports", "music", "travel"] as const;

export default function CheckboxGroupDemo() {
  const t = usePreviewDictionary().demos.checkbox;
  const [checked, setChecked] = React.useState<string[]>(["music"]);

  const allChecked = checked.length === interests.length;
  const someChecked = checked.length > 0 && !allChecked;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[320px]">
        <CheckboxGroup label={t.group.label} description={t.group.description}>
          <Checkbox
            label={t.group.selectAll}
            weight="bold"
            checked={allChecked}
            indeterminate={someChecked}
            onCheckedChange={(next) => setChecked(next ? [...interests] : [])}
          />
          {interests.map((interest) => (
            <Checkbox
              key={interest}
              label={t.group.items[interest]}
              checked={checked.includes(interest)}
              onCheckedChange={(next) =>
                setChecked((prev) =>
                  next
                    ? [...prev, interest]
                    : prev.filter((value) => value !== interest),
                )
              }
            />
          ))}
        </CheckboxGroup>
      </div>
    </div>
  );
}
