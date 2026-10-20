"use client";

import * as React from "react";
import { ActionButton } from "@repo/seed/ui/action-button";
import {
  Command,
  CommandEmpty,
  CommandFooter,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  CommandDialog,
} from "@repo/seed/ui/command";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function CommandDialogDemo() {
  const t = usePreviewDictionary().demos.command;
  const [open, setOpen] = React.useState(false);

  // ⌘K / Ctrl+K toggles the palette.
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const items = [
    { value: "calendar", label: t.items.calendar },
    { value: "search", label: t.items.search },
    { value: "review", label: t.items.review },
    { value: "profile", label: t.items.profile },
    { value: "notifications", label: t.items.notifications },
    { value: "settings", label: t.items.settings },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ActionButton variant="neutralOutline" onClick={() => setOpen(true)}>
        {t.dialog.trigger}
        <CommandShortcut>⌘K</CommandShortcut>
      </ActionButton>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        aria-label={t.dialog.ariaLabel}
      >
        <Command items={items}>
          <CommandInput placeholder={t.placeholder} />
          <CommandEmpty>{t.empty}</CommandEmpty>
          <CommandList>
            {(item: (typeof items)[number]) => (
              <CommandItem
                key={item.value}
                value={item}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </CommandItem>
            )}
          </CommandList>
          <CommandFooter>
            <span className="flex items-center gap-x1">
              <CommandShortcut>Enter</CommandShortcut>
              {t.footer.select}
            </span>
            <span className="flex items-center gap-x1">
              <CommandShortcut>Esc</CommandShortcut>
              {t.footer.close}
            </span>
          </CommandFooter>
        </Command>
      </CommandDialog>
    </div>
  );
}
