"use client";

import IconCouponLine from "@karrotmarket/react-monochrome-icon/IconCouponLine";
import IconGearLine from "@karrotmarket/react-monochrome-icon/IconGearLine";
import IconHouseLine from "@karrotmarket/react-monochrome-icon/IconHouseLine";
import IconMegaphoneLine from "@karrotmarket/react-monochrome-icon/IconMegaphoneLine";
import IconPerson2Line from "@karrotmarket/react-monochrome-icon/IconPerson2Line";
import IconReceiptLine from "@karrotmarket/react-monochrome-icon/IconReceiptLine";
import IconStarLine from "@karrotmarket/react-monochrome-icon/IconStarLine";
import {
  SideNavigationContent,
  SideNavigationFooter,
  SideNavigationGroup,
  SideNavigationHeader,
  SideNavigationInset,
  SideNavigationItemButton,
  SideNavigationProvider,
  SideNavigationRoot,
  SideNavigationTrigger,
} from "@repo/seed/ui/side-navigation";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function SideNavigationCollapsedDemo() {
  const t = usePreviewDictionary().demos.sideNavigation;

  return (
    <div className="flex h-screen flex-col p-4 pt-14">
      <div
        className="flex min-h-0 flex-1 overflow-hidden rounded-r3 border
          border-stroke-neutral-muted"
      >
        <SideNavigationProvider defaultCollapsed>
          <SideNavigationRoot>
            <SideNavigationHeader>
              <div
                className="flex h-x12 items-center overflow-hidden px-x2 pr-x12
                  text-t5 font-bold whitespace-nowrap text-fg-neutral"
              >
                {t.brand}
              </div>
              <SideNavigationTrigger />
            </SideNavigationHeader>
            <SideNavigationContent>
              <SideNavigationGroup
                items={[
                  {
                    label: t.items.home,
                    prefixIcon: <IconHouseLine />,
                    current: true,
                  },
                ]}
              />
              <SideNavigationGroup
                label={t.groups.store}
                items={[
                  { label: t.items.orders, prefixIcon: <IconReceiptLine /> },
                  { label: t.items.customers, prefixIcon: <IconPerson2Line /> },
                  { label: t.items.reviews, prefixIcon: <IconStarLine /> },
                ]}
              />
              <SideNavigationGroup
                label={t.groups.marketing}
                items={[
                  {
                    label: t.items.ads,
                    prefixIcon: <IconMegaphoneLine />,
                    defaultOpen: true,
                    items: [
                      { label: t.items.campaigns },
                      { label: t.items.reports },
                      { label: t.items.billing },
                    ],
                  },
                  { label: t.items.coupons, prefixIcon: <IconCouponLine /> },
                ]}
              />
            </SideNavigationContent>
            <SideNavigationFooter>
              <SideNavigationItemButton
                prefixIcon={<IconGearLine />}
                label={t.items.settings}
              />
            </SideNavigationFooter>
          </SideNavigationRoot>
          <SideNavigationInset className="bg-bg-layer-default p-x6">
            <h1 className="text-t7 font-bold text-fg-neutral">
              {t.content.title}
            </h1>
            <p className="mt-x2 text-t4 text-fg-neutral-subtle">
              {t.content.collapsedDescription}
            </p>
          </SideNavigationInset>
        </SideNavigationProvider>
      </div>
    </div>
  );
}
