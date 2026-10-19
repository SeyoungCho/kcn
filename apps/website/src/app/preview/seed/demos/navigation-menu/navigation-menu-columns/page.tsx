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
    t.categories.digital,
    t.categories.furniture,
    t.categories.kids,
    t.categories.clothing,
    t.categories.books,
    t.categories.sports,
    t.categories.beauty,
    t.categories.pets,
    t.categories.plants,
    t.categories.games,
    t.categories.tickets,
    t.categories.others,
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
