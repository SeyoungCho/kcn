"use client";

import { useState } from "react";
import { Button } from "@repo/montage/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuFooter,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/montage/ui/dropdown-menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function DropdownMenuFooterDemo() {
  const t = usePreviewDictionary().demos.montage.dropdownMenu;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(["10k-30k", "pet-safe"]);

  const groups = [
    {
      label: t.footer.priceLabel,
      options: [
        { value: "under-10k", label: t.footer.under10k },
        { value: "10k-30k", label: t.footer.from10kTo30k },
        { value: "30k-50k", label: t.footer.from30kTo50k },
        { value: "over-50k", label: t.footer.over50k },
      ],
    },
    {
      label: t.footer.featuresLabel,
      options: [
        { value: "easy-care", label: t.footer.easyCare },
        { value: "pet-safe", label: t.footer.petSafe },
        { value: "new", label: t.footer.newArrival },
        { value: "sale", label: t.footer.sale },
      ],
    },
  ];

  const toggle = (value: string, checked: boolean) =>
    setSelected((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value),
    );

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          {t.footer.trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {groups.map((group) => (
            <DropdownMenuGroup key={group.label}>
              <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
              {group.options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={selected.includes(option.value)}
                  onCheckedChange={(checked) => toggle(option.value, checked)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          ))}
          <DropdownMenuFooter>
            <Button
              variant="link"
              size="sm"
              className="text-muted-foreground"
              onClick={() => setSelected([])}
            >
              {t.footer.reset}
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              {t.footer.apply}
            </Button>
          </DropdownMenuFooter>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
