"use client";

import IconCalendarLine from "@karrotmarket/react-monochrome-icon/IconCalendarLine";
import {
  FieldButton,
  FieldButtonPlaceholder,
  FieldButtonValue,
} from "@repo/seed/ui/field-button";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function FieldButtonStatesDemo() {
  const t = usePreviewDictionary().demos.fieldButton;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[360px] flex-col gap-6">
        <FieldButton
          label={t.states.invalid}
          invalid
          errorMessage={t.errorMessage}
          required
          showRequiredIndicator
          prefixIcon={<IconCalendarLine />}
          buttonProps={{ "aria-label": t.states.invalid }}
        >
          <FieldButtonPlaceholder>{t.placeholder}</FieldButtonPlaceholder>
        </FieldButton>
        <FieldButton
          label={t.states.disabled}
          disabled
          prefixIcon={<IconCalendarLine />}
          buttonProps={{ "aria-label": t.states.disabled }}
        >
          <FieldButtonPlaceholder>{t.placeholder}</FieldButtonPlaceholder>
        </FieldButton>
        <FieldButton
          label={t.states.readOnly}
          readOnly
          prefixIcon={<IconCalendarLine />}
          values={["2026-10-19"]}
          buttonProps={{ "aria-label": `${t.states.readOnly}: ${t.value}` }}
        >
          <FieldButtonValue>{t.value}</FieldButtonValue>
        </FieldButton>
      </div>
    </div>
  );
}
