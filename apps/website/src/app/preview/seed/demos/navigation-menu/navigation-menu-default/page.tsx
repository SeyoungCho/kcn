"use client";

import IconBarchartSquareLine from "@karrotmarket/react-monochrome-icon/IconBarchartSquareLine";
import IconCouponLine from "@karrotmarket/react-monochrome-icon/IconCouponLine";
import IconMegaphoneLine from "@karrotmarket/react-monochrome-icon/IconMegaphoneLine";
import { ActionButton } from "@repo/seed/ui/action-button";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuProvider,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from "@repo/seed/ui/navigation-menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function NavigationMenuDefaultDemo() {
  const t = usePreviewDictionary().demos.navigationMenu;

  return (
    <div className="flex min-h-screen justify-center p-8 pt-14">
      <NavigationMenuProvider defaultValue="products">
        <nav className="flex h-fit items-center gap-x1">
          <span className="mr-x3 text-t5 font-bold text-fg-neutral">
            {t.brand}
          </span>
          <NavigationMenuRoot value="products">
            <NavigationMenuTrigger
              render={<ActionButton variant="ghost" size="small" />}
            >
              {t.menus.benefits}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuItem
                prefixIcon={<IconMegaphoneLine />}
                label={t.benefits.events.label}
                description={t.benefits.events.description}
              />
              <NavigationMenuItem
                prefixIcon={<IconCouponLine />}
                label={t.benefits.coupons.label}
                description={t.benefits.coupons.description}
              />
              <NavigationMenuItem
                prefixIcon={<IconBarchartSquareLine />}
                label={t.benefits.points.label}
                description={t.benefits.points.description}
              />
            </NavigationMenuContent>
          </NavigationMenuRoot>
          <NavigationMenuRoot value="categories">
            <NavigationMenuTrigger
              render={<ActionButton variant="ghost" size="small" />}
            >
              {t.menus.categories}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuItem label={t.categories.foliage} />
              <NavigationMenuItem label={t.categories.succulents} />
              <NavigationMenuItem label={t.categories.herbs} />
            </NavigationMenuContent>
          </NavigationMenuRoot>
        </nav>
      </NavigationMenuProvider>
    </div>
  );
}
