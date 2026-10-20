"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/montage/ui/avatar";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function AvatarButtonDemo() {
  const t = usePreviewDictionary().demos.montage.avatar;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex items-center gap-6">
        <Avatar
          size="lg"
          render={<button type="button" aria-label={t.openProfile} />}
        >
          <AvatarImage
            src="https://picsum.photos/seed/kcn-avatar/200/200"
            alt=""
          />
          <AvatarFallback />
        </Avatar>
        <Avatar
          size="lg"
          variant="logo"
          render={<button type="button" aria-label={t.openShop} />}
        >
          <AvatarFallback />
        </Avatar>
      </div>
    </div>
  );
}
