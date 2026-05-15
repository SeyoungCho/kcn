export const PREVIEW_THEME_STORAGE_KEY = "kcn-preview-theme";
export const PREVIEW_THEME_MESSAGE_TYPE = "kcn-preview-theme-change";
export const PREVIEW_DIALOG_CLOSE_MESSAGE_TYPE = "kcn-preview-dialog-close";

export type PreviewTheme = "light" | "dark";

export function isPreviewTheme(value: unknown): value is PreviewTheme {
  return value === "light" || value === "dark";
}
