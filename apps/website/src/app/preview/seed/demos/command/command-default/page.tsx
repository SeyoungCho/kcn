"use client";

import type { ReactElement } from "react";
import IconBellLine from "@karrotmarket/react-monochrome-icon/IconBellLine";
import IconCalendarLine from "@karrotmarket/react-monochrome-icon/IconCalendarLine";
import IconGearLine from "@karrotmarket/react-monochrome-icon/IconGearLine";
import IconMagnifyingglassLine from "@karrotmarket/react-monochrome-icon/IconMagnifyingglassLine";
import IconPencilLine from "@karrotmarket/react-monochrome-icon/IconPencilLine";
import IconPersonLine from "@karrotmarket/react-monochrome-icon/IconPersonLine";
import {
  Command,
  CommandCollection,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@repo/seed/ui/command";
import { Icon } from "@repo/seed/ui/icon";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

interface CommandEntry {
  value: string;
  label: string;
  icon: ReactElement;
  shortcut?: string;
}

export default function CommandDefaultDemo() {
  const t = usePreviewDictionary().demos.command;

  const groups: { value: string; label: string; items: CommandEntry[] }[] = [
    {
      value: "suggestions",
      label: t.groups.suggestions,
      items: [
        {
          value: "calendar",
          label: t.items.calendar,
          icon: <IconCalendarLine />,
        },
        {
          value: "search",
          label: t.items.search,
          icon: <IconMagnifyingglassLine />,
          shortcut: "⌘F",
        },
        {
          value: "new-post",
          label: t.items.newPost,
          icon: <IconPencilLine />,
          shortcut: "⌘N",
        },
      ],
    },
    {
      value: "settings",
      label: t.groups.settings,
      items: [
        { value: "profile", label: t.items.profile, icon: <IconPersonLine /> },
        {
          value: "notifications",
          label: t.items.notifications,
          icon: <IconBellLine />,
        },
        {
          value: "settings",
          label: t.items.settings,
          icon: <IconGearLine />,
          shortcut: "⌘,",
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="flex w-full max-w-[480px] flex-col overflow-hidden rounded-r5
          bg-bg-layer-floating shadow-s3"
      >
        <Command items={groups}>
          <CommandInput placeholder={t.placeholder} />
          <CommandEmpty>{t.empty}</CommandEmpty>
          <CommandList>
            {(group: (typeof groups)[number]) => (
              <CommandGroup key={group.value} items={group.items}>
                <CommandGroupLabel>{group.label}</CommandGroupLabel>
                <CommandCollection>
                  {(item: CommandEntry) => (
                    <CommandItem key={item.value} value={item}>
                      <Icon svg={item.icon} />
                      <span className="grow">{item.label}</span>
                      {item.shortcut ? (
                        <CommandShortcut>{item.shortcut}</CommandShortcut>
                      ) : null}
                    </CommandItem>
                  )}
                </CommandCollection>
              </CommandGroup>
            )}
          </CommandList>
          <CommandFooter>
            <span className="flex items-center gap-x1">
              <CommandShortcut>↑↓</CommandShortcut>
              {t.footer.navigate}
            </span>
            <span className="flex items-center gap-x1">
              <CommandShortcut>Enter</CommandShortcut>
              {t.footer.select}
            </span>
          </CommandFooter>
        </Command>
      </div>
    </div>
  );
}
