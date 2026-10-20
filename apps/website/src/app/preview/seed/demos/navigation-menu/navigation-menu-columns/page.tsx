"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import {
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuGroupItems,
  NavigationMenuGroupLabel,
  NavigationMenuItem,
  NavigationMenuProvider,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from "@repo/seed/ui/navigation-menu";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function NavigationMenuColumnsDemo() {
  const t = usePreviewDictionary().demos.navigationMenu;
  const categories = [
    t.categories.foliage,
    t.categories.succulents,
    t.categories.herbs,
    t.categories.flowers,
    t.categories.largePlants,
    t.categories.hanging,
    t.categories.airPurifying,
    t.categories.petSafe,
    t.categories.easyCare,
    t.categories.potsTools,
    t.categories.soil,
    t.categories.gifts,
  ];

  return (
    <div className="flex min-h-screen justify-center p-8 pt-14">
      <NavigationMenuProvider defaultValue="categories" size="small">
        <NavigationMenuRoot value="categories">
          <NavigationMenuTrigger
            render={<ActionButton variant="neutralWeak" size="small" />}
          >
            {t.menus.categories}
          </NavigationMenuTrigger>
          <NavigationMenuContent columns={2}>
            <NavigationMenuGroup>
              <NavigationMenuGroupLabel>
                {t.categories.label}
              </NavigationMenuGroupLabel>
              <NavigationMenuGroupItems>
                {categories.map((category) => (
                  <NavigationMenuItem key={category} label={category} />
                ))}
              </NavigationMenuGroupItems>
            </NavigationMenuGroup>
          </NavigationMenuContent>
        </NavigationMenuRoot>
      </NavigationMenuProvider>
    </div>
  );
}
