"use client";

import IconMagnifyingglassLine from "@karrotmarket/react-monochrome-icon/IconMagnifyingglassLine";
import IconPlusLine from "@karrotmarket/react-monochrome-icon/IconPlusLine";
import IconTrashcanLine from "@karrotmarket/react-monochrome-icon/IconTrashcanLine";
import { ActionButton } from "@repo/seed/ui/action-button";
import { PrefixIcon } from "@repo/seed/ui/affix-icon";
import { Icon } from "@repo/seed/ui/icon";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ActionButtonWithIconDemo() {
  const t = usePreviewDictionary().demos.actionButton;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-3
        p-8"
    >
      <ActionButton>
        <PrefixIcon svg={<IconPlusLine />} />
        {t.withIcon.add}
      </ActionButton>
      <ActionButton variant="neutralOutline">
        <PrefixIcon svg={<IconMagnifyingglassLine />} />
        {t.withIcon.search}
      </ActionButton>
      <ActionButton variant="criticalSolid">
        <PrefixIcon svg={<IconTrashcanLine />} />
        {t.withIcon.delete}
      </ActionButton>
      <ActionButton
        variant="neutralWeak"
        layout="iconOnly"
        aria-label={t.iconOnly}
      >
        <Icon svg={<IconPlusLine />} />
      </ActionButton>
    </div>
  );
}
