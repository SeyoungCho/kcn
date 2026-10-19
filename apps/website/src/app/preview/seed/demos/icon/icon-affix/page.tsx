"use client";

import IconChevronRightLine from "@karrotmarket/react-monochrome-icon/IconChevronRightLine";
import IconPlusLine from "@karrotmarket/react-monochrome-icon/IconPlusLine";
import { ActionButton } from "@repo/seed/ui/action-button";
import { PrefixIcon, SuffixIcon } from "@repo/seed/ui/affix-icon";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function IconAffixDemo() {
  const t = usePreviewDictionary().demos.icon;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-3
        p-8"
    >
      <ActionButton>
        <PrefixIcon svg={<IconPlusLine />} />
        {t.affix.add}
      </ActionButton>
      <ActionButton variant="neutralWeak">
        {t.affix.next}
        <SuffixIcon svg={<IconChevronRightLine />} />
      </ActionButton>
    </div>
  );
}
