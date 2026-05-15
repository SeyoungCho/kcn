"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function PreviewThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="kcn-preview-theme"
    >
      {children}
    </ThemeProvider>
  );
}
