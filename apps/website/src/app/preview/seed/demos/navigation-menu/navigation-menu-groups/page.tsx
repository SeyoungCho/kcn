"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import {
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuGroupLabel,
  NavigationMenuItem,
  NavigationMenuProvider,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from "@repo/seed/ui/navigation-menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function NavigationMenuGroupsDemo() {
  const t = usePreviewDictionary().demos.navigationMenu;

  return (
    <div className="flex min-h-screen justify-center p-8 pt-14">
      <NavigationMenuProvider defaultValue="services" placement="bottom-start">
        <NavigationMenuRoot value="services">
          <NavigationMenuTrigger
            render={<ActionButton variant="neutralWeak" size="small" />}
          >
            {t.menus.services}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuGroup>
              <NavigationMenuGroupLabel>
                {t.groups.marketing}
              </NavigationMenuGroupLabel>
              <NavigationMenuItem label={t.groups.ads} current />
              <NavigationMenuItem label={t.groups.coupons} />
              <NavigationMenuItem label={t.groups.posts} />
            </NavigationMenuGroup>
            <NavigationMenuGroup>
              <NavigationMenuGroupLabel>
                {t.groups.management}
              </NavigationMenuGroupLabel>
              <NavigationMenuItem label={t.groups.orders} />
              <NavigationMenuItem label={t.groups.customers} />
              <NavigationMenuItem label={t.groups.settlement} disabled />
            </NavigationMenuGroup>
          </NavigationMenuContent>
        </NavigationMenuRoot>
      </NavigationMenuProvider>
    </div>
  );
}
