"use client";

import IconBellLine from "@karrotmarket/react-monochrome-icon/IconBellLine";
import IconHeartLine from "@karrotmarket/react-monochrome-icon/IconHeartLine";
import IconHouseLine from "@karrotmarket/react-monochrome-icon/IconHouseLine";
import IconMagnifyingglassLine from "@karrotmarket/react-monochrome-icon/IconMagnifyingglassLine";
import IconPersonLine from "@karrotmarket/react-monochrome-icon/IconPersonLine";
import { Icon } from "@repo/seed/ui/icon";

export default function IconDefaultDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-4 p-8">
      <Icon svg={<IconHouseLine />} size="x6" />
      <Icon svg={<IconMagnifyingglassLine />} size="x6" />
      <Icon svg={<IconHeartLine />} size="x6" />
      <Icon svg={<IconBellLine />} size="x6" />
      <Icon svg={<IconPersonLine />} size="x6" />
    </div>
  );
}
