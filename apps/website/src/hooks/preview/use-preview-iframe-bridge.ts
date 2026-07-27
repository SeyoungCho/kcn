"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  isPreviewTheme,
  PREVIEW_DIALOG_CLOSE_MESSAGE_TYPE,
  PREVIEW_THEME_MESSAGE_TYPE,
  PREVIEW_THEME_STORAGE_KEY,
  type PreviewTheme,
} from "@/hooks/preview/preview-bridge";

function getStoredPreviewTheme(): PreviewTheme {
  const storedTheme = window.localStorage.getItem(PREVIEW_THEME_STORAGE_KEY);

  return isPreviewTheme(storedTheme) ? storedTheme : "light";
}

function subscribeToPreviewTheme(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => window.removeEventListener("storage", callback);
}

export function usePreviewIframeBridge() {
  const storedPreviewTheme = useSyncExternalStore(
    subscribeToPreviewTheme,
    getStoredPreviewTheme,
    () => "light",
  );
  const [messageTheme, setMessageTheme] = useState<PreviewTheme>();
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const previewTheme = messageTheme ?? storedPreviewTheme;

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (typeof event.data !== "object" || event.data === null) {
        return;
      }

      if (event.data.type === PREVIEW_DIALOG_CLOSE_MESSAGE_TYPE) {
        setIsFullscreenOpen(false);
        return;
      }

      if (event.data.type !== PREVIEW_THEME_MESSAGE_TYPE) {
        return;
      }

      if (isPreviewTheme(event.data.theme)) {
        setMessageTheme(event.data.theme);
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return {
    isFullscreenOpen,
    previewTheme,
    setIsFullscreenOpen,
  };
}
