"use client";

import IconChevronDownLine from "@karrotmarket/react-monochrome-icon/IconChevronDownLine";
import IconHeartLine from "@karrotmarket/react-monochrome-icon/IconHeartLine";
import IconLocationpinLine from "@karrotmarket/react-monochrome-icon/IconLocationpinLine";
import IconStarFill from "@karrotmarket/react-monochrome-icon/IconStarFill";
import {
  ButtonChip,
  ChipLabel,
  ChipPrefixIcon,
  ChipSuffixIcon,
  ToggleChip,
} from "@repo/seed/ui/chip";
import { Icon } from "@repo/seed/ui/icon";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ChipWithIconDemo() {
  const t = usePreviewDictionary().demos.chip;

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-2
        p-8"
    >
      <ToggleChip defaultChecked>
        <ChipPrefixIcon>
          <Icon svg={<IconHeartLine />} />
        </ChipPrefixIcon>
        <ChipLabel>{t.withIcon.saved}</ChipLabel>
      </ToggleChip>
      <ToggleChip variant="outlineStrong">
        <ChipPrefixIcon>
          <Icon svg={<IconLocationpinLine />} />
        </ChipPrefixIcon>
        <ChipLabel>{t.withIcon.pickup}</ChipLabel>
      </ToggleChip>
      <ButtonChip variant="outlineWeak">
        <ChipLabel>{t.withIcon.sort}</ChipLabel>
        <ChipSuffixIcon>
          <Icon svg={<IconChevronDownLine />} />
        </ChipSuffixIcon>
      </ButtonChip>
      <ToggleChip
        layout="iconOnly"
        inputProps={{ "aria-label": t.withIcon.topRated }}
      >
        <Icon svg={<IconStarFill />} size="x4" />
      </ToggleChip>
    </div>
  );
}
