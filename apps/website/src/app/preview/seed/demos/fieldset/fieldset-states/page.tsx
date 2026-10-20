"use client";

import * as React from "react";
import { Checkbox } from "@repo/seed/ui/checkbox";
import {
  Fieldset,
  FieldsetErrorMessage,
  FieldsetFooter,
  FieldsetHeader,
  FieldsetLabel,
  FieldsetRequiredIndicator,
} from "@repo/seed/ui/fieldset";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const agreements = ["returns", "address"] as const;

export default function FieldsetStatesDemo() {
  const t = usePreviewDictionary().demos.fieldset;
  const id = React.useId();
  const [checked, setChecked] = React.useState<string[]>(["returns"]);
  const invalid = checked.length < agreements.length;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[320px]">
        <Fieldset
          role="group"
          aria-labelledby={`${id}-label`}
          aria-describedby={invalid ? `${id}-error` : undefined}
        >
          <FieldsetHeader>
            <FieldsetLabel id={`${id}-label`}>
              {t.requiredLabel}
              <FieldsetRequiredIndicator />
            </FieldsetLabel>
          </FieldsetHeader>
          <div className="flex flex-col gap-x1">
            {agreements.map((agreement) => (
              <Checkbox
                key={agreement}
                label={t.agreements[agreement]}
                invalid={invalid && !checked.includes(agreement)}
                checked={checked.includes(agreement)}
                onCheckedChange={(next) =>
                  setChecked((prev) =>
                    next
                      ? [...prev, agreement]
                      : prev.filter((value) => value !== agreement),
                  )
                }
              />
            ))}
          </div>
          {invalid ? (
            <FieldsetFooter>
              <FieldsetErrorMessage id={`${id}-error`}>
                {t.errorMessage}
              </FieldsetErrorMessage>
            </FieldsetFooter>
          ) : null}
        </Fieldset>
      </div>
    </div>
  );
}
