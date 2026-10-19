"use client";

import * as React from "react";
import { Checkbox } from "@repo/seed/ui/checkbox";
import {
  FloatingToolbar,
  FloatingToolbarButton,
  FloatingToolbarLabel,
  FloatingToolbarSeparator,
} from "@repo/seed/ui/floating-toolbar";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const members = ["kim", "lee", "park", "choi"] as const;

type Member = (typeof members)[number];

const subscribe = () => () => {};

export default function FloatingToolbarWithSelectionDemo() {
  const t = usePreviewDictionary().demos.floatingToolbar;
  // FloatingToolbar portals to document.body, so open it only after hydration.
  const isClient = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [selected, setSelected] = React.useState<Member[]>(["kim", "park"]);

  const toggle = (member: Member, checked: boolean) =>
    setSelected((current) =>
      checked
        ? [...current, member]
        : current.filter((value) => value !== member),
    );

  return (
    <div className="flex min-h-screen justify-center p-8">
      <div className="flex flex-col gap-3">
        {members.map((member) => (
          <Checkbox
            key={member}
            label={t.members[member]}
            checked={selected.includes(member)}
            onCheckedChange={(checked) => toggle(member, checked)}
          />
        ))}
      </div>
      <FloatingToolbar
        open={isClient && selected.length > 0}
        onDismiss={() => setSelected([])}
        closeLabel={t.closeLabel}
        aria-label={t.toolbarLabel}
      >
        <FloatingToolbarLabel>
          {t.selectedCount.replace("{count}", String(selected.length))}
        </FloatingToolbarLabel>
        <FloatingToolbarSeparator />
        <FloatingToolbarButton>{t.edit}</FloatingToolbarButton>
        <FloatingToolbarButton tone="critical">{t.block}</FloatingToolbarButton>
      </FloatingToolbar>
    </div>
  );
}
