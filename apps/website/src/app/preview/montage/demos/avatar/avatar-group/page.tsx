"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@repo/montage/ui/avatar";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AvatarGroupDemo() {
  const t = usePreviewDictionary().demos.montage.avatar;
  const members = [
    { seed: "kcn-a", name: t.members.haneul },
    { seed: "kcn-b", name: t.members.doyun },
    { seed: "kcn-c", name: t.members.seoyeon },
    { seed: "kcn-d", name: t.members.minjun },
  ];

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-6
        p-8"
    >
      <AvatarGroup>
        {members.map(({ seed, name }) => (
          <Avatar key={seed}>
            <AvatarImage
              src={`https://picsum.photos/seed/${seed}/200/200`}
              alt={name}
            />
            <AvatarFallback />
          </Avatar>
        ))}
        <AvatarGroupCount>{t.groupCount}</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup>
        {members.map(({ seed, name }) => (
          <Avatar key={seed} size="sm">
            <AvatarImage
              src={`https://picsum.photos/seed/${seed}/200/200`}
              alt={name}
            />
            <AvatarFallback />
          </Avatar>
        ))}
        <AvatarGroupCount>{t.groupCount}</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
