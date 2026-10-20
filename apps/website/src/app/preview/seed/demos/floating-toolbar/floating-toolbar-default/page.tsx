"use client";

import * as React from "react";
import IconArrowDownLine from "@karrotmarket/react-monochrome-icon/IconArrowDownLine";
import IconPencilLine from "@karrotmarket/react-monochrome-icon/IconPencilLine";
import IconTrashcanLine from "@karrotmarket/react-monochrome-icon/IconTrashcanLine";
import { ActionButton } from "@repo/seed/ui/action-button";
import { PrefixIcon } from "@repo/seed/ui/affix-icon";
import {
  FloatingToolbar,
  FloatingToolbarButton,
  FloatingToolbarLabel,
  FloatingToolbarSeparator,
} from "@repo/seed/ui/floating-toolbar";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function FloatingToolbarDefaultDemo() {
  const t = usePreviewDictionary().demos.floatingToolbar;
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ActionButton
        variant="neutralWeak"
        disabled={open}
        onClick={() => setOpen(true)}
      >
        {t.show}
      </ActionButton>
      <FloatingToolbar
        open={open}
        onDismiss={() => setOpen(false)}
        closeLabel={t.closeLabel}
        aria-label={t.photos.toolbarLabel}
      >
        <FloatingToolbarLabel>{t.photos.selected}</FloatingToolbarLabel>
        <FloatingToolbarSeparator />
        <FloatingToolbarButton>
          <PrefixIcon svg={<IconPencilLine />} />
          {t.photos.edit}
        </FloatingToolbarButton>
        <FloatingToolbarButton>
          <PrefixIcon svg={<IconArrowDownLine />} />
          {t.photos.download}
        </FloatingToolbarButton>
        <FloatingToolbarButton tone="critical">
          <PrefixIcon svg={<IconTrashcanLine />} />
          {t.photos.delete}
        </FloatingToolbarButton>
      </FloatingToolbar>
    </div>
  );
}
