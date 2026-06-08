"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const themeStorageKey = "theme";
const themes = ["light", "dark"] as const;

type Theme = (typeof themes)[number];

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function readCookie(name: string) {
  const parts = document.cookie ? document.cookie.split("; ") : [];

  for (const part of parts) {
    const separatorIndex = part.indexOf("=");

    if (separatorIndex < 0) {
      continue;
    }

    if (part.slice(0, separatorIndex) !== name) {
      continue;
    }

    const value = part.slice(separatorIndex + 1);

    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  return null;
}

function readStoredTheme() {
  const cookieTheme = readCookie(themeStorageKey);

  if (cookieTheme) {
    return cookieTheme;
  }

  try {
    return localStorage.getItem(themeStorageKey);
  } catch {
    return null;
  }
}

function readSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(): Theme {
  const storedTheme = readStoredTheme();

  if (isTheme(storedTheme)) {
    return storedTheme;
  }

  return readSystemTheme();
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeContinuity() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    applyTheme(resolveTheme());
  }, [pathname]);

  return null;
}
