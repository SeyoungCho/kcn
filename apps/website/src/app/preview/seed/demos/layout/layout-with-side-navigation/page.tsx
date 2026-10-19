"use client";

import IconGearLine from "@karrotmarket/react-monochrome-icon/IconGearLine";
import IconHouseLine from "@karrotmarket/react-monochrome-icon/IconHouseLine";
import IconReceiptLine from "@karrotmarket/react-monochrome-icon/IconReceiptLine";
import { Layout, LayoutContent } from "@repo/seed/ui/layout";
import {
  SideNavigationContent,
  SideNavigationGroup,
  SideNavigationHeader,
  SideNavigationInset,
  SideNavigationProvider,
  SideNavigationRoot,
  SideNavigationTrigger,
} from "@repo/seed/ui/side-navigation";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function LayoutWithSideNavigationDemo() {
  const t = usePreviewDictionary().demos.layout;
  const orders = [t.orders.first, t.orders.second, t.orders.third];

  return (
    <div className="flex h-screen flex-col p-4 pt-14">
      <div
        className="flex min-h-0 flex-1 overflow-hidden rounded-r3 border
          border-stroke-neutral-muted"
      >
        <SideNavigationProvider>
          <Layout className="h-full flex-1">
            <SideNavigationRoot>
              <SideNavigationHeader>
                <div
                  className="flex h-x12 items-center overflow-hidden px-x2
                    pr-x12 text-t5 font-bold whitespace-nowrap text-fg-neutral"
                >
                  {t.navigation.brand}
                </div>
                <SideNavigationTrigger />
              </SideNavigationHeader>
              <SideNavigationContent>
                <SideNavigationGroup
                  items={[
                    { label: t.navigation.home, prefixIcon: <IconHouseLine /> },
                    {
                      label: t.navigation.orders,
                      prefixIcon: <IconReceiptLine />,
                      current: true,
                    },
                    {
                      label: t.navigation.settings,
                      prefixIcon: <IconGearLine />,
                    },
                  ]}
                />
              </SideNavigationContent>
            </SideNavigationRoot>
            <SideNavigationInset className="bg-bg-layer-basement">
              <LayoutContent className="p-x6">
                <h1 className="text-t7 font-bold text-fg-neutral">{t.title}</h1>
                <p className="mt-x1 text-t4 text-fg-neutral-subtle">
                  {t.description}
                </p>
                <ul
                  className="mt-x5 flex flex-col overflow-hidden rounded-r3
                    border border-stroke-neutral-muted bg-bg-layer-default"
                >
                  {orders.map((order) => (
                    <li
                      key={order.name}
                      className="flex items-center justify-between border-b
                        border-stroke-neutral-muted px-x4 py-x3 last:border-b-0"
                    >
                      <span className="text-t5 text-fg-neutral">
                        {order.name}
                      </span>
                      <span className="text-t4 text-fg-neutral-subtle">
                        {order.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </LayoutContent>
            </SideNavigationInset>
          </Layout>
        </SideNavigationProvider>
      </div>
    </div>
  );
}
