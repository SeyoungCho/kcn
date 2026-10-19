"use client";

import * as React from "react";
import IconCalendarLine from "@karrotmarket/react-monochrome-icon/IconCalendarLine";
import {
  FieldButton,
  FieldButtonPlaceholder,
  FieldButtonValue,
} from "@repo/seed/ui/field-button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function FieldButtonDefaultDemo() {
  const t = usePreviewDictionary().demos.fieldButton;
  const [values, setValues] = React.useState<string[]>([]);
  const selected = values.length > 0;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[360px]">
        <FieldButton
          label={t.label}
          description={t.description}
          prefixIcon={<IconCalendarLine />}
          name="pickupDate"
          values={values}
          onValuesChange={setValues}
          showClearButton={selected}
          clearLabel={t.clearLabel}
          buttonProps={{
            "aria-label": selected ? `${t.label}: ${t.value}` : t.label,
            // A real app would open a date picker here.
            onClick: () => setValues(["2026-10-19"]),
          }}
        >
          {selected ? (
            <FieldButtonValue>{t.value}</FieldButtonValue>
          ) : (
            <FieldButtonPlaceholder>{t.placeholder}</FieldButtonPlaceholder>
          )}
        </FieldButton>
      </div>
    </div>
  );
}
