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

const plants = ["monstera", "pothos", "olive", "pilea"] as const;

type Plant = (typeof plants)[number];

export default function FloatingToolbarWithSelectionDemo() {
  const t = usePreviewDictionary().demos.floatingToolbar;
  const [selected, setSelected] = React.useState<Plant[]>([
    "monstera",
    "olive",
  ]);

  const toggle = (plant: Plant, checked: boolean) =>
    setSelected((current) =>
      checked
        ? [...current, plant]
        : current.filter((value) => value !== plant),
    );

  return (
    <div className="flex min-h-screen justify-center p-8">
      <div className="flex flex-col gap-3">
        {plants.map((plant) => (
          <Checkbox
            key={plant}
            label={t.plants.items[plant]}
            checked={selected.includes(plant)}
            onCheckedChange={(checked) => toggle(plant, checked)}
          />
        ))}
      </div>
      <FloatingToolbar
        open={selected.length > 0}
        onDismiss={() => setSelected([])}
        closeLabel={t.closeLabel}
        aria-label={t.plants.toolbarLabel}
      >
        <FloatingToolbarLabel>
          {t.plants.selectedCount.replace("{count}", String(selected.length))}
        </FloatingToolbarLabel>
        <FloatingToolbarSeparator />
        <FloatingToolbarButton>{t.plants.water}</FloatingToolbarButton>
        <FloatingToolbarButton tone="critical">
          {t.plants.remove}
        </FloatingToolbarButton>
      </FloatingToolbar>
    </div>
  );
}
