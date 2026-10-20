"use client";

import * as React from "react";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetFooter,
  FieldsetHeader,
  FieldsetIndicatorText,
  FieldsetLabel,
} from "@repo/seed/ui/fieldset";
import { Switch } from "@repo/seed/ui/switch";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const items = ["watering", "orders", "offers"] as const;

export default function FieldsetDefaultDemo() {
  const t = usePreviewDictionary().demos.fieldset;
  const id = React.useId();

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[320px]">
        <Fieldset
          role="group"
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-description`}
        >
          <FieldsetHeader>
            <FieldsetLabel id={`${id}-label`}>
              {t.label}
              <FieldsetIndicatorText>{t.indicator}</FieldsetIndicatorText>
            </FieldsetLabel>
          </FieldsetHeader>
          <div className="flex flex-col gap-x1">
            {items.map((item) => (
              <Switch
                key={item}
                size={24}
                label={t.items[item]}
                defaultChecked={item === "watering"}
              />
            ))}
          </div>
          <FieldsetFooter>
            <FieldsetDescription id={`${id}-description`}>
              {t.description}
            </FieldsetDescription>
          </FieldsetFooter>
        </Fieldset>
      </div>
    </div>
  );
}
