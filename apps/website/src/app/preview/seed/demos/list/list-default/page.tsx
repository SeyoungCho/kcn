"use client";

import IconBellLine from "@karrotmarket/react-monochrome-icon/IconBellLine";
import IconChevronRightLine from "@karrotmarket/react-monochrome-icon/IconChevronRightLine";
import IconLockLine from "@karrotmarket/react-monochrome-icon/IconLockLine";
import IconPersonLine from "@karrotmarket/react-monochrome-icon/IconPersonLine";
import IconQuestionmarkCircleLine from "@karrotmarket/react-monochrome-icon/IconQuestionmarkCircleLine";
import { Icon } from "@repo/seed/ui/icon";
import {
  List,
  ListButtonItem,
  ListDivider,
  ListHeader,
} from "@repo/seed/ui/list";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ListDefaultDemo() {
  const t = usePreviewDictionary().demos.list;
  const chevron = <Icon svg={<IconChevronRightLine />} />;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[360px]">
        <ListHeader render={<h2 />}>{t.header}</ListHeader>
        <List>
          <ListButtonItem
            prefix={<Icon svg={<IconBellLine />} />}
            title={t.items.notifications.title}
            detail={t.items.notifications.detail}
            suffix={
              <>
                {t.on}
                {chevron}
              </>
            }
          />
          <ListButtonItem
            prefix={<Icon svg={<IconPersonLine />} />}
            title={t.items.account.title}
            detail={t.items.account.detail}
            suffix={chevron}
          />
          <ListButtonItem
            prefix={<Icon svg={<IconLockLine />} />}
            title={t.items.privacy.title}
            detail={t.items.privacy.detail}
            suffix={chevron}
          />
          <ListDivider />
          <ListButtonItem
            prefix={<Icon svg={<IconQuestionmarkCircleLine />} />}
            title={t.items.help.title}
            suffix={chevron}
          />
        </List>
      </div>
    </div>
  );
}
