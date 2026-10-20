"use client";

import * as React from "react";
import { Checkbox, CheckboxGroup } from "@repo/seed/ui/checkbox";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const topics = ["watering", "orders", "tips"] as const;

export default function CheckboxGroupDemo() {
  const t = usePreviewDictionary().demos.checkbox;
  const [checked, setChecked] = React.useState<string[]>(["orders"]);

  const allChecked = checked.length === topics.length;
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
            onCheckedChange={(next) => setChecked(next ? [...topics] : [])}
          />
          {topics.map((topic) => (
            <Checkbox
              key={topic}
              label={t.group.items[topic]}
              checked={checked.includes(topic)}
              onCheckedChange={(next) =>
                setChecked((prev) =>
                  next
                    ? [...prev, topic]
                    : prev.filter((value) => value !== topic),
                )
              }
            />
          ))}
        </CheckboxGroup>
      </div>
    </div>
  );
}
